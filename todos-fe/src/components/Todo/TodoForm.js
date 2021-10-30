import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const TodoForm = () => {
  return (
    <div className="column is-three-fifths">
      <form className="box">
        <div className="field">
          <label className="label">標題</label>
          <div className="control">
            <input name="title" className="input" type="text" />
          </div>
        </div>
        <div className="field">
          <label className="label">內容</label>
          <div className="control">
            <textarea name="content" className="textarea">
              TODO: 內容
            </textarea>
          </div>
        </div>
        <div className="file is-primary is-boxed has-name mb-3">
          <label className="file-label">
            <input name="photo" className="file-input" type="file" />
            <span className="file-cta">
              <FontAwesomeIcon icon={faUpload} />
              <span className="file-label">選擇檔案</span>
            </span>
            <span className="file-name">TODO: 檔名</span>
          </label>
          <figure className="image is-128x128 ml-5">
            <img src="#" />
          </figure>
        </div>
        <div className="field">
          <label className="label">到期時間</label>
          <div className="control">
            <input name="deadline" className="input" type="date" />
          </div>
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
          <div className="control">
            <button className="button is-link is-light">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
