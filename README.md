# Hisaab App

**Hisaab** is a React-based web application designed for managing shared expenses among friends or groups. Originally created as a website for my flatmates to manage and log our joint expenses, the app allows users to add, track, and manage entries for items purchased, and calculates how much each person owes. The design of the app follows the brutalism web design principles, emphasizing functionality with a minimalist and utilitarian aesthetic.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Handling](#api-handling)
- [App Structure](#app-structure)
- [Brutalism Web Design](#brutalism-web-design)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Users can log in using their credentials.
- **Add/Edit Entries**: Users can add new entries and specify the items, price, who paid, and who owes.
- **Owed By All**: A convenient feature that automatically selects all group members as owing.
- **Monthly Filtering**: Entries can be filtered by month.
- **Expense Summary**: Provides a summary of how much each person owes.
- **Persistent Sessions**: The app keeps the user logged in across sessions using JWT tokens.
- **Popup**: A popup shows details of the amounts owed by each person, except the current user.

## Technologies Used

- **React**: Frontend framework used to build the UI.
- **Axios**: For making HTTP requests to the backend.
- **CSS**: Styling with a brutalism design approach.
- **JavaScript**: For handling app logic and state management.
- **LocalStorage**: For token management and user session persistence.

## Installation

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/asdhamidi/hisaab.git
   ```
2. Navigate to the project directory:
   ```sh
   cd hisaab
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm start
   ```

## Usage

1. **Login**: Upon starting the app, you'll be prompted to log in. Enter your credentials.
2. **Add Entry**: Use the "new entry" button to add a new entry. Fill out the form, including items, price, who paid, and who owes.
3. **Filter Entries**: Use the dropdown to filter entries by month.
4. **Logout**: Click the logout button to end your session.

## API Handling

The app uses `axios` for API handling. An instance of `axios` is configured to include the JWT token in the headers for authenticated requests. The base URL is set to the backend server:

```js
const axiosInstance = axios.create({
  baseURL: "https://hisaab-six.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});
```

## App Structure

```plaintext
src/
│
├── components/
│   ├── api-handling.js
│   ├── board.js
│   ├── editor.js
│   ├── login.js
│   ├── navbar.js
│   ├── popup.js
│   └── summary.js
├── App.js
├── App.css
└── index.js
```

### Components

- **`App.js`**: The main entry point of the app. Manages the overall state and renders different components based on the user's login status.
- **`editor.js`**: Handles the creation and editing of entries. Ensures that required fields are filled before submission.
- **`board.js`**: Displays all entries for the selected month. Integrates the navbar and filters.
- **`navbar.js`**: Provides navigation options, including month selection and logout.
- **`popup.js`**: Shows details of amounts owed by other users.
- **`api-handling.js`**: Configures the `axios` instance for API communication.
- **`login.js`**: Handles user login and token storage.

## Brutalism Web Design

The app embraces brutalism web design, characterized by its raw, bare-bones aesthetic. This design choice emphasizes functionality over form, giving the app a unique and bold visual identity. The minimalist and utilitarian approach is reflected in the stark, unstyled elements and the lack of decorative features.

## License
This project is licensed under... I don't know which license. Use it, don't use it, I couldn't care less.