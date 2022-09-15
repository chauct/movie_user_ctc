import instance from "api/instance";
import Swal from "sweetalert2";

export const SET_CAROUSELS = "booking/SET_CAROUSELS";
export const SET_MOVIES = "booking/SET_MOVIES";
export const SET_PHIM_DANG_CHIEU = "booking/SET_PHIM_DANG_CHIEU";
export const SET_PHIM_SAP_CHIEU = "booking/SET_PHIM_SAP_CHIEU";
export const SET_CINEMA_SYSTEM = "booking/SET_CINEMA_SYSTEM";
export const SET_FOOTER = "booking/SET_FOOTER";
export const SET_MOVIES_DETAIL = "booking/SET_MOVIES_DETAIL";
export const THONG_TIN_PHONG_VE = "booking/THONG_TIN_PHONG_VE";
export const DAT_GHE = "booking/DAT_GHE";
export const DAT_VE = "booking/DAT_VE";
export const DAT_VE_THANH_CONG = "booking/DAT_VE_THANH_CONG";

export const fetchCarouselAction = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyPhim/LayDanhSachBanner",
      method: "GET",
    });
    dispatch({
      type: SET_CAROUSELS,
      payload: res.data.content,
    });

    // console.log(res, "carousel");
  } catch (error) {}
};

export const fetchMoviesAction = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyPhim/LayDanhSachPhim",
      method: "GET",
      params: {
        maNhom: "GP07",
      },
    });
    dispatch({
      type: SET_MOVIES,
      payload: res.data.content,
    });
    // console.log(res, "list movie");
  } catch (err) {}
};

export const fetchCinemaSystemAction = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyRap/LayThongTinLichChieuHeThongRap",
      method: "GET",
      params: {
        maNhom: "GP10",
      },
    });
    dispatch({
      type: SET_CINEMA_SYSTEM,
      payload: res.data.content,
    });
    // console.log(res, "action list rạp chiếu");
  } catch (err) {}
};

export const fetchFooterAction = async (dispatch) => {
  try {
    const res = await instance.request({
      url: "/api/QuanLyRap/LayThongTinHeThongRap",
      method: "GET",
    });
    dispatch({
      type: SET_FOOTER,
      payload: res.data.content,
    });

    // console.log(res, "footer");
  } catch (error) {}
};

export const fetchMoviesDetailAction = (id) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyRap/LayThongTinLichChieuPhim",
        method: "GET",
        params: {
          MaPhim: id,
        },
      });

      dispatch({
        type: SET_MOVIES_DETAIL,
        payload: res.data.content,
      });
    } catch (error) {
      console.log("errors", error.response?.data);
    }
  };
};

export const fetchDanhSachPhongVeAction = (id) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyDatVe/LayDanhSachPhongVe",
        method: "GET",
        params: {
          MaLichChieu: id,
        },
      });

      dispatch({
        type: THONG_TIN_PHONG_VE,
        payload: res.data.content,
      });
    } catch (error) {
      console.log("errors", error.response?.data);
    }
  };
};

export const fetchDatVeAction = (thongTinVe) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyDatVe/DatVe",
        method: "POST",
        data: thongTinVe,
      });

      dispatch(fetchDanhSachPhongVeAction(thongTinVe.maLichChieu));

      dispatch({
        type: DAT_VE_THANH_CONG,
      });

      Swal.fire("Thông báo", "Đặt vé thành công!", "Success");
      console.log(res);
    } catch (error) {
      console.log("errors", error.response?.data);
      Swal.fire("Thông báo", "Đặt vé thất bại!", "Error");
    }
  };
};
