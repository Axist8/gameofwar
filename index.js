let deckID;
const newGameBtn = document.getElementById('newGameButton');
const cardsRemaining = document.getElementById('cardsRemaining');
const drawBtn = document.getElementById('drawButton');

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
}

newGameBtn.addEventListener('click', newGame);

function determineRoundWinner(firstCard, secondCard) {
    const cardTypeArray = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'];
    const firstCardValue = cardTypeArray.findIndex(card => card === `${firstCard.value}`);
    console.log(firstCardValue);
    const secondCardValue = cardTypeArray.findIndex(card => card === `${secondCard.value}`);
    if (firstCardValue > secondCardValue) {
        return 'Lose'
    } else if (secondCardValue > firstCardValue) {
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
            document.getElementById('roundWinner').innerText = `${roundWinner}`
            cardsRemaining.innerText = `${data.remaining}`
            if (data.remaining === 0) {
                drawBtn.disabled = true;
                drawBtn.classList.add('disable');
            }
        })
}

drawBtn.addEventListener('click', draw);


