## Hisaab Application

### Overview

**Hisaab** is a React-based web application which I created as a website for my flatmates to manage and log our joint expenses, the app allows users to add, track, and manage entries for items purchased, and calculates how much each person owes. The design of the app follows brutalism web design principles, emphasizing functionality with a minimalist and utilitarian aesthetic.

### Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [APIs Used](#apis-used)
- [Components](#components)
- [License](#license)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/asdhamidi/hisaab.git
    cd hisaab
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```
3. Run the application:
    ```bash
    npm start
    ```

### Project Structure

```
hisaab/
├── public/
├── src/
│   ├── components/
│   │   ├── api-handling.js
│   │   ├── board.js
│   │   ├── editor.js
│   │   ├── login.js
│   │   ├── navbar.js
│   │   ├── owe-details.js
│   │   ├── pop-up.js
│   │   ├── summary.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
├── package.json
└── README.md
```

### Usage

1. **Login/Register**:
    - The app starts with a login/register screen. Users can either log in or register as a new user using the provided registration code.

2. **Adding Entries**:
    - Once logged in, users can add new entries by clicking the `New Entry` button on the navbar. Users need to input details like items, price, and who owes the amount.

3. **Viewing and Editing Entries**:
    - Entries are listed on the board. Users can click their own entries to edit them. Non-editable entries can be clicked to view details in a pop-up.

4. **Summary**:
    - The summary section shows the total amount spent and the amount owed by the user. Users can click on the "You Owe" button to see a detailed breakdown of amounts owed to each person.

### APIs Used

The app uses Axios for API handling and backend communication. The base URL is set to:

```javascript
const axiosInstance = axios.create({
  baseURL: "https://hisaab-ashy.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});
```

Axios interceptors are used to attach the authorization token to requests:

```javascript
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && !config.url.includes("/login")) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

### Components

- **App.js**: The main component that manages routing and the overall structure of the app.
- **Login.js**: Manages user authentication (login and registration).
- **Board.js**: Displays the list of entries.
- **Editor.js**: Provides a form for creating or editing an entry.
- **Navbar.js**: The navigation bar that includes logout functionality and a filter for selecting the month.
- **Summary.js**: Displays summary statistics such as total amount spent and owed.
- **OweDetails.js**: Shows detailed information about the amount owed to each person.
- **Popup.js**: Displays entry details in a pop-up window.
- **ApiHandling.js**: Handles API requests using Axios.

### License

This project is licensed under... well, no specific license. Feel free to use it however you like. Consider it public domain—use it, modify it, share it, or just ignore it.