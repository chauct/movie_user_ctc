import { Button, Form, Row, Select } from "antd";
import instance from "api/instance";

import moment from "moment";
import React, { useEffect, useState } from "react";

import { useHistory, useRouteMatch } from "react-router-dom";
import styles from "./style.module.css";
const { Option } = Select;
function SelectTicket() {
  //   const formik = useFormik({
  //     initialValues: {
  //       maPhim: props.match.params.id,
  //       ngayChieuGioChieu: "",
  //       maRap: "",
  //       giaVe: "",
  //     },
  //     onSubmit: async (values) => {
  //       console.log({ values });
  //       try {
  //         const res = await instance.request({
  //           url: "/api/QuanLyDatVe/TaoLichChieu",
  //           method: "POST",
  //           data: values,
  //         });
  //         console.log("result", res.data.content);
  //       } catch (err) {
  //         console.log("errors", err.response?.data);
  //       }
  //     },
  //   });
  const history = useHistory();
  const match = useRouteMatch();

  const scheduleId = match.params.id;
  console.log("chau", scheduleId);
  const [state, setState] = useState({
    list: [],
    htRap: [],
  });

  const fetchMoviesAction = async () => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyPhim/LayDanhSachPhim",
        method: "GET",
        params: {
          maNhom: "GP07",
        },
      });

      setState({
        ...state,
        list: res.data.content,
      });
    } catch (err) {
      console.log("errors", err.response?.data.content);
    }
  };
  useEffect(() => {
    fetchMoviesAction();
  }, []);

  const convertSelectHTR = () => {
    return state.htRap.heThongRapChieu.map((item) => {
      return item.cumRapChieu.map((cr) => {
        return cr.lichChieuPhim.map((lc) => {
          return lc.maLichChieu;
        });
      });
    });
  };
  // console.log(convertSelectHTR);

  const fetchMoviesDetailAction = async (value) => {
    // từ ht rạp call api lấy thông tin rap
    try {
      const res = await instance.request({
        url: "/api/QuanLyRap/LayThongTinLichChieuPhim",
        method: "GET",
        params: {
          MaPhim: value,
        },
      });
      // gán gt vào cụm rạp
      setState({
        ...state,
        htRap: res.data.content,
      });
      console.log(res, "fhhfh");
    } catch (err) {
      console.log("errors", err.response?.data.content);
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        // onSubmitCapture={formik.handleSubmit}
      >
        <Row>
          <Form.Item>
            <Select
              options={state.list?.map((item, index) => ({
                label: item.tenPhim,
                value: item.maPhim,
              }))}
              onChange={fetchMoviesDetailAction}
              placeholder="Chọn tên phim "
            />
          </Form.Item>
          <Form.Item>
            <Select placeholder="Chọn rạp">
              {state.htRap.heThongRapChieu?.map((item, index) => {
                return item.cumRapChieu.map((cr) => {
                  return <Option value={cr.maCumRap}>{cr.tenCumRap}</Option>;
                });
              })}
            </Select>
          </Form.Item>
          <Form.Item>
            <Select placeholder="Chọn ngày giờ chiếu">
              {state.htRap.heThongRapChieu?.map((item, index) => {
                return item.cumRapChieu?.map((cr) => {
                  return cr.lichChieuPhim?.map((lc) => {
                    return (
                      <Option
                        value={
                          moment(lc.ngayChieuGioChieu).format("DD/MM/YYYY ") +
                          "~ " +
                          moment(lc.ngayChieuGioChieu).format("hh:mm:ss")
                        }
                      >
                        {moment(lc.ngayChieuGioChieu).format("DD/MM/YYYY ") +
                          "~ " +
                          moment(lc.ngayChieuGioChieu).format("hh:mm:ss")}
                      </Option>
                    );
                  });
                });
              })}
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            {state.htRap.heThongRapChieu?.map((item) => {
              return item.cumRapChieu.map((cr) => {
                return cr.lichChieuPhim.map((lc) => {
                  return (
                    <Button
                      onClick={() => history.push(`/payment/${lc.maLichChieu}`)}
                      danger
                      htmlType="submit"
                      className={styles.btn_submit}
                    >
                      Mua vé ngay
                    </Button>
                  );
                });
              });
            })}
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
}

export default SelectTicket;
