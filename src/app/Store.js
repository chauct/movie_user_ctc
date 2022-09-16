import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import bookingReducer from "features/booking/bookingSlice";
import authReducer from "features/authentication/authSlice";
import loadingReducer from "features/loadingSlice";
const rootReducer = combineReducers({
  booking: bookingReducer,
  auth: authReducer,
  loading: loadingReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
