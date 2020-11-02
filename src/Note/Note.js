import React from "react";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";
import config from "../config";
// import { format } from 'date-fns'
import PropTypes from "prop-types";
import "./Notes.css";

class Note extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {},
  };

  static contextType = NotefulContext;

  handleClickDelete = (e) => {
    e.preventDefault();
    const note_id = this.props.id;

    fetch(`${config.API_ENDPOINT}/api/notes/${note_id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then(() => {
        this.context.deleteNote(note_id);
        // allow parent to perform extra behaviour
        this.props.onDeleteNote(note_id);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  render() {
    const { title, id, modified } = this.props;
    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/note/${id}`}>{title}</Link>
        </h2>
        <button
          className="Note__delete"
          type="button"
          onClick={this.handleClickDelete}
        >
          {" "}
          remove
        </button>
        <div className="Note__dates">
          <div className="Note__dates-modified">
            Modified <span className="Date">{modified}</span>
          </div>
        </div>
      </div>
    );
  }
}

Note.propTypes = {
  onDeleteNote: PropTypes.func,
  title: PropTypes.string,
};

export default Note;
