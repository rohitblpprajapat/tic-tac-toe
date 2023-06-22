// app.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";

    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderCell = (index) => {
    return (
      <div className="cell" onClick={() => handleClick(index)}>
        {board[index]}
      </div>
    );
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (board.every((cell) => cell !== "")) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div>
      <div className="board">
        {board.map((cell, index) => renderCell(index))}
      </div>
      <div className="status">{status}</div>
    </div>
  );
};

// Helper function to calculate the winner
const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
};

ReactDOM.render(<App />, document.getElementById('root'));
