import React, { useState } from "react";
import styles from "./style.module.css";
import logoLight from "assets/img/Logo-light.png";
import logoDark from "assets/img/Logo-dark.png";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_IN_ACTION } from "features/authentication/action";
import { Dropdown, Menu } from "antd";

function Header() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.profile);

  const [header, setHeader] = useState(false);
  const [navbarLogo, setNavbarLogo] = useState(logoLight);
  const history = useHistory();

  const [isMobile, setIsMobile] = useState(false);

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
        <Dropdown overlay={menu} placement="bottom" arrow>
          <span className={styles.nav_link}>Hi, {userProfile.hoTen}</span>
        </Dropdown>
      );
    }
    return (
      <button onClick={goToSignin} className={styles.btn_login}>
        Đăng nhập
      </button>
    );
  };

  const changeBackgroundHeader = () => {
    if (window.scrollY >= 80) {
      setHeader(true);
      setNavbarLogo(logoDark);
    } else {
      setHeader(false);
      setNavbarLogo(logoLight);
    }
  };

  window.addEventListener("scroll", changeBackgroundHeader);

  return (
    <>
      <div
        className={
          header ? `${styles.active} ${styles.header}   ` : `${styles.header}`
        }
      >
        <div className="container">
          <div className={styles.nav}>
            <span onClick={goToHome} className={styles.logo}>
              <img src={navbarLogo} alt="logo" />
            </span>

            <div
              className={
                isMobile ? `${styles.nav_link_toggle}` : `${styles.menu}`
              }
              onClick={() => {
                setIsMobile(false);
              }}
            >
              <ul className={styles.menu_list}>
                <li>
                  <NavLink to="/" className={styles.nav_link}>
                    Lịch chiếu
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/theater" className={styles.nav_link}>
                    Cụm rạp
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/news" className={styles.nav_link}>
                    Tin tức
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/apps" className={styles.nav_link}>
                    Ứng dụng
                  </NavLink>
                </li>
              </ul>
            </div>

            {renderUserInfo()}

            <button
              className={styles.toggle}
              onClick={() => {
                setIsMobile(!isMobile);
              }}
            >
              {isMobile ? (
                <i class="fa-solid fa-x"></i>
              ) : (
                <i class="fa-solid fa-bars"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
