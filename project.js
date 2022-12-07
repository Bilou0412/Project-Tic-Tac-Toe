(game = ()=>{
    let board;
    let roundNumber = 0;
    let player1;
    let player2;
    let finish = 0;

    const domElement = (()=>{
        const userInstuction = document.querySelector(".alert");
        const turn = document.querySelector(".turn");
        const allCell = document.querySelectorAll('.cell');
        const startBtn = document.querySelector('#start');
        const name1 = document.getElementById("name1");
        const name2 = document.getElementById("name2");
        const selectOption = document.querySelector('.selectOption');
        return{
            userInstuction,
            allCell,
            startBtn,
            name1,
            name2,
            selectOption,
            turn
        }
    })();
    
    (start = () =>{
        domElement.startBtn.addEventListener('click',()=>{
            if(formVerify()== true && finish == 0){
                player1 = player(domElement.name1.value,"X");
                player2 = player(domElement.name2.value,"O");
                play();
            }else{
                domElement.selectOption.style.cssText = 'visibility: visible;';
                domElement.startBtn.textContent='Start';
                domElement.turn.textContent =""
                resetBoard();
                getBoard();
                roundNumber = 0;
                finish = 0;
            }
        })
    })()

    const play = () =>{
        for(let cell of domElement.allCell){
            cell.addEventListener('click',function(e){
                if(finish == 0){
                    if(roundNumber%2 == 0){
                        cell.innerHTML = `${player1.marker}`;
                        getBoard();
                        roundNumber++;
                        displayTurn();
                        checkWinner(player1.name);
                    }
                    else{
                        cell.innerHTML = `${player2.marker}`;
                        getBoard();
                        roundNumber++;
                        displayTurn();
                        checkWinner(player2.name);
                    }
                }
            },{once:true})
        }displayTurn();
    }

    const displayTurn = ()=>{
        if(roundNumber%2 == 0){
            domElement.turn.textContent =`${player1.name} Turn` 
        }else{
            domElement.turn.textContent =`${player2.name} Turn`
        }
    }

    const checkWinner = (name)=>{
        if(
            (((board[0] == board[1] & board[0] == board[2])&&(board[0] != "")))||
            (((board[3] == board[4] & board[3] == board[5])&&(board[3] != "")))||
            (((board[6] == board[7] & board[6] == board[8])&&(board[6] != "")))
        ){
            domElement.turn.textContent =`${name} WIN`
            domElement.startBtn.textContent='Restart'
            finish = 1;
        }else if(
            (((board[0] == board[3] & board[0] == board[6])&&(board[0] != "")))||
            (((board[1] == board[4] & board[1] == board[7])&&(board[1] != "")))||
            (((board[2] == board[5] & board[2] == board[8])&&(board[2] != "")))
        ){
            domElement.turn.textContent =`${name} WIN`
            domElement.startBtn.textContent='Restart'
            finish = 1;
        }else if(
            (((board[2] == board[4]& board[2] == board[6] )&&(board[2] != "")))||
            (((board[0] == board[4]& board[0] == board[8] )&&(board[0] != "")))
        ){
            domElement.turn.textContent =`${name} WIN`
            domElement.startBtn.textContent='Restart'
            finish = 1;
        }else if(roundNumber == 9 ){
            domElement.turn.textContent =`TIE`
            domElement.startBtn.textContent='Restart'
            finish = 1;
        }
}

    const formVerify =(()=>{
        if(domElement.name1.value != "" && domElement.name2.value != ""){
            domElement.selectOption.style.cssText = 'visibility: hidden;';
            domElement.userInstuction.style.cssText = 'visibility: hidden;';
            return true;
        }
        else{
            domElement.userInstuction.style.cssText = 'visibility: visible;';
            return false;
        }
    })
    
    
    const player = (name,marker) =>{
        return{
            name,
            marker,
        };
    }   
    
    const getBoard = (()=>{
        board = [];
        domElement.allCell.forEach((cell)=>{board.push(cell.textContent);});
    })
    const resetBoard = (()=>{
        board = [];
        domElement.allCell.forEach((cell)=>{cell.textContent=""});
    })

})()




