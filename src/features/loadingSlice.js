import { DISPLAY_LOADING, HIRE_LOADING } from "./actionLoading";

const initialState = {
  isLoading: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DISPLAY_LOADING: {
      state.isLoading = true;
      return { ...state };
    }
    case HIRE_LOADING: {
      state.isLoading = false;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
export default reducer;
