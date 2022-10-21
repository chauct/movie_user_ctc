import Contact from "features/booking/components/Contact";
import News from "features/booking/components/News";
import Theater from "features/booking/components/Theater";
import React, { useEffect } from "react";
import MovieList from "features/booking/components/MovieList";
import Slider from "features/booking/components/Slider";
import { useDispatch } from "react-redux";
import {
  fetchCinemaSystemAction,
  fetchMoviesAction,
} from "features/booking/action";
import axios from "axios";

function Home() {
  const dispatch = useDispatch();

  const fetchMovies = async () => {
    dispatch(fetchMoviesAction);
  };

  const fetchCinemaSystem = async () => {
    dispatch(fetchCinemaSystemAction);
  };

  useEffect(() => {
    fetchMovies();
    fetchCinemaSystem();
  }, []);

  return (
    <div>
      <Slider />
      <MovieList />
      <Theater />
      {/* <Contact />
      <News /> */}
    </div>
  );
}

export default Home;
