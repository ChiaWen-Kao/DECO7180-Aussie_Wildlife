const changeImageButton = document.getElementById('changeImageButton');
// Get the image element
const apiImage = document.getElementById('Image_switch');
let imageUrls = []; // Array to store all image URLs
let currentImageIndex = 0; // Index of the current image to be displayed

const contentArray = [
    "Fun fact 1: Grey kangaroo is the most common kangaroo in Queensland. Their habitats spread across the state but mostly along the east coast",
    "Grey kangaroos are grazers, which means they mostly eat grass. Other types of kangaroos, however, might eat a variety of plants.",
    "The best places to spot kangaroos in Queensland are along the coasts such as Cape Hillsborough National Park, Magnetic Island. \
    If you get there by dusk or dawn, chances are you will encounter heaps of them.",
    "Queensland is a sunshine state and the summer can be boiling hot. Our kangaroo families here relax under the shades during midday to avoid intensive sunlight.",
    "Another technique to cool down is licking their forearms. The cooling effect from saliva evaporation will help release some heat from their body."
    // Add more content as needed
];


const contextElement = document.querySelector('.context');
let currentContentIndex = 0;

// Add a click event listener to the button
changeImageButton.addEventListener('click', function () {
    // Increment the content index and loop back to 0 if it exceeds the array length
    currentContentIndex = (currentContentIndex + 1) % contentArray.length;

    // Update the content based on the new index
    contextElement.textContent = contentArray[currentContentIndex];
});

// Add a click event listener to the button
changeImageButton.addEventListener('click', function () {
    // Call fetchData to fetch a new image from the API
    // console.log('Button clicked');
    // console.log(apiImage);
    updateImage();
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

// Get the text area and speak button elements
let speakButton = document.getElementById("changeImageButton");


// Add an event listener to the speak button
speakButton.addEventListener("click", function () {
    // Get the text from the text area or the <p> element
    let text = contextElement.textContent;

    // Create a new SpeechSynthesisUtterance object
    let utterance = new SpeechSynthesisUtterance();

    // Set the text
    utterance.text = text;

    // Set the pitch (adjust this value as needed)
    utterance.pitch = 1.2; // Higher value for a higher-pitched voice, lower for deeper
    utterance.rate = 0.8;
    // Get the available voices
    let voices = window.speechSynthesis.getVoices();

    // Find a voice by name (Change this to match an available voice in your environment)
    let selectedVoice = voices.find(voice => voice.name === "Google UK English Female");

    // If the selected voice is found, set it as the voice for the utterance
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    } else {
        // If the selected voice is not available, use the default voice
        utterance.voice = voices[0];
    }

    // Speak the utterance
    window.speechSynthesis.speak(utterance);
});


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
