function player(name, mark) {
  return {
    name,
    mark,
  };
}

const game = (() =>{
  let board = [];
  let roundNumber = 0;
  let over;

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
    const iabtn = document.querySelector('.iabtn');
    const on = document.querySelector('.on');
    const off = document.querySelector('.off');

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
      iabtn,
      on,
      off,
    };
  })();

  const player1 = player('', 'X');
  const player2 = player('', 'O');

  const updatePlayerName = (status) => {
    if (status) {
      player1.name = domElement.name1.value;
      player2.name = 'ROBOT';
    } else {
      player1.name = domElement.name1.value;
      player2.name = domElement.name2.value;
    }
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

  const pushBoard = () => {
    domElement.allCell.forEach((cell) => {
      cell.textContent = board[cell.id];
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
      over = true;
    } else if (
      (((board[0] === board[3] && board[0] === board[6]) && (board[0] !== '')))
        || (((board[1] === board[4] && board[1] === board[7]) && (board[1] !== '')))
        || (((board[2] === board[5] && board[2] === board[8]) && (board[2] !== '')))
    ) {
      domElement.finish.textContent = `${currentPlayer.name} WIN`;
      domElement.gameOver.style.cssText = 'visibility: visible;';
      over = true;
    } else if (
      (((board[2] === board[4] && board[2] === board[6]) && (board[2] !== '')))
        || (((board[0] === board[4] && board[0] === board[8]) && (board[0] !== '')))
    ) {
      domElement.finish.textContent = `${currentPlayer.name} WIN`;
      domElement.gameOver.style.cssText = 'visibility: visible;';
      over = true;
    } else if (roundNumber === 8) {
      domElement.finish.textContent = 'TIE';
      domElement.gameOver.style.cssText = 'visibility: visible;';
      over = true;
    }
  };

  const displayForm = () => {
    domElement.selectOption.style.cssText = 'visibility: visible;';
  };
  const hiddenForm = () => {
    domElement.selectOption.style.cssText = 'visibility: hidden;';
  };

  const displayTurn = (status) => {
    let currentPlayer;
    if (roundNumber % 2 === 0 && status === false) {
      domElement.turn.textContent = `${player1.name} Turn`;
      currentPlayer = player1;
    } else if (roundNumber % 2 !== 0 && status === false) {
      domElement.turn.textContent = `${player2.name} Turn`;
      currentPlayer = player2;
    } else {
      domElement.turn.textContent = `You VS ${player2.name}`;
    }
    return currentPlayer;
  };

  const formVerify = (iaStatus) => {
    let form;
    if (domElement.name1.value !== '' && (domElement.name2.value !== '' || iaStatus === true)) {
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
    displayTurn(listenIaBtn());
  };

  const iaPlay = () => {
    const binaryBoard = board.filter(() => true);
    const isEmpty = (element) => element === '';
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 9; i++) {
      if (board[i] === 'X') {
        binaryBoard[i] = 5;
      } else if (board[i] === 'O') {
        binaryBoard[i] = 8;
      } else if (board[i] === '') {
        binaryBoard[i] = 1;
      }
    }

    const firstRow = [binaryBoard[0] * binaryBoard[1] * binaryBoard[2]];
    const secondRow = [binaryBoard[3] * binaryBoard[4] * binaryBoard[5]];
    const thirdRow = [binaryBoard[6] * binaryBoard[7] * binaryBoard[8]];

    const firstColumn = [binaryBoard[0] * binaryBoard[3] * binaryBoard[6]];
    const secondColumn = [binaryBoard[1] * binaryBoard[4] * binaryBoard[7]];
    const thirdColumn = [binaryBoard[2] * binaryBoard[5] * binaryBoard[8]];

    const firstDiagonal = [binaryBoard[0] * binaryBoard[4] * binaryBoard[8]];
    const secondDiagonal = [binaryBoard[2] * binaryBoard[4] * binaryBoard[6]];

    if (roundNumber < 1) {
      if (binaryBoard[4] === 1) {
        board[4] = 'O';
      } else {
        board[board.findIndex(isEmpty)] = 'O';
      }
    }
    if (firstColumn[0] === 64 || firstColumn[0] === 25) {
      if (binaryBoard[0] === 1) {
        board[0] = 'O';
      } else if (binaryBoard[3] === 1) {
        board[3] = 'O';
      } else if (binaryBoard[6] === 1) {
        board[6] = 'O';
      }
    } else if (secondColumn[0] === 64 || secondColumn[0] === 25) {
      if (binaryBoard[1] === 1) {
        board[1] = 'O';
      } else if (binaryBoard[4] === 1) {
        board[4] = 'O';
      } else if (binaryBoard[7] === 1) {
        board[7] = 'O';
      }
    } else if (thirdColumn[0] === 64 || thirdColumn[0] === 25) {
      if (binaryBoard[2] === 1) {
        board[2] = 'O';
      } else if (binaryBoard[5] === 1) {
        board[5] = 'O';
      } else if (binaryBoard[8] === 1) {
        board[8] = 'O';
      }
    } else if (firstDiagonal[0] === 64 || firstDiagonal[0] === 25) {
      if (binaryBoard[0] === 1) {
        board[0] = 'O';
      } else if (binaryBoard[4] === 1) {
        board[4] = 'O';
      } else if (binaryBoard[8] === 1) {
        board[8] = 'O';
      }
    } else if (secondDiagonal[0] === 64 || secondDiagonal[0] === 25) {
      if (binaryBoard[2] === 1) {
        board[2] = 'O';
      } else if (binaryBoard[4] === 1) {
        board[4] = 'O';
      } else if (binaryBoard[6] === 1) {
        board[6] = 'O';
      }
    } else if (firstRow[0] === 64 || firstRow[0] === 25) {
      if (binaryBoard[0] === 1) {
        board[0] = 'O';
      } else if (binaryBoard[1] === 1) {
        board[1] = 'O';
      } else if (binaryBoard[2] === 1) {
        board[2] = 'O';
      }
    } else if (secondRow[0] === 64 || secondRow[0] === 25) {
      if (binaryBoard[3] === 1) {
        board[3] = 'O';
      } else if (binaryBoard[4] === 1) {
        board[4] = 'O';
      } else if (binaryBoard[5] === 1) {
        board[5] = 'O';
      }
    } else if (thirdRow[0] === 64 || thirdRow[0] === 25) {
      if (binaryBoard[6] === 1) {
        board[6] = 'O';
      } else if (binaryBoard[7] === 1) {
        board[7] = 'O';
      } else if (binaryBoard[8] === 1) {
        board[8] = 'O';
      }
    } else if (roundNumber > 1) {
      board[board.findIndex(isEmpty)] = 'O';
    }
    pushBoard();
  };

  const listenIaBtn = (() => {
    let status = true;
    domElement.name2.setAttribute('disabled', '');
    domElement.iabtn.addEventListener('click', () => {
      if (status) {
        status = false;
        domElement.off.style.cssText = 'visibility: visible;';
        domElement.on.style.cssText = 'visibility: hidden;';
        domElement.name2.removeAttribute('disabled', '');
      } else {
        status = true;
        domElement.on.style.cssText = 'visibility: visible;';
        domElement.off.style.cssText = 'visibility: hidden;';
        domElement.name2.setAttribute('disabled', '');
        domElement.name2.value = '';
      }
    });
    const getStatus = () => status;
    return { getStatus };
  })();

  const listenBoardBtn = (() => {
    let currentPlayer;
    domElement.allCell.forEach((cell) => {
      cell.addEventListener('click', () => {
        if (cell.textContent === '' && listenIaBtn.getStatus() === false) {
          currentPlayer = displayTurn(listenIaBtn.getStatus());
          cell.innerHTML = `${currentPlayer.mark}`;
          updateBoard();
          checkWinner(currentPlayer);
          roundNumber += 1;
          displayTurn(listenIaBtn.getStatus());
        } else if (cell.textContent === '' && listenIaBtn.getStatus() === true) {
          cell.innerHTML = `${'X'}`;
          updateBoard();
          checkWinner(player1);
          if (over !== true) {
            iaPlay();
            checkWinner(player2);
            roundNumber += 2;
          }
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
      over = false;
      if (listenIaBtn.getStatus()) {
        domElement.off.style.cssText = 'visibility: hidden;';
        domElement.on.style.cssText = 'visibility: visible;';
      } else {
        domElement.on.style.cssText = 'visibility: hidden;';
        domElement.off.style.cssText = 'visibility: visible;';
      }
      roundNumber = 0;
    });
  })();

  const listenStartBtn = (() => {
    domElement.startBtn.addEventListener('click', () => {
      if (formVerify(listenIaBtn.getStatus())) {
        domElement.on.style.cssText = 'visibility: hidden;';
        domElement.off.style.cssText = 'visibility: hidden;';
        updatePlayerName(listenIaBtn.getStatus());
        hiddenForm();
        displayTurn(listenIaBtn.getStatus());
      }
    });
  })();
})();
