/*
    display animal guide
*/
function displayAnimalGuide(animalGuideUrl) {
    const animalGuideContainer = document.getElementById("animal-guide");
    animalGuideContainer.innerHTML = ``;
    const animalGuide = document.createElement("img");
    animalGuide.setAttribute("src", animalGuideUrl)
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
};

const accessories = {
    purse: ["purse", ""],
    earring: ["earring", ""]
};


// display the color tab of the closet
function displayColor() {  
    const closetColorContainer = document.getElementById("closet");
    closetColorContainer.innerHTML = ``;
  
    for (let i = 0; i < Object.keys(colors).length; i++) {
        const closetColor = document.createElement("button");
        closetColor.setAttribute("id", Object.keys(colors)[i])
        closetColor.classList.add("closet-item");
        closetColor.classList.add("me-4")
        closetColor.style.backgroundColor = Object.keys(colors)[i];

        closetColorContainer.appendChild(closetColor);

        // click the color of the animal, the animal guide will change image
        document.getElementById(Object.keys(colors)[i]).addEventListener("click", function() {

            if (Object.keys(colors)[i] == colors.red[0]) {
                displayAnimalGuide(colors.red[1]);
            } else if (Object.keys(colors)[i] == colors.grey[0]) {
                displayAnimalGuide(colors.grey[1]);
            } else if (Object.keys(colors)[i] == colors.brown[0]) {
                displayAnimalGuide(colors.brown[1]);
            } else if (Object.keys(colors)[i] == colors.orange[0]) {
                displayAnimalGuide(colors.orange[1]);
            };

        });
    };
}

// display the accessory tab of the closet
function displayAccessory() {
    const closetAccessoryContainer = document.getElementById("closet");
    closetAccessoryContainer.innerHTML = ``;

    for (let i = 0; i < accessories.length; i++) {
        const closetAccessory = document.createElement("button");
        closetAccessory.classList.add("closet-item");
        closetAccessory.classList.add("me-4")
        closetAccessory.style.backgroundColor = accessories[i];

        closetAccessoryContainer.appendChild(closetAccessory);
    }
}

/* main flow */
displayAnimalGuide("img/closet/Kangaroo.svg");
displayColor();