import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import logo from "assets/img/Logo-light.png";
import logoDark from "assets/img/Logo-dark.png";
import { NavLink, useHistory } from "react-router-dom";

function Header(props) {
  const [header, setHeader] = useState(false);
  const [color, setColor] = useState(false);
  const [navbarLogo, setNavbarLogo] = useState(logo);
  const history = useHistory();

  const goToHome = () => {
    history.push("/");
  };

  const goToSignup = () => {
    history.push("/signup");
  };

  const changeBackgroundHeader = () => {
    if (window.scrollY >= 80) {
      setHeader(true);
      setColor(true);
    } else {
      setHeader(false);
      setColor(false);
    }
  };

  useEffect(() => {
    changeBackgroundHeader();
    window.addEventListener("scroll", changeBackgroundHeader);
  });

  //logo scroll function
  const changeLogo = () => {
    if (window.scrollY >= 60) {
      setNavbarLogo(logoDark);
    } else {
      setNavbarLogo(logo);
    }
  };

  useEffect(() => {
    changeLogo();
    window.addEventListener("scroll", changeLogo);
  });

  return (
    <div
      className={
        header ? `${styles.active} ${styles.header}` : `${styles.header}`
      }
    >
      <div className="container">
        <div className={styles.nav}>
          <span onClick={goToHome} className={styles.logo}>
            <img src={navbarLogo} alt="logo" />
          </span>
          <div className={styles.menu}>
            <ul className="menu_list">
              <li>
                <NavLink
                  to="/"
                  className={color ? `${styles.color} ` : `${styles.nav_link}`}
                >
                  Lịch chiếu
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/theater"
                  className={color ? `${styles.color} ` : `${styles.nav_link}`}
                >
                  Cụm rạp
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/news"
                  className={color ? `${styles.color} ` : `${styles.nav_link}`}
                >
                  Tin tức
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/detail/:id"
                  className={color ? `${styles.color} ` : `${styles.nav_link}`}
                >
                  Ứng dụng
                </NavLink>
              </li>
            </ul>
          </div>
          <div className={styles.login}>
            <button
              onClick={goToSignup}
              className={color ? `${styles.btn_dark} ` : `${styles.btn_login}`}
            >
              Đăng kí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
