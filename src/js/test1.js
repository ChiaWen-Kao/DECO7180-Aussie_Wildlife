const contentArray = [
    "Fun fact 1: Grey kangaroo is the most common kangaroo in Queensland. Their habitats spread across the state but mostly along the east coast",
];

let currentContentIndex = 0;
let currentUtterance = null;

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

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
}

const contextElement = document.querySelector('.context');
const changeImageButton = document.getElementById('changeImageButton');


document.addEventListener('DOMContentLoaded', function () {
    speakContent(contextElement.textContent);
});

changeImageButton.addEventListener('click', function () {
    currentContentIndex = (currentContentIndex + 1) % contentArray.length;
    contextElement.textContent = contentArray[currentContentIndex];

    if (currentUtterance) {
        window.speechSynthesis.cancel(currentUtterance);
    }

    speakContent(contextElement.textContent);
});