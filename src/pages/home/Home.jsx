import Header from "../../comp/Header";
import Footer from "../../comp/Footer";
import { Helmet } from "react-helmet-async";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase/config'
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
import ReactLoading from 'react-loading';
import './Home.css'
import Modal from "../../shared/Modal";
import { useState } from 'react'
import { doc, setDoc } from "firebase/firestore";
import AllTasksSection from "./AllTasksSection";
import { useTranslation } from 'react-i18next';
import Snackbar from "./Snackbar";

/**
 * Home function.
 * @returns {*}
 */
const Home = () => {

  const { t } = useTranslation();

  const [user, loading, error] = useAuthState(auth);

  const [showModal, setshowModal] = useState(false);

  /**
   * showModalfunction function.
   * This function sets the showModal state to true, which triggers the display of the modal
   */
  const showModalfunction = () => {
    setshowModal(true)
  }

  /** * closeModal function.
   * This function resets the modal state and clears the input fields when the modal is closed.
   * @returns {*}
   * */
  const closeModal = () => {
    setshowModal(false)
    settaskTitle("")
    setsubTask("")
    setarray([])
  }

  // Modal functions
  const [taskTitle, settaskTitle] = useState("")
  const [array, setarray] = useState([])
  const [subTask, setsubTask] = useState("")

  /**
  * addBTN function.
  * @returns {*}
  */
  const addBTN = () => {
    if (!array.includes(subTask)) {
      array.push(subTask)
    }
    setsubTask("")
  }

  const [showLoading, setshowLoading] = useState(false)
  const [showMessage, setshowMessage] = useState(false)

  // Error
  if (error) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
        </Helmet>

        <Header />

        <main>
          <h1>Error: {error.message}</h1>
        </main>

        <Footer />
      </>
    )
  }

  // Loading
  if (loading) {
    return (
      <>
        <Header />
        <main>
          <div style={{ marginTop: "26px" }}>
            <ReactLoading type={"spin"} color={"teal"} height={400} width={400} />
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // NOT user
  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME</title>
        </Helmet>

        <Header />

        <main dir="auto">
          <p className="pls">
            {t("please")}
            <Link
              style={{ fontSize: "27px" }}
              to="/signin">
              {t("signin")}
            </Link>
            {t("tocontinue")}
          </p>
        </main>

        <Footer />
      </>
    )
  }


  // Sign in and ...
  if (user) {
    // ==> without Email Verification
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME</title>
          </Helmet>

          <Header />

          <main>
            <p>
              {t("welcome")} {user.displayName}
            </p>
            <p>
              {t("pleaseverify")}
            </p>
            <button
              onClick={() => {
                sendEmailVerification(auth.currentUser)
                  .then(() => {
                  });
              }}
              className="delete">
              {t("sendemail")}
            </button>
          </main>

          <Footer />
        </>
      );
    }

    // ==> with verified email
    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME</title>
          </Helmet>

          <Header />

          <main className="home">
            {/* Show all tasks */}
            <AllTasksSection user={user} />

            {/* add new task button */}
            <section className="mt">
              <button
                onClick={() => {
                  showModalfunction()
                }}
                dir="auto"
                className="add-task-btn">
                {t("AddNewTask")}
                <i className="fa-solid fa-plus"></i>
              </button>
            </section>

            {/* Modal box */}
            {showModal && (
              <Modal closeModal={closeModal}>
                {/* children */}
                <div className="modal-content">
                  <div>
                    {/* add title */}
                    <input
                      onChange={(eo) => {
                        settaskTitle(eo.target.value)
                      }}
                      type="text"
                      placeholder="Add Title"
                      required
                      value={taskTitle} />

                    <div>
                      {/* add Details input */}
                      <input
                        onChange={(eo) => {
                          setsubTask(eo.target.value)
                        }}
                        type="text"
                        placeholder="Add Details"
                        required
                        value={subTask} />

                      {/* Add btn */}
                      <button
                        onClick={(eo) => {
                          eo.preventDefault()
                          if (subTask) {
                            addBTN()
                          }
                        }}
                        style={{ marginLeft: "8px" }}>
                        {t("add")}
                      </button>
                    </div>
                  </div>

                  <ul>
                    {array.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  {/* Submit */}
                  <button
                    className="submit"
                    onClick={async (eo) => {
                      eo.preventDefault()
                      setshowLoading(true)
                      const taskID = new Date().getTime()
                      await setDoc(doc(db, user.uid, `${taskID}`), {
                        title: taskTitle,
                        details: array,
                        id: taskID,
                        completed: false
                      });
                      setshowLoading(false)
                      settaskTitle("")
                      setsubTask("")
                      setarray([])
                      setshowModal(false)
                      setshowMessage(true)
                      setTimeout(() => {
                        setshowMessage(false)
                      }, 3000)
                    }}>
                    {showLoading ? <ReactLoading type={"spin"} color={"teal"} height={20} width={20} /> : `${t("submit")}`}
                  </button>
                </div>
              </Modal>
            )}

            {/* show Message successfuly */}
            <Snackbar showMessage={showMessage} />
          </main>

          <Footer />
        </>
      )
    }
  }
};

export default Home;
