import React, { useEffect, useState, useContext } from "react";
import Tictactoe from "../components/tictactoe";
import { useDispatch } from "react-redux";
import { addMoves } from "../features/board/boardSlice";
import { setMove, increaseMove } from "../features/move/moveSlice";
import "../App.css";
import { SocketContext } from "../context/socket";

function Home() {
  const [roomId, setRoomId] = useState("");
  const [pageState, setPageState] = useState("room");
  const [mySign, setMySign] = useState('O')
  const socket = useContext(SocketContext)

  useEffect(() => {
    document.title = `Home | Games`;
    setMySign("O");
  }, []);

  const joinRoom = e => {
    e.preventDefault()
    socket.emit("join-room", roomId)
  }

  socket.on("no-space", () => setRoomId(''));
  socket.on("Room doesn't exist", () => setRoomId(''));

  const dispatch = useDispatch()

  socket.on('joined', () => {
    setPageState('play')
    dispatch(setMove(false))
  })
  socket.off('opponent-move').on("opponent-move", position => {
    dispatch(addMoves({ position, sign: mySign === 'X' ? 'O' : 'X' }));
    dispatch(increaseMove())
    dispatch(setMove(true))
  });
  socket
    .off("game-end")
    .on("game-end", (result) =>
      result === mySign ? setPageState("You won") : result === 'draw' ? setPageState("Tie") : setPageState("You lose")
    );


  return (
    <div className="body-container">
      <h3>Tic Tac Toe</h3>
      {pageState === "room" ? (
        <div className="user-action-div">
          <form className="user-action-div">
            <label htmlFor="user-name-input">Enter Name</label>
            <input
              id="user-name-input"
              name="room-id"
              placeholder="username"
              value={roomId}
              required={true}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <button onClick={(e) => joinRoom(e)}>Next</button>
          </form>
        </div>
      ) : pageState === "play" ? (
        <div className="user-action-div">
          <Tictactoe roomId={roomId} mySign={mySign} />
          <p>{pageState}</p>
        </div>
      ) : (
        <div className="user-action-div">
          <p>Game ended</p>
              <p>You {pageState}</p>
              <button>play again</button>
        </div>
      )}
    </div>
  );
}

export default Home;
