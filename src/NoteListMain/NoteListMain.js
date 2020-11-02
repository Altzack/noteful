import React from "react";
import { Link } from "react-router-dom";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import NotefulContext from "../NotefulContext";
import PropTypes from "prop-types";
import "./NoteListMain.css";

class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };

  static contextType = NotefulContext;

  render() {
    let notes = this.context.notes;
    if (this.props.match.params.folder_id !== undefined) {
      notes = this.context.notes.filter(
        (note) => note.folder_id === parseInt(this.props.match.params.folder_id)
      );
    }
    return (
      <section className="NoteListMain">
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <Note
                id={note.id}
                title={note.title}
                modified={note.modified}
                key={note.id}
              />
            </li>
          ))}
        </ul>
        <div className="NoteListMain__button-container">
          <CircleButton
            tag={Link}
            to="/add-note"
            type="button"
            className="NoteListMain__add-note-button"
          >
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    );
  }
}

NoteListMain.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  modified: PropTypes.number,
};

export default NoteListMain;
