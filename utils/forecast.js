//Appling Shorthand and Destructuring
const request =  require('request')   //npm library

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1d8c479f1e0130d032a0b3d7c8ded871/' + latitude + ',' +longitude

    request({url , json : true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service..!!', undefined)
        } else if (body.error) {
            callback('Unable to find location..!!', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 'It is currently ' + body.currently.temperature + ' degrees out. There is ' + body.currently.precipProbability + ' chance of rain.')
        }
}) 
}

module.exports = forecast