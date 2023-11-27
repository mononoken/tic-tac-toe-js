(function () {
  function createBoard({
    boardValues = Array(9).fill(null),
    markers = ["X", "O"],
  } = {}) {
    const render = () => console.log(boardValues);

    const mark = (index, marker) => {
      if (validMark(index)) {
        boardValues[index] = marker;
      }
    };

    const validMark = (index) => boardValues[index] === null;

    const isWin = (marker) => {
      if (
        boardValues[0] === marker &&
        boardValues[1] === marker &&
        boardValues[2] === marker
      ) {
        return true;
      } else if (
        boardValues[3] === marker &&
        boardValues[4] === marker &&
        boardValues[5] === marker
      ) {
        return true;
      } else if (
        boardValues[6] === marker &&
        boardValues[7] === marker &&
        boardValues[8] === marker
      ) {
        return true;
      } else if (
        boardValues[0] === marker &&
        boardValues[3] === marker &&
        boardValues[6] === marker
      ) {
        return true;
      } else if (
        boardValues[1] === marker &&
        boardValues[4] === marker &&
        boardValues[7] === marker
      ) {
        return true;
      } else if (
        boardValues[2] === marker &&
        boardValues[5] === marker &&
        boardValues[8] === marker
      ) {
        return true;
      } else if (
        boardValues[0] === marker &&
        boardValues[4] === marker &&
        boardValues[8] === marker
      ) {
        return true;
      } else if (
        boardValues[2] === marker &&
        boardValues[4] === marker &&
        boardValues[6] === marker
      ) {
        return true;
      } else {
        return false;
      }
    };

    const isDraw = () => {
      return (
        boardValues.every((i) => i !== null) &&
        !isWin(markers[0]) &&
        !isWin(markers[1])
      );
    };

    return { render, mark, validMark, isWin, isDraw };
  }

  function createPlayers({
    player1 = { name: "Player 1", marker: "X" },
    player2 = { name: "Player 2", marker: "O" },
  } = {}) {
    let currentPlayer;

    const getCurrentPlayer = () => currentPlayer;

    const setCurrentPlayer = () => {
      if (currentPlayer === player1) {
        currentPlayer = player2;
      } else {
        currentPlayer = player1;
      }
    };

    return { getCurrentPlayer, setCurrentPlayer };
  }

  function createGame({
    board = createBoard(),
    players = createPlayers(),
  } = {}) {
    const currentPlayer = () => players.getCurrentPlayer();

    const runRound = () => {
      players.setCurrentPlayer();

      let selection;
      do {
        selection = prompt(`${currentPlayer().name}, choose an array index:`);
      } while (!board.validMark(selection));

      board.mark(selection, currentPlayer().marker);
      board.render();
    };

    let winner;

    const hasWin = () => {
      if (board.isWin(currentPlayer().marker)) {
        winner = currentPlayer();
        return true;
      }

      return false;
    };

    const hasDraw = () => board.isDraw();

    const isEnd = () => hasWin() || hasDraw();

    const result = () => {
      if (hasWin()) {
        return `${winner.name} wins!`;
      } else if (hasDraw()) {
        return "Draw!";
      }
    };

    const play = () => {
      board.render();
      do {
        runRound();
      } while (!isEnd());

      console.log(result());
    };

    return { play };
  }

  createGame().play();
})();
