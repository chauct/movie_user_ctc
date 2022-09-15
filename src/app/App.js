import React, { Suspense, lazy, useEffect } from "react";

import PageNotFound from "common/components/404";

import Footer from "common/components/Footer";
import Header from "common/components/Header";
import Signin from "features/authentication/pages/Signin";
import Signup from "features/authentication/pages/Signup";
import Booking from "features/booking/pages/Booking";
import Detail from "features/booking/pages/Detail";
import Home from "features/booking/pages/Home";
import Payment from "features/booking/pages/Payment";
import MovieManagement from "features/movies/pages/MovieManagement";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import News from "features/booking/components/News";

import { createBrowserHistory } from "history";
import Contact from "features/booking/components/Contact";
import { useDispatch } from "react-redux";
import { fetchProfileAction } from "features/authentication/action";
import { AuthRoute, PrivateRoute } from "./Guard";

export const history = createBrowserHistory();

// const PaymentComponent = lazy(() =>
//   import("features/booking/pages/Payment/index")
// );

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileAction);
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/contact" component={Contact} />
        <Route path="/news" component={News} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/booking" component={Booking} />
        {/* <Suspense fallback={<h1>Loadding ....</h1>}>
          <PaymentComponent path="/payment/:id" component={Payment} />
        </Suspense> */}
        <PrivateRoute
          path="/payment/:id"
          component={Payment}
          redirectComp="/signin"
        />

        <AuthRoute path="/signin" component={Signin} redirectComp="/" />
        <AuthRoute path="/signup" component={Signup} redirectComp="/" />

        <Route path="/movies" component={MovieManagement} />
        <Route path="*" component={PageNotFound} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
