import React from "react";

const AppContext = React.createContext({
  folders: [],
  notes: [],
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
});

export default AppContext;
