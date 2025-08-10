import React from 'react';
import './Snackbar.css';
import { useTranslation } from 'react-i18next';

/**
 * Snackbar function.
 * @param {*} { showMessage } -
 * @returns {*}
 */
const Snackbar = ({ showMessage }) => {

    const { t } = useTranslation();

    return (
        <p
            style={{ right: showMessage ? "8vw" : "-100vw" }}
            className="show-message">
            {t("addedSuccessfully")}
            <i className="fa-regular fa-circle-check"></i>
        </p>
    );
}

export default Snackbar;
