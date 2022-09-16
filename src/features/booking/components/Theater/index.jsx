import React, { useState } from "react";
import styles from "./style.module.css";
import { Button, Col, Radio, Row, Space, Tabs } from "antd";
import { useSelector } from "react-redux";
import moment from "moment";

const { TabPane } = Tabs;
function Theater() {
  const cinemaSystemInfo = useSelector((state) => state.booking.cinemaSystem);

  // console.log("hệ thống rạp chiếu", cinemaSystemInfo);

  const [tabPosition, setTabPosition] = useState("left");

  // const changeTabPosition = (e) => {
  //   setTabPosition(e.target.value);
  // };

  const renderCinemaSystem = () => {
    return cinemaSystemInfo?.map((item) => {
      return (
        <TabPane
          key={item.maHeThongRap}
          tab={<img width={50} src={item.logo} alt="" />}
        >
          <Tabs tabPosition={tabPosition} className={styles.tab_cumRap}>
            {item.lstCumRap?.map((cumRap) => {
              return (
                <TabPane
                  className={styles.tabPane}
                  tab={
                    <div className={styles.cumRap}>
                      <img width={55} src={cumRap.hinhAnh} alt="" />
                      <div className={styles.info_cumRap}>
                        <p>{cumRap.tenCumRap}</p>
                        <span>{cumRap.diaChi.substr(0, 35) + "..."}</span>
                      </div>
                    </div>
                  }
                  key={cumRap.maCumRap}
                >
                  {cumRap.danhSachPhim?.map((movie) => {
                    return (
                      <div className={styles.movie}>
                        <img
                          className={styles.img}
                          src={movie.hinhAnh}
                          alt={movie.tenPhim}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://play.google.com/store/apps/details?id=com.google.android.apps.photos&hl=vi&gl=BR";
                          }}
                        />
                        <div className={styles.movie_info}>
                          <p>{movie.tenPhim}</p>
                          <Row gutter={[0, 8]}>
                            {movie.lstLichChieuTheoPhim
                              ?.slice(0, 8)
                              .map((lichChieu) => {
                                return (
                                  <Col
                                    key={lichChieu.maLichChieu}
                                    sx={24}
                                    sm={12}
                                    md={8}
                                    lg={6}
                                  >
                                    <Button className={styles.btn}>
                                      {moment(
                                        lichChieu.ngayChieuGioChieu
                                      ).format("hh:mm A")}
                                    </Button>
                                  </Col>
                                );
                              })}
                          </Row>
                        </div>
                      </div>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };
  return (
    <div className="container">
      <Tabs tabPosition={tabPosition} className={styles.tabs}>
        {renderCinemaSystem()}
      </Tabs>
    </div>
  );
}

export default Theater;
