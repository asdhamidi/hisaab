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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="icon icon-tabler icons-tabler-outline icon-tabler-calculator"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 3m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
              <path d="M8 7m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z" />
              <path d="M8 14l0 .01" />
              <path d="M12 14l0 .01" />
              <path d="M16 14l0 .01" />
              <path d="M8 17l0 .01" />
              <path d="M12 17l0 .01" />
              <path d="M16 17l0 .01" />
            </svg>
            <h1>हिसाब</h1>
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
                {register ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-login-2"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                    <path d="M3 12h13l-3 -3" />
                    <path d="M13 15l3 -3" />
                  </svg>
                ) : (
                  "login"
                )}
              </button>
              <button
                className={registerClass}
                onClick={() => {
                  setlogin("");
                  setRegisterClass("active-btn");
                  setregister(true);
                }}
              >
                {register ? (
                  "register"
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="icon icon-tabler icons-tabler-outline icon-tabler-door-enter"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M13 12v.01" />
                    <path d="M3 21h18" />
                    <path d="M5 21v-16a2 2 0 0 1 2 -2h6m4 10.5v7.5" />
                    <path d="M21 7h-7m3 -3l-3 3l3 3" />
                  </svg>
                )}
              </button>
            </div>
            {register === false && (
              <form>
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value.toLowerCase().trim())
                  }
                  required
                />
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="submit-btn"
                  onClick={handleLogin}
                >
                  login
                </button>
              </form>
            )}
            {register === true && (
              <form>
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value.toLowerCase().trim())
                  }
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
                  type="number"
                  placeholder="registration code"
                  value={registrationCode}
                  onChange={(e) => setRegistrationCode(e.target.value.trim())}
                  required
                />
                <button
                  type="submit"
                  className="submit-btn"
                  onClick={handleRegistration}
                >
                  register
                </button>
              </form>
            )}
            <div className="credits">made with ❤️</div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
