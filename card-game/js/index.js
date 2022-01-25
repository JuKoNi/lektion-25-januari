/**
Enkelt kortspel där spelaren gissar om nästa kort som dras ur högen
är högre, lägre eller likvärdigt. Poäng ges vid rätt gissning. 
Spelet är slut när kortleken är slut, eller man gissat fel 3 ggr.
*/

/*
1. Generera en kortlek
2. Välj ett slumpmässigt kort och ta bort kortet ur kortleken
3. Visa det valda kortet i gränssnittet
4. Knappar för att kunna välja lägre, likvärdigt eller högre och spara val
5. Kontrollera användarens val mot det slumpade kortet
6. Uppdatera poäng om användaren gissade rätt
7. Uppdatera försök om användaren gissade fel
8. Avgöra när spelet är slut
*/

const lowerButton = document.querySelector('#lower');
const equalButton = document.querySelector('#equal');
const higherButton = document.querySelector('#higher');
const scoreElem = document.querySelector('.score');
const attemptsElem = document.querySelector('.attempts');
const cardCountElem = document.querySelector('.left');
const gameOverElem = document.querySelector('#gameover');

let attempts = 3;
let activeCard = {};
let previousCard = {};
let score = 0;

let deck = createDeck();
console.table(deck);
let picked = pickCard();
console.log('Valt kort: ', picked);
showCard(picked);

lowerButton.addEventListener('click', lower);
equalButton.addEventListener('click', equal);
higherButton.addEventListener('click', higher);

function createDeck() {
    let deck = [];
    const suits = ['&spades;', '&hearts;', '&clubs;', '&diams;'];

    for(let i = 0; i < suits.length; i++) { // Loopa igenom varje färg
        for(let j = 2; j < 15; j++) { // För varje färg loopa och skapa kort från värde 2 - 14
            
            let card = {
                suit: suits[i],
                color: getColor(suits[i]),
                display: getDisplay(j),
                value: j
            };

            deck.push(card);
        }
    }

    function getColor(suit) {
        if (suit == '&hearts;' || suit == '&diams;') {
            return 'red';
        } else {
            return 'black';
        }
    }

    function getDisplay(value) {
        if (value < 11) { return value; }
        else if (value == 11) { return 'J'; }
        else if (value == 12) { return 'D'; }
        else if (value == 13) { return 'K'; }
        else if (value == 14) { return 'A';}
    }

    return deck;
}

function pickCard() {
    const randomPosition = Math.floor(Math.random() * deck.length);
    const pickedCard = deck.splice(randomPosition, 1); //Ta bort kortet från arrayen och returnerade det borttagna kortet

    //Sätt aktivt kort för jämförelse
    activeCard = pickedCard[0];
    
    updateCardCount();

    return pickedCard[0];
}

function showCard(card) {
    const cardHolderElem = document.querySelector('#show-card');

    cardHolderElem.innerHTML = 
        `<section class="front">
            <header><span class="${card.color}">${card.suit}</span>${card.display}</header>
            <div class="suite ${card.color}">${card.suit}</div>
            <footer><span class="${card.color}">${card.suit}</span>${card.display}</footer>
        </section>
        <section class="back"></section>
        `;
}

function lower() {
    if (deck.length > 0 && attempts > 0) {
        /** Spellogik
         * Spara nuvarande slumpade korts värde
         * Välj lägre, lika med eller högre
         * Slumpa ett nytt kort och visa i gränssnittet
         * Spara det nya slumpade kortets värde
         * Jämför det nya slumpade kortets värde med förgående kortets värde
         */
        previousCard = activeCard;

        picked = pickCard();
        showCard(picked);
        console.log('Tidigare kort: ', previousCard);
        console.log('Nuvarande kort: ', activeCard);

        if (activeCard.value < previousCard.value) {
            //Ifall användaren gissade rätt
            updateScore();
        } else {
            //Ifall användaren gissade fel
            updateAttempts();
        }
    } else {
        gameOverElem.classList.add('show');
    }
}

function equal() {
    if (deck.length > 0 && attempts > 0) {
        /** Spellogik
         * Spara nuvarande slumpade korts värde
         * Välj lägre, lika med eller högre
         * Slumpa ett nytt kort och visa i gränssnittet
         * Spara det nya slumpade kortets värde
         * Jämför det nya slumpade kortets värde med förgående kortets värde
         */
        previousCard = activeCard;

        picked = pickCard();
        showCard(picked);
        console.log('Tidigare kort: ', previousCard);
        console.log('Nuvarande kort: ', activeCard);

        if (activeCard.value == previousCard.value) {
            //Ifall användaren gissade rätt
            updateScore();
        } else {
            //Ifall användaren gissade fel
            updateAttempts();
        }
    } else {
        gameOverElem.classList.add('show');
    }
}

function higher() {
    if (deck.length > 0 && attempts > 0) {
        /** Spellogik
         * Spara nuvarande slumpade korts värde
         * Välj lägre, lika med eller högre
         * Slumpa ett nytt kort och visa i gränssnittet
         * Spara det nya slumpade kortets värde
         * Jämför det nya slumpade kortets värde med förgående kortets värde
         */
        previousCard = activeCard;

        picked = pickCard();
        showCard(picked);
        console.log('Tidigare kort: ', previousCard);
        console.log('Nuvarande kort: ', activeCard);

        if (activeCard.value > previousCard.value) {
            //Ifall användaren gissade rätt
            updateScore();
        } else {
            //Ifall användaren gissade fel
            updateAttempts();
        }
    } else {
        gameOverElem.classList.add('show');
    }
}

function updateScore() {
    score = score + 100;
    scoreElem.innerHTML = score;
}

function updateAttempts() {
    attempts--;
    attemptsElem.innerHTML = attempts;

    if (attempts == 0) {
        gameOverElem.classList.add('show');
    }
}

function updateCardCount() {
    cardCountElem.innerHTML = `${deck.length} kort kvar`
}