import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <section className="hero is-medium">
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column has-text-centered">
            <h1 className="title">404 找不到啦</h1>
            <p className="subtitle">請找系統管理員</p>
            <Link to="/" className="button">
              Home
            </Link>
            <Link to="/register" className="button">
              Register
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
