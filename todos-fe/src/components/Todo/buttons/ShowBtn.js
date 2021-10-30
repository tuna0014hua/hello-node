import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const ShowBtn = (props) => {
  return (
    <>
      <FontAwesomeIcon icon={faEye} className="mr-2" />
      Show
    </>
  );
};

export default ShowBtn;
