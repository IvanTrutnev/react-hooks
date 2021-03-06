import React, { useContext, Fragment } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { CurrentUserContext } from "../context/currentUser";

const Topbar = () => {
  const [currentUserState] = useContext(CurrentUserContext);
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Medium
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" exact>
              Home
            </NavLink>
          </li>
          {currentUserState.isLoggedIn === false && (
            <Fragment>
              <li className="nav-item">
                <NavLink to="/login" className="nav-link">
                  Sign in
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register" className="nav-link">
                  Sign up
                </NavLink>
              </li>
            </Fragment>
          )}
          {currentUserState.isLoggedIn && (
            <Fragment>
              <li className="nav-item">
                <NavLink to="/articles/new" className="nav-link">
                  <i className="ion-compose"/>
                  &nbsp;
                  Create post
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={`/profiles/${currentUserState.currentUser.username}`} className="nav-link">
                  <img className="user-pick" src={currentUserState.currentUser.image} alt=""/>
                  &nbsp;
                  {currentUserState.currentUser.username}
                </NavLink>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  )
};

export default Topbar
