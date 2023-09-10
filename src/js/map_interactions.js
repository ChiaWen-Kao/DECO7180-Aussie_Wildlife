/*

Connect ALA API dataset, wait for the DOM(HTML,css, etc.) to load.
https://api.ala.org.au/occurrences/occurrences/search?q=text%3Aobservation%20AND%20taxa%3A%22kangaroo%22&qualityProfile=ALA&qc=-_nest_parent_%3A*
*/

// Define the API URL
const apiUrl = "https://api.ala.org.au/occurrences/occurrences/search";

// Query parameters
const queryParams = {
    // q: "text%3Aobservation%20AND%20taxa%3A%22kangaroo%22",
    // qualityProfile: "ALA",
    // qc: "-_nest_parent_%3A*",
    pageSize: 10,
    startIndex: 0
};

// Create the full URL by appending query parameters
const fullUrl = new URL(apiUrl); // Create a "URL" object from a given URL string "apiUrl"
function fetchData() {
    fullUrl.search = "?q=text%3Aobservation%20AND%20taxa%3A%22kangaroo%22&qualityProfile=ALA&qc=-_nest_parent_%3A*"
    for (const key in queryParams) {
        fullUrl.searchParams.append(key, queryParams[key])
    }

    console.log("Current URL:", fullUrl.toString());

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
            const occurrences = data.occurrences;
            console.log(occurrences);
            for (let i = 0; i < occurrences.length; i++) {
                // Get data from API
                const item = occurrences[i]
                const vernacularName = item.vernacularName;
                // if ((vernacularName.includes("kangaroo", 0)) || (vernacularName.includes("Kangaroo", 0))) {
                    const decimalLatitude = item.decimalLatitude;
                    const decimalLongitude = item.decimalLongitude;
                    const imageUrl = item.imageUrl;
                    console.log(`Name is ${vernacularName}. Latitude is ${decimalLatitude} and Longitude is ${decimalLongitude}`);
                // }
            }
            // Update the start parameter for the next page
            queryParams.startIndex += queryParams.pageSize;

            // If there are more pages to fetch, call fetchData recursively
            if (occurrences.length === queryParams.pageSize) {
                fetchData();
            }
        })

        .catch((error) => {
            // Handle any errors that occurred during the fetch
            console.error("Fetch error:", error)
        });
}

// Start fetching data for the first page
fetchData();