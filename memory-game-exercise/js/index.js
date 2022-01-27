/**
 * koppla ihop varje kort med en knapptryckning, klick = vänd kortet
 * om kort1 equals kort2, spara dessa uppvända
 * om kort1 != kort2, vänd tillbaka 
 */

const cardElem = document.querySelectorAll('.memory-card');
const backCardElem = document.querySelectorAll('.back');
const frontCardElem = document.querySelectorAll('.front')
const winElem = document.querySelector('.overlay');
const clickHere = document.querySelectorAll('.memory-cards');

let firstCardElem;
let firstClick;
let foundPairs = [];
let wrongMatch = [];


for(let i = 0; i < cardElem.length; i++) {
    backCardElem[i].addEventListener(`click`, ()=> {

        flipCard([cardElem[i]]);
        

        // let clickedCard = cardElem[i].getAttribute('data-card');

        compareCards(cardElem[i]);


    })

};

function flipCard(flip) {
    for(let i = 0; i < flip.length; i++) {
        flip[i].classList.toggle('flip');
    }
}


function howManyPairs(win) {
    if(foundPairs.length / 2 == 8) {
        win.classList.add('show');
    }
}

function compareCards(clickedCard) {
    let activeValue = clickedCard.getAttribute('data-card');

    if(firstClick) {

        if(firstClick == activeValue) {

            foundPairs.push(firstClick, activeValue);

            firstClick = '';

            console.log(`du har hittat ${foundPairs.length / 2} par!`);
            howManyPairs(winElem);
            return foundPairs;
        } 
        else {
            wrongMatch.push(firstClick, activeValue);
            console.log(wrongMatch)
            if(wrongMatch[0] != wrongMatch[1]) {
                console.log('feeeel');

                
        
                // clickHere.addEventListener(`click`, () => {
                //     flipCard(firstCardElem, clickedCard);
                //     firstCardElem = '';
                // })
            }
            
            // setTimeout(function() { flipCard([firstCardElem, clickedCard])}, 4000);
            // firstCardElem = '';
        }   
    } 
    else {
        firstClick = activeValue;
        firstCardElem = clickedCard;
    }
}

