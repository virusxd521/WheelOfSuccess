const the_phrase = document.querySelector("#phrase");
const ul = the_phrase.children[0];
const wheel_words = document.querySelector("#qwerty");
const scoreboard = document.querySelector("#scoreboard");
const start_game_button = document.querySelector(".btn__reset");
const overlay_div = document.querySelector("#overlay");
const keyrow = document.querySelectorAll(".keyrow"); 
const tries = document.querySelectorAll(".tries");
const titleOfOverlay = document.querySelector(".title");

let missed = 0;

const phrases = [
    "Back to Square One",
    "Cut To The Chase",
    "A Piece of Cake",
    "Haven't got a clue",
    "Grand slam"
];

start_game_button.addEventListener("click", event => {
    overlay_div.style.display = "none";
    if(overlay_div.classList[0] === "lose" || overlay_div.classList[0] === "win"){
        location.reload();
    }
    
});

function getRandomPhraseAsArray(arr){
    const charArr = [];
    charArr.push(arr[Math.floor(Math.random() * arr.length)]);
    const afterSplit = charArr[0].split(/(?= )/);
    let onlyLetters = [];
    for(let i = 0; i < afterSplit.length; i++){
        console.log(afterSplit, 2222);
        const space = " "
        
        console.log(afterSplit[i]);
        for(let j = 0; j < afterSplit[i].length; j++){    
            if(afterSplit[i][j].match(/[A-Za-z]|\s/)){
                onlyLetters.push(afterSplit[i][j].toLowerCase());
            }
            
        }
        
    }
    console.log(onlyLetters);
    return onlyLetters;
};

getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arr){
    const phrases_word = getRandomPhraseAsArray(arr);
    phrases_word.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        if(item !== " "){
            li.setAttribute("class", "letter");   
        } else {
            li.setAttribute("class", "space");   
        }
        return ul.appendChild(li);
        
    })
};

addPhraseToDisplay(phrases);

function checkLetter(event){
    const letter_elements = document.querySelectorAll(".letter");
    const letter_found = event.textContent;
    let the_chosen_element;
    for(let i = 0; i < letter_elements.length; i++){
        if(letter_found === letter_elements[i].textContent){
            // add the class show to the list item
            the_chosen_element = letter_elements[i];
            the_chosen_element.classList.add("show");
        } 
        
    }
    if(the_chosen_element){
        return the_chosen_element.textContent;
    } else {
        return null
    }
};

function removeTries(){
    missed += 1;
    for(let i = 0; i < missed; i++){
        if(tries[i] !== null &&
            tries[i].firstChild.src !== "./images/lostHeart.png"
            ){
            tries[i].firstChild.src = "./images/lostHeart.png";
        }
    }
}


wheel_words.addEventListener("click", event => {
    const theButton = event.target.textContent.trim();
    if(theButton !== "qwertyuiop"){
        for(let i = 0; i < keyrow.length; i++){
            let allButtons = keyrow[i].children;
            for(let j = 0; j < allButtons.length; j++){
                if(theButton === allButtons[j].textContent && 
                    allButtons[j].classList[0] !== "chosen"){
                        allButtons[j].setAttribute("class", "chosen");
                        let letterFound = checkLetter(allButtons[j]);
                        if(letterFound === null){
                            removeTries();
                        }
                    }
            }
        }
    }

    checkWin();
});

function checkWin(){
    const letters = document.querySelectorAll(".letter");
    const show = document.querySelectorAll(".show");    
    if(missed >= 5){
        overlay_div.setAttribute("class", "lose");
        overlay_div.style.display = "block";
        titleOfOverlay.textContent = `Sorry but you lost, try again!`;
        start_game_button.style.margin = "auto";
    } else if(letters.length ===  show.length){
        overlay_div.setAttribute("class", "win");
        titleOfOverlay.textContent = `Yay! you won the game.`;
        overlay_div.style.display = "block";
    }
};