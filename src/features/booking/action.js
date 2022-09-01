import instance from "api/instance";

export const SET_CAROUSELS = "booking/SET_CAROUSELS";
export const SET_MOVIES = "booking/SET_MOVIES";
export const SET_PHIM_DANG_CHIEU = "booking/SET_PHIM_DANG_CHIEU";
export const SET_PHIM_SAP_CHIEU = "booking/SET_PHIM_SAP_CHIEU";

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

    console.log(res, "carousel");
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
    console.log(res, "list movie");
  } catch (err) {}
};
