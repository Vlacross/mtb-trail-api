/*dynamic data/ request&response content */

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

