import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import "../theme.css";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/config'
import { signOut } from "firebase/auth";
import { useTranslation } from 'react-i18next';

/**
 * Header function.
 * @returns {*}
 */
const Header = () => {

  const [user] = useAuthState(auth);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const { t, i18n } = useTranslation();

  return (
    <div className="myheader">
      <header className="hide-when-mobile teal">
        <h1>
          <Link to="/"><i className="fa-solid fa-house"></i></Link>
        </h1>


        {/* Theme icon */}
        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-moon">
        </i>
        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-sun">
        </i>


        {/* Navbar menu */}
        <ul className="flex">
          {/* Languages */}
          <li className="main-list lang">
            <i className="fa-solid fa-language"></i>
            <ul className="lang-box">
              {/* Deutsch */}
              <li
                onClick={() => {
                  i18n.changeLanguage("de")
                }}>
                <p>Deutsch</p>
                {i18n.language === "de" && <i className="fa-solid fa-check"></i>}
              </li>

              {/* English */}
              <li
                onClick={() => {
                  i18n.changeLanguage("en")
                }}>
                <p>English</p>
                {i18n.language === "en" && <i className="fa-solid fa-check"></i>}
              </li>

              {/* Arabic */}
              <li
                onClick={() => {
                  i18n.changeLanguage("ar")
                }}
                dir="rtl">
                <p>العربية</p>
                {i18n.language === "ar" && <i className="fa-solid fa-check"></i>}
              </li>
            </ul>
          </li>


          {/* 1.1 Not user - sign-in button */}
          {!user && <li className="main-list">
            <Link className="main-link" to="/signin">
              {t("signin")}
            </Link>
          </li>}


          {/* 1.2 Not user - sign-up button */}
          {!user && <li className="main-list">
            <Link className="main-link" to="/signup">
              {t("signup")}
            </Link>
          </li>}


          {/* 2.1 user - sign-out button */}
          {user &&
            <li onClick={() => {
              signOut(auth)
                .then(() => {
                  // Sign-out successful.
                })
                .catch((error) => {
                  // An error happened.
                });
            }} className="main-list">
              <button className="main-link signout">
                {t("signout")}
              </button>
            </li>}


          {/* 2.2 user - profil button */}
          {user &&
            <li className="main-list">
              <NavLink className="main-link" to="/profile">
                {t("account")}
              </NavLink>
            </li>}
        </ul>
      </header>

    </div>
  );
};

export default Header;
