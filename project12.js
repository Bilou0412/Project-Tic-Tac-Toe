

const player = () =>{
    const hiddenInput =(()=>{
        const selectOption = document.querySelector('.selectOption')
        selectOption.style.cssText = 'visibility: hidden;';
    })();
    const createPlayer = (name,mark) =>{
        return{name,mark};
    }
    const name1 = document.getElementById("name1").value;
    const name2 = document.getElementById("name2").value;
    const player1 = createPlayer(name1,"x");
    const player2 = createPlayer(name2,"o");

return {player1,player2};
};

const formVerify =(()=>{
    const name1 = document.getElementById("name1").value;
    const name2 = document.getElementById("name2").value;
    if(name1 != "" && name2 != ""){
        return true
    }
    else{
        return false
    }
})

const gameBoard = (()=>{
    let board = [];
    let count = 0;
    const getBoard = () =>{
        board = [];
        allCell.forEach((cell)=>{board.push(cell.textContent);})
        return board;
    }
    
    const play = () =>{
        
        for(let cell of allCell){
            cell.addEventListener('click',function(e){
                    if(count%2 == 0){
                        cell.innerHTML = `${player().player1.mark}`;
                        getBoard();
                        displayTurn();
                        checkWinner(player().player1.name);
                        count++;
                    }else{
                        cell.innerHTML = `${player().player2.mark}`;
                        getBoard();
                        displayTurn();
                        checkWinner(player().player2.name);
                        count++;
                    }
            },{once:true})
        }displayTurn();
    }
    const turn = document.querySelector(".turn");
    const checkWinner = (name)=>{
            if(
                (((board[0] == board[1] & board[0] == board[2])&&(board[0] != "")))||
                (((board[3] == board[4] & board[3] == board[5])&&(board[3] != "")))||
                (((board[6] == board[7] & board[6] == board[8])&&(board[6] != "")))
            ){
                console.log("win 3 in a row")
                console.log(name)
                turn.textContent =`${name} WIN`
            }else if(
                (((board[0] == board[3] & board[0] == board[6])&&(board[0] != "")))||
                (((board[1] == board[4] & board[1] == board[7])&&(board[1] != "")))||
                (((board[2] == board[5] & board[2] == board[8])&&(board[2] != "")))
            ){
                console.log("win 3 in a column")
                console.log(name)
                turn.textContent =`${name} WIN`
            }else if(
                (((board[2] == board[4]& board[2] == board[6] )&&(board[2] != "")))||
                (((board[0] == board[4]& board[0] == board[8] )&&(board[0] != "")))
            ){
                console.log("win 3 in a diagonal")
                console.log(name)
                turn.textContent =`${name} WIN`
            }else if(count == 8 ){
                console.log("Tie")
                turn.textContent =`TIE`
            }
    }
    const displayTurn = ()=>{
        if(count%2 == 0){
            turn.textContent =`${player().player1.name} Turn` 
        }else{
            turn.textContent =`${player().player2.name} Turn`
        }
    }
    const allCell = document.querySelectorAll('.cell');
    const start = document.querySelector('#start')
    start.addEventListener('click',function(){
        if (formVerify() == true){
            player();
            play();    
        }
        
    });
    return{getBoard};
})();