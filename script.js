function watchForm() {
    
    
    $('.trail-search-form').submit(function(e) {
        e.preventDefault();
        const inputSearch = $('.mtb-trail-search-input').val();
        const distanceFrom = $('.distance-from-location-input').val();
        console.log(distanceFrom)
    })
    
      
}

watchForm()