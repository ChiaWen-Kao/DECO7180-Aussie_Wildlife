// Pass parameters via url
function startJourney() {
  let guideImage = document.getElementsByClassName("guide").style;
  alert(guideImage)
  window.location.href = `General_info.html?guideImage=${encodeURIComponent(guideImage)}`;
}

function next(url) {
  const guideImage = document.getElementById("guide").style.backgroundImage;
  if (url == "diet") {
      window.location.href = `what_we_eat.html?guideImage=${encodeURIComponent(guideImage)}`;
  } else if (url == "evolve") {
      console.log("jworgijweg")
      window.location.href = `what_we_evolve.html?guideImage=${encodeURIComponent(guideImage)}`;
  } else if (url == "map") {
      window.location.href = `map.html?guideImage=${encodeURIComponent(guideImage)}`;
  }
}

// Get the URL parameter for guideImage
function getParameterByName(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

document.addEventListener("DOMContentLoaded", function() {
  // Retrieve the guideImage URL parameter
  const guideImageURL = getParameterByName("guideImage");
  
  // Check if the parameter is present and set the background image
  if (guideImageURL) {
      displaydialogAnimalGuide(guideImageURL);
  }
});

function displaydialogAnimalGuide(url) {
  const animalGuide = document.querySelector(".guide");
  if (animalGuide != null) {
    animalGuide.style.backgroundImage = url;
  } else {
    animalGuide.style.background = url("img/closet/human-guide.svg")
  }
}