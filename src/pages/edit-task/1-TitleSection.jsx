import React from 'react';
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import ReactLoading from 'react-loading';
import { useRef } from "react";

/**
 * TitleSection function.
 * @param {*} { user -
 * @param {*} stringID } -
 * @returns {*}
 */
const TitleSection = ({ user, stringID }) => {

    const [value, loading, error] = useDocument(doc(db, user.uid, stringID));
    const inputElement = useRef(null);

    // Error
    if (error) {
        return (
            <main>
                <h1>{error.message}</h1>
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
            <section className='title center'>
                <h1>
                    <input
                        onChange={async (eo) => {
                            await updateDoc(doc(db, user.uid, stringID), {
                                title: eo.target.value,
                            });
                        }}
                        defaultValue={value.data().title}
                        className='title-input'
                        type="text"
                        style={{ textDecoration: value.data().completed ? "line-through double #dc3545" : null }}
                        ref={inputElement} />

                    <i
                        onClick={() => {
                            inputElement.current.focus()
                        }}
                        className='fa-regular fa-pen-to-square'>
                    </i>
                </h1>
            </section>
        );
    }
}

export default TitleSection;