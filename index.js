/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    for(let index=0; index<games.length; index++) {
       let gameCard = document.createElement('div')
       gameCard.classList.add("game-card");

       const gameObj = ` 
       <img class="game-img" src=${games[index]["img"]} />
       <h4>${games[index]["name"]}</h4>
       <p>${games[index]["description"]}</p>    
     ` 

       gameCard.innerHTML = gameObj
       gamesContainer.appendChild(gameCard)
   }
}
addGamesToPage(GAMES_JSON)

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const contributions = GAMES_JSON.reduce((acc ,val)=>{
    return acc + val.backers
}, 0)
contributionsCard.innerHTML = contributions.toLocaleString('en-US');

// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc ,val)=>{
    return acc + val.pledged
}, 0)
// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString('en-US')}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.reduce((acc ,val)=>{
    return acc+=1
}, 0)
gamesCard.innerHTML = totalGames

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(value => value.pledged < value.goal)
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames)

  

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal

    const fundedGames = GAMES_JSON.filter(value => value.pledged >= value.goal)
    // use the function we previously created to add the unfunded games to the DOM
   
    addGamesToPage(fundedGames)

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON)
    // add all games from the JSON data to the DOM

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const count_unfunded_games = GAMES_JSON.filter(value => value.pledged < value.goal).length
console.log(count_unfunded_games)
// create a string that explains the number of unfunded games using the ternary operator
const templateString = `A total of $${totalRaised.toLocaleString('en-US')} has been raised for ${totalGames} games. Currently, ${count_unfunded_games} ${count_unfunded_games == 1 ? 'game remains' : 'games remain'} unfunded. We need your help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container
const displayMsg = document.createElement('p')
displayMsg.innerHTML =  templateString
descriptionContainer.appendChild(displayMsg)

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [first, second, ...rest] = sortedGames
// create a new element to hold the name of the top pledge game, then append it to the correct element
const firstGame = document.createElement('p')
firstGame.innerHTML = first.name
firstGameContainer.appendChild(firstGame)

// do the same for the runner up item
const secondGame = document.createElement('p')
secondGame.innerHTML = second.name
secondGameContainer.appendChild(secondGame)