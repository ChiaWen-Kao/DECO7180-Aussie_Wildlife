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


const playSoundsButton = document.getElementById('voice');

playSoundsButton.addEventListener('click', function () {
    // Get the content from the .context element
    const contextText = contextElement.textContent;

    // Speak the content
    speakContent(contextText);
});
/*
    initialize map
*/
var map = L.map('map').setView([-25.2744, 133.7751], 4);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/*
    get obeservation location from API

    website URL: https://biocache.ala.org.au/occurrence/search?q=species_group%3AMammals%20AND%20country%3AAustralia%20AND%20basis_of_record%3APRESERVED_SPECIMEN%20AND%20taxa%3A%22Macropodidae%22%20AND%20institution_uid%3Ain4&qualityProfile=ALA&qc=-_nest_parent_%3A*&fq=occurrence_decade_i%3A%222010%22#tab_mapView
    API URL: https://api.ala.org.au/occurrences/occurrences/search?q=species_group%3AMammals%20AND%20country%3AAustralia%20AND%20basis_of_record%3APRESERVED_SPECIMEN%20AND%20taxa%3A%22Macropodidae%22%20AND%20institution_uid%3Ain4&qualityProfile=ALA&fq=occurrence_decade_i%3A%222010%22&qc=-_nest_parent_%3A*
    
    filter:
        country: Australia
        Institution: Australian Museum
        speciesGroup: Mammals
        family: Macropodidae
*/

// define the API URL
const apiUrl = "https://api.ala.org.au/occurrences/occurrences/search";
const queryParams = {
    pageSize: 50,
    startIndex: 0,
};

// create the full URL by appending query parameters
const fullUrl = new URL(apiUrl);    // Create a "URL" object from a given URL string "apiUrl"

// categorize the records in array
var vic_dataArray = []     // victoria
var qld_dataArray = []     // queensland
var sa_dataArray = []      // south australia
var tas_dataArray = []     // tasmania
var wa_dataArray = []      // western australia
var nsw_dataArray = []     // new south wales
var na_dataArray = []      // northern territory

function fetchData() {
    fullUrl.search = "?q=species_group%3AMammals%20AND%20country%3AAustralia%20AND%20basis_of_record%3APRESERVED_SPECIMEN%20AND%20taxa%3A%22Macropodidae%22%20AND%20institution_uid%3Ain4&qualityProfile=ALA&fq=occurrence_decade_i%3A%222010%22&qc=-_nest_parent_%3A*"
    for (const key in queryParams) {
        fullUrl.searchParams.append(key, queryParams[key]);
    }
    
    // make a GET request to the API
    fetch(fullUrl)
        .then((response) => {
            // check if the response status is OK (status code 200)
            if (response.ok) {
                // parse the JSON response
                return response.json();
            } else {
                // handle any errors
                throw new Error("HTTP error! Status: ${response.status}");
            }
        })

        .then((data) => {
            // access the value of the field
            var occurrences = data.occurrences;
            for (let i = 0; i < occurrences.length; i++) {
                var item = occurrences[i];
                var stateProvince = item.stateProvince;
                
                // store data in array by state
                if (stateProvince == "Victoria") {
                    vic_dataArray.push(item);
                } else if (stateProvince == "Queensland") {
                    qld_dataArray.push(item);
                } else if (stateProvince == "South Australia") {
                    sa_dataArray.push(item);
                } else if (stateProvince == "Tasmania") {
                    tas_dataArray.push(item);
                } else if (stateProvince == "Western Australia") {
                    wa_dataArray.push(item);
                } else if (stateProvince == "Northern Territory") {
                    na_dataArray.push(item);
                } else if (stateProvince == "New South Wales") {
                    nsw_dataArray.push(item);
                };
            };

            // Update the start parameter for the next page
            queryParams.startIndex += queryParams.pageSize;

            // If there are more pages to fetch, call fetchData recursively
            if (occurrences.length == queryParams.pageSize) {
                fetchData();
            } else {
                getMostOccurence(vic_dataArray, "victoria");
                getMostOccurence(qld_dataArray, "queensland");
                getMostOccurence(sa_dataArray, "south australia");
                getMostOccurence(tas_dataArray, "tasmania");
                getMostOccurence(wa_dataArray, "western australia");
                getMostOccurence(na_dataArray, "northern territory");
                getMostOccurence(nsw_dataArray, "new south wales");
            }
    })
}

function getMostOccurence(dataArray, state) {
    // Static longtitude point001
    longtitudeDict = {};

    // Count similar longtitude and latitute point001
    for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].point001 in longtitudeDict && dataArray[i].point001 != undefined) {
            longtitudeDict[dataArray[i].point001] += 1;
        } else {
            longtitudeDict[dataArray[i].point001] = 1;
        }
    }

    // Find the most frequent longitude and its count
    let maxKey = null;
    let maxValue = -1;

    // Iterate over the entries (key-value pairs) of longtitudeDict
    for (const [key, value] of Object.entries(longtitudeDict)) {
        if (value > maxValue) {
            maxKey = key;
            maxValue = value;
        }
    }

    if (maxKey != null) {
        if (state == "victoria") {
            marker(maxKey, "victoria");
        } else if (state == "queensland") {
            marker(maxKey, "queensland");
        } else if (state == "south australia") {
            marker(maxKey, "south australia");
        } else if (state == "tasmania") {
            marker(maxKey, "tasmania");
        } else if (state == "western australia") {
            marker(maxKey, "western australia");
        } else if (state == "northern territory") {
            marker(maxKey, "northern territory");
        } else if (state == "new south wales") {
            marker(maxKey, "new south wales");
        }
    }
}

// Mark the position on the map with flag
function marker(maxKey, state) {
    var flagIcon = L.icon({
        iconUrl: "img/icon/flag.png",
        iconSize:     [40, 40], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    const latLongArray = maxKey.split(",");
    var marker = L.marker([latLongArray[0], latLongArray[1]], {icon: flagIcon}).addTo(map);
    marker.on("click", function(e) {
        onMarkClick(e, state);
    });
}

// Click the mark go to learning page
function onMarkClick(e, state) {
    const guideImage = document.getElementById("guide").style.backgroundImage;
    
    if (state == "victoria") {
        window.location.href = `description_victoria.html?guideImage=${encodeURIComponent(guideImage)}`;
    } else if (state == "queensland") {
        window.location.href = `description_QLD.html?guideImage=${encodeURIComponent(guideImage)}`;
    } else if (state == "south australia") {
        window.location.href = `description_South_Aus.html?guideImage=${encodeURIComponent(guideImage)}`;
    } else if (state == "tasmania") {
        window.location.href = `description_Tasmania.html?guideImage=${encodeURIComponent(guideImage)}`;
    } else if (state == "western australia") {
        window.location.href = `description_Western_Aus.html?guideImage=${encodeURIComponent(guideImage)}`;
    } else if (state == "northern territory") {
        window.location.href = `description_Northern.html?guideImage=${encodeURIComponent(guideImage)}`;
    } else if (state == "new south wales") {
        window.location.href = `description_NSW.html?guideImage=${encodeURIComponent(guideImage)}`;
    }
}


/* main flow */
fetchData();