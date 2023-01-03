import React from "react";
import styles from "./style.module.css";
import logoDark from "assets/img/Logo-dark.png";
import { useSelector } from "react-redux";

function Loading() {
  const isLoading = useSelector((state) => state.loading.isLoading);

  return (
    <>
      {isLoading ? (
        <div className={styles.wrapper}>
          <img src={logoDark} alt="" />
          <div className={styles.loading_bar} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Loading;
