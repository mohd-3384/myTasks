import React from 'react';
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, updateDoc, arrayRemove, arrayUnion, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import Moment from 'react-moment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';


/**
 * SubTasksSection function.
 * @param {*} { user -
 * @param {*} stringID -
 * @param {*} setshowData } -
 * @returns {*}
 */
const SubTasksSection = ({ user, stringID, setshowData }) => {

    const [value, loading, error] = useDocument(doc(db, user.uid, stringID));

    const [showAddNewTask, setshowAddNewTask] = useState(false);
    const [inputNewTask, setinputNewTask] = useState("");

    const navigate = useNavigate();

    const { t } = useTranslation();

    // Error
    if (error) {
        return (
            <main>
                <h1>Error: {error.message}</h1>
            </main>
        )
    }

    // Loading
    if (loading) {
        return (
            <main>
                <ReactLoading type={"spin"} color={"teal"} height={400} width={400} />
            </main>
        )
    }

    // Value
    if (value) {
        return (
            <section className='sub-task'>
                {/* created Time and Completed Checkbox */}
                <div className='parent-time'>
                    <p className='time'>
                        Created
                        <Moment fromNow date={value.data().id} />
                    </p>

                    <div style={{ marginRight: "8px", marginTop: "4px" }}>
                        <input
                            onChange={async (eo) => {
                                if (eo.target.checked) {
                                    await updateDoc(doc(db, user.uid, stringID), {
                                        completed: true,
                                    });
                                } else {
                                    await updateDoc(doc(db, user.uid, stringID), {
                                        completed: false,
                                    });
                                }
                            }}
                            checked={value.data().completed}
                            id='checkbox'
                            type="checkbox" />
                        <label htmlFor="checkbox">
                            {t("completed")}
                        </label>
                    </div>
                </div>

                {/* Show All Tasks */}
                <ul>
                    {value.data().details.map((item) => {
                        return (
                            <li key={item} className='card-task flex'>
                                <p>{item}</p>
                                <i onClick={async () => {
                                    await updateDoc(doc(db, user.uid, stringID), {
                                        details: arrayRemove(item),
                                    });
                                }}
                                    className='fa-solid fa-trash'>
                                </i>
                            </li>
                        )
                    })}
                </ul>

                {/* Add new Task box */}
                {showAddNewTask && (
                    <form className='add-new-task flex'>
                        <input
                            value={inputNewTask}
                            onChange={(eo) => {
                                setinputNewTask(eo.target.value)
                            }}
                            className='add-task'
                            type="text" />

                        <button
                            onClick={async (eo) => {
                                eo.preventDefault()
                                if (inputNewTask) {
                                    setshowAddNewTask(false)
                                    await updateDoc(doc(db, user.uid, stringID), {
                                        details: arrayUnion(inputNewTask),
                                    });
                                }
                            }}
                            className='add'>
                            {t("add")}
                        </button>

                        <button
                            onClick={(eo) => {
                                eo.preventDefault()
                                setshowAddNewTask(false)
                            }}
                            className='cancel'>
                            {t("cancel")}
                        </button>
                    </form>
                )}

                {/* Add More Button and Delete Task Button */}
                <div
                    className='center mttt'
                    style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}>
                    <button
                        onClick={(eo) => {
                            eo.preventDefault()
                            setshowAddNewTask(true)
                            setinputNewTask("")
                        }}
                        className='add-more'>
                        {t("addmore")}
                        <i className='fa-solid fa-plus'></i>
                    </button>

                    <button
                        onClick={async (eo) => {
                            eo.preventDefault()
                            setshowData(true)
                            await deleteDoc(doc(db, user.uid, stringID));
                            navigate("/", { replace: true })
                        }}
                        className='delete mtt'>
                        {t("deletetask")}
                    </button>
                </div>
            </section>
        );
    }
}

export default SubTasksSection;