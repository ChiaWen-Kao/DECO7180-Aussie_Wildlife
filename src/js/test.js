/* Initialize map and set the location in UQ*/
var map = L.map('map').setView([-25.2744, 133.7751], 4.5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get the element you want to retrieve the height of
    var element = document.querySelector('.wooden-tablet-dialog');
    var element1 = document.querySelector('.dialog-content');
    var element2 = document.querySelector('#guide');

    // Get the computed height of the element
    var computedHeight = window.getComputedStyle(element).height;

    // Apply on the component
    element1.style.height = computedHeight
    element1.style.height = computedHeight

    // Log the computed height to the console
    console.log(computedHeight);
});
