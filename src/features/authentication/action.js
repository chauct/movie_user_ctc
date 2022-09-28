import instance from "api/instance";
import { history } from "app/App";
import Swal from "sweetalert2";

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
      Swal.fire({
        title: "Đăng nhập thành công!",
        icon: "success",
        confirmButtonColor: "#1c7403",
      }).then((res) => {
        if (res.isConfirmed) {
          history.goBack();
        }
      });
    } catch (error) {
      Swal.fire({
        title: error.response.data.content,
        icon: "error",
        confirmButtonColor: "#d00000",
      });
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
