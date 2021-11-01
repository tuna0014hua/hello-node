import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditBtn from "./buttons/EditBtn";
import ShowBtn from "./buttons/ShowBtn";
import DeleteBtn from "./buttons/DeleteBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import { STATUS_WORD, STATUS_COLOR } from "../../configs/status";
import { API_URL } from "../../configs/config";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  // useEffect <= 要載入頁面時就去執行某些行為
  useEffect(async () => {
    // 非同步工作
    let res = await axios.get(`${API_URL}/todos`);
    setTodos(res.data);
  }, []);

  return (
    <div className="column is-three-fifths">
      <nav
        className="pagination is-success"
        role="navigation"
        aria-label="pagination"
      >
        <ul className="pagination-list"></ul>
      </nav>
      <div className="level">
        <div className="level-item">
          <div className="buttons">
            <button className="button is-info">進行中</button>
            <button className="button is-success">已完成</button>
            <button className="button is-danger">已暫停</button>
          </div>
        </div>
      </div>
      {/* TODO: 列表 */}
      {todos.map((item) => (
        <section
          // 根據不同的status顯示不同的顏色
          className={`message ${STATUS_COLOR[item.status]}`}
          key={item.id}
        >
          <header className="message-header">
            <p>
              {/* 根據不同的status顯示不同文字 */}
              {STATUS_WORD[item.status]} {item.title}
            </p>
          </header>
          <div className="message-body">
            {item.content}
            <div>到期日期: {item.deadline}</div>
          </div>
          <footer className="card-footer">
            {/* 點擊檢視BTN會連動到 showBtn元件所綁定的項目Id連結去 */}
            <ShowBtn itemId={item.id} />
            <a href="#/" className="card-footer-item">
              <FontAwesomeIcon icon={faCheck} className="mr-2" />
              Done
            </a>
            <EditBtn />
            <DeleteBtn />
          </footer>
        </section>
      ))}
    </div>
  );
};

export default TodoList;
