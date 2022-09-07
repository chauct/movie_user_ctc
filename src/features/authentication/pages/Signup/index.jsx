import { Button, Input } from "antd";
import React from "react";
import styles from "./style.module.css";
function Signup() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.signup}>
        <h2>Đăng kí</h2>
        <form>
          <Input
            className={styles.input}
            type="text"
            placeholder="Tên Tài Khoản"
          />
          <Input
            className={styles.input}
            type="password"
            placeholder="Mật Khẩu"
          />
          <Input className={styles.input} type="text" placeholder="Họ Và Tên" />
          <Input className={styles.input} type="text" placeholder="Email" />
          <Input
            className={styles.input}
            type="text"
            placeholder="Số Điện Thoại"
          />

          <Button className={styles.btn_signup}>Đăng Ký</Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
