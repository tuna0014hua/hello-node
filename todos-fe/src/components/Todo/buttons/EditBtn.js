import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const EditBtn = (props) => {
  return (
    <>
      <FontAwesomeIcon icon={faPen} className="mr-2" />
      Edit
    </>
  );
};

export default EditBtn;
