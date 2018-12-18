
const API_KEY = {
    GOOGLE_GEOCODE: "AIzaSyCo1k22pOIQ72MSFK4uSI5r4JVjVI1GZ6s",
    MTB_PROJECT: "200395855-de7f074b48031edaf79b8beb3902e0b8",
    OPEN_WEATHER: "a1e69f8910c23992c2e54b530c782490"
}



  /*handle response */
function checkResponse(res) {
    if(res.ok) {
        return res.json()
    } throw new Error(res.statusText)
}

function buildList(res) {
    let trails = res.trails
    console.log(trails)
    let results = ""
    let count = 0

    for (let i = 0; i < trails.length; i++) {
        results +=
        `<li class="trail-listing ${i}"> <div class="forecast-tab"><span class="forecast-tab-span">Forecast</span></div>
        <section class="forecast-display"></section>
            <div class="listing-wrapper">
                
             
              <section class="listing-content">
                <img class="listing-icon" src="${trails[i].imgSmall}"><h1>Name:${trails[i].name}</h1>
                <h3>Location: ${trails[i].location}</h3><h3>Length: ${trails[i].length} miles</h3>
                <p>Summary - ${trails[i].summary}</p> <p>Difficulty: ${trails[i].difficulty}</p>
                <p>Ascent: ${trails[i].ascent} feet</p> <p>Descent: ${trails[i].descent} feet</p>
                <a href="${trails[i].url}">For more information, click here!</a>
              </section>
            </div>
        </li>`
    }
    $('.results').replaceWith(`<section class="results">${results}<</section>`)
}

  /*obtain list of trails to display based on lat & lon and distance from location inputs     <section class="results hidden">
</section>*/
function getTrails (res, dist) {
    if(dist <= 1) {
        let dist = 5;
    }
    const lat = res.results[0].geometry.location.lat
    const long =res.results[0].geometry.location.lng 
    const trailURL = `https://www.mtbproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=${dist}&key=${API_KEY.MTB_PROJECT}`

    fetch(trailURL)
    .then(response => checkResponse(response))
    .then(resj => buildList(resj))
    .catch(err => console.log(err.message))
}

  /*obtain lat & lon for weather and trail uses  */
function getLat(inputSearch, distanceFrom) {
    console.log("2")
    const geoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${inputSearch}&key=${API_KEY.GOOGLE_GEOCODE}`
        
    fetch(geoURL)
    .then(response => checkResponse(response))
    .then(resj => getTrails(resj, distanceFrom))
    .catch(err => console.log(err.message))
}

  /*show search-tray for new search query */
function watchSearchTab() {

    $('main').on('click', '.tab', function(e) {
        e.preventDefault();
        $('.tab-span').addClass('hidden')
        $('.tab').slideUp(500)
        $('.trail-search-form').removeClass('hidden').slideDown(1000)
    })    
}

function displayResults() {
    setTimeout(function() {
        $('.tab').removeClass('hidden')
        $('.tab').slideDown(1000) }, 2000)  
    $('.results').removeClass('hidden')
    $('.results').fadeIn(3000)
    watchSearchTab();
}

function leaveLanding() {
    $('.mtb-image').slideUp(2000)
    $('.banner').slideUp(2000).replaceWith($('.trail-search-form').addClass('hidden').removeClass('initial'))
    
}

 /*switch layout to accomodate for result listings */
function pageTransition() {
    const formState = $("[class~='trail-search-form']").attr('class')
    if(formState == 'trail-search-form initial'){ 
        leaveLanding();
    } 
    
    displayResults()
}


function watchForm() {

    $('.trail-search-form').submit(function(e) {
        e.preventDefault();
        var inputSearch = $('.mtb-trail-search-input').val();
        var distanceFrom = $('.distance-from-location-input').val();
        $('.results-list').empty()
        pageTransition()
        getLat(inputSearch, distanceFrom)
        // buildList(objData)
        // console.log(inputSearch, distanceFrom)
    })       
}

function showText(text) {
    text.addClass('show')
    
}


  /*auto-fill serch field based on user's IP */

function offerPrediction(resj) {
    $('.mtb-trail-search-input').attr("value", `${resj.city}`)
}

function generateLocation(resj) {
    
    fetch(`https://ipapi.co/${resj.ip}/json/`)
    .then(response => checkResponse(response))
    .then(resj => offerPrediction(resj))
    .catch(err => console.log(err.message))
      
}

function predictLocation() {
    fetch('https://api.ipify.org?format=json')
    .then(response => checkResponse(response))
    .then(resj => generateLocation(resj))
    .catch(err => console.log(err.message))
}

  /*present page */
$(document).ready(function(){
    let user_ip = predictLocation();

    showText($('.1'))
    setTimeout(function() {
        showText($('.2'))}, 1000)
    setTimeout(function() {
        showText($('.3'))}, 2000)
    setTimeout(function() {
        showText($('.4'))}, 3000) 

    


})



watchForm()