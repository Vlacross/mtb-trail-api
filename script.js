
// const API_KEY = {
//     GOOGLE_GEOCODE: "AIzaSyCo1k22pOIQ72MSFK4uSI5r4JVjVI1GZ6s",
//     MTB_PROJECT: "200395855-de7f074b48031edaf79b8beb3902e0b8",
//     OPEN_WEATHER: "a1e69f8910c23992c2e54b530c782490"
// }


  /*handle response */
function checkResponse(res) {
    if(res.ok) {
        return res.json()
    } throw new Error(res.statusText)
}

function buildList(objData) {
    // let trails = res.trails
    let trails = objData.trails
    console.log(trails)
    let results = ""
    let count = 0

    for (let i = 0; i < trails.length; i++) {
        results += `
        <li class="trail-listing ${i}">
            <img class="listing-icon" src="${trails[i].imgSmall}">
            <section>
                <h1>Name:${trails[i].name}</h1>
                <h3>Location: ${trails[i].location}</h3><h3>Length: ${trails[i].length} miles</h3>
                <p>Summary - ${trails[i].summary}</p> <p>Difficulty: ${trails[i].difficulty}</p>
                <p>Ascent: ${trails[i].ascent} feet</p> <p>Descent: ${trails[i].descent} feet</p>
                <a href="${trails[i].url}">For more information, click here!</a>
            </section>
        </li>`
    }
    $('.results-list').append(results)
}

//   /*obtain list of trails to display based on lat & lon and distance from location inputs */
// function getTrails (res, dist) {
//     if(dist <= 1) {
//         let dist = 5;
//     }
//     const lat = res.results[0].geometry.location.lat
//     const long =res.results[0].geometry.location.lng 
//     const trailURL = `https://www.mtbproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=${dist}&key=${mtbProjectAPI}`

//     fetch(trailURL)
//     .then(response => checkResponse(response))
//     .then(resj => buildList(resj))
//     .catch(err => console.log(err.message))
// }

//   /*obtain lat & lon for weather and trail uses  */
// function getLat(inputSearch, distanceFrom) {
//     console.log("2")
//     const geoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${inputSearch}&key=${gooGeoAPI}`
        
//     fetch(geoURL)
//     .then(response => checkResponse(response))
//     .then(resj => getTrails(resj, distanceFrom))
//     .catch(err => console.log(err.message))
// }

// function pageTransition() {
//     buildList(objData)
//     $('.mtb-image').slideUp(2000)
//     $('.banner').slideUp(2000)
//     setTimeout(function() {
//         $('.banner').replaceWith($('.trail-search-form'))}, 2000)
//         $('.trail-search-form').slide(up ).slideDown(500)   
//     // $('.mtb-image').replaceWith(resultsTemplate))

// }

// function showText(text) {
//     text.addClass('show')
//     // $('.2').addClass('show')
//     // $('.3').addClass('show')
//     // $('.4').addClass('show')
// }

function watchForm() {

    $('.trail-search-form').submit(function(e) {
        e.preventDefault();
        var inputSearch = $('.mtb-trail-search-input').val();
        var distanceFrom = $('.distance-from-location-input').val();
        $('.results-list').empty()
        $('.results-wrapper').removeClass('hidden')
        pageTransition()
        // getLat(inputSearch, distanceFrom)
        // buildList(objData)
        // console.log(inputSearch, distanceFrom)
    })       
}

// $(document).ready(function(){
    
//     showText($('.1'))
//     setTimeout(function() {
//         showText($('.2'))}, 1000)
//     setTimeout(function() {
//         showText($('.3'))}, 2000)
//     setTimeout(function() {
//         showText($('.4'))}, 3000) 
// })



watchForm()