import React, { Component } from "react";
import ApiContext from "../ApiContext";
import config from "../config";
import NotefulForm from "../NotefulForm/NotefulForm";
import ValidationError from "../ValidationError/ValidationError";

export default class AddFolder extends Component {
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

  updateName(name) {
    this.setState({ name: { value: name, touched: true } });
  }

  validateName = () => {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "name is required";
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const folder = {
      name: e.target["folder-name"].value,
    };
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(folder),
    })
      .then((res) => {
        if (!res.ok) return res.json().then(e.Promise.Reject(e));
        return res.json();
      })
      .then((folder) => {
        this.context.addFolder(folder);
        this.props.history.push(`/folder/${folder.id}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const nameError = this.validateName();

    return (
      <section className="AddFolder">
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="folder-name-input">Name</label>
            <input
              type="text"
              id="folder-name-input"
              name="folder-name"
              onChange={(e) => this.updateName(e.target.value)}
            />
            {this.state.name.touched && <ValidationError message={nameError} />}
          </div>
          <div className="buttons">
            <button disabled={this.validateName()} type="submit">
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    );
  }
}
