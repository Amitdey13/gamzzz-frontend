import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import Tictactoe from '../components/tictactoe';

function Admin() {
    const [roomId, setRoomId] = useState("");
  const [pageState, setPageState] = useState("room");
  const [mySign, setMySign] = useState("X");

    useEffect(() => {
        document.title = `Admin | Games`
    }, [])
  let socket = io("http://localhost:8080", { autoConnect: false });

  const createRoom = () => {
        socket.connect()
        socket.emit("create-room", "game1");
    };
    socket.on('roomId', roomId => {
        setRoomId(roomId)
        setPageState('play')
    })

    return (
      <div className="body-container">
        <h3>Tic Tac Toe</h3>
        {pageState === "room" ? (
          <div className="user-action-div">
            <button onClick={() => createRoom()}>Create Room</button>
          </div>
        ) : (
          <div className="user-action-div">
              <Tictactoe mySign={mySign} joinLink={roomId} />
          </div>
        )}
      </div>
    );
}

export default Admin
