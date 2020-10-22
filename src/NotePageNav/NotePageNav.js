import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
import { findNote, findFolder } from "../Notes-Helper";
import AppContext from "../AppContext";
import PropTypes from "prop-types";
import "./NotePageNav.css";

class NotePageNav extends React.Component {
  static defaultProps = {
    history: {
      goBack: () => {},
    },
    match: {
      params: {},
    },
  };

  static contextType = AppContext;

  render() {
    const { notes, folders } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || {};
    const folder = findFolder(folders, note.folderId);
    return (
      <div className="NotePageNav">
        <CircleButton
          tag="button"
          role="link"
          onClick={() => this.props.history.goBack()}
          className="NotePageNav__back-button"
        >
          <FontAwesomeIcon icon="chevron-left" />
          <br />
          Back
        </CircleButton>
        {folder && <h3 className="NotePageNav__folder-name">{folder.title}</h3>}
      </div>
    );
  }
}

NotePageNav.propTypes = {
  history: PropTypes.object,
};

export default NotePageNav;
