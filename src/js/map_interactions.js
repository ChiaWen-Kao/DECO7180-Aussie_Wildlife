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
    // q: "species_group%3AMammals%20AND%20country%3AAustralia%20AND%20basis_of_record%3AMACHINE_OBSERVATION%20AND%20taxa%3A%22Macropodidae%22",
    // qualityProfile: "ALA",
    // qc: "-_nest_parent_%3A*",
    pageSize: 50,
    startIndex: 0,
};


// Create the full URL by appending query parameters
const fullUrl = new URL(apiUrl);    // Create a "URL" object from a given URL string "apiUrl"
var longtitudeDict = {}    // Count similar longtitude Point01

function fetchData() {
    fullUrl.search = "?q=species_group%3AMammals%20AND%20country%3AAustralia%20AND%20basis_of_record%3AMACHINE_OBSERVATION%20AND%20taxa%3A%22Macropodidae%22&qualityProfile=ALA&qc=-_nest_parent_%3A*"
    for (const key in queryParams) {
        fullUrl.searchParams.append(key, queryParams[key]);
    }

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
                var scientificName = item.scientificName;
                var vernacularName = item.vernacularName;
                var pointLatLong = item.point01;
                // console.log(`SN is ${scientificName} and VN is ${vernacularName}. (Long, Lat) is (${decimalLatitude}, ${decimalLongitude})`);
                
                // Count similar longtitude Point01
                if (pointLatLong in longtitudeDict) {
                    longtitudeDict[pointLatLong] += 1 
                } else {
                    longtitudeDict[pointLatLong] = 1
                }
            }
            
            // Update the start parameter for the next page
            queryParams.startIndex += queryParams.pageSize;

            // If there are more pages to fetch, call fetchData recursively
            if (occurrences.length === queryParams.pageSize) {
                fetchData();
            } else {
                getLongtitude();
            }
    })
}

function getLongtitude() {
    console.log(longtitudeDict)
    for (const key in longtitudeDict) {
        const latLongArray = key.split(",");
        const value = longtitudeDict[key];
        if (value > 30) {
            marker(latLongArray)
        }
    }
}

// Markt the position on the map with flag
function marker(latLongArray) {
    var flagIcon = L.icon({
        iconUrl: "img/flag.png",
        iconSize:     [40, 40], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var marker = L.marker([latLongArray[0], latLongArray[1]], {icon: flagIcon}).addTo(map);
}

fetchData();