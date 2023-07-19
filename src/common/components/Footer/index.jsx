import React, { useEffect } from 'react';
import styles from './style.module.css';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFooterAction } from 'features/booking/action';
import ScrollToTop from 'react-scroll-to-top';

function Footer() {
  const footerInfo = useSelector((state) => state.booking.footer);

  const dispatch = useDispatch();

  const fetchFooter = async () => {
    dispatch(fetchFooterAction);
  };

  useEffect(() => {
    fetchFooter();
  }, []);

  return (
    <>
      <ScrollToTop
        smooth
        top={20}
        className={styles.backToTop}
      />

      <div className={styles.partner}>
        <div className='container'>
          <div className={styles.flex}>
            {footerInfo.map((item) => {
              return (
                <div
                  className={styles.icon}
                  key={item.maHeThongRap}>
                  <img
                    width={90}
                    src={item.logo}
                    alt=''
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className='container'>
          <Row gutter={[24, 24]}>
            <Col
              className='gutter-row'
              sx={24}
              sm={12}
              md={8}
              lg={6}>
              <div className={styles.item}>
                <p>EDGE’S PRODUCTION</p>
                <ul>
                  <li className={styles.nav_item}>
                    <a
                      className={styles.nav_link}
                      href>
                      About Edge
                    </a>
                  </li>
                  <li className={styles.nav_item}>
                    <a
                      className={styles.nav_link}
                      href>
                      Latest Videos
                    </a>
                  </li>
                  <li className={styles.nav_item}>
                    <a
                      className={styles.nav_link}
                      href>
                      Studio Tour
                    </a>
                  </li>
                  <li className={styles.nav_item}>
                    <a
                      className={styles.nav_link}
                      href>
                      Press &amp; News
                    </a>
                  </li>
                  <li className={styles.nav_item}>
                    <a
                      className={styles.nav_link}
                      href>
                      Help (FAQ)
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col
              className='gutter-row'
              sx={24}
              sm={12}
              md={8}
              lg={6}>
              <div className={styles.item}>
                <p>ABOUT</p>
                <ul>
                  <li className={styles.nav_link}>
                    Chau Cao - FE72
                    <br />
                    Project: Booking Movie
                  </li>
                  <li className={styles.nav_icon}>
                    <a href='https://www.youtube.com/'>
                      <i className='bx bxl-youtube' />
                    </a>
                    <a href='https://www.instagram.com/'>
                      <i className='bx bxl-instagram' />
                    </a>
                    <a href='https://twitter.com/'>
                      <i className='bx bxl-twitter' />
                    </a>
                    <a href='https://www.facebook.com/hieutinhtran22'>
                      <i className='bx bxl-facebook' />
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col
              className='gutter-row'
              sx={24}
              sm={12}
              md={8}
              lg={6}>
              <div className={styles.item}>
                <p>NEWS &amp; FILM UPDATES</p>
                <ul>
                  <li className={styles.nav_item}>
                    Lorem Ipsner gravida nibh velml auctsi aliquet. Aene sollic conseut.
                  </li>
                  <li>
                    <div className={styles.input}>
                      <input
                        type='text'
                        placeholder='Email'
                      />
                      <button className={styles.btn_send}>
                        <i className='bx bxl-telegram' />
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
            <Col
              className='gutter-row'
              sx={24}
              sm={12}
              md={8}
              lg={6}>
              <div className={styles.item}>
                <p>FOLLOW ON INSTAGRAM</p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div class={styles.coppy_right}>
        <p>© 2022 Qode Interactive, All Rights Reserved</p>
      </div>
    </>
  );
}

export default Footer;
