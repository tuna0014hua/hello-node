import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditBtn from "./buttons/EditBtn";
import DeleteBtn from "./buttons/DeleteBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { STATUS_WORD, STATUS_COLOR } from "../../configs/status";
import loading from "../../images/loading.gif";
import { API_URL } from "../../configs/config";

const TodoList = () => {
  const { todoId } = useParams();
  const [item, setItem] = useState(null);

  // useEffect <= 要載入頁面時就去執行某些行為
  useEffect(async () => {
    // 非同步工作
    let res = await axios.get(`${API_URL}/todos/${todoId}`);
    setItem(res.data);
  }, []);

  if (item === null) {
    return (
      <>
        載入中
        <img src={loading} alt="Loading data" />
      </>
    );
  }

  return (
    <>
      <div className="column is-three-fifths">
        <article className={`panel ${STATUS_COLOR[item.status]}`}>
          <p className="panel-heading">
            {STATUS_WORD[item.status]} {item.title}
          </p>
          <div className="card-image">
            <figure className="image is-4by3">
              <img src="#" alt="Placeholder image" />
            </figure>
          </div>
          <div className="panel-block">{item.content}</div>
          <ul>
            <li className="panel-block">到期日: {item.deadline}</li>
            <li className="panel-block">ＸＸＸ 於 YYYY-MM-DD 建立</li>
            <li className="panel-block">ＯＯＯ 於 YYYY-MM-DD 更新</li>
          </ul>
          <footer className="card-footer">
            <a href="#/" className="card-footer-item">
              <FontAwesomeIcon icon={faCheck} className="mr-2" />
              Done
            </a>
            <EditBtn />
            <DeleteBtn />
          </footer>
        </article>
      </div>
      <div className="column is-two-fifths">
        <article className="panel is-link">
          <p className="panel-heading">共享</p>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input className="input" type="email" placeholder="輸入帳號" />
            </div>
            <div className="control">
              <a className="button is-info" href="/">
                新增
              </a>
            </div>
          </div>
        </article>
      </div>
    </>
  );
};

export default TodoList;
