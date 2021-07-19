let deckID;

function newGame(e) {
    e.preventDefault();
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
            deckID = data.deck_id;
        })
}

document.getElementById('newGameButton').addEventListener('click', newGame);

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
        })
}

document.getElementById('drawButton').addEventListener('click', draw);
