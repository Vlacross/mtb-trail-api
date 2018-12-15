const geoCodioAPI = "a52d02212a2cccaec007d2a2050ce052ced3e2c";

const gooGeoAPI = "AIzaSyCo1k22pOIQ72MSFK4uSI5r4JVjVI1GZ6s";
const mtbProjectAPI = "200395855-de7f074b48031edaf79b8beb3902e0b8";
const openWeatherAPI = "200395855-de7f074b48031edaf79b8beb3902e0b8";












// function analyzeInput(input) {

// const tempName = parseInt(input)

// if(Number.isInteger(tempName)) {
//     // console.log(typeof(tempName))
//     return zip = input
// }
//     // console.log(typeof(input))
//     return city = input
// }






/*handle response */
function checkResponse(res) {
    if(res.ok) {
        return res.json()
    } throw new Error(res.statusText)
}

function buildList(res) {
    let trails = res.trails
    console.log(trails[1])
    let results = ""
    let count = 0

    for (let i = 0; i < trails.length; i++) {
            results += `<li class="trail-listing ${i}">
                            <img class="listing-icon" src="${trails[i].imgSmall}">
                            <section>
                            <h1>Name:${trails[i].name}</h1>
                            <h3>Location: ${trails[i].location}</h3><h3>Length: ${trails[i].length} miles</h3>
                            <p>Summary - ${trails[i].summary}</p> <p>Difficulty: ${trails[i].difficulty}</p>
                            <p>Ascent: ${trails[i].ascent} feet</p> <p>Descent: ${trails[i].descent} feet</p>
                            <a href="${trails[i].url}">For more information, click here!</a>
                            </section>
                             

                        </li>`
                        /*    ascent descent
                              difficulty
                              length
                              location
                              name
                              summary
                            url */
    }
    $('.results-list').append(results)


}

/*obtain list of trails to display based on lat & lon and distance from location inputs */
function getTrails (res, dist) {
    if(dist <= 1) {
        let dist = 5;
    }
    const lat = res.results[0].geometry.location.lat
    const long =res.results[0].geometry.location.lng 
    const trailURL = `https://www.mtbproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=${dist}&key=${mtbProjectAPI}`

    fetch(trailURL)
    .then(response => checkResponse(response))
    .then(resj => buildList(resj))
    .catch(err => console.log(err.message))
}

/*obtain lat & lon for weather and trail uses  */
function getLat(inputSearch, distanceFrom) {
console.log("2")
const geoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${inputSearch}&key=${gooGeoAPI}`
    
fetch(geoURL)
.then(response => checkResponse(response))
.then(resj => getTrails(resj, distanceFrom))
.catch(err => console.log(err.message))
}

/*keep track of DOM height travel for style ques */
function fromTop(div) {
    const scrollPosition = window.scrollY
    const divTop = div.getBoundingClientRect().top
    const winTop = window.innerHeight
    console.log(scrollPosition)
    // if(scrollPosition >= divTop) {
    //     console.log("Time to Toggle some swoops!")
    // }
}


function watchForm() {

    $('.trail-search-form').submit(function(e) {
        e.preventDefault();
        const inputSearch = $('.mtb-trail-search-input').val();
        const distanceFrom = $('.distance-from-location-input').val();
        getLat(inputSearch, distanceFrom)
        fromTop(document.querySelector('.trail-search'))
        // console.log(inputSearch, distanceFrom)
    })       
}
window.onclick = e => {
    let tar = e.target
    console.log()
}

watchForm()

// document.querySelector(event.target).getBoundingClientRect()