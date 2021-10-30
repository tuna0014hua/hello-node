const NotAuth = () => {
  return (
    <section className="hero is-medium">
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column has-text-centered">
            <h1 className="title">要登入才能用喔</h1>
            <a href="/" className="button">
              Home
            </a>
            <a href="/login" className="button">
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotAuth;
