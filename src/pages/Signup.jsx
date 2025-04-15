import Header from "../comp/Header";
import Footer from "../comp/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import Error404 from "./Error404";
import ReactLoading from 'react-loading';
import { useTranslation } from 'react-i18next';





const Signup = () => {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const [user, loading, error] = useAuthState(auth);
    const [userName, setuserName] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    const [haserror, sethaserror] = useState(false);
    const [firebaseError, setfirebaseError] = useState("");


    // (sign in && verified email) => navigate(/)
    useEffect(() => {
        if (user) {
            if (user.emailVerified) {
                navigate("/")
            }
        }
    })

    // Loading
    if (loading) {
        return (
            <>
                <Header />
                <main>
                    <div>
                        <ReactLoading type={"spin"} color={"teal"} height={100} width={100} />
                    </div>
                </main>
                <Footer />
            </>
        )
    }


    // Sign in without Email Verification
    if (user) {
        if (!user.emailVerified) {
            return (
                <>
                    <Header />
                    <main>
                        <p>
                            {t("weSendYouEmail")}
                        </p>
                        <button
                            className="delete">
                            {t("sendAgain")}
                        </button>
                    </main>
                    <Footer />
                </>
            )
        }
    }


    // Error
    if (error) {
        return (
            <Error404 />
        )
    }


    // NOT user
    if (!user) {
        return (
            <>
                <Helmet>
                    <title>Signup</title>
                </Helmet>

                <Header />

                <main>
                    <form>
                        <p
                            dir="auto"
                            style={{ fontSize: "23px", marginBottom: "22px" }}>
                            {t("createnewaccount")}
                        </p>

                        <input onChange={(eo) => {
                            setuserName(eo.target.value)
                        }} required type="text" placeholder="User Name: "></input>

                        <input onChange={(eo) => {
                            setemail(eo.target.value)
                        }} required type="email" placeholder="Email: "></input>

                        <input onChange={(eo) => {
                            setpassword(eo.target.value)
                        }} required type="password" placeholder="Password: "></input>

                        <button onClick={(eo) => {
                            eo.preventDefault()
                            createUserWithEmailAndPassword(auth, email, password)
                                .then((userCredential) => {
                                    // Signed up 
                                    // const user = userCredential.user;
                                    sendEmailVerification(auth.currentUser)
                                        .then(() => {
                                            // Email verification sent!
                                        });
                                    updateProfile(auth.currentUser, {
                                        displayName: userName,
                                    }).then(() => {
                                        navigate("/")
                                    }).catch((error) => {
                                        // An error occurred
                                    });
                                })
                                .catch((error) => {
                                    const errorCode = error.code;
                                    sethaserror(true);
                                    switch (errorCode) {
                                        case "auth/invalid-email":
                                            setfirebaseError("Wrong Email")
                                            break;
                                        case "auth/user-not-found":
                                            setfirebaseError("Wrong Email")
                                            break;
                                        default:
                                            setfirebaseError(errorCode)
                                            break
                                    }
                                });
                        }}>
                            {t("signup")}
                        </button>

                        <p
                            className="account">
                            {t("allready")}
                            <Link to="/signin">
                                {t("signin")}
                            </Link>
                        </p>

                        {haserror && <h3 className="mtt">{firebaseError}</h3>}
                    </form>
                </main>

                <Footer />
            </>
        );
    }


};

export default Signup;
