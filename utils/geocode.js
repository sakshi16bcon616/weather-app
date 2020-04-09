
//Appling Shorthand and Destructuring

const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZ295YWxzYWtzaGkyNDYiLCJhIjoiY2s4NXYzM2ttMDdlaTNrcnE0YWJmODI0cSJ9.ofQ5xfxYX3MzWn5Pb_0YIg&limit=1'
    //const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZ295YWxzYWtzaGkyNDYiLCJhIjoiY2s4NXYzM2ttMDdlaTNrcnE0YWJmODI0cSJ9.ofQ5xfxYX3MzWn5Pb_0YIg&limit=1'

    request({url, json : true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect with location services..!!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                longitude : body.features[0].center[0],
                latitude : body.features[0].center[1] ,
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
