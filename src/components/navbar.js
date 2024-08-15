import React from "react";
import Summary from "./summary";
const Navbar = ({ setEditor, setLoggedIn, entries }) => {
  return (
    <div className="top">
      <nav>
        <h1>hisaab</h1>
        <div className="nav-controls">
          <button onClick={() => setEditor(true)}>new entry</button>
          <button
            onClick={() => {
              setLoggedIn(false);
              localStorage.removeItem("token");
              localStorage.removeItem("user");
            }}
          >
            logout
          </button>
        </div>
      </nav>
      <Summary entries={entries} />
      <div className="entry entry-header">
        <em>items</em>
        <em>price</em>
        <em>paid by</em>
        <em>owed by</em>
        <em>date</em>
      </div>
    </div>
  );
};

export default Navbar;
