import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Note from "../Note/Note";
import CircleButton from "../CircleButton/CircleButton";
import AppContext from "../AppContext";
import { getNotesForFolder } from "../Notes-Helper";
import PropTypes from "prop-types";
import "./NoteListMain.css";

class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };

  static contextType = AppContext;

  render() {
    const { folderid } = this.props.match.params;
    const { notes = [] } = this.context;
    const notesForFolder = getNotesForFolder(notes, folderid);
    return (
      <section className="NoteListMain">
        <ul>
          {notesForFolder.map((note) => (
            <li key={note.id}>
              <Note id={note.id} name={note.name} modified={note.modified} />
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
            <FontAwesomeIcon icon="plus" />
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
