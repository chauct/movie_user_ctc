import instance from "api/instance";
import { history } from "app/App";

export const SIGN_IN_ACTION = "auth/SIGN_IN_ACTION";

export const fetchSigninAction = (user) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyNguoiDung/DangNhap",
        method: "POST",
        data: user,
      });
      const profile = { ...res.data.content };
      delete profile.accessToken;

      localStorage.setItem("token", res.data.content.accessToken);

      dispatch({
        type: SIGN_IN_ACTION,
        payload: profile,
      });

      history.goBack();

      console.log(res);
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
};

export const fetchProfileAction = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyNguoiDung/ThongTinTaiKhoan",
      method: "POST",
    });
    dispatch({
      type: SIGN_IN_ACTION,
      payload: res.data.content,
    });
  } catch (error) {
    console.log(error.response);
  }
};
