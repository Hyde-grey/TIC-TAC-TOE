import { useState } from "react";
import "./App.css";

const winnerCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const initialBoard = ["", "", "", "", "", "", "", "", ""];

const initialPlayers = {
  checkedMarks: [],
  currentPlayer: "playerX",
  playerX: {
    name: "X",
    winner: false,
    marks: [],
  },
  playerO: {
    name: "O",
    winner: false,
    marks: [],
  },
};

const App = () => {
  const [currentBoard, setCurrentBoard] = useState(initialBoard);
  const [players, setPlayers] = useState(initialPlayers);
  const { checkedMarks, currentPlayer, playerX, playerO } = players;
  const [isDisabled, setIsDisabled] = useState({});

  const handleSetWinner = (newPlayersState) => {
    for (let i = 0; i < winnerCombinations.length; i++) {
      const isWinner = winnerCombinations[i].every((entry) =>
        newPlayersState[currentPlayer].marks.includes(entry)
      );

      if (isWinner) {
        setPlayers({
          ...newPlayersState,
          [currentPlayer]: {
            ...newPlayersState[currentPlayer],
            winner: true,
          },
        });
      } else {
      }
    }
  };

  const handleMatchStatus = () => {
    if (!playerO.winner && !playerX.winner) {
      if (checkedMarks.length < 9) {
        return `Next player: ${players[currentPlayer].name}`;
      } else {
        return `Tie`;
      }
    } else if (playerO.winner) {
      return `Winner: O`;
    } else {
      return `Winner: X`;
    }
  };

  const handleSetMark = (index) => {
    const newBoard = [...currentBoard];
    newBoard.splice(index, 1, players.currentPlayer === "playerO" ? "O" : "X");

    const newPlayerState = {
      ...players,
      checkedMarks: [...players.checkedMarks, index],
      currentPlayer:
        players.currentPlayer === "playerO" ? "playerX" : "playerO",
      [currentPlayer]: {
        ...players[currentPlayer],
        marks: [...players[currentPlayer].marks, index],
      },
    };
    setPlayers(newPlayerState);

    setCurrentBoard(newBoard);

    handleSetWinner(newPlayerState);
    setIsDisabled((prevDisabled) => ({
      ...prevDisabled,
      [index]: true,
    }));
  };

  const handleResetGame = () => {
    setPlayers(initialPlayers);
    setCurrentBoard(initialBoard);
    setIsDisabled({});
  };

  return (
    <div className="mainContainer">
      <div className="title">
        <h1>TIC TAC TOE</h1>
        <p>- by Hyde Francois Khamsing</p>
      </div>
      <div className="status">
        <h2>{handleMatchStatus()}</h2>
      </div>

      <div className="squareFlexContainer">
        {currentBoard.map((entry, index) => {
          return (
            <button
              key={index}
              className="square"
              onClick={() => handleSetMark(index)}
              disabled={isDisabled[index] || false}
            >
              {entry}
            </button>
          );
        })}
      </div>
      <div className="menuContainer">
        <button className="reset" onClick={() => handleResetGame()}>
          <p>Reset</p>
        </button>
        <a href="https://github.com/Hyde-grey">my Github</a>
      </div>
    </div>
  );
};
export default App;
