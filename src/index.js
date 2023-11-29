(function () {
  function createBoard({
    boardValues = Array(9).fill(null),
    markers = ["X", "O"],
  } = {}) {
    const log = () => console.log(boardValues);

    const getSquareValue = (squareid) => boardValues[squareid];

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

    return { getSquareValue, log, mark, validMark, isWin, isDraw };
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

    setCurrentPlayer();

    return { getCurrentPlayer, setCurrentPlayer };
  }

  function createGame({
    board = createBoard(),
    players = createPlayers(),
  } = {}) {
    const getBoard = () => board;
    const currentPlayer = () => players.getCurrentPlayer();

    const setCurrentPlayerMessage = () => {
      messages.push(
        `Current player: ${currentPlayer().name} (${currentPlayer().marker})`,
      );
    };

    let messages = [];

    const getMessages = () => messages;

    const clearMessages = () => (messages = []);

    const runRound = (squareid) => {
      if (!board.validMark(squareid)) {
        messages.push(
          "Invalid square selection. Please select an empty square to mark.",
        );
        return;
      }

      board.mark(squareid, currentPlayer().marker);

      if (isEnd()) {
        processEnd();
        return;
      }

      clearMessages();

      players.setCurrentPlayer();
      setCurrentPlayerMessage();

      messages.forEach((message) => console.log(message));
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

    const processEnd = () => {
      if (hasWin()) {
        messages.push(`Player ${winner.name} wins!`);
      } else if (hasDraw()) {
        messages.push(`Draw.`);
      }
    };

    setCurrentPlayerMessage();
    messages.forEach((message) => console.log(message));

    return { getBoard, getMessages, runRound, isEnd };
  }

  function createRenderer(game = createGame()) {
    const board = game.getBoard();
    const squareContainers = [
      document.querySelector(`[data-squareid="0"]`),
      document.querySelector(`[data-squareid="1"]`),
      document.querySelector(`[data-squareid="2"]`),
      document.querySelector(`[data-squareid="3"]`),
      document.querySelector(`[data-squareid="4"]`),
      document.querySelector(`[data-squareid="5"]`),
      document.querySelector(`[data-squareid="6"]`),
      document.querySelector(`[data-squareid="7"]`),
      document.querySelector(`[data-squareid="8"]`),
    ];

    const updateSquares = () => {
      squareContainers.forEach((square) => {
        const squareid = square.dataset.squareid;

        square.textContent = board.getSquareValue(squareid);
      });
    };

    const messagesContainer = document.querySelector(".messages");

    const updateMessages = () => {
      messagesContainer.innerHTML = "";

      const messages = game.getMessages();

      messages.forEach((message) => {
        const messageDiv = document.createElement("div");
        messageDiv.textContent = message;

        messagesContainer.appendChild(messageDiv);
      });
    };

    const removeSquareEvents = () => {
      squareContainers.forEach((square) => {
        square.removeEventListener("click", clickHandlerSquare);
      });
    };

    const updateScreen = () => {
      if (game.isEnd()) removeSquareEvents();
      updateSquares();
      updateMessages();
    };

    const clickHandlerSquare = (e) => {
      const squareid = e.target.dataset.squareid;

      game.runRound(squareid);
      updateScreen();
    };

    squareContainers.forEach((square) => {
      square.addEventListener("click", clickHandlerSquare);
    });

    updateScreen();

    return {};
  }

  createRenderer(createGame());
})();
