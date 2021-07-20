let deckID;
const newGameBtn = document.getElementById('newGameButton');
const cardsRemaining = document.getElementById('cardsRemaining');
const drawBtn = document.getElementById('drawButton');
const compScoreText = document.getElementById('computerScore');
const userScoreText = document.getElementById('userScore')
const roundWinnerText = document.getElementById('roundWinner');
let computerScore;
let userScore;

function newGame(e) {
    e.preventDefault();
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
            deckID = data.deck_id;
            cardsRemaining.innerText = `${data.remaining}`
        })
    drawBtn.classList.remove('disable');
    drawBtn.disabled = false;
    computerScore = 0;
    userScore = 0;
    compScoreText.innerText = 'Computer Score: 0';
    userScoreText.innerText = 'User Score: 0';
    roundWinnerText.innerText = '-'
}

window.addEventListener('DOMContentLoaded', newGame);
newGameBtn.addEventListener('click', newGame);

function determineRoundWinner(firstCard, secondCard) {
    const cardTypeArray = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];
    const firstCardValue = cardTypeArray.findIndex(card => card === `${firstCard.value}`);
    console.log(firstCardValue);
    const secondCardValue = cardTypeArray.findIndex(card => card === `${secondCard.value}`);
    if (firstCardValue > secondCardValue) {
        computerScore++
        return 'Lose'
    } else if (secondCardValue > firstCardValue) {
        userScore++
        return 'Win!'
    } else {
        return 'Tie'
    }
}

function draw(e) {

    e.preventDefault();
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckID}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            const cardOne = data.cards[0];
            const cardTwo = data.cards[1];
            document.getElementById('cardOne').innerHTML = `
                <img src="${cardOne.image}" alt="${cardOne.value} of ${cardOne.suit}" class="card" /> 
            `
            document.getElementById('cardTwo').innerHTML = `
                <img src="${cardTwo.image}" alt="${cardTwo.value} of ${cardTwo.suit}" class="card" /> 
            `
            const roundWinner = determineRoundWinner(cardOne, cardTwo);
            roundWinnerText.innerText = `${roundWinner}`
            cardsRemaining.innerText = `${data.remaining}`
            if (data.remaining === 0) {
                drawBtn.disabled = true;
                drawBtn.classList.add('disable');
                let winner;
                let finalScore;
                if (userScore > computerScore) {
                    winner = 'You Win!!';
                    finalScore = `${userScore} / ${computerScore}`;
                } else if (computerScore > userScore) {
                    winner = 'The Computer Wins!'
                    finalScore = `${computerScore} / ${userScore}`;
                } else if (computerScore === userScore) {
                    winner = "It's a Tie.."
                    finalScore = `${userScore} / ${computerScore}`;
                }
                userScoreText.innerText = `${winner}`;
                compScoreText.innerText = `${finalScore}`;
                return;
            }
            compScoreText.innerText = `Computer: ${computerScore}`;
            userScoreText.innerText = `User Score: ${userScore}`;
        })
        
}

drawBtn.addEventListener('click', draw);


