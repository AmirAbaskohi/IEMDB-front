import React from 'react';
import Login from './components/login';
import Movies from './components/movies';
import Signup from './components/signup';
import Watchlist from './components/watchlist';
import { render } from "react-dom";
import { Link } from 'react-router-dom';
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