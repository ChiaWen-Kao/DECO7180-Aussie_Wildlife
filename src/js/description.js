// JavaScript to toggle between video and image
const videoBtn = document.getElementById('videoBtn');
const imageBtn = document.getElementById('imageBtn');
const videoFrame = document.getElementById('videoFrame');
const image = document.getElementById('image');

videoBtn.addEventListener('click', function () {
    videoFrame.style.display = 'block';
    image.style.display = 'none';
});

imageBtn.addEventListener('click', function () {
    videoFrame.style.display = 'none';
    image.style.display = 'block';
});