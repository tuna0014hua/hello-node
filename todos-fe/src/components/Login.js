import { useState } from "react";
import { API_URL } from "../configs/config";
import axios from "axios";

const Login = () => {
  const [member, setMember] = useState({
    email: "tuna@gmail.com",
    password: "testtext",
  });

  function handleChange(e) {
    let newMember = { ...member };
    newMember[e.target.name] = e.target.value;
    setMember(newMember);
    // setMember({ ...member, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let res = await axios.post(`${API_URL}/auth/login`, member);
    } catch (e) {
      console.log("handleSubmit", e);
    }
  }

  return (
    <div className="column is-three-fifths">
      <form className="box" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">帳號</label>
          <div className="control">
            <input
              name="email"
              className="input"
              type="email"
              value={member.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">密碼</label>
          <div className="control">
            <input
              name="password"
              className="input"
              type="password"
              value={member.password}
              onChange={handleChange}
            />
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
