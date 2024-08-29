import { useState, useEffect } from "react";
import axiosInstance from "./components/api-handling";
import Login from "./components/login";
import Board from "./components/board";
import Editor from "./components/editor";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [editor, setEditor] = useState(false);
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [filteredEntries, setFilteredEntries] = useState(entries);

  const loadEntries = () => {
    axiosInstance
      .get("/entries")
      .then((res) => setEntries(res.data))
      .catch((err) => console.error(err));
  };

  const makeEntry = (entry) => {
    console.log(entry);

    axiosInstance
      .post("/entries", entry)
      .then(() => {
        loadEntries();
        setEditor(false);
      })
      .catch((err) => console.error(err));
  };

  const updateEntry = (id, entry) => {
    axiosInstance
      .put("/entries/" + id, entry)
      .then(() => {
        loadEntries();
        setEditor(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      loadEntries();
    }

    axiosInstance
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      {editor === true && (
        <Editor
          makeEntry={makeEntry}
          setEditor={setEditor}
          entry={currentEntry}
          updateEntry={updateEntry}
          setCurrentEntry={setCurrentEntry}
          filteredEntries={filteredEntries}
          users={users}
        />
      )}
      {loggedIn === false && (
        <Login setloggedIn={setLoggedIn} loadEntries={loadEntries} />
      )}
      {loggedIn === true && editor === false && (
        <Board
          entries={entries}
          filteredEntries={filteredEntries}
          setFilteredEntries={setFilteredEntries}
          users={users}
          makeEntry={makeEntry}
          loadEntries={loadEntries}
          setLoggedIn={setLoggedIn}
          setEditor={setEditor}
          setCurrentEntry={setCurrentEntry}
        />
      )}
    </div>
  );
}

export default App;
