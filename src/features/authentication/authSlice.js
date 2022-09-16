import { produce } from "immer";
import { SIGN_IN_ACTION } from "./action";

const initialState = {
  profile: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN_ACTION: {
      return produce(state, (draft) => {
        draft.profile = action.payload;
        localStorage.setItem("user_login", JSON.stringify(draft.profile));
      });
    }
    default:
      return state;
  }
};

export default reducer;
