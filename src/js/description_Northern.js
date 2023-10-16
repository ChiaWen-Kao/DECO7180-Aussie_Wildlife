const changeImageButton = document.getElementById('changeImageButton');
// Get the image element
const apiImage = document.getElementById('Image_switch');
let imageUrls = []; // Array to store all image URLs
let currentImageIndex = 0; // Index of the current image to be displayed

let currentUtterance = null; // Track the currently speaking utterance

const contentArray = [
    "A majority of the northern territory is covered with deserts. But our kangaroo families here also adapt astonishingly to the environment.",
    "We have our own cooling system to cope with the heat. Some of us developed an ability to tolerate dehydration for a long time.",
    "Another trick to get cool down is licking our forearms. The saliva's evaporation helps us reduce body temperature. But it's for kangaroos only, you should never try that.",
    "Northern territory provides habitats for a large population of red kangaroos. Red kangaroos are the largest marsupial, they can grow to 2 meters tall.",
    "Red kangaroos can adapt to any hostile environment with very little water, just except the driest deserts."
    // Add more content as needed
];

const contextElement = document.getElementById("text");
  let currentContentIndex = 0;
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
        utterance.voice = voices[0];
    }
    
    currentUtterance = utterance; // Update the currently speaking utterance
    window.speechSynthesis.speak(utterance);
}

//----------------------------------------------------------------------------------------------

// Add a click event listener to the button
// changeImageButton.addEventListener('click', function () {
//     currentContentIndex = (currentContentIndex + 1) % contentArray.length;
//     contextElement.textContent = contentArray[currentContentIndex];

//     // Stop the current utterance (if any)
//     if (currentUtterance) {
//         window.speechSynthesis.cancel(currentUtterance);
//     }

//     // Create and speak the new utterance
//     speakContent(contextElement.textContent);

//     updateImage();
// });

const playSoundsButton = document.getElementById('next');

playSoundsButton.addEventListener('click', function () {
    // Get the content from the .context element
    const contextText = contextElement.textContent;

    // Speak the content
    speakContent(contextText);

    // Change image
    if (currentContentIndex != 0) {
        currentContentIndex = (currentContentIndex + 1) % contentArray.length;
        contextElement.textContent = contentArray[currentContentIndex];
    
        // Stop the current utterance (if any)
        if (currentUtterance) {
            window.speechSynthesis.cancel(currentUtterance);
        }
    
        // Create and speak the new utterance
        speakContent(contextElement.textContent);
    
        updateImage();
    } else {
        currentContentIndex ++;
    }
});

function updateImage() {
    // Make sure you have fetched data before trying to update the image
    if (imageUrls.length > 0) {
        // Check if the currentImageIndex is within bounds
        if (currentImageIndex >= imageUrls.length) {
            // Reset the index to 0 if it exceeds the array length
            currentImageIndex = 0;
        }

        // Get the image URL from the array based on the current index
        const imageUrl = imageUrls[currentImageIndex];

        // Update the 'src' attribute of the image element
        apiImage.src = imageUrl;

        // Increment the index for the next click
        currentImageIndex++;
    }
}


// Define the API URL
//q=taxa%3A%22kangaroo%22&qualityProfile=ALA&fq=occurrence_decade_i%3A%222020%22&fq=state%3A%22New%20South%20Wales%22&fq=species_group%3A%22Mammals%22&fq=multimedia%3A%22Image%22&fq=data_resource_uid%3A%22dr19123%22&fq=month%3A%228%22&qc=-_nest_parent_%3A*
const apiUrl = "https://api.ala.org.au/occurrences/occurrences/search";
const queryParams = {

    pageSize: 50,
    startIndex: 0,
};

// Create the full URL by appending query parameters
const fullUrl = new URL(apiUrl);    // Create a "URL" object from a given URL string "apiUrl"

function fetchData() {
    fullUrl.search = "?q=text%3Aobservation%20AND%20taxa%3A%22kangaroo%22&qualityProfile=ALA&fq=state%3A%22Northern%20Territory%22&fq=occurrence_decade_i%3A%222010%22&fq=common_name%3A%22Red%20Kangaroo%22&qc=-_nest_parent_%3A*"
    for (const key in queryParams) {
        fullUrl.searchParams.append(key, queryParams[key]);
    }
    // console.log('213')
    // console.log(fullUrl.toString());

    // Make a GET request to the API
    fetch(fullUrl)
        .then((response) => {
            // Check if the response status is OK (status code 200)
            if (response.ok) {
                // Parse the JSON response
                return response.json();
            } else {
                // Handle any errors here
                throw new Error("HTTP error! Status: ${response.status}");
            }
        })

        .then((data) => {
            // Access the value of the field
            var occurrences = data.occurrences;
            console.log(occurrences);
            for (let i = 0; i < occurrences.length; i++) {
                var item = occurrences[i];
                var image_url = item.imageUrl;
                // imageUrls.push(image_url);
                if (image_url !== undefined) {
                    imageUrls.push(image_url);
                } 

            }
            updateImage();
            // Update the start parameter for the next page
            queryParams.startIndex += queryParams.pageSize;

            // If there are more pages to fetch, call fetchData recursively
            if (occurrences.length === queryParams.pageSize) {
                fetchData();
            } else {
                // getLongtitude();
            }
        })
}

fetchData();


// function getLongtitude() {
//     console.log(longtitudeDict)
//     for (const key in longtitudeDict) {
//         const latLongArray = key.split(",");
//         const value = longtitudeDict[key];
//         if (value > 30) {
//             marker(latLongArray)
//         }
//     }
// }
