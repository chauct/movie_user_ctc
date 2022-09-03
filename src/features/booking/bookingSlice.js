import produce from "immer";
import {
  SET_CAROUSELS,
  SET_CINEMA_SYSTEM,
  SET_FOOTER,
  SET_MOVIES,
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_SAP_CHIEU,
} from "./action";

const initialState = {
  carousel: [],
  movies: [],
  dangChieu: true,
  sapChieu: true,
  moviesDefault: [],
  cinemaSystem: [],
  footer: [],
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
        draft.moviesDefault = action.payload;
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
    default:
      return state;
  }
};
export default reducer;
