import React, { Component } from "react";
import NotefulForm from "../NotefulForm/NotefulForm";
import ApiContext from "../ApiContext";
import config from "../config";
import ValidationError from "../ValidationError/ValidationError";
export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: "",
        touched: false,
      },
    };
  }
  static defaultProps = {
    history: {
      push: () => {},
    },
  };
  static contextType = ApiContext;
  handleSubmit = (e) => {
    const newNote = {
      name: e.target["note-name"].value,
      content: e.target["note-content"].value,
      folderId: e.target["note-folder-id"].value,
      modified: new Date(),
    };
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((note) => {
        this.context.addNote(note);
        this.props.history.push(`/folder/${note.folderId}`);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  validateName = () => {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "name is required";
    } else if (name.length < 2) {
      return "name must be greater than 2 characters";
    }
  };

  updateName(name) {
    this.setState({ name: { value: name, touched: true } });
  }

  render() {
    const { folders = [] } = this.context;
    const nameError = this.validateName();

    return (
      <section className="AddNote">
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="note-name-input">Name</label>
            <input
              type="text"
              id="note-name-input"
              name="note-name"
              onChange={(e) => this.updateName(e.target.value)}
            />
            {this.state.name.touched && <ValidationError message={nameError} />}
          </div>
          <div className="field">
            <label htmlFor="note-content-input">Content</label>
            <textarea id="note-content-input" name="note-content" />
          </div>
          <div className="field">
            <label htmlFor="note-folder-select">Folder</label>
            <select id="note-folder-select" name="note-folder-id" required>
              <option value="">...</option>
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
          <div className="buttons">
            <button disabled={this.validateName()} type="submit">
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    );
  }
}
