/**
 * shuffla korten vid sidladdning
 * 
 * välj ett kort, flippa, spara värdet i flippedCards
 * välj ett till kort, flippa, spara värdet i flippedCards
 * jämför de två värderna i flippedCards
 * OM lika, pusha till hittadePar och (ta bort från skärmen), ta bort sparade värden flippedCards
 * OM fel, vänd tillbaka, ta bort sparade värden från flippedCards
 * när hittadePar = 8, DU VANN
 * knapp: Spela igen? - reset 
 * knapp: X - stäng overlay
 */

 const allCards = document.querySelector('.memory-cards')
 const cardElem = document.querySelectorAll('.memory-card');
 const backCardElem = document.querySelectorAll('.back');
 const frontCardElem = document.querySelectorAll('.front')
 const winElem = document.querySelector('.overlay');
 const closeElem = document.querySelector('.close')

 let flippedCards = []
 let foundPairs = []

 closeElem.addEventListener(`click`, () => {
    winElem.classList.remove('show')
})

// for (let i = allCards.children.length; i >= 0; i--) {
//     allCards.appendChild(allCards.children[Math.random() * i | 0]);
// }


 function flipCard(flip) {
    for(let i = 0; i < flip.length; i++) {
        flip[i].classList.toggle("flip");
    }
}

function compareCards() {
    if(flippedCards.length == 4) {

        console.log('nu jämför vi');

        if(flippedCards[0] == flippedCards[2]) {
            console.log('det är ett par')
            foundPairs.push(flippedCards[0], flippedCards[2]);
            console.log(foundPairs);
            flippedCards = [];
            console.log(flippedCards);
        }
        else {
            setTimeout(function() { flipCard([flippedCards[1], flippedCards[3]]), flippedCards = [];}, 1500);
            console.log('inget par', flippedCards)
            
        }
    }
}

function howManyPairs() {
    if(foundPairs.length / 2 == 8) {
        winElem.classList.add('show');
    }
}


 for(let i = 0; i < backCardElem.length; i++) {
     backCardElem[i].addEventListener(`click`, () => {
         
         flipCard([cardElem[i]]);

         flippedCards.push(cardElem[i].dataset.card , cardElem[i]);
         console.log(flippedCards);
         

         compareCards();
         howManyPairs();
     })
 }



