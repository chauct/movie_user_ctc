import React from "react";
import styles from "./style.module.css";
import { NavLink, useHistory } from "react-router-dom";

function Header(props) {
  const history = useHistory();

  const goToHome = () => {
    history.push("/");
  };
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.nav}>
          <span onClick={goToHome} className={styles.logo}>
            <img
              src="https://cinerama.qodeinteractive.com/wp-content/uploads/2018/05/Logo-light.png"
              alt=""
            />
          </span>
          <div className={styles.menu}>
            <ul className="menu_list">
              <li>
                <NavLink to="/" className={styles.nav_link} exact>
                  Trang chủ
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className={styles.nav_link}>
                  Lịch chiếu
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={styles.nav_link}>
                  Liên hệ
                </NavLink>
              </li>

              {/* <li>
                <NavLink to="/theater" className={styles.nav_link}>
                  Cụm rạp
                </NavLink>
              </li> */}
              <li>
                <NavLink to="/news" className={styles.nav_link}>
                  Tin tức
                </NavLink>
              </li>
              <li>
                <NavLink to="/detail/:id" className={styles.nav_link}>
                  Ứng dụng
                </NavLink>
              </li>
            </ul>
          </div>
          <div className={styles.login}>
            <button>Đăng nhập</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
