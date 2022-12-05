

const player = () =>{
    const hiddenInput =(()=>{
        const selectOption = document.querySelector('.selectOption')
        selectOption.style.cssText = 'visibility: hidden;';
    })();
    const createPlayer = (name,mark) =>{
        return{name,mark};
    }
    const name1 = document.getElementById("name1").value
    const name2 = document.getElementById("name2").value;
    const player1 = createPlayer(name1,"x");
    const player2 = createPlayer(name2,"o");

return {player1,player2};
};

const gameBoard = (()=>{
    let board = [];
    let count = 0;
    const getBoard = () =>{
        board = [];
        allCell.forEach((cell)=>{board.push(cell.textContent);})
        return board;
    }
    
    const roundNumber = ()=>{
        return count++;
    };
    const play = () =>{
        for(let cell of allCell){
            cell.addEventListener('click',function(e){
                    if(roundNumber()%2 == 0){
                        cell.innerHTML = `${player().player1.mark}`;
                    }else{
                        cell.innerHTML = `${player().player2.mark}`;
                    }
                    getBoard();
            },{once:true})
        }
    }
    const allCell = document.querySelectorAll('.cell');
    const start =document.querySelector('#start')
    start.addEventListener('click',function(){
        player();
        play();
    });
    return{getBoard,roundNumber};
})();