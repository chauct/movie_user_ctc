import instance from "api/instance";

export const SET_CAROUSELS = "booking/SET_CAROUSELS";
export const SET_MOVIES = "booking/SET_MOVIES";
export const SET_PHIM_DANG_CHIEU = "booking/SET_PHIM_DANG_CHIEU";
export const SET_PHIM_SAP_CHIEU = "booking/SET_PHIM_SAP_CHIEU";
export const SET_CINEMA_SYSTEM = "booking/SET_CINEMA_SYSTEM";
export const SET_FOOTER = "booking/SET_FOOTER";
export const SET_MOVIES_DETAIL = "booking/SET_MOVIES_DETAIL";
// export const SET_MOVIES_DETAIL_SCHEDULE = "booking/SET_MOVIES_DETAIL_SCHEDULE";

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
