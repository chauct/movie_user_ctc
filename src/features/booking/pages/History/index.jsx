import React, { useEffect } from "react";
import { Table } from "antd";
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

  const columns = [
    {
      title: "Mã vé",
      dataIndex: "maVe",
      render: (text) => {
        return <span>{text}</span>;
      },
      sorter: (a, b) => a.maVe - b.maVe,
      sortDirections: ["descend"],
      // sortOrder: "descend",
      width: "10%",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      render: (text, movie, index) => {
        return (
          <>
            <img
              src={text}
              width={100}
              height={100}
              style={{ objectFit: "cover" }}
              alt={movie.tenPhim}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://picsum.photos/id/${index}/100/100`;
              }}
            />
          </>
        );
      },
      width: "10%",
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      render: (text) => {
        return <span>{text}</span>;
      },
      sorter: (a, b) => a.tenPhim - b.tenPhim,
      sortDirections: ["descend"],
      width: "25%",
    },
    {
      title: "Ngày đặt",
      dataIndex: "ngayDat",
      render: (text) => {
        return (
          <span>
            {moment(text).format("DD/MM/YYYY ") +
              "~ " +
              moment(text).format("hh:mm:ss ")}
          </span>
        );
      },
      width: "20%",
    },

    {
      title: "Số ghế",
      dataIndex: "tenGhe",
      render: (text, item) => {
        return (
          <>
            {item.danhSachGhe?.map((g) => {
              return <span className={styles.tenGhe}>{g.tenGhe} </span>;
            })}
          </>
        );
      },
      width: "20%",
    },
  ];
  const data = profile;
  return (
    <div className={styles.history}>
      <div className="container">
        <h2 className={styles.title}>Lịch sử đặt vé </h2>
        <Table dataSource={data.thongTinDatVe} columns={columns} />;
      </div>
    </div>
  );
}

export default History;
