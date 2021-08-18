import React, { useState } from 'react'
import '../App.css'

function Box({mySign}) {
    const [value, setValue] = useState('')
    return (
        <button className="ttt-box" onClick={() => setValue(mySign)}>{value}</button>
    )
}

function Tictactoe({ mySign, joinLink }) {
  const [move, setMove] = useState(false);
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  return (
    <div
      style={{ pointerEvents: move ? "all" : "none" }}
      className="game-board"
    >
      {board.map((value, index) => (
          <Box mySign={mySign} value={value} position={index} key={index} />
      ))}
    </div>
  );
}

export default Tictactoe
