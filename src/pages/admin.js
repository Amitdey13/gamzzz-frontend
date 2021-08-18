import React, { useEffect, useState, useContext } from 'react'
import { useDispatch } from "react-redux";
import { addMoves } from "../features/board/boardSlice";
import { setMove, increaseMove } from "../features/move/moveSlice";
import Tictactoe from '../components/tictactoe';
import { SocketContext} from "../context/socket";

function Admin() {
  const [roomId, setRoomId] = useState("");
  const [pageState, setPageState] = useState("room");
  const [mySign, setMySign] = useState("X");
  const socket = useContext(SocketContext)


    useEffect(() => {
      document.title = `Admin | Games`
      setMySign('X')
    }, [])

  const createRoom = () => {
    socket.emit("create-room");
  };
  
  const dispatch = useDispatch()

    socket.on('roomId', roomId => {
      setRoomId(roomId)
      setPageState('wait')
      dispatch(setMove(true));
    })
  socket.on("start game", ()=>setPageState("play"))
  socket.off("opponent-move").on("opponent-move", position => {
    dispatch(addMoves({ position, sign: mySign === "X" ? "O" : "X" }));
    dispatch(increaseMove(1));
    dispatch(setMove(true));
  });
  
  socket
    .off("game-end")
    .on("game-end", (result) =>
      result === mySign
        ? setPageState("You won")
        : result === "draw"
        ? setPageState("Tie")
        : setPageState("You lose")
    );
  

    return (
        <div className="body-container">
          <h3>Tic Tac Toe</h3>
          {pageState === "room" ? (
            <div className="user-action-div">
              <button onClick={() => createRoom()}>Create Room</button>
            </div>
          ) : pageState === "wait" ? (
            <div className="user-action-div">
              <div>Room Id: {roomId}</div>
              <div>Waiting for other player...</div>
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

export default Admin
