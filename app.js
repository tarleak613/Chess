const express = require ("express");
const socket = require("socket.io");
const http = require("http");
const {Chess} = require("chess.js");
const path = require("path");

const app = express();

//socket io documentation, this is how we use it
const server = http.createServer(app); //http server linking it with express and that server run the socket
const io = socket(server);

//chess.js documentation
const chess = new Chess(); 
let players = {};
let currentPlayer = "w";
let gameStarted = false; //message logic

app.set("view engine", "ejs"); //using ejs, similar to html
app.use(express.static(path.join(__dirname, "public")));


//routing
app.get("/", (req, res) => {
    res.render("index", {title: "Chess game"}); 
})

//whenever someone comes to the server 
// io.on("connection", function(uniquesocket){

//     uniquesocket.on("message from frontend", function(){
//         io.emit("connection back to the frontend"); 
//     })
// })

io.on("connection", function(uniquesocket){
    console.log("connected");

    if(!players.white){
        players.white = uniquesocket.id;
        uniquesocket.emit("playerRole", "w");
    }
    else if(!players.black){
        players.black = uniquesocket.id;
        uniquesocket.emit("playerRole", "b");
    }
    else{
        uniquesocket.emit("spectatorRole");
    }

    uniquesocket.on("disconnect", function(){
        if(uniquesocket.id === players.white){
            delete players.white;
        }
        else if(uniquesocket.id === players.black){
            delete players.black;  
        }

        //button logic
        if (Object.keys(players).length === 0) {
            gameStarted = false;
        }
    });


    uniquesocket.on("move", (move) => {
        try{
            if (!gameStarted) return; // Ignore moves if the game hasn't started //button logic
            if(chess.turn() === "w" && uniquesocket.id !== players.white) return;
            if(chess.turn() === "b" && uniquesocket.id !== players.black) return;

            const result = chess.move(move); // if the move in invalid then no result, so may crash; hence the try and catch block
            if(result){ // if right move then send to the frontend
                currentPlayer = chess.turn();
                io.emit("move", move);
                io.emit("boardState", chess.fen()); //fen is the chess piece notation
            }
            else{
                console.log("Invalid move : ", move);
                uniquesocket.emit("invalidMove", move); 
            }

        }catch(err){
            console.log(err);
            uniquesocket.emit("Invalid Move : ", move); 

        }
    });

    //message logic
    if (Object.keys(players).length === 2 && !gameStarted) {
        gameStarted = true;
        io.emit("gameStarted");
        io.emit("boardState", chess.fen());
    }
});

server.listen(3000, function(){
    console.log("listening on 3000")
})