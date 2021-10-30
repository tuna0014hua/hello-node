const Login = () => {
  return (
    <div className="column is-three-fifths">
      <form className="box">
        <div className="field">
          <label className="label">帳號</label>
          <div className="control">
            <input name="email" className="input" type="email" />
          </div>
        </div>
        <div className="field">
          <label className="label">密碼</label>
          <div className="control">
            <input name="password" className="input" type="password" />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">登入</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
