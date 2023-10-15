
let currentUtterance = null; // Track the currently speaking utterance


//----------------------------------------------------------------------------------------------
//using [SpeechSynthesisUtterance] interface of the [Web Speech API]


function speakContent(text) {
    let utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.pitch = 1.2;
    utterance.rate = 0.8;
    let voices = window.speechSynthesis.getVoices();
    let selectedVoice = voices.find(voice => voice.name === "Google UK English Male");
    
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    } else {
        // utterance.voice = voices[0];
        console.log('123');
    }
    
    currentUtterance = utterance; // Update the currently speaking utterance
    window.speechSynthesis.speak(utterance);
}

//----------------------------------------------------------------------------------------------

const contextElement = document.querySelector('.context');
let currentContentIndex = 0;

/*
    display animal guide
*/

var animalGuideColor = "orange";
var animalGuideAccessory = "";

function displayAnimalGuide(color, accessory) {
    const dressCode = color + accessory;

    const animalGuideContainer = document.getElementById("animal-guide");
    animalGuideContainer.innerHTML = ``;
    const animalGuide = document.createElement("img");

    animalGuide.style.height = "350px";
    animalGuide.setAttribute("id", "animalGuide-image")
    animalGuide.setAttribute("src", appearances[dressCode][1]);
    animalGuideContainer.appendChild(animalGuide);
}

/*
    display closet    
*/
const colors = {
  red: ["red", "img/closet/Kangaroo_red.svg"],
  grey: ["grey","img/closet/Kangaroo_grey.svg"],
  brown: ["brown", "img/closet/Kangaroo_brown.svg"],
  orange: ["orange", "img/closet/Kangaroo_orange.svg"]
}

const accessories = {
  earring: ["earring", "img/closet/earring.svg"],
  purse: ["purse", "img/closet/purse.svg"]
};

const appearances = {
    red: ["red", "img/closet/Kangaroo_red.svg"],
    grey: ["grey","img/closet/Kangaroo_grey.svg"],
    brown: ["brown", "img/closet/Kangaroo_brown.svg"],
    orange: ["orange", "img/closet/Kangaroo_orange.svg"],
    redearring: ["redEarring", "img/closet/Kangaroo_red_earring.svg"],
    greyearring: ["greyEarring", "img/closet/Kangaroo_grey_earring.svg"],
    brownearring: ["brownEarring", "img/closet/Kangaroo_brown_earring.svg"],
    orangeearring: ["orangeEarring", "img/closet/Kangaroo_orange_earring.svg"],
    redpurse: ["Redpurse", "img/closet/Kangaroo_red_purse.svg"],
    greypurse: ["greypurse", "img/closet/Kangaroo_grey_purse.svg"],
    brownpurse: ["brownpurse", "img/closet/Kangaroo_brown_purse.svg"],
    orangepurse: ["orangepurse", "img/closet/Kangaroo_orange_purse.svg"]
};

// display the color tab of the closet
function displayColor() {  
    const closetColorContainer = document.getElementById("closet");
    closetColorContainer.innerHTML = ``;
  
    for (let i = 0; i < Object.keys(colors).length; i++) {
        const closetColor = document.createElement("button");
        closetColor.setAttribute("id", Object.keys(colors)[i])
        closetColor.classList.add("closet-color");
        closetColor.classList.add("me-4");
        closetColor.style.backgroundColor = Object.keys(colors)[i];

        closetColorContainer.appendChild(closetColor);

        // click the color, the animal guide will change color
        document.getElementById(Object.keys(colors)[i]).addEventListener("click", function() {

            if (Object.keys(colors)[i] == colors.red[0]) {
                animalGuideColor = "red";
            } else if (Object.keys(colors)[i] == colors.grey[0]) {
                animalGuideColor = "grey";
            } else if (Object.keys(colors)[i] == colors.brown[0]) {
                animalGuideColor = "brown";
            } else if (Object.keys(colors)[i] == colors.orange[0]) {
                animalGuideColor = "orange";
            };

            displayAnimalGuide(animalGuideColor, animalGuideAccessory);
        });
    };
}

// display the accessory tab of the closet
function displayAccessory() {
    const closetAccessoryContainer = document.getElementById("closet");
    closetAccessoryContainer.innerHTML = ``;

    for (let i = 0; i < Object.keys(accessories).length; i++) {
        const closetAccessory = document.createElement("img");
        closetAccessory.setAttribute("id", Object.keys(accessories)[i]);
        closetAccessory.classList.add("closet-accessory");
        closetAccessory.classList.add("me-4", "p-0");
        closetAccessory.setAttribute("src", accessories[Object.keys(accessories)[i]][1]);
        closetAccessory.style.width = "50px";
        closetAccessory.style.height = "50px";
        
        closetAccessoryContainer.appendChild(closetAccessory);

        // click the accessory, the animal will wear the accessory
        document.getElementById(Object.keys(accessories)[i]).addEventListener("click", function() {

            if (Object.keys(accessories)[i] == accessories.earring[0]) {
              var animalGuideAccessory = "earring";
            } else if (Object.keys(accessories)[i] == accessories.purse[0]) {
              var animalGuideAccessory = "purse";
            };

            displayAnimalGuide(animalGuideColor, animalGuideAccessory);
        });
    }
}

// function startJourney() {
//     let guideImage = document.getElementById("animalGuide-image").getAttribute("src");
//     window.location.href = `General_info.html?guideImage=${encodeURIComponent(guideImage)}`;
// }


/* main flow */
$(document).ready(function() {
    if (window.location.href.includes("outfit.html")) {
        displayAnimalGuide(animalGuideColor, animalGuideAccessory);
        displayColor();
    }
});