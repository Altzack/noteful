import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Header from "../Header";
import AddFolder from "../AddFolder/AddFolder";
import AddNote from "../AddNote/AddNote";
import NoteListNav from "../NoteListNav/NoteListNav";
import NotePageNav from "../NotePageNav/NotePageNav";
import NoteListMain from "../NoteListMain/NoteListMain";
import NotePageMain from "../NotePageMain/NotePageMain";
import AppContext from "../AppContext";
import config from "../config";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      folders: [],
    };
  }

  setNotes = (notes) => {
    this.setState({
      notes,
      error: null,
    });
  };

  setFolders = (folders) => {
    this.setState({
      folders,
      error: null,
    });
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`),
    ])
      .then(([notesRes, foldersRes]) => {
        if (!notesRes.ok) return notesRes.json().then((e) => Promise.reject(e));
        if (!foldersRes.ok)
          return foldersRes.json().then((e) => Promise.reject(e));

        return Promise.all([notesRes.json(), foldersRes.json()]);
      })
      .then(([notes, folders]) => {
        this.setState({ notes, folders });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  renderNavRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteListNav} />
        ))}
        <Route path="/note/:noteId" component={NotePageNav} />
        {["/add-folder", "/add-note"].map((path) => (
          <Route path={path} key={path} component={NotePageNav} />
        ))}
      </>
    );
  }

  renderMainRoutes() {
    return (
      <>
        {["/", "/folder/:folderId"].map((path) => (
          <Route exact key={path} path={path} component={NoteListMain} />
        ))}
        <Route path="/note/:noteId" component={NotePageMain} />
        <Route path="/add-note" component={AddNote} />
        <Route path="/add-folder" component={AddFolder} />
      </>
    );
  }

  deleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId),
    });
  };

  handleAddNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note],
    });
  };

  handleAddFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders, folder],
    });
  };

  render() {
    const contextValue = {
      notes: this.state.notes,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote,
      deleteNote: this.deleteNote,
    };
    return (
      <div className="App">
        <AppContext.Provider value={contextValue}>
          <nav className="App__nav">{this.renderNavRoutes()}</nav>
          <main className="App__main">{this.renderMainRoutes()}</main>
          <Header />
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;
