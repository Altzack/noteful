import React, { Fragment } from "react";
import Note from "../Note/Note";
import NotefulContext from "../NotefulContext";

import "./NotePageMain.css";
import PropTypes from "prop-types";

class NotePageMain extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };

  static contextType = NotefulContext;

  handleDeleteNote = () => {
    this.props.history.push(`/`);
  };

  render() {
    let notes = this.context.notes.filter(
      (note) => note.id === parseInt(this.props.match.params.note_id)
    );

    return notes.map((note) => {
      return (
        <section className="NotePageMain" key={note.id}>
          <Note
            id={note.id}
            title={note.title}
            modified={note.modified}
            onDeleteNote={this.handleDeleteNote}
            key={note.id}
          />
          <div className="NotePageMain__content">
            <Fragment>
              {note.content.split(/\n \r|\n/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </Fragment>
          </div>
        </section>
      );
    });
  }
}

NotePageMain.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  modified: PropTypes.number,
  onDeleteNote: PropTypes.func,
};

export default NotePageMain;
