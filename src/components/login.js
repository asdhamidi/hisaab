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
  const [error, setError] = useState("");

  const handleLogin = () => {
    setLoggigIn(true);
    if (username === "" && password === "") {
      setError("fields cannot be empty.");
      setLoggigIn(false);
      return;
    }
    if (username === "") {
      setError("username cannot be empty.");
      setLoggigIn(false);
      return;
    }
    if (password === "") {
      setError("password cannot be empty.");
      setLoggigIn(false);
      return;
    }

    axiosInstance
      .post("/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        console.log(response)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", username);
        if(username ==="asad")
            localStorage.setItem("admin", 'true');
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
    if (username === "" && password === "" && registrationCode === "") {
      setError("fields cannot be empty.");
      setLoggigIn(false);
      return;
    }
    if (username === "") {
      setError("username cannot be empty.");
      setLoggigIn(false);
      return;
    }
    if (password === "") {
      setError("password cannot be empty.");
      setLoggigIn(false);
      return;
    }
    if (registrationCode === "") {
      setError("please give registration code.");
      setLoggigIn(false);
      return;
    }

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
                  setError("");
                  setUsername("");
                  setPassword("");
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
                  setError("");
                  setUsername("");
                  setPassword("");
                  setRegistrationCode("");
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
                {error && (
                  <p className="error-msg">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    {error}
                  </p>
                )}
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value.toLowerCase().trim());
                    setError("");
                  }}
                  required
                />
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
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
                {error && (
                  <p className="error-msg">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
                        fill="currentColor"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                    {error}
                  </p>
                )}
                <input
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value.toLowerCase().trim());
                    setError("");
                  }}
                  required
                />
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  required
                />
                <input
                  type="number"
                  placeholder="registration code"
                  value={registrationCode}
                  onChange={(e) => {
                    setRegistrationCode(e.target.value.trim());
                    setError("");
                  }}
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
