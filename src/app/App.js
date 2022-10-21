import React, { Suspense, lazy, useEffect } from "react";

import PageNotFound from "common/components/404";

import Footer from "common/components/Footer";
import Header from "common/components/Header";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import News from "features/booking/components/News";

import { createBrowserHistory } from "history";
import { useDispatch } from "react-redux";
import { fetchProfileAction } from "features/authentication/action";
import { AuthRoute, PrivateRoute } from "./Guard";
import Loading from "common/components/Loading";

export const history = createBrowserHistory();

const Signin = lazy(() => import("features/authentication/pages/Signin"));
const Signup = lazy(() => import("features/authentication/pages/Signup"));
const Detail = lazy(() => import("features/booking/pages/Detail"));
const Home = lazy(() => import("features/booking/pages/Home"));
const Payment = lazy(() => import("features/booking/pages/Payment"));
const Profile = lazy(() => import("features/authentication/pages/Profile"));
const History = lazy(() => import("features/booking/pages/History"));
const Contact = lazy(() => import("features/booking/components/Contact"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileAction);
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Loading />
      <Suspense fallback={<div>Loadding ....</div>}>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/contact" component={Contact} />
          <Route path="/news" component={News} />
          <Route path="/history" component={History} />
          <Route path="/detail/:id" component={Detail} />
          <Route path="/profile" component={Profile} />

          <PrivateRoute
            path="/payment/:id"
            component={Payment}
            redirectComp="/signin"
          />

          <AuthRoute path="/signin" component={Signin} redirectComp="/" />
          <AuthRoute path="/signup" component={Signup} redirectComp="/" />

          <Route path="*" component={PageNotFound} />
        </Switch>
      </Suspense>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
