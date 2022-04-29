import React from 'react';
import Login from './login';
import Movies from './movies';
import Signup from './signup';
import Movie from './movie';
import Actor from './actor';
import Watchlist from './watchlist';
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Movies /> },
    { path: "/movies", element: <Movies /> },
    { path: "/watchlist", element: <Watchlist /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> }
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

render(<AppWrapper />, document.getElementById("root"));