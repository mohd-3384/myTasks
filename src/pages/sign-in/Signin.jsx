import Header from "../../comp/Header";
import Footer from "../../comp/Footer";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../firebase/config';
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './signin.css'
import Modal from "../../shared/Modal";
import { useTranslation } from 'react-i18next';

/**
 * Signin function.
 * @returns {*}
 */
const Signin = () => {

    const navigate = useNavigate();
    const { t } = useTranslation();

    const [email, setemail] = useState("");
    const [resetEmail, setresetEmail] = useState("");
    const [password, setpassword] = useState("");

    const [haserror, sethaserror] = useState(false);
    const [firebaseError, setfirebaseError] = useState("");

    const [showSendEmail, setshowSendEmail] = useState(false);

    const [showModal, setshowModal] = useState(false);

    /**
     * Function to handle forgot password.
     * @returns {void}
     */
    const forgotPassword = () => {
        setshowModal(true)
    }

    /**
     * Function to close the modal.
     * @return {void}
     */
    const closeModal = () => {
        setshowModal(false)
    }

    return (
        <>
            <Helmet>
                <title>Signin</title>
            </Helmet>

            <Header />

            <main>
                <form>
                    <input onChange={(eo) => {
                        setemail(eo.target.value)
                    }} required type="email" placeholder="Email: " />

                    <input onChange={(eo) => {
                        setpassword(eo.target.value)
                    }} required type="password" placeholder="Password: " />

                    <button onClick={(eo) => {
                        eo.preventDefault()
                        signInWithEmailAndPassword(auth, email, password)
                            .then((userCredential) => {
                                // Signed in 
                                // const user = userCredential.user;
                                navigate("/");
                            })
                            .catch((error) => {
                                const errorCode = error.code;
                                sethaserror(true);
                                switch (errorCode) {
                                    case "auth/invalid-email":
                                        setfirebaseError("Wrong Email")
                                        break;
                                    case "auth/user-not-found":
                                        setfirebaseError("Email not found")
                                        break;
                                    case "auth/invalid-login-credentials":
                                        setfirebaseError("Invalid Email Or Password")
                                        break;
                                    default:
                                        setfirebaseError(errorCode)
                                        break
                                }
                            });
                    }}>
                        {t("signin")}
                    </button>

                    <p
                        dir="auto"
                        className="account">
                        {t("account?")}
                        <Link to="/signup">{t("signup")}</Link>
                    </p>

                    <p
                        onClick={() => {
                            forgotPassword()
                        }}
                        className="forgot-pass mt">
                        {t("forgotpass")}
                    </p>

                    {haserror && <h3 className="mt">{firebaseError}</h3>}
                </form>

                {/* ###### Form Forgot Password ###### */}
                {showModal && (
                    <Modal closeModal={closeModal}>
                        <input
                            onChange={(eo) => {
                                setresetEmail(eo.target.value)
                            }}
                            required
                            type="email"
                            placeholder="Email: " />

                        <button
                            onClick={(eo) => {
                                eo.preventDefault()
                                sendPasswordResetEmail(auth, resetEmail)
                                    .then(() => {
                                        setshowSendEmail(true)
                                    })
                                    .catch((error) => {
                                    });
                            }}
                            className="close">
                            {t("resetpass")}
                        </button>

                        {showSendEmail &&
                            <p
                                className="checkemail">
                                {t("pleaseCheckYourEmail")}
                            </p>
                        }
                    </Modal>
                )}
            </main>

            <Footer />
        </>
    );
};

export default Signin;
