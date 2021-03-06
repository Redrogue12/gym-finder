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

function displaySearchData(data) {
    var venueID = ''
    var i = 0
    var resultsElement = ''
    if (data.response.venues) {

        data.response.venues.forEach(function(item) {
            var name = "Name: " + data.response.venues[i].name
            var address =   "Address: " + data.response.venues[i].location.formattedAddress
            venueID = data.response.venues[i].id

            // This is a separate query to get the picture from the gym
            FOURSQUARE_PHOTO_URL += venueID + '/photos/'
            var query = {
            client_id: 'OKKLGV0OHNRNEF1B04HEOHQJRGVHZWY4RLWNWZWMR1U2NV3C',
            client_secret: '2RGFKZTMXUCLFZLUOQJNBZW0KXLNPSPSMUYWJJCK4JQZKMJB',
            v: 20170401
            }
            $.getJSON(FOURSQUARE_PHOTO_URL, query, function(data) {
                if (data.response.photos.items.length > 0) {
                    var prefix = data.response.photos.items[0].prefix
                    var suffix = data.response.photos.items[0].suffix
                    var imageLink = prefix + '200x200' + suffix
                    console.log(imageLink);
                    var imageElement = "<img src='" + imageLink + "'></img>"

                } else {

                    var imageElement = "<img src='images/weight.png'></img>"
                }
                    $('.js-results').append(
                                        `<div class="js-gymResults col-4">
                                            ${imageElement}
                                            <h3>${name}</h3>
                                            <p>${address}</p>
                                        </div>`)

            })

            FOURSQUARE_PHOTO_URL = 'https://api.foursquare.com/v2/venues/'

            i++
        })

    }
    //Error message if there are no resutls
    if (data.response.venues.length == 0) {
        $('.js-results').append(`<h3 style="text-align:center; margin-top: 40px">Sorry, there are no results for this location. Try another location.</h3>`)
    }

}

function watchSubmit() {
    $('.searchForm').submit(function(e) {
        e.preventDefault()
        $('.js-results').html('')
        var query = $('input[name=enterLocation]').val()
        getDataFromApi(query, displaySearchData)
    })
}

$(document).ready(function() {
    watchSubmit()
})
