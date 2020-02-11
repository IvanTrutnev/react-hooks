import React, { useContext } from "react";
import { NavLink } from 'react-router-dom';
import { CurrentUserContext } from "../context/currentUser";

const FeedToggler = ({tagName}) => {
  const [user] = useContext(CurrentUserContext);
  return (<div className="feed-toggle">
    <ul className="nav nav-pills outline-active">
      {user.isLoggedIn && (<li className="nav-item">
        <NavLink to="/feed" className="nav-link">Your feed</NavLink>
      </li>)}
      <li className="nav-item">
        <NavLink to="/" className="nav-link" exact>Global feed</NavLink>
      </li>
      {tagName && (
        <li className="nav-item">
          <NavLink to={`/tags/${tagName}`} className="nav-link" exact><i className="ion-pound"/>{tagName}</NavLink>
        </li>
      )}
    </ul>
  </div>)
};

export default FeedToggler;