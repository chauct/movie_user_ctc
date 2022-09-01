// import { formatDate } from "common/utils/date";
import React from "react";
import styles from "./style.module.css";

function MovieItem(props) {
  const { tenPhim, hinhAnh, ngayKhoiChieu } = props.item;
  return (
    <div className={styles.item}>
      <div className={styles.thumbnail}>
        <img src={hinhAnh} alt="" width="100%" />
      </div>
      <div className={styles.info}>
        <h2>{tenPhim}</h2>
        <p>{ngayKhoiChieu}</p>
      </div>
      <div className={styles.btn}>
        <button className={styles.btn_shop}>mua vé</button>
      </div>
    </div>
  );
}

export default MovieItem;
