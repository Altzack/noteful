import React from "react";
import Note from "../Note/Note";
import AppContext from "../AppContext";
import { findNote } from "../Notes-Helper";
import "./NotePageMain.css";
import PropTypes from "prop-types";

class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };

  static contextType = AppContext;

  handleDeleteNote = (noteId) => {
    this.props.history.push(`/`);
  };

  render() {
    const { notes = [] } = this.context;
    const { name, id, modified } = this.props;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || { content: "" };
    return (
      <section className="NotePageMain">
        <Note
          id={id}
          name={name}
          modified={modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className="NotePageMain__content">
          {note.content.split(/\n \r|\n/).map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </section>
    );
  }
}

NotePageMain.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  modified: PropTypes.number,
  onDeleteNote: PropTypes.func,
};

export default NotePageMain;
