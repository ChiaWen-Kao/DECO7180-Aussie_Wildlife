/* Initialize map and set the location in UQ*/
var map = L.map('map').setView([-25.2744, 133.7751], 5);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

/* Get obeservation location from API
Website URL: https://biocache.ala.org.au/occurrence/search?q=species_group%3AMammals%20AND%20country%3AAustralia%20AND%20basis_of_record%3AMACHINE_OBSERVATION%20AND%20taxa%3A%22Macropodidae%22&qualityProfile=ALA&fq=month%3A%2212%22&qc=-_nest_parent_%3A*&fq=occurrence_decade_i%3A%222020%22
API URL: https://api.ala.org.au/occurrences/occurrences/search?q=species_group%3AMammals%20AND%20country%3AAustralia%20AND%20basis_of_record%3AMACHINE_OBSERVATION%20AND%20taxa%3A%22Macropodidae%22&qualityProfile=ALA&qc=-_nest_parent_%3A*
Filter:
    speciesGroup: Mammals
    country: Australia
    basisOfRecord: MACHINE_OBSERVATION
    family: Macropodidae
*/

// Define the API URL
const apiUrl = "https://api.ala.org.au/occurrences/occurrences/search";
const queryParams = {
    pageSize: 50,
    startIndex: 0,
};

// Create the full URL by appending query parameters
const fullUrl = new URL(apiUrl);    // Create a "URL" object from a given URL string "apiUrl"

var vic_dataArray = []
var qld_dataArray = []
var sa_dataArray = []
var tas_dataArray = []
var wa_dataArray = []
var act_dataArray = []
var nt_dataArray = []

function fetchData() {
    fullUrl.search = "?q=species_group%3AMammals%20AND%20country%3AAustralia%20AND%20basis_of_record%3AMACHINE_OBSERVATION%20AND%20taxa%3A%22Macropodidae%22&qualityProfile=ALA&qc=-_nest_parent_%3A*"
    for (const key in queryParams) {
        fullUrl.searchParams.append(key, queryParams[key]);
    }
    
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
            // console.log(occurrences);
            for (let i = 0; i < occurrences.length; i++) {
                var item = occurrences[i];
                var stateProvince = item.stateProvince;
                
                // Store data in array by state
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
                } else if (stateProvince == "Australian Capital Territory") {
                    act_dataArray.push(item);
                } else if (stateProvince == "North Territory") {
                    nt_dataArray.push(item);
                }
            }

            // // Update the start parameter for the next page
            // queryParams.startIndex += queryParams.pageSize;

            // // If there are more pages to fetch, call fetchData recursively
            // if (occurrences.length === queryParams.pageSize) {
            //     fetchData();
            // } else {
                getMostOccurence(vic_dataArray);
                getMostOccurence(qld_dataArray);
                getMostOccurence(sa_dataArray);
                getMostOccurence(tas_dataArray);
                getMostOccurence(wa_dataArray);
                getMostOccurence(act_dataArray);
                getMostOccurence(nt_dataArray);
            // }
    })
}

function getMostOccurence(dataArray) {
    // Static longtitude point001
    longtitudeDict = {};

    // Count similar longtitude and latitute point001
    for (let i = 0; i < dataArray.length; i++) {
        if (dataArray[i].point001 in longtitudeDict) {
            longtitudeDict[dataArray[i].point001] += 1;
        } else {
            longtitudeDict[dataArray[i].point001] = 1;
        }
    }

    console.log(longtitudeDict);

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

    console.log(`Place: ${maxKey}. Value: ${maxValue}`);
    if (maxKey != null) {
        marker(maxKey)
    }
}

// Mark the position on the map with flag
function marker(maxKey) {
    var flagIcon = L.icon({
        iconUrl: "img/flag.png",
        iconSize:     [40, 40], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    const latLongArray = maxKey.split(",");
    console.log(`lat: ${latLongArray[0]}    long: ${latLongArray[1]}`)

    var marker = L.marker([latLongArray[0], latLongArray[1]], {icon: flagIcon}).addTo(map);
    marker.on("click", onMarkClick)
}

// Click the mark go to learning page
function onMarkClick(e) {
    window.location = "description.html";
}

fetchData();