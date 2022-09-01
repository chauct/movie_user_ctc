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

export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/contact" component={Contact} />
        <Route path="/movie_list" component={Contact} />

        {/* <Route path="/theater" component={Theater} /> */}
        <Route path="/news" component={News} />
        {/* <Route path="/apps" component={Apps} /> */}
        <Route path="/detail" component={Detail} />
        <Route path="/booking" component={Booking} />
        <Route path="/payment" component={Payment} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/movies" component={MovieManagement} />
        <Route path="*" component={PageNotFound} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
