import { useState, useEffect } from "react";
import axiosInstance from "./components/api-handling";
import Login from "./components/login";
import Board from "./components/board";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [entries, setEntries] = useState([]);
  const loadEntries = () => {
    axiosInstance
      .get("/entries")
      .then((res) => setEntries(res.data))
      .catch((err) => console.error(err));
  };

  const makeEntry = (entry) => {
    axiosInstance.post("/entries", entry).catch((err) => console.error(err));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      loadEntries();
    }

    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    if (mq.matches) {
      document.body.classList.toggle("dark");
    }
  }, []);

  return (
    <div className="App">
      {loggedIn === false && (
        <Login setloggedIn={setLoggedIn} loadEntries={loadEntries} />
      )}
      {loggedIn === true && (
        <Board
          entries={entries}
          makeEntry={makeEntry}
          loadEntries={loadEntries}
          setLoggedIn={setLoggedIn}
        />
      )}
    </div>
  );
}

export default App;
