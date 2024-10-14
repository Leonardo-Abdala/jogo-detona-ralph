const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelectorAll(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lifes: document.querySelector("#lifes"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition:0,
        result: 0,
        currentTime: 60,
        lifes: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 650),
        countDownTimerId: setInterval(countDown, 1000),
    }
}
function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        resetGame();
    }
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function resetGame(){

    alert("Game Over! O seu resultado foi: " + state.values.result);

    state.values.currentTime = 60;
    state.values.result = 0;
    state.view.score.textContent = state.values.result;
    

    state.values.lifes = 3;
    state.view.lifes.textContent = "x" + state.values.lifes;

}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
        if(square.id === state.values.hitPosition){
            state.values.result++;
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;
            playSound("hit");
        }else{
            state.values.lifes--;
            state.view.lifes.textContent = "x" + state.values.lifes;

            if(state.values.lifes <= 0){
                resetGame();
            }
        }
    });
});
    
}

function initialize(){
    addListenerHitBox();
}

initialize();