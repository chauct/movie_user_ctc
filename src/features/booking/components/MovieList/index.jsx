import React from "react";
import styles from "./style.module.css";

import MovieItem from "../MovieItem";
// import { Col, Row, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { Spin } from "antd";
import {
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_SAP_CHIEU,
} from "features/booking/action";

function MovieList() {
  const dangChieu = useSelector((state) => state.booking.dangChieu);
  const sapChieu = useSelector((state) => state.booking.sapChieu);

  const dispatch = useDispatch();
  const movieInfo = useSelector((state) => state.booking.movies);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styles["slick-next"]}`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} ${styles["slick-prev "]}`}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      />
    );
  }

  if (!movieInfo)
    return (
      <div className={styles.spin}>
        <Spin size="large" />
      </div>
    );
  const settings = {
    // className: "center variable-width",
    // centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 500,
    rows: 2,
    // slidesPerRow: 2,
    variableWidth: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    centerPadding: "60px",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  let activeClassDC = dangChieu === true ? "active" : "none_active";
  // console.log("activeDC", activeClassDC);

  let activeClassSC = sapChieu === true ? "active" : "none_active";

  // console.log("activeSC", activeClassSC);

  return (
    <div className={styles.movie_list}>
      <div className="container">
        <div className={styles.title_movie}>
          <button
            className={`${styles[activeClassDC]}`}
            onClick={() => {
              const action = { type: SET_PHIM_DANG_CHIEU };
              dispatch(action);
            }}
          >
            phim đang chiếu
          </button>
          <button
            className={`${styles[activeClassSC]}`}
            onClick={() => {
              const action = { type: SET_PHIM_SAP_CHIEU };
              dispatch(action);
            }}
          >
            phim sắp chiếu
          </button>
        </div>
        <Slider {...settings} className={styles.slider}>
          {movieInfo.map((item) => {
            return (
              <div key={item.maPhim} className={styles.item}>
                <MovieItem item={item} />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default MovieList;
