const allCell = document.querySelectorAll('.cell');
getPlayer = (player,mark)=>{
        return {player,mark};
};
const player1 = getPlayer("player1","x");
const player2 = getPlayer("player2","o");

const gameBoard = (()=>{
    let board = [];
    let count = 0;
    const getBoard = () =>{
        board = []
        allCell.forEach((cell)=>{board.push(cell.textContent);})
        return board;
    }
    
    const roundNumber=()=>{
        return count++;
    };
    for(let cell of allCell){
        cell.addEventListener('click',function(e){
            if(roundNumber()%2 == 0){
                cell.innerHTML = `${player1.mark}`
            }else{
                cell.innerHTML = `${player2.mark}`
            }
            getBoard();
        },{once:true})
    }
    return{getBoard,roundNumber}
})();

