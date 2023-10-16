const blackMaskContainer = document.getElementById("black-mask");
blackMask();
var i = 0
displayDialog(1);

let currentImageIndex = 0; // Index of the current image to be displayed

let currentUtterance = null; // Track the currently speaking utterance
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
        utterance.voice = voices[0];
    }
    
    currentUtterance = utterance; // Update the currently speaking utterance
    window.speechSynthesis.speak(utterance);
}

//----------------------------------------------------------------------------------------------

const contextElement = document.querySelector('.context');
let currentContentIndex = 0;


const playSoundsButton = document.getElementById('next');

playSoundsButton.addEventListener('click', function () {
    // Get the content from the .context element
    const contextText = contextElement.textContent;

    // Speak the content
    speakContent(contextText);
});


/*
    hint for users (black mask)
*/
function blackMask() {
    blackMaskContainer.classList.add("black-mask");
}


/*
    next button for dialog
*/
function displayDialog(flow) {
    const dialogTutorial = [
        "I’m sure that you had a great journey today. Now we would like to know how you’ve learned about us.",
        "30 points rewarded for each correct answer. Have fun! (Click the picture)",
        "Congratulation, you already learn more about kangaroo. Let's learn other animal ! (Click the next button)"
    ]
    const text = document.getElementById("text");
    const next = document.getElementById("next");

    if (i == flow) {
        text.innerHTML = `
            ${dialogTutorial[flow]}
        `;
    }

    next.addEventListener("click", function() {

        for (i; i <= flow; i++) {
            text.innerHTML = `
                ${dialogTutorial[i]}
            `;

            if (i == 1) {
                blackMaskContainer.classList.remove("black-mask");
            }
        }

        if (i == 3) {
            window.location.href = "choose.html";
        }       
    });
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


/* 
    question
*/
// Create an object to store your questions
const questions = {
    question1: ["What is the largest species of kangaroo?", "Red Kangaroo"],
    question2: ["Which of the below moves that kangaroos can't do?", "Move Backwards"],
    question3: ["What is the food of kangaroos?", "Grass and Vegetable"]
};

// Create an object to store your image URLs
const optionImgLists = {
    option1Img: [
        "img/quiz/kangaroo/eastern_grey_kangaroo.jpg",    // (Burrell, 2022)
        "img/quiz/kangaroo/western_grey_kangaroo.jpg",    // (TrishansOz, 2022)
        "img/quiz/kangaroo/red_kangaroo.jpg"              // (NSW National Parks and Wildlife Service, n.d.)
    ],
    option2Img: [
        "img/quiz/kangaroo/hop.jpg",                      // (Phillips, n.d.)
        "img/quiz/kangaroo/swim.gif",                     // (Tarris, n.d.)
        "img/quiz/kangaroo/move_backwards.jpg"            // (Pappas, 2014)
    ],
    option3Img: [
        "img/quiz/kangaroo/grass.jpg",                    // (Oyunmedeg, 2018)
        "img/quiz/kangaroo/raw_meat.jpg",                 // (Hansen, 2020)
        "img/quiz/kangaroo/insect.jpg"                    // (Feller, 2018)
    ]
};

// Create an object to store your option text
const optionTextLists = {
    option1Text: ["Eastern Grey Kangaroo", "Western Grey Kangaroo", "Red Kangaroo"],
    option2Text: ["Hop", "Swim", "Move Backwards"],
    option3Text: ["Grass and Vegetable", "Raw Meat", "Insects"]
};

// create questions container
const questionContainer = document.getElementById("quiz-question");

// create options container
const optionCardContainer = document.getElementById("quiz-option");


// dispaly current question and option
const questionKeys = Object.keys(questions);
let currentQuestionIndex = 0;


function displayCurrentQuestion() {
    var currentQuestionKey = questionKeys[currentQuestionIndex]
    var currentQuestion = questions[currentQuestionKey];
    var currentOptionImgs = optionImgLists["option" + (currentQuestionIndex + 1) + "Img"];
    var currentOptionTexts = optionTextLists["option" + (currentQuestionIndex + 1) + "Text"];
    
    const question = document.createElement("p");
    question.classList.add("fs-2", "text-center", "mt-5", "mb-5");
    question.innerHTML = `
        ${currentQuestion[0]}
    `;
    questionContainer.appendChild(question)
    
    for (let i = 0; i < currentOptionImgs.length; i++) {
        
        const optionCard = document.createElement("div");
        // display option
        optionCard.classList.add("col-md-3");
        
        optionCard.innerHTML = `
            <div class="card btn btn-outline-success me-2" id="answer${i}" style="width: 18rem;">
                <img src="${currentOptionImgs[i]}" class="card-img-top">
                <div class="card-body">
                    <p class="card-text">${currentOptionTexts[i]}</p>
                </div>
            </div>
        `;
        
        optionCard.addEventListener("click", optionCardClick(currentOptionTexts[i]))
        
        // Create card in the container
        optionCardContainer.appendChild(optionCard);
    }
}


function optionCardClick(selectedAnswer) {
    return function() {
        checkUserAnswer(selectedAnswer);
    }
}


function checkUserAnswer(answer) {
    // check if the answer is correct
    const currentQuestionKey = questionKeys[currentQuestionIndex];
    const answerToQuestion = questions[currentQuestionKey][1];

    if (answer == answerToQuestion) {
        
        text.innerHTML = `
            Well Done !! You are correct !!
        `;

        // move to next quesiton
        currentQuestionIndex ++;
        
        if (currentQuestionIndex < questionKeys.length) {
            // Clear the question and option container for the next question
            questionContainer.innerHTML = "";
            optionCardContainer.innerHTML = "";

            // Display the next question
            displayCurrentQuestion();
        } else {
            sleep(2000);
            blackMask();
            displayDialog(2)
        }

    } else {
        // wrong answer
        text.innerHTML = `
            Oh no !! Try again !!
        `;
    }

}

displayCurrentQuestion();