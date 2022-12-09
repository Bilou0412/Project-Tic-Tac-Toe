function player(name, mark) {
  return {
    name,
    mark,
  };
}

const game = (() => {
  let board = [];
  let roundNumber = 0;

  const domElement = (() => {
    const userInstruction = document.querySelector('.alert');
    const turn = document.querySelector('.turn');
    const allCell = document.querySelectorAll('.cell');
    const startBtn = document.querySelector('#start');
    const name1 = document.getElementById('name1');
    const name2 = document.getElementById('name2');
    const selectOption = document.querySelector('.selectOption');
    const finish = document.querySelector('.finish');
    const gameOver = document.querySelector('.gameOver');
    const restartBtn = document.querySelector('#restart');
    return {
      userInstruction,
      allCell,
      startBtn,
      name1,
      name2,
      selectOption,
      turn,
      finish,
      gameOver,
      restartBtn,
    };
  })();

  const player1 = player('', 'X');
  const player2 = player('', 'O');

  const updatePlayerName = () => {
    player1.name = domElement.name1.value;
    player2.name = domElement.name2.value;
  };

  const updateBoard = () => {
    board = [];
    domElement.allCell.forEach((cell) => {
      board.push(cell.textContent);
    });
  };

  const resetBoard = () => {
    board = [];
    domElement.allCell.forEach((cell) => {
      cell.textContent = '';
    });
  };

  const checkWinner = (currentPlayer) => {
    if (
      (((board[0] === board[1] && board[0] === board[2]) && (board[0] !== '')))
        || (((board[3] === board[4] && board[3] === board[5]) && (board[3] !== '')))
        || (((board[6] === board[7] && board[6] === board[8]) && (board[6] !== '')))
    ) {
      domElement.finish.textContent = `${currentPlayer.name} WIN`;
      domElement.gameOver.style.cssText = 'visibility: visible;';
    } else if (
      (((board[0] === board[3] && board[0] === board[6]) && (board[0] !== '')))
        || (((board[1] === board[4] && board[1] === board[7]) && (board[1] !== '')))
        || (((board[2] === board[5] && board[2] === board[8]) && (board[2] !== '')))
    ) {
      domElement.finish.textContent = `${currentPlayer.name} WIN`;
      domElement.gameOver.style.cssText = 'visibility: visible;';
    } else if (
      (((board[2] === board[4] && board[2] === board[6]) && (board[2] !== '')))
        || (((board[0] === board[4] && board[0] === board[8]) && (board[0] !== '')))
    ) {
      domElement.finish.textContent = `${currentPlayer.name} WIN`;
      domElement.gameOver.style.cssText = 'visibility: visible;';
    } else if (roundNumber === 8) {
      domElement.finish.textContent = 'TIE';
      domElement.gameOver.style.cssText = 'visibility: visible;';
    }
  };

  const displayForm = () => {
    domElement.selectOption.style.cssText = 'visibility: visible;';
  };
  const hiddenForm = () => {
    domElement.selectOption.style.cssText = 'visibility: hidden;';
  };

  const displayTurn = () => {
    let currentPlayer;
    if (roundNumber % 2 === 0) {
      domElement.turn.textContent = `${player1.name} Turn`;
      currentPlayer = player1;
    } else {
      domElement.turn.textContent = `${player2.name} Turn`;
      currentPlayer = player2;
    }
    return currentPlayer;
  };

  const formVerify = () => {
    let form;
    if (domElement.name1.value !== '' && domElement.name2.value !== '') {
      domElement.userInstruction.style.cssText = 'visibility: hidden;';
      form = true;
    } else {
      domElement.userInstruction.style.cssText = 'visibility: visible;';
      form = false;
    }
    return form;
  };
  const controlTheFlow = (name) => {
    checkWinner(name);
    roundNumber += 1;
    displayTurn();
  };

  const listenBoardBtn = (() => {
    let currentPlayer;
    domElement.allCell.forEach((cell) => {
      cell.addEventListener('click', () => {
        if (cell.textContent === '') {
          console.log(cell.textContent);
          currentPlayer = displayTurn();
          cell.innerHTML = `${currentPlayer.mark}`;
          updateBoard();
          controlTheFlow(currentPlayer);
        }
      });
    });
  })();

  const listenRestartBtn = (() => {
    domElement.restartBtn.addEventListener('click', () => {
      domElement.gameOver.style.cssText = 'visibility: hidden;';
      displayForm();
      resetBoard();
      updateBoard();
      roundNumber = 0;
    });
  })();

  const listenStartBtn = (() => {
    domElement.startBtn.addEventListener('click', () => {
      if (formVerify()) {
        updatePlayerName();
        hiddenForm();
        displayTurn();
      }
    });
  })();
})();
