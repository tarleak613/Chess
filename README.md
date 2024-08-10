# Real-Time Chess Application
https://chess-sr6b.onrender.com/
## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)

## Introduction

This is a real-time chess application built using Socket.io and React 18. The application allows two players to play chess in real-time, with each player's moves being updated live for both players. Spectators can also watch the game but cannot participate.

## Features

- Real-time updates of chess moves
- Display of chessboard with draggable pieces
- Separate move logs for white and black pieces
- Responsive design for different screen sizes
- Notification messages for game status (e.g., waiting for opponent, game started, checkmate)
- Role-based game play (player or spectator)

## Technologies Used

- [Node js](https://reactjs.org/](https://nodejs.org/docs/latest/api/))
- [Express js](https://expressjs.com/)
- [Socket.io](https://socket.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chess.js](https://github.com/jhlywa/chess.js)

## Setup and Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/real-time-chess.git
    ```
2. Navigate to the project directory:
    ```bash
    cd real-time-chess
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Start the application:
    ```bash
    npm start
    ```
5. Open your browser and go to `http://localhost:3000`.

## Usage

- **Player Role**: When you connect to the application, you are assigned a role (white, black, or spectator).
  - If you are assigned as a player, you can move the pieces.
  - If you are assigned as a spectator, you can watch the game but not interact with the pieces.
- **Move Pieces**: Drag and drop pieces to make a move.
- **Game Messages**: Pay attention to the messages displayed on top to know the game status.
- **Responsive Design**: The application is responsive and adjusts to different screen sizes.

## Project Structure

```plaintext
real-time-chess/
├── public/
|   ├── js
|   |   ├── chessgame.js
├── views
|   ├── index.ejs
├── aap.js
├── package.json
├── README.md
```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new pull request.

## Acknowledgements

- [React](https://reactjs.org/)
- [Socket.io](https://socket.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chess.js](https://github.com/jhlywa/chess.js)

---

Feel free to customize this template based on your specific project details and preferences.
