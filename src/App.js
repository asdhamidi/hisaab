import { useState, useEffect } from "react";
import axiosInstance from "./components/api-handling";
import Login from "./components/login";
import Board from "./components/board";
import Editor from "./components/editor";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [editor, setEditor] = useState(false);
  const [entries, setEntries] = useState([]);

  const loadEntries = () => {
    axiosInstance
      .get("/entries")
      .then((res) => setEntries(res.data))
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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      loadEntries();
    }
  }, []);

  return (
    <div className="App">
      {editor === true && (
        <Editor makeEntry={makeEntry} setEditor={setEditor} />
      )}
      {loggedIn === false && (
        <Login setloggedIn={setLoggedIn} loadEntries={loadEntries} />
      )}
      {loggedIn === true && editor === false && (
        <Board
          entries={entries}
          makeEntry={makeEntry}
          loadEntries={loadEntries}
          setLoggedIn={setLoggedIn}
          setEditor={setEditor}
        />
      )}
    </div>
  );
}

export default App;
