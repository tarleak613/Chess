const socket = io(); //this itself will run and automatically send request to the backend of the socket

// socket.emit("message from frontend");
// socket.on("connection back to the frontend", function(){
//     console.log("HELLO");
// });

const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

// New elements for move logs
const whiteMovesElement = document.getElementById("whiteMoves");
const blackMovesElement = document.getElementById("blackMoves");

//message logic
const statusMessage = document.getElementById("statusMessage");


let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML="";
    board.forEach((row, rowIndex) => {
        row.forEach((square, squareIndex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add("square",(rowIndex + squareIndex) % 2 === 0 ? "light" : "dark" );  // for the squares in between

            squareElement.dataset.row = rowIndex;
            squareElement.dataset.col = squareIndex;

            if(square){ //check for the sqaures on the edges of the start
                const pieceElement = document.createElement("div");
                pieceElement.classList.add("piece", square.color === "w" ? "white" : "black"); 

                pieceElement.innerText =getPieceUnicode(square); // will get from unicode
                pieceElement.draggable = playerRole === square.color;
                
                pieceElement.addEventListener("dragstart", (e) => {
                    if(pieceElement.draggable){
                        draggedPiece = pieceElement;
                        sourceSquare = {row : rowIndex, col : squareIndex};
                        e.dataTransfer.setData("text/plain", ""); //necessity
                    }
                });
                pieceElement.addEventListener("dragend", (e) =>{
                    draggedPiece = null;
                    sourceSquare = null;
                });
                squareElement.appendChild(pieceElement);
            }

            squareElement.addEventListener("dragover", function(e){
                e.preventDefault(); 
            });
            squareElement.addEventListener("drop", function(e){
                e.preventDefault();
                if(draggedPiece){
                    const targetSquare = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                    };

                    handleMove(sourceSquare, targetSquare);
                }
            });
            boardElement.appendChild(squareElement);
        });
    });

    if(playerRole == 'b'){
        boardElement.classList.add("flipped");
    }else{
        boardElement.classList.remove("flipped");
    }
};

const handleMove = (source, target) =>{
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion: "q"
    }

    socket.emit("move", move);
};


const getPieceUnicode = (piece) =>{
    const unicodePieces = {
        p: "♙",
        r: "♖",
        n: "♘",
        b: "♗",
        q: "♕",
        k: "♔",
        P: "♟",
        R: "♜",
        N: "♞",
        B: "♝",
        Q: "♛",
        K: "♚",        
    }   
    return unicodePieces[piece.type] || "";
};

//checkmate logic
const checkForGameOver = () => {
    if (chess.in_checkmate()) {
        const winner = chess.turn() === 'w' ? 'Black' : 'White';
        statusMessage.textContent = `${winner} has won the game!`;
    }
};


socket.on("playerRole", function(role){
    playerRole = role;

    //message logic
    if (playerRole === 'w') {
        statusMessage.textContent = 'Waiting for the opponent...';
    } else if (playerRole === 'b') {
        statusMessage.textContent = 'Game Started! Enjoy the game!';
    }

    renderBoard();
})

socket.on("spectatorRole", function(){
    playerRole = null;
    renderBoard();

    //message logic
    statusMessage.textContent = 'Spectators cannot participate in the game.';

})

socket.on("boardState", function(fen){
    chess.load(fen);
    renderBoard();
})

socket.on("move", function(move){
    chess.move(move);
    renderBoard();
    updateMoveLogs(move); // Add this line to update move logs
    checkForGameOver(); // Check if the game is over after every move
})

//message logic
socket.on("gameStarted", function() {
    statusMessage.textContent = 'Enjoy the game!';
});

//moves logic
const updateMoveLogs = (move) => {
    const piece = chess.get(move.to); // Get the piece on the target square
    const moveText = `${getPieceUnicode(piece)} ${move.from} to ${move.to}`;
    const listItem = document.createElement("li");
    listItem.textContent = moveText;
    if (chess.turn() === 'w') {
        whiteMovesElement.appendChild(listItem);
    } else {
        blackMovesElement.appendChild(listItem);
    }
};

renderBoard();