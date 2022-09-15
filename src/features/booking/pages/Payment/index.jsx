import { Col, Row } from "antd";
import {
  DAT_GHE,
  fetchDanhSachPhongVeAction,
  fetchDatVeAction,
} from "features/booking/action";
import moment from "moment";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import lodash from "lodash";

import styles from "./style.module.css";
import "./style.css";

function Payment() {
  const dispatch = useDispatch();

  const history = useHistory();

  const profile = useSelector((state) => state.auth.profile);

  const thongTinPhongVe = useSelector((state) => state.booking.thongTinPhongVe);

  const danhSachGheDangDat = useSelector(
    (state) => state.booking.danhSachGheDangDat
  );

  const match = useRouteMatch();

  const scheduleId = match.params.id;
  console.log({ scheduleId });

  const goToSignin = () => {
    history.push("/signin");
  };

  const fetchDanhSachPhongVe = async () => {
    dispatch(fetchDanhSachPhongVeAction(scheduleId));
  };

  useEffect(() => {
    fetchDanhSachPhongVe();
  }, []);

  const renderSeat = () => {
    return thongTinPhongVe.danhSachGhe?.map((item, index) => {
      let classGheVip = item.loaiGhe === "Vip" ? "gheVip" : "";
      let classGheDaDat = item.daDat === true ? "gheDaDat" : "";
      let noiDung = item.daDat ? "X" : item.stt;
      let classGheDaDuocDat = "";

      if (profile.taiKhoan === item.taiKhoanNguoiDat) {
        classGheDaDuocDat = "gheDaDuocDat";
      }

      let indexGheDD = danhSachGheDangDat.findIndex(
        (gheDD) => gheDD.maGhe === item.maGhe
      );
      let classGheDangDat = indexGheDD !== -1 ? "gheDangDat" : "";

      return (
        <Fragment key={index}>
          <button
            style={{ fontSize: 15 }}
            onClick={() => {
              dispatch({
                type: DAT_GHE,
                gheDangDat: {
                  maGhe: item.maGhe,
                  giaVe: item.giaVe,
                  stt: item.stt,
                },
              });
            }}
            disabled={item.daDat}
            className={`ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} `}
          >
            {noiDung}
          </button>
          {(index + 1) % 16 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  return (
    <div className="container-fluid">
      <Row className={styles.payment}>
        <Col span={16}>
          <div className={styles.seat}>
            <div className={styles.topContent}>
              <div className={styles.leftTitle}>
                {/* <img src={movieInfo.hinhAnh} alt="" /> */}
                <div className={styles.info}>
                  <p>{thongTinPhongVe.thongTinPhim?.tenCumRap}</p>
                  <p>
                    {thongTinPhongVe.thongTinPhim?.ngayChieu} -
                    {thongTinPhongVe.thongTinPhim?.gioChieu} -
                    {thongTinPhongVe.thongTinPhim?.tenRap}
                  </p>
                </div>
              </div>
              <div className={styles.rightTitle}>
                <p>Thời gian giữ ghế </p>
                <p>00:0</p>
              </div>
            </div>
            <div className={styles.screen}></div>
            <div className={styles.trapezoid}>
              <h3>Màn hình</h3>
            </div>

            <div>{renderSeat()}</div>
            <div className={styles.flex_seat}>
              <div className={styles.gheThuong}>
                <button className="ghe"></button>
                <p className={styles.text_comment}>Ghế thường</p>
              </div>
              <div className={styles.gheVip}>
                <button className="ghe gheVip"></button>
                <p className={styles.text_comment}>Ghế Vip</p>
              </div>
              <div className={styles.gheDangChon}>
                <button className="ghe gheDangDat"></button>
                <p className={styles.text_comment}>Ghế đang chọn</p>
              </div>
              <div className={styles.gheDaDuocMua}>
                <button className="ghe gheDaDat">X</button>
                <p className={styles.text_comment}>Ghế đã được mua</p>
              </div>
              <div className={styles.gheDaDuocChon}>
                <button className="ghe gheDaDuocDat">X</button>
                <p className={styles.text_comment}>Ghế bạn chọn mua</p>
              </div>
            </div>
          </div>
        </Col>
        <Col span={8} className={styles.rightcheckout}>
          <section className={styles.booking}>
            <p className={styles.total}>
              {danhSachGheDangDat
                .reduce((tongTien, ghe, index) => {
                  return (tongTien += ghe.giaVe);
                }, 0)
                .toLocaleString()}
              đ
            </p>
            <div className={styles.movieName}>
              <span>{thongTinPhongVe.thongTinPhim?.tenPhim}</span>
              <p>Địa điểm: {thongTinPhongVe.thongTinPhim?.tenCumRap} </p>
              <p>
                Ngày chiếu: {thongTinPhongVe.thongTinPhim?.ngayChieu} -
                {thongTinPhongVe.thongTinPhim?.gioChieu}-
                {thongTinPhongVe.thongTinPhim?.tenRap}
              </p>
            </div>
            <div className={styles.chair}>
              <div>
                Ghế:
                {lodash
                  .sortBy(danhSachGheDangDat, ["stt"])
                  .map((gheDD, index) => {
                    return (
                      <span style={{ marginLeft: 10 }} key={index}>
                        {gheDD.stt}
                      </span>
                    );
                  })}
              </div>
              <div>
                {danhSachGheDangDat
                  .reduce((tongTien, ghe, index) => {
                    return (tongTien += ghe.giaVe);
                  }, 0)
                  .toLocaleString()}
                đ
              </div>
            </div>
            <div className={styles.email}>
              <label>Email</label>
              <br />
              {/* <input type="text" value={profile?.email} /> */}
            </div>
            <div className={styles.name}>
              <label>Họ tên</label>
              <br />
              {/* <input type="text" value={profile.hoTen} /> */}
            </div>
            <div className={styles.notice}>
              <i class="bx bxs-info-circle"></i>
              <span>
                Vé đã mua không thể đổi hoặc hoàn tiền.
                <br /> Mã vé sẽ được gửi qua tin nhắn <a>SMS</a>(tin nhắn Zalo)
                và <a>Email</a> đã đăng nhập
              </span>
            </div>
            <div className={styles.btn_checkout}>
              <button
                onClick={() => {
                  if (localStorage.getItem("user_login")) {
                    // lấy ra user từ localStorage
                    let userLogin = JSON.parse(
                      localStorage.getItem("user_login")
                    );

                    // let object backend cần
                    let objectDatVe = {
                      maLichChieu: scheduleId,
                      danhSachVe: danhSachGheDangDat,
                      taiKhoanNguoiDung: userLogin.taiKhoan,
                    };

                    // dispatch gọi api
                    dispatch(fetchDatVeAction(objectDatVe));
                  } else {
                    history.push("/signin");
                  }
                }}
              >
                đặt vé
              </button>
            </div>
          </section>
        </Col>
      </Row>
    </div>
  );
}

export default Payment;
