import moment from "moment";
import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./style.module.css";

function MovieItem(props) {
  const { tenPhim, hinhAnh, ngayKhoiChieu, maPhim } = props.item;

  const history = useHistory();

  const goToDetail = () => {
    history.push("/detail/" + maPhim);
  };
  return (
    <div className={styles.item} onClick={goToDetail}>
      <div className={styles.thumbnail}>
        <img src={hinhAnh} alt="" />
      </div>
      <div className={styles.info}>
        <h2>{tenPhim}</h2>
        <p>
          {moment(ngayKhoiChieu).format("DD.MM.YYYY") +
            " ~ " +
            moment(ngayKhoiChieu).format("HH:mm:ss")}
        </p>
      </div>
      <div className={styles.btn}>
        <button className={styles.btn_shop}>mua vé</button>
      </div>
    </div>
  );
}

export default MovieItem;
