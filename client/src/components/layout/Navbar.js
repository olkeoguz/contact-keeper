import React, { useContext } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import ContactContext from "../../context/contact/contactContext";
import classes from './Navbar.module.css';

const Navbar = ({ title, icon }) => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const { clearContacts } = useContext(ContactContext);

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <>
      <li>Hello {user && user.name}</li>
      <li>
        <NavLink to="/login" onClick={onLogout}>
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </NavLink>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li>
        <NavLink to="/register">Register </NavLink>
      </li>
      <li>
        <NavLink to="/login">Login </NavLink>
      </li>
      <li>
        <NavLink to="/about">About </NavLink>
      </li>
    </>
  );

  return (
    <div className={[classes.Navbar,classes.bgPrimary].join(' ')}>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
