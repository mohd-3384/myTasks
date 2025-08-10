import './editTask.css'
import { Helmet } from "react-helmet-async";
import Header from "../../comp/Header";
import Footer from "../../comp/Footer";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/config'
import ReactLoading from 'react-loading';
import TitleSection from './1-TitleSection';
import SubTasksSection from './2-SubTasksSection';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

/**
 * EditTask function.
 * @returns {*}
 */
const EditTask = () => {

    const [user, loading, error] = useAuthState(auth);
    let { stringID } = useParams();

    const [showData, setshowData] = useState(false)

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

    // Error
    if (error) {
        return (
            <>
                <Header />
                <main>
                    <h1>{error.message}</h1>
                </main>
                <Footer />
            </>
        )
    }

    // User
    if (user) {
        return (
            <div>
                <Helmet>
                    <title>Edit Task</title>
                </Helmet>

                <Header />

                {showData ? (
                    <main>
                        <ReactLoading type={"spin"} color={"teal"} height={400} width={400} />
                    </main>
                ) : (
                    <div className='edit-task'>
                        {/* Title */}
                        <TitleSection user={user} stringID={stringID} />

                        {/* Sub-Tasks section */}
                        <SubTasksSection user={user} stringID={stringID} setshowData={setshowData} />
                    </div>
                )}

                <Footer />
            </div>
        );
    }

}

export default EditTask;
