let deckID;

function newDeck(e) {
    e.preventDefault();
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
        .then(res => res.json())
        .then(data => {
            deckID = data.deck_id;
        })
}

document.getElementById('newDeckButton').addEventListener('click', newDeck);

function draw(e) {

    e.preventDefault();
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckID}/draw/?count=2`)
        .then(res => res.json())
        .then(data => console.log(data.cards))
}

document.getElementById('drawButton').addEventListener('click', draw);