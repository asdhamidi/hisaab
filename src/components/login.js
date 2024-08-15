import React, { useState } from "react";
import axiosInstance from "./api-handling";
import BeatLoader from "react-spinners/ClipLoader";

const override = {
  borderColor: "#666",
};

const Login = ({ loadEntries, setloggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registrationCode, setRegistrationCode] = useState("");
  const [login, setlogin] = useState("active-btn");
  const [registerClass, setRegisterClass] = useState("");
  const [register, setregister] = useState(false);
  const [loggigIn, setLoggigIn] = useState(false);

  const handleLogin = () => {
    setLoggigIn(true);

    axiosInstance
      .post("/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", username);
        setloggedIn(true);
        setLoggigIn(false);
        loadEntries();
      })
      .catch((error) => {
        console.error("Login failed:", error);
        window.alert("Login failed");
        setUsername("");
        setPassword("");
        setLoggigIn(false);
      });
  };

  const handleRegistration = () => {
    setLoggigIn(true);
    axiosInstance
      .post("/register", {
        username: username,
        password: password,
        register_code: registrationCode,
      })
      .then((response) => {
        setlogin("active-btn");
        setRegisterClass("");
        setregister(false);
        setLoggigIn(false);
      })
      .catch((error) => {
        setLoggigIn(false);
        console.error("Registration failed:", error);
        window.alert("Registration failed");
        setUsername("");
        setPassword("");
        setRegistrationCode("");
      });
  };

  return (
    <div className="front-page">
      <BeatLoader
        className="loading-spinner"
        loading={loggigIn}
        size={60}
        aria-label="Loading Spinner"
        data-testid="loader"
        cssOverride={override}
      />
      {loggigIn === false && (
        <>
          <div className="headings">
            <h1>hisaab</h1>
          </div>
          <div className="front-page-contents">
            <div className="front-page-options">
              <button
                className={login}
                onClick={() => {
                  setlogin("active-btn");
                  setRegisterClass("");
                  setregister(false);
                }}
              >
                login
              </button>
              <button
                className={registerClass}
                onClick={() => {
                  setlogin("");
                  setRegisterClass("active-btn");
                  setregister(true);
                }}
              >
                register
              </button>
            </div>
            {register === false && (
              <>
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button className="submit-btn" onClick={handleLogin}>
                  login
                </button>
              </>
            )}
            {register === true && (
              <>
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="registration code"
                  value={registrationCode}
                  onChange={(e) => setRegistrationCode(e.target.value)}
                  required
                />
                <button className="submit-btn" onClick={handleRegistration}>
                  register
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
