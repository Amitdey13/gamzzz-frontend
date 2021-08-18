import React, { useContext } from "react";
import { SocketContext } from "../context/socket";
import { useSelector, useDispatch } from "react-redux";
import { addMoves } from "../features/board/boardSlice";
import { setMove, increaseMove } from "../features/move/moveSlice";
import "../App.css";

function Box({ mySign, position, roomId }) {
  const socket = useContext(SocketContext);
  const boxValue = useSelector((state) => state.board.value[position]);
  const box = useSelector((state) => state.board.value);
  const moveNumber = useSelector((state) => state.move.value.number);
  const dispatch = useDispatch();
  const setBoxValue = () => {
    let addingMoves = new Promise((resolve, reject) => {
      dispatch(addMoves({ position, sign: mySign }))
      setTimeout(() => {
        resolve("done");
      }, 300);
    }
    );
    addingMoves
    .then(() => {
        console.log('fired')
        dispatch(increaseMove())
      })
      .then(() => dispatch(setMove(false)))
      .then(() => {
        let temp = [...box]
        temp[position] = mySign
        socket.emit("my-move", position, roomId, temp, moveNumber)
      });
  };

  return (
    <button
      className="ttt-box"
      onClick={setBoxValue}
      disabled={boxValue !== ""}
    >
      {boxValue}
    </button>
  );
}

function Tictactoe({ mySign, roomId }) {
  const move = useSelector((state) => state.move.value.turn);
  return (
    <div
      style={{ pointerEvents: move ? "all" : "none" }}
      className="game-board"
    >
      {["", "", "", "", "", "", "", "", ""].map((value, index) => (
        <Box mySign={mySign} roomId={roomId} position={index} key={index} />
      ))}
    </div>
  );
}

export default Tictactoe;
