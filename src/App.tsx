import React, {useState} from 'react';
import './App.css';

const initialBoard = Array(9).fill(""); //array iniziale vuoto

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState("X"); // Stato per il giocatore corrente
  const [winner, setWinner] = useState(""); // Stato per il vincitore
  const [draw, setDraw] = useState(false); // Stato per il pareggio

  const handleCellClick = (index: number) => {
    if (board[index] === "" && !winner && !draw) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer; //assegna il segno del giocatore corrente alla cella cliccata
      setBoard(newBoard); //aggiorna la board
      checkWinner(newBoard); //controlla se c'è un vincitore
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X"); // cambia il il giocatore corrente
    }
  };

  const checkWinner = (board: string | any[]) => {
    const winningCombinations = [
      [0, 1, 2], //righe
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // colonne
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // diagonali
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes("")) {
      setDraw(true); // Se non ci sono più celle vuote, imposta il pareggio su true
    }
  };
  //reimposta i valori iniziali
  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer("X");
    setWinner("");
    setDraw(false);
  };

  return (
    <div>
      <h1 className='title'>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className="cell"
            onClick={() => handleCellClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      <div className="status">
        {winner && <p>Il vincitore è: {winner}</p>}
        {!winner && draw && <p>Pareggio!</p>}
        {!winner && !draw && <p>Turno di: {currentPlayer}</p>}
      </div>
      <div className="button-wrapper">
      <button onClick={resetGame}>Reset</button>
      </div>
      
    </div>
  );
};

export default App;



