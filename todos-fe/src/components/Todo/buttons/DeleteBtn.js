import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const DeleteBtn = (props) => {
  return (
    <a href="#" className="card-footer-item">
      <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />
      Delete
    </a>
  );
};

export default DeleteBtn;
