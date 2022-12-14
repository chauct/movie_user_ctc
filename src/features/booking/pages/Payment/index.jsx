import { Col, Row } from "antd";
import {
  DAT_GHE,
  fetchDanhSachPhongVeAction,
  fetchDatVeAction,
} from "features/booking/action";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";

import lodash from "lodash";

import styles from "./style.module.css";
import "./style.css";
import Swal from "sweetalert2";
import CountdownTimer from "features/booking/components/CountdownTimer";

function Payment() {
  const dispatch = useDispatch();

  const history = useHistory();

  const profile = useSelector((state) => state.auth.profile);

  const thongTinPhongVe = useSelector((state) => state.booking.thongTinPhongVe);

  const danhSachGheDangDat = useSelector(
    (state) => state.booking.danhSachGheDangDat
  );
  console.log({ danhSachGheDangDat });
  const match = useRouteMatch();

  const scheduleId = match.params.id;

  const fetchDanhSachPhongVe = async () => {
    dispatch(fetchDanhSachPhongVeAction(scheduleId));
  };

  useEffect(() => {
    fetchDanhSachPhongVe();
  }, []);

  const THREE_DAYS_IN_MS = 5 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

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
                <p>Th???i gian gi??? gh??? </p>
                <CountdownTimer targetDate={dateTimeAfterThreeDays} />
              </div>
            </div>
            <div className={styles.screen}></div>
            <div className={styles.trapezoid}>
              <h3>M??n h??nh</h3>
            </div>

            <div>{renderSeat()}</div>
            <div className={styles.flex_seat}>
              <div className={styles.gheThuong}>
                <button className="ghe"></button>
                <p className={styles.text_comment}>Gh??? th?????ng</p>
              </div>
              <div className={styles.gheVip}>
                <button className="ghe gheVip"></button>
                <p className={styles.text_comment}>Gh??? Vip</p>
              </div>
              <div className={styles.gheDangChon}>
                <button className="ghe gheDangDat"></button>
                <p className={styles.text_comment}>Gh??? ??ang ch???n</p>
              </div>
              <div className={styles.gheDaDuocMua}>
                <button className="ghe gheDaDat">X</button>
                <p className={styles.text_comment}>Gh??? ???? ???????c mua</p>
              </div>
              <div className={styles.gheDaDuocChon}>
                <button className="ghe gheDaDuocDat">X</button>
                <p className={styles.text_comment}>Gh??? b???n ch???n mua</p>
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
              ??
            </p>
            <div className={styles.movieName}>
              <span>{thongTinPhongVe.thongTinPhim?.tenPhim}</span>
              <p>?????a ??i???m: {thongTinPhongVe.thongTinPhim?.tenCumRap} </p>
              <p>
                Ng??y chi???u: {thongTinPhongVe.thongTinPhim?.ngayChieu} -
                {thongTinPhongVe.thongTinPhim?.gioChieu}-
                {thongTinPhongVe.thongTinPhim?.tenRap}
              </p>
            </div>
            <div className={styles.chair}>
              <div>
                Gh???:
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
                ??
              </div>
            </div>
            <div className={styles.email}>
              <label>Email</label>
              <br />
              <input type="text" value={profile?.email} />
            </div>
            <div className={styles.name}>
              <label>H??? t??n</label>
              <br />
              <input type="text" value={profile?.hoTen} />
            </div>
            <div className={styles.notice}>
              <i class="bx bxs-info-circle"></i>
              <span>
                V?? ???? mua kh??ng th??? ?????i ho???c ho??n ti???n.
                <br /> M?? v?? s??? ???????c g???i qua tin nh???n <a href="#">SMS</a>(tin
                nh???n Zalo) v?? <a href="#">Email</a> ???? ????ng nh???p
              </span>
            </div>
            <div className={styles.btn_checkout}>
              <button
                onClick={() => {
                  if (danhSachGheDangDat.length === 0) {
                    Swal.fire({
                      title: "B???n Ch??a Ch???n Gh???!",
                      text: "Vui L??ng Ch???n Gh??? Tr?????c Khi ?????t!",
                      icon: "warning",
                      confirmButtonColor: "#fb4226",
                      confirmButtonText: "OK",
                    });
                  } else {
                    Swal.fire({
                      title: "B???n c?? ch???c mu???n ?????t v?? kh??ng!",
                      icon: "question",
                      showCancelButton: true,
                      confirmButtonColor: "#fb4226",
                      cancelButtonColor: "rgb(167 167 167)",
                      confirmButtonText: "OK",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        if (localStorage.getItem("user_login")) {
                          // l???y ra user t??? localStorage
                          let userLogin = JSON.parse(
                            localStorage.getItem("user_login")
                          );

                          // let object backend c???n
                          let objectDatVe = {
                            maLichChieu: scheduleId,
                            danhSachVe: danhSachGheDangDat,
                            taiKhoanNguoiDung: userLogin.taiKhoan,
                          };

                          // dispatch g???i api
                          dispatch(fetchDatVeAction(objectDatVe));
                        } else {
                          history.push("/signin");
                        }
                      }
                    });
                  }
                }}
              >
                ?????t v??
              </button>
            </div>
          </section>
        </Col>
      </Row>
    </div>
  );
}

export default Payment;
