const question1 = ["What is the primary food of kangaroos?", "Grass and Leaves"];
const option1Img = [
    "https://images.unsplash.com/photo-1533460004989-cef01064af7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    "https://images.unsplash.com/photo-1536427824649-fbf2e4a33d40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
];
const option1Text = ["Grass and Leaves", "Insects and Small Animals", "Fish"];

var points = 100;

/* Question */
const questionContainer = document.getElementById("quiz-question");

const question = document.createElement("p")
question.classList.add("fs-2", "text-center", "mt-5", "mb-5")
question.innerHTML = `${question1[0]}`;

questionContainer.appendChild(question)

/* Next Dialog */
const dialogTutorial = [
    "I’m sure that you had a great journey today. Now we would like to know how you’ve learned about us.",
    "30 points rewarded for each correct answer. Have fun!"
]
const text = document.getElementById("text");
const next = document.getElementById("next");

var i = 0

next.addEventListener("click", function() {

    if (i < dialogTutorial.length) {
        text.innerHTML = `
            ${dialogTutorial[1]}
        `;
        i++;
    }

    if (i == dialogTutorial.length) {
        blackMaskContainer.classList.remove("black-mask");
    }
});


/* Options */
const optionCardContainer = document.getElementById("quiz-option");

for (let i = 0; i < option1Img.length; i++) {
    const optioncard = document.createElement("div");
    optioncard.classList.add("col-md-3");

    optioncard.innerHTML = `
        <div class="card btn btn-outline-success me-2" id="answer${i}" style="width: 18rem;">
            <img src="${option1Img[i]}" class="card-img-top">
            <div class="card-body">
                <p class="card-text">${option1Text[i]}</p>
            </div>
        </div>
    `;

    optioncard.addEventListener("click", function() {
    const selectedAnswer = option1Text[i];

    // Check if the selected answer matches the correct answer
    if (selectedAnswer === "Grass and Leaves") {
        // The answer is correct
        const cardOption = document.getElementById("answer" + i);
        const tick = document.createElement("img");
        tick.style.position = "absolute";
        tick.style.bottom = "0";
        tick.style.right = "0";
        tick.style.width = "20%";
        tick.src = "https://img.icons8.com/color/48/FFFFFF/checked--v1.png";

        cardOption.style.background = "var(--bs-btn-color)";
        cardOption.style.color = "white";

        cardOption.appendChild(tick);

        text.innerHTML = `
            Well Done !! You are correct!!
        `;

        // Earn points
        points = points + 30;
        console.log(points);
        
    } else {
        // The answer is wrong
        text.innerHTML = `
            Oh no ! Kangaroo eat grass and leaves.
        `;
    }

    
});

    // Create card in the container
    optionCardContainer.appendChild(optioncard);
}


/* First in Quiz Page (Black Mask) */
const blackMaskContainer = document.getElementById("black-mask");
blackMaskContainer.classList.add("black-mask");

