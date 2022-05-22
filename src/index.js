import React from 'react';
import Login from './components/login';
import Movies from './components/movies';
import Signup from './components/signup';
import Movie from './components/movie';
import Watchlist from './components/watchlist';
import Actor from './components/actor';
import { render } from "react-dom";
import { Link } from 'react-router-dom';
import { SSO } from './components/sso';
import './styles/main.css'
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";

const NotFound = () => (
  <div className='color-white'>
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </div>
);

const App = () => {
  let routes = useRoutes([
    { path: "*", element: <NotFound /> },
    { path: "/", element: <Login /> },
    { path: "/movies", element: <Movies /> },
    { path: "/movies/:id", element: <Movie /> },
    { path: "/actors/:id", element: <Actor /> },
    { path: "/watchlist", element: <Watchlist /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/sso", element: <SSO /> }
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