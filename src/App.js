import { useEffect, useState } from "react";
import "./App.css";
import axiosInstance from "./components/api-handling";
import Board from "./components/board";
import Editor from "./components/editor";
import Login from "./components/login";

function App() {
  const [users, setUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [editor, setEditor] = useState(false);
  const [entries, setEntries] = useState([]);
  const [loadingEntries, setLoadingEntries] = useState(true);
  const [currentEntry, setCurrentEntry] = useState(null);
  const [filteredEntries, setFilteredEntries] = useState(entries);

  const loadEntries = () => {
    axiosInstance
      .get("/entries")
      .then((res) => {
        setLoadingEntries(false);
        setEntries(res.data);
      })
      .catch((err) => console.error(err));
  };

  const makeEntry = (entry) => {
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

  const deleteEntry = (id) => {
    axiosInstance
      .delete("/entries/" + id)
      .then(() => {
        loadEntries();
        setEditor(false);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadEntries();  
      setLoggedIn(true);
    }

    axiosInstance
      .get("/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      {editor === true && (
        <>
        <Editor
          makeEntry={makeEntry}
          setEditor={setEditor}
          entry={currentEntry}
          updateEntry={updateEntry}
          setCurrentEntry={setCurrentEntry}
          filteredEntries={filteredEntries}
          users={users}
          deleteEntry={deleteEntry}
        />
        <div className="blur"></div>
        </>
      )}
      {loggedIn === false && (
        <Login setloggedIn={setLoggedIn} loadEntries={loadEntries} />
      )}
      {loggedIn === true  && (
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
          loadingEntries={loadingEntries}
        />
      )}
    </div>
  );
}

export default App;
