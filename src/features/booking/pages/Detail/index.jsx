import React, { useEffect, useState } from "react";
import styles from "./style.module.css";
import { CustomCard } from "@tsamantanis/react-glassmorphism";
import "@tsamantanis/react-glassmorphism/dist/index.css";

import "./style.css";

import { Tabs, Row, Col, Rate, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesDetailAction } from "features/booking/action";
import { useHistory, useRouteMatch } from "react-router-dom";

import moment from "moment";
import Swal from "sweetalert2";

const { TabPane } = Tabs;

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

function Detail() {
  const history = useHistory();

  const [value, setValue] = useState(3);

  const [display, setDisplay] = useState(true);

  const [none, setNone] = useState(false);

  const match = useRouteMatch();

  const dispatch = useDispatch();

  const movieDetail = useSelector((state) => state.booking.moviesDetail);

  console.log({ movieDetail });

  const movieId = match.params.id;

  const fetchMoviesDetail = () => {
    dispatch(fetchMoviesDetailAction(movieId));
  };

  const DisplayHandler = () => {
    setDisplay(true);
    setNone(false);
  };

  const NoneHandler = () => {
    setDisplay(false);
    setNone(true);
  };

  useEffect(() => {
    fetchMoviesDetail();
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [urlVideo, setUrlVideo] = useState();
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div
      style={{
        backgroundImage: `url(${movieDetail.hinhAnh})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        minHeight: "100vh",
        backgroundRepeat: "no-repeat",
      }}
    >
      <CustomCard
        className={styles.detail}
        effectColor="#000" // required
        color="#fff" // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className="container">
          <Row className={styles.padding}>
            <Col sx={24} sm={12} md={8} lg={8}>
              <div className={styles.img}>
                <img
                  onClick={() => {
                    setIsModalVisible(true);
                    setUrlVideo(movieDetail?.trailer);
                  }}
                  src={movieDetail.hinhAnh}
                  alt={movieDetail.tenPhim}
                  width={350}
                  height={525}
                />
              </div>
              <div
                onClick={() => {
                  setIsModalVisible(true);
                  setUrlVideo(movieDetail?.trailer);
                }}
                className={styles.icon_play}
              >
                <img
                  src="https://cinerama.qodeinteractive.com/wp-content/plugins/cinerama-core/assets/img/play.svg"
                  alt=""
                />
              </div>
              <Modal
                visible={isModalVisible}
                footer
                onOk={handleOk}
                onCancel={handleCancel}
                className={styles.modal_trailer}
              >
                <iframe
                  width="500px"
                  height="300px"
                  src={urlVideo}
                  title={movieDetail.tenPhim}
                  frameBorder={0}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Modal>
            </Col>
            <Col sx={24} sm={16} md={16} lg={16}>
              <div className={styles.info_movie}>
                <h2>{movieDetail.tenPhim}</h2>
                <p>{movieDetail.moTa}</p>

                <div className={styles.flex}>
                  <div>
                    <p style={{ marginBottom: 30, display: "block" }}>
                      Ngày khởi chiếu:
                      <span className={styles.text_date}>
                        {moment(movieDetail.ngayKhoiChieu).format(
                          "DD.MM.YYYY"
                        ) +
                          " ~ " +
                          moment(movieDetail.ngayKhoiChieu).format("HH:mm:ss")}
                      </span>
                    </p>
                    <a href="#lichChieu" className={styles.btn_booking}>
                      Đặt vé
                    </a>
                  </div>
                  <div>
                    <div>
                      <div className="clearfix">
                        <div
                          className={`c100 p${movieDetail.danhGia * 10} green`}
                        >
                          <span>{movieDetail.danhGia} .0</span>
                          <div className="slice">
                            <div className="bar" />
                            <div className="fill" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <Rate allowHalf value={movieDetail.danhGia / 2} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <Row className={styles.select_title}>
            <span onClick={DisplayHandler}>Lịch chiếu</span>
            <span onClick={NoneHandler}>Đánh giá</span>
          </Row>

          {display && (
            <Tabs tabPosition={"left"} className={styles.schedule}>
              {movieDetail.heThongRapChieu?.map((item) => {
                return (
                  <TabPane
                    key={item.maHeThongRap}
                    tab={
                      <div className={styles.heThongRap}>
                        <img
                          width={50}
                          src={item.logo}
                          alt={item.tenHeThongRap}
                        />
                        <span>{item.tenHeThongRap}</span>
                      </div>
                    }
                  >
                    {item.cumRapChieu?.map((cumRap) => {
                      return (
                        <div
                          key={cumRap.maHeThongRap}
                          className={styles.cumRap}
                        >
                          <h2>{cumRap.tenCumRap}</h2>
                          <p>{cumRap.diaChi}</p>
                          <Row>
                            {cumRap.lichChieuPhim?.map((lichChieuPhim) => {
                              return (
                                <Col key={lichChieuPhim.maLichChieu} span={6}>
                                  <Button
                                    onClick={() => {
                                      if (!localStorage.getItem("token")) {
                                        Swal.fire(
                                          "Thông báo",
                                          "Bạn chưa đăng nhập!",
                                          "Error"
                                        );
                                      }
                                      return history.push(
                                        `/payment/${lichChieuPhim.maLichChieu}`
                                      );
                                    }}
                                    className={styles.btn_date}
                                  >
                                    {moment(
                                      lichChieuPhim.ngayChieuGioChieu
                                    ).format("DD.MM.YYYY") +
                                      " ~ " +
                                      moment(
                                        lichChieuPhim.ngayChieuGioChieu
                                      ).format("HH:mm:ss")}
                                  </Button>
                                </Col>
                              );
                            })}
                          </Row>
                        </div>
                      );
                    })}
                  </TabPane>
                );
              })}
            </Tabs>
          )}
          {none && (
            <div className={styles.feedback}>
              <span>Bạn nghĩ gì về phim này?</span>
              <span>
                <Rate tooltips={desc} onChange={setValue} value={value} />
                {value ? (
                  <span className="ant-rate-text">{desc[value - 1]}</span>
                ) : (
                  ""
                )}
              </span>
            </div>
          )}
          {/* </Row> */}
        </div>
      </CustomCard>
    </div>
  );
}

export default Detail;
