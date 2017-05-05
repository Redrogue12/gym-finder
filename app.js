FOURSQUARE_URL = 'https://api.foursquare.com/v2/venues/search'
FOURSQUARE_PHOTO_URL = 'https://api.foursquare.com/v2/venues/'

function getDataFromApi(location, callback) {
    var query = {
        client_id: 'OKKLGV0OHNRNEF1B04HEOHQJRGVHZWY4RLWNWZWMR1U2NV3C',
        client_secret: '2RGFKZTMXUCLFZLUOQJNBZW0KXLNPSPSMUYWJJCK4JQZKMJB',
        query: 'gym',
        near: location,
        limit: 6,
        v: 20170401,
        m: 'foursquare'
    }
    $.getJSON(FOURSQUARE_URL, query, callback)
}

function getPhotoFromApi() {}

function displaySearchData(data) {
    var venueID = ''
    var i = 0
    var resultsElement = ''
    if (data.response.venues) {
        data.response.venues.forEach(function(item) {
            var name = "Name: " + data.response.venues[i].name
            var address =   "Adress: " + data.response.venues[i].location.formattedAddress
            // venueID = data.response.venues[i].id
            // FOURSQUARE_PHOTO_URL += venueID + '/photos'
            // getPhotoFromApi()
            resultsElement += `<div class='js-gymResults'>
                                    <h2>${name}</h2>
                                    <p>${address}</p>
                                </div>`
            console.log(name)
            console.log(address)
            i++
        })
        $('.js-results').html(resultsElement)
    }
}

function watchSubmit() {
    $('.searchForm').submit(function(e) {
        e.preventDefault()
        var query = $('input[name=enterLocation]').val()
        getDataFromApi(query, displaySearchData)
    })
}

$(document).ready(function() {
    watchSubmit()
})
