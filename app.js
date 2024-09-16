let userScore = 0;
let compScore = 0;
let maxRounds = 5;  

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorepara = document.querySelector("#user-score");
const compScorepara = document.querySelector("#comp-score");
const resultMsg = document.querySelector("#result-msg");
const resetBtn = document.querySelector("#reset-btn");

const genCompChoice = () => {
    let options = ["rock", "paper", "scissors"];
    const random = Math.floor(Math.random() * 3);
    return options[random];
}

const draw = () => {
    msg.innerText = "Game was a tie, play again!";
    msg.style.backgroundColor = "black";
}

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorepara.innerText = userScore;
        msg.innerText = `You win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorepara.innerText = compScore;
        msg.innerText = `You lost! ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
}

const checkGameEnd = () => {
    if (userScore === maxRounds) {
        resultMsg.innerText = "Congratulations! You won the game!";
        resultMsg.style.color = "green";
        disableChoices();
    } else if (compScore === maxRounds) {
        resultMsg.innerText = "Sorry! Computer won the game!";
        resultMsg.style.color = "red";
        disableChoices();
    }
}

const disableChoices = () => {
    choices.forEach(choice => {
        choice.style.pointerEvents = "none";
    });
}

const enableChoices = () => {
    choices.forEach(choice => {
        choice.style.pointerEvents = "auto"; 
    });
}

const playGame = (userChoice) => {
    const compChoice = genCompChoice();
    if (userChoice === compChoice) {
        draw();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
        checkGameEnd(); 
    }
}

choices.forEach(choice => {
    choice.addEventListener("click", () => {
        if (userScore < maxRounds && compScore < maxRounds) {
            const userChoice = choice.getAttribute("id");
            playGame(userChoice);
        }
    });
});

resetBtn.addEventListener("click", () => {
    userScore = 0;
    compScore = 0;
    userScorepara.innerText = userScore;
    compScorepara.innerText = compScore;
    msg.innerText = "Choose your move!";
    msg.style.backgroundColor = "";
    resultMsg.innerText = "";
    enableChoices();  
});
