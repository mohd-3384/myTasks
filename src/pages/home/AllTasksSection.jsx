import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from '../../firebase/config';
import ReactLoading from 'react-loading';
import Moment from 'react-moment';
import { useTranslation } from 'react-i18next';




const AllTasksSection = ({ user }) => {

    const oldestTasks = query(collection(db, user.uid), orderBy("id"))
    const newestTasks = query(collection(db, user.uid), orderBy("id", "desc"))
    const compTasks = query(collection(db, user.uid), where("completed", "==", true))
    const not_compTasks = query(collection(db, user.uid), where("completed", "==", false))

    const [initialData, setinitialData] = useState(oldestTasks)
    const [value, loading, error] = useCollection(initialData);
    const [fullOpacity, setfullOpacity] = useState(false)
    const [selectValue, setselectValue] = useState("all")
    const { t } = useTranslation();


    // Error
    if (error) {
        return (
            <h1>{error.message}</h1>
        )
    }

    // Loading
    if (loading) {
        return (
            <div style={{ marginTop: "20px" }}>
                <ReactLoading type={"spin"} color={"teal"} height={400} width={400} />
            </div>
        )
    }

    // Value
    if (value) {
        return (
            <div>
                {/* Options-Buttons (filtered Data) */}
                <section className="parent-of-btns flex mtt">
                    {selectValue === "all" && (
                        <div>
                            {/* Newest First Button */}
                            <button
                                onClick={() => {
                                    setfullOpacity(true)
                                    setinitialData(newestTasks)
                                }}
                                style={{ opacity: fullOpacity ? "1" : ".3" }}>
                                {t("newestData")}
                            </button>

                            {/* Oldest First Button */}
                            <button
                                onClick={() => {
                                    setfullOpacity(false)
                                    setinitialData(oldestTasks)
                                }}
                                style={{ opacity: fullOpacity ? ".3" : "1" }}>
                                {t("oldestData")}
                            </button>
                        </div>
                    )}


                    {/* Select Options */}
                    <select
                        value={selectValue}
                        onChange={(eo) => {
                            if (eo.target.value === "all") {
                                setfullOpacity(false)
                                setselectValue("all")
                                setinitialData(oldestTasks)
                            } else if (eo.target.value === "completed") {
                                setselectValue("completed")
                                setinitialData(compTasks)
                            } else if (eo.target.value === "not-completed") {
                                setselectValue("not-completed")
                                setinitialData(not_compTasks)
                            }
                        }}>
                        <option value="all">{t("all")}</option>
                        <option value="completed">{t("completed")}</option>
                        <option value="not-completed">{t("not-completed")}</option>
                    </select>
                </section>


                {/* Show All tasks */}
                <section className="flex all-tasks mt">
                    {value.docs.length > 0 ? (
                        value.docs.map((item) => {
                            return (
                                <Link to={`/edit-task/${item.data().id}`}>
                                    <article key={item.data().id} dir="auto" className="one-task">
                                        <h2>{item.data().title}</h2>

                                        <ul>
                                            {item.data().details.map((item, index) => {
                                                if (index < 2) {
                                                    return <li key={item}>{item}</li>
                                                } else {
                                                    return false
                                                }
                                            })}
                                        </ul>

                                        <p className="time">
                                            <Moment fromNow date={item.data().id} />
                                        </p>
                                    </article>
                                </Link>
                            )
                        })) : (<h1 className='add-task-txt'>{t("AddyourTask")}</h1>)
                    }
                </section>
            </div>
        );
    }
}

export default AllTasksSection;
