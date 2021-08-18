import React, { useEffect, useState } from "react";
import Tictactoe from "../components/tictactoe";
import { io } from "socket.io-client"
// import axios from "axios"
import "../App.css";

function Home() {
  const [roomId, setRoomId] = useState("");
  const [pageState, setPageState] = useState("room");
  const [mySign, setMySign] = useState('O')

  useEffect(() => {
    document.title = `Home | Games`;
  }, []);

  let socket = io("http://localhost:8080", {autoConnect:false});

  const joinRoom = e => {
    e.preventDefault()
    socket.connect()
    socket.emit("join-room", roomId)
  }

  socket.on("no-space", () =>setRoomId(''));

  socket.on('joined', ()=>setPageState('play'))

  return (
    <div className="body-container">
      <h3>Tic Tac Toe</h3>
      {pageState === "room" ? (
        <div className="user-action-div">
          <form
            className="user-action-div"
          >
            <label htmlFor="user-name-input">Enter Name</label>
            <input
              id="user-name-input"
              name="room-id"
              placeholder="username"
              value={roomId}
              required={true}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <button   onClick={e=>joinRoom(e)}>Next</button>
          </form>
        </div>
      ) : <div className="user-action-div"><Tictactoe mySign={mySign}  /></div>}
    </div>
  );
}

export default Home;
