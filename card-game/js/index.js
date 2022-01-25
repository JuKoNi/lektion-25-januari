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

let deck = createDeck();
console.table(deck);
let picked = pickCard();
showCard(picked);

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
    console.log('Valt kort:', pickedCard[0]);

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