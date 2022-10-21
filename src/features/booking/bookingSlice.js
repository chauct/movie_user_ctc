import produce from "immer";

import {
  DAT_GHE,
  DAT_VE_THANH_CONG,
  SET_CAROUSELS,
  SET_CINEMA_SYSTEM,
  SET_FOOTER,
  SET_MOVIES,
  SET_MOVIES_DETAIL,
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_SAP_CHIEU,
  THONG_TIN_PHONG_VE,
} from "./action";

const initialState = {
  carousel: [],
  movies: [],
  dangChieu: true,
  sapChieu: true,
  moviesDefault: [],
  cinemaSystem: [],
  footer: [],
  moviesDetail: {},
  thongTinPhongVe: {},
  danhSachGheDangDat: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CAROUSELS: {
      const nextState = produce(state, (draft) => {
        draft.carousel = action.payload;
      });
      return nextState;
    }
    case SET_MOVIES: {
      const nextState = produce(state, (draft) => {
        draft.movies = action.payload;
        draft.moviesDefault = draft.movies;
      });
      return nextState;
    }

    //  dots: true,
    // infinite: true,
    // slidesToShow: 4,
    // slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 2000,
    // rtl: true,
    // row: 2,
    case SET_PHIM_DANG_CHIEU: {
      const nextState = produce(state, (draft) => {
        draft.dangChieu = !draft.dangChieu;
        draft.movies = draft.moviesDefault.filter(
          (film) => film.dangChieu === draft.dangChieu
        );
      });
      return nextState;
    }
    case SET_PHIM_SAP_CHIEU: {
      const nextState = produce(state, (draft) => {
        draft.sapChieu = !draft.sapChieu;
        draft.movies = draft.moviesDefault.filter(
          (film) => film.sapChieu === draft.sapChieu
        );
      });
      return nextState;
    }
    case SET_CINEMA_SYSTEM: {
      const nextState = produce(state, (draft) => {
        draft.cinemaSystem = action.payload;
      });
      return nextState;
    }
    case SET_FOOTER: {
      const nextState = produce(state, (draft) => {
        draft.footer = action.payload;
      });
      return nextState;
    }
    case SET_MOVIES_DETAIL: {
      const nextState = produce(state, (draft) => {
        draft.moviesDetail = action.payload;
      });
      return nextState;
    }
    case THONG_TIN_PHONG_VE: {
      const nextState = produce(state, (draft) => {
        draft.thongTinPhongVe = action.payload;
      });
      return nextState;
    }
    case DAT_GHE: {
      const nextState = produce(state, (draft) => {
        const danhSachGheDangDat = draft.danhSachGheDangDat;
        const index = danhSachGheDangDat.findIndex(
          (gheDD) => gheDD.maGhe === action.gheDangDat.maGhe
        );
        if (index !== -1) {
          // Nếu tìm thấy ghế được chọn trong mảng có nghĩa là trước đó đã click vào rồi => xóa đi
          danhSachGheDangDat.splice(index, 1);
        } else {
          danhSachGheDangDat.push(action.gheDangDat);
        }
      });
      return nextState;
    }
    case DAT_VE_THANH_CONG: {
      return { ...state, danhSachGheDangDat: [] };
    }
    default:
      return state;
  }
};
export default reducer;
