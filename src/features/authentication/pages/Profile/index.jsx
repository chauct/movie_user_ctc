import { Col, Input, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import styles from "./style.module.css";

function Profile() {
  const profile = useSelector((state) => state.auth.profile);
  console.log({ profile });
  return (
    <div className={styles.profile}>
      <div className="container">
        <h2 className={styles.title}>Thông tin tài khoản</h2>
        <Row>
          <Col span={8}>
            <div className={styles.left}>
              <img src="https://joeschmoe.io/api/v1/random" alt="" />
              <p>{profile.hoTen}</p>
            </div>
          </Col>
          <Col span={12} offset={4}>
            <form className={styles.right}>
              <div>
                <label className={styles.label}>Tên tài khoản</label>
                <Input
                  name="taiKhoan"
                  className={styles.input}
                  type="text"
                  value={profile.taiKhoan}
                />
              </div>
              <div>
                <label className={styles.label}>Mật khẩu</label>
                <Input
                  name="matKhau"
                  className={styles.input}
                  type="password"
                  value={profile.matKhau}
                />
              </div>

              <div>
                <label className={styles.label}>Họ tên</label>
                <Input
                  name="hoTen"
                  className={styles.input}
                  type="text"
                  value={profile.hoTen}
                />
              </div>
              <div>
                <label className={styles.label}>Email</label>
                <Input
                  name="email"
                  className={styles.input}
                  type="text"
                  value={profile.email}
                />
              </div>
              <div>
                <label className={styles.label}>Số điện thoại</label>
                <Input
                  className={styles.input}
                  name="soDt"
                  type="text"
                  value={profile.soDT}
                />
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Profile;
