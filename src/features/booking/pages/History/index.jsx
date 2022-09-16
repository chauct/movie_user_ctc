import React, { useEffect } from "react";
import { Avatar, Col, List, Row, Table } from "antd";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileAction } from "features/authentication/action";
import moment from "moment";

function History() {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.auth.profile);
  console.log(profile);

  const fetchProfile = async () => {
    dispatch(fetchProfileAction);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // const columns = [
  //   {
  //     title: "Id",
  //     key: "index",
  //     render: (text, record, index) => index,
  //   },
  //   {
  //     title: "Tên phim",
  //     dataIndex: "tenPhim",
  //     return: (item) => {
  //       <>{item.tenPhim}</>;
  //     },
  //   },
  //   {
  //     title: "Thời gian",
  //     dataIndex: "ngayDat",
  //     return: (item) => {
  //       <>{item.ngayDat}</>;
  //     },
  //   },
  //   {
  //     title: "Số ghế",
  //     dataIndex: "tenGhe",
  //     return: (item) => {
  //       <></>;
  //     },
  //   },
  // ];

  // const dataSource = [
  //   {
  //     name: "Mike",
  //     age: 32,
  //     address: "10 Downing Street",
  //   },
  //   {
  //     name: "John",
  //     age: 42,
  //     address: "10 Downing Street",
  //   },
  // ];

  const columns = [
    {
      title: "Mã vé",
      dataIndex: "maVe",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
    },
    {
      title: "Thời gian",
      dataIndex: "ngayDat",
    },
    {
      title: "Số ghế",
      dataIndex: "tenGhe",
    },
  ];
  const data = profile;
  return (
    <div className={styles.history}>
      <div className="container">
        {/* <Row>
          {profile.thongTinDatVe?.map((item, index) => {
            console.log(item.danhSachGhe?.tenGhe, "chau");
            return (
              <Col
                style={{ border: "1px solid red" }}
                key={index}
                className="gutter-row"
                span={12}
              >
                <p>{item.tenPhim}</p>
                <p>{item.ngayDat}</p>
                <p>
                  {item.danhSachGhe?.map((g) => {
                    return <>Số ghê: {g.tenGhe}</>;
                  })}
                </p>
              </Col>
            );
          })}
        </Row> */}
        <h2 className={styles.title}>Lịch sử đặt vé </h2>
        <Table dataSource={data.thongTinDatVe} columns={columns} />;
      </div>
    </div>
  );
}

export default History;
