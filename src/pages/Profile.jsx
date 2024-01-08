import Header from "../comp/Header";
import Footer from "../comp/Footer";
import { Helmet } from "react-helmet-async";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config';
import Moment from 'react-moment';
import { deleteUser } from "firebase/auth";
import ReactLoading from 'react-loading';
import { useTranslation } from 'react-i18next';



const Profile = () => {

  const [user, loading, error] = useAuthState(auth);

  const navigate = useNavigate();

  const { t } = useTranslation();



  useEffect(() => {
    // not user & not loading
    if (!user && !loading) {
      navigate("/");
    }

    // sign in and not verified
    if (user) {
      if (!user.emailVerified) {
        navigate("/");
      }
    }
  });


  // loading
  if (loading) {
    return (
      <>
        <Header />
        <main>
          <ReactLoading type={"spin"} color={"teal"} height={400} width={400} />
        </main>
        <Footer />
      </>
    )
  }


  // Error
  if (error) {
    return (
      <div><p>Error: {error.message}</p></div>
    )
  }


  // user
  if (user) {
    return (
      <>
        <Helmet>
          <title>Profile</title>
          <style type="text/css">{`
          main {
            flex-direction: column;
            gap: 1rem;
            align-items: start;
            width: fit-content;
            margin: auto;
            }`}
          </style>
        </Helmet>

        <Header />

        {user &&
          <main>
            <h3>{t("userName")} {user.displayName}</h3>
            <h3>{t("email")} {user.email}</h3>
            <h3>{t("lastSignIn")} {<Moment fromNow date={user.metadata.lastSignInTime} />}</h3>
            <h3>{t("accountCreated")} {<Moment fromNow date={user.metadata.creationTime} />}</h3>
            <button
              onClick={() => {
                deleteUser(user)
                  .then(() => { // ==> User deleted.           
                  })
                  .catch((error) => {  // ==> An error ocurred
                  });
              }}
              className="delete">
              {t("deleteAccount")}
            </button>
          </main>}

        <Footer />
      </>
    );
  }
};

export default Profile;
