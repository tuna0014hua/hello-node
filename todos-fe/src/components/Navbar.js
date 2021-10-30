import { NavLink } from "react-router-dom";
import brand from "../images/TODO.png";

const Navbar = () => {
  return (
    <nav className="navbar is-primary is-fixed-top">
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-item">
          <img src={brand} alt="" />
        </NavLink>
        <div className="navbar-burger" data-target="navMenu"></div>
      </div>
      <div id="navMenu" className="navbar-menu">
        <div className="navbar-start">
          <NavLink
            to="/todos"
            className="navbar-item"
            activeClassName="is-active"
          >
            List
          </NavLink>
          <NavLink
            to="/add"
            className="navbar-item"
            activeClassName="is-active"
          >
            Add
          </NavLink>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">Hi, XXX</div>
          <a className="navbar-item">Logout</a>
          <NavLink
            to="/login"
            className="navbar-item"
            activeClassName="is-active"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="navbar-item"
            activeClassName="is-active"
          >
            Register
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
