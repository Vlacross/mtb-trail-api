'use strict';

const API_KEY = {
  GOOGLE_GEOCODE: 'AIzaSyCo1k22pOIQ72MSFK4uSI5r4JVjVI1GZ6s',
  MTB_PROJECT: '200395855-de7f074b48031edaf79b8beb3902e0b8',
  OPEN_WEATHER: 'a1e69f8910c23992c2e54b530c782490'
};

const searchTabTrayOpen =  '<button id="search-tray-tab" class="search-tray-tab open" tabindex="0"><span class="tab-span">Search</span></button>';
const searchTabTrayClose = '<button id="search-tray-tab" class="search-tray-tab close"><span class="tab-span" tabindex="0">Close Tray</span></button>';


/*handle response */
function checkResponse(res) {
  if(res.ok) {
    return res.json();
  } throw new Error(res.statusText);
}

function buildForecast(res) {
  console.log();
  let desc = res.weather[0].description;
  let highs = res.main.temp_max;
  let lows = res.main.temp_min;
  let humi = res.main.humidity;
  let wind = res.wind.speed;
  
  let results = 
  `<li class="trail-listing weather"> <button class="forecast-tab"><span class="forecast-tab-span">Forecast</span></button>
  <div class="listing-wrapper">
    <section class="weather-display">
      <section class="weather-content">
        <img class="weather-icon">
        <h1>${res.weather[0].description}</h1>
        <h3>Wind - ${res.wind.speed}</h3>
        <p>Temp-Highs - ${res.main.temp_max}</p><p>Temp-Lows - ${res.main.temp_min}</p>
        <p>Humidity - ${res.main.humidity}</p>
      </section>
    </section>
     </div>
    <section class="listing-content">
      
  </li>`;
  // $('.results').replaceWith(`<section class="results">${results}</section>`);
}

function buildList(res) {
  let trails = res.trails;
  console.log(res);
  let results = '';
  let count = 0;

  for (let i = 0; i < trails.length; i++) {
    results +=
        `<li class="trail-listing ${i}" data-lat="${trails[i].latitude}" data-lon="${trails[i].longitude}"> <button class="forecast-tab"><span class="forecast-tab-span">Forecast</span></button>
        <section class="weather-display"></section>
            <div class="listing-wrapper">
                
             
              <section class="listing-content">
                <img class="listing-icon" src="${trails[i].imgSmall}"><h1>Name:${trails[i].name}</h1>
                <h3>Location: ${trails[i].location}</h3><h3>Length: ${trails[i].length} miles</h3>
                <p>Summary - ${trails[i].summary}</p> <p>Difficulty: ${trails[i].difficulty}</p>
                <p>Ascent: ${trails[i].ascent} feet</p> <p>Descent: ${trails[i].descent} feet</p>
                <a href="${trails[i].url}">For more information, click here!</a>
              </section>
            </div>
        </li>`;
  }
  $('.results').replaceWith(`<section class="results">${results}<</section>`);
}

/*obtain list of trails to display based on lat & lon and distance from location inputs     <section class="results hidden">
</section>*/
function getTrails (res, dist) {
  if(dist <= 1) {
    let dist = 5;
  }
  const lat = res.results[0].geometry.location.lat;
  const long =res.results[0].geometry.location.lng; 
  const trailURL = `https://www.mtbproject.com/data/get-trails?lat=${lat}&lon=${long}&maxDistance=${dist}&key=${API_KEY.MTB_PROJECT}`;

  fetch(trailURL)
    .then(response => checkResponse(response))
    .then(resj => buildList(resj))
    .catch(err => console.log(err.message));
}

/*obtain lat & lon for weather and trail uses  */
function getLat(inputSearch, distanceFrom) {
  console.log('2');
  const geoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${inputSearch}&key=${API_KEY.GOOGLE_GEOCODE}`;
        
  fetch(geoURL)
    .then(response => checkResponse(response))
    .then(resj => getTrails(resj, distanceFrom))
    .catch(err => console.log(err.message));
}


/*obtain weather forecasts for trails upon request */
function findForecast(trailCoordinates) {
  const lati = trailCoordinates.lat;
  const longi = trailCoordinates.lon;
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&APPID=267ca2de084374c760f4845dd17c57f4`)
    .then(response => checkResponse(response))
    .then(resj => buildForecast(resj))
    .catch(err => console.log(err.message));
}

function watchResultsActivity() {
    
  $(document).on('click', '.forecast-tab', function(e) {
    const trailCoordinates = $(this).parent()[0].dataset;
    let forecast = findForecast(trailCoordinates);
    let par = $(this).parent()
    console.log(par);
  });
}

/*show search-tray for new search query */

function watchSearchTab() {

  $('main').on('click', '.search-tray-tab', function(e) {
    e.preventDefault();
    let tabState = $('[class~=\'search-tray-tab\']').attr('class');
    if(tabState === 'search-tray-tab close') {   
      $('.search-tray-tab').slideUp(); 
      $('.trail-search-form').addClass('hidden').slideUp(1000);
      $('.search-tray-tab').replaceWith(searchTabTrayOpen).removeClass('hidden');
      $('.search-tray-tab').slideDown(1300);
    }      
    if(tabState === 'search-tray-tab open') {    
      $('.search-tray-tab').slideUp(500);
      $('.trail-search-form').removeClass('hidden').slideDown(1000);
      $('.search-tray-tab').replaceWith(searchTabTrayClose).fadeIn(500);
    }  
  }); 
}

function displayResults() {
  setTimeout(function() {
    $('.search-tray-tab').removeClass('hidden');
    $('.search-tray-tab').slideDown(1000); }, 2000);  
  $('.results').removeClass('hidden');
  $('.results').fadeIn(3000);
  watchSearchTab();
  watchResultsActivity();
}

function leaveLanding() {
  $('.mtb-image').slideUp(2000);
  $('.banner').slideUp(2000).replaceWith($('.trail-search-form').addClass('hidden').removeClass('initial'));
    
}

/*switch layout to accomodate for result listings */
function pageTransition() {
  const formState = $('[class~=\'trail-search-form\']').attr('class');
  if(formState == 'trail-search-form initial'){ 
    leaveLanding();
  } 
    
  displayResults();
}


function watchForm() {

  $('.trail-search-form').submit(function(e) {
    e.preventDefault();
    var inputSearch = $('.mtb-trail-search-input').val();
    var distanceFrom = $('.distance-from-location-input').val();
    $('.results-list').empty();
    pageTransition();
    getLat(inputSearch, distanceFrom);
    // buildList(objData)
    // console.log(inputSearch, distanceFrom)
  });       
}

/*auto-fill search field based on user's IP */
function offerPrediction(resj) {
  $('.mtb-trail-search-input').attr('value', `${resj.city}`);
}

function generateLocation(resj) {
    
  fetch(`https://ipapi.co/${resj.ip}/json/`)
    .then(response => checkResponse(response))
    .then(resj => offerPrediction(resj))
    .catch(err => console.log(err.message));    
}

function predictLocation() {
  fetch('https://api.ipify.org?format=json')
    .then(response => checkResponse(response))
    .then(resj => generateLocation(resj))
    .catch(err => console.log(err.message));
}

/*present page */
function showText(text) {
  text.addClass('show');
}


$(document).ready(function(){
  predictLocation();

  showText($('.1'));
  setTimeout(function() {
    showText($('.2'));}, 1000);
  setTimeout(function() {
    showText($('.3'));}, 2000);
  setTimeout(function() {
    showText($('.4'));}, 3000); 

});



watchForm();