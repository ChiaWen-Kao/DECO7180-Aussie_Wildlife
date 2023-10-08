// Get the text area and speak button elements
let speakButton = document.getElementById("speak-button");
let textToRead = document.getElementById("text-to-read");

// window.onload = function () {
//     let textToRead = document.getElementById("text-to-read");

//     // Function to set up and speak the text
//     function speakText() {
//         let text = textToRead.textContent;
//         let utterance = new SpeechSynthesisUtterance();

//         utterance.text = text;
//         utterance.pitch = 1.5;

//         // Get the available voices
//         let voices = window.speechSynthesis.getVoices();

//         // Log the available voices to the console for debugging
//         console.log(voices);

//         let selectedVoice = voices.find(voice => voice.name === "Google UK English Female");

//         if (selectedVoice) {
//             utterance.voice = selectedVoice;
//             console.log("Selected voice found:", selectedVoice.name);
//         } else {
//             utterance.voice = voices[0];
//             console.log("Selected voice not found. Using the default voice.");
//         }

//         // Speak the utterance
//         window.speechSynthesis.speak(utterance);
//     }

//     // Check if the speech synthesis API is available in the browser
//     if ('speechSynthesis' in window) {
//         console.log("Speech synthesis API is supported.");

//         // Wait for the 'voiceschanged' event before speaking
//         window.speechSynthesis.onvoiceschanged = function () {
//             console.log("Voices have changed.");
//             speakText(); // Call the function to speak the text
//         };
//     } else {
//         console.log("Speech synthesis not supported in this browser.");
//     }
// };

// Add an event listener to the speak button
speakButton.addEventListener("click", function () {
    // Get the text from the text area or the <p> element
    let text = textToRead.textContent;

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