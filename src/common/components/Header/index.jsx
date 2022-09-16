import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import logo from "assets/img/Logo-light.png";
import logoDark from "assets/img/Logo-dark.png";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_IN_ACTION } from "features/authentication/action";
import { Button, Dropdown, Menu } from "antd";

function Header() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.profile);

  const [header, setHeader] = useState(false);
  const [color, setColor] = useState(false);
  const [navbarLogo, setNavbarLogo] = useState(logo);
  const history = useHistory();

  const goToHome = () => {
    history.push("/");
  };

  const goToSignin = () => {
    history.push("/signin");
  };

  const goToHistory = () => {
    history.push("/history");
  };

  const goToProfile = () => {
    history.push("/profile");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch({
      type: SIGN_IN_ACTION,
      payload: null,
    });
    goToHome();
  };

  const menu = (
    <Menu
      items={[
        {
          key: "1",
          label: <span onClick={goToHistory}>Lịch sử đặt vé</span>,
        },
        {
          key: "2",
          label: <span onClick={goToProfile}>Thông tin tài khoản</span>,
        },
        {
          key: "3",
          label: <span onClick={handleLogout}>Đăng xuất</span>,
        },
      ]}
    />
  );
  const renderUserInfo = () => {
    if (userProfile) {
      return (
        <div className={styles.menu}>
          <Dropdown overlay={menu} placement="bottom" arrow>
            <span className={color ? `${styles.color} ` : `${styles.nav_link}`}>
              Hi, {userProfile.hoTen}
            </span>
          </Dropdown>
        </div>
      );
    }
    return (
      <div className={styles.login}>
        <button
          onClick={goToSignin}
          className={color ? `${styles.btn_dark} ` : `${styles.btn_login}`}
        >
          Đăng nhập
        </button>
      </div>
    );
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

          {renderUserInfo()}
        </div>
      </div>
    </div>
  );
}

export default Header;
