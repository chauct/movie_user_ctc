import React, { useEffect } from "react";
import { Carousel } from "antd";
import styles from "./style.module.css";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarouselAction } from "features/booking/action";

function Slider() {
  const carouselInfo = useSelector((state) => state.booking.carousel);

  const dispatch = useDispatch();

  const fetchCarousel = async () => {
    dispatch(fetchCarouselAction);
  };

  useEffect(() => {
    fetchCarousel();
  }, []);

  return (
    <Carousel autoplay className={styles.carousel}>
      {/* {carouselInfo.map((item) => {
        return (
          <div className={styles.carousel} key={item.maBanner}>
            <img src={item.hinhAnh} alt="" />
          </div>
        );
      })} */}
      <div className={styles.item}>
        <img
          src="https://demo.w3layouts.com/demos_new/template_demo/02-07-2020/proshowz-liberty-demo_Free/1734035036/web/assets/images/banner3.jpg"
          alt=""
        />
      </div>
      <div className={styles.item}>
        <img
          src="https://cinerama.qodeinteractive.com/wp-content/uploads/2018/05/home-9-port-img-6.jpg"
          alt=""
        />
      </div>
      <div className={styles.item}>
        <img
          src="https://cinerama.qodeinteractive.com/wp-content/uploads/2018/05/home-9-port-img-7.jpg"
          alt=""
        />
      </div>

      <div className={styles.item}>
        <img
          src="https://shaders-slider.uiinitiative.com/images/05.jpg"
          alt=""
        />
      </div>
      <div className={styles.item}>
        <img
          src="https://cinerama.qodeinteractive.com/wp-content/uploads/2018/05/home-9-port-img-3.jpg"
          alt=""
        />
      </div>
    </Carousel>
  );
}

export default Slider;
