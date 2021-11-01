import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ShowBtn = (props) => {
  return (
    <>
      {/* 加上Link 綁定 todoList單一點擊的項目ID */}
      <Link to={`todo/${props.itemId}`} className="card-footer-item">
        <FontAwesomeIcon icon={faEye} className="mr-2" />
        Show
      </Link>
    </>
  );
};

export default ShowBtn;
