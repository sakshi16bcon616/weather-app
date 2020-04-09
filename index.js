const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forcast = require('./utils/forecast')

const app = express()

//Define a path for express config.
const publicDirectoryPath = path.join(__dirname, '/public')
const viewsPath = path.join(__dirname, '/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')   
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve.
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index', {
        title : 'Weather',
        name : 'Sakshi'
    })     
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Sakshi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'This is some helpful text.',
        title : 'Help',
        name : 'Sakshi'
        })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error : 'You must provide the address property'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error: error })
        }
    
        forcast(latitude, longitude, (error,forecastData) => {
            if (error) {
                return res.send({ error: error })
            }
            
            res.send({
                location : location,
                forecast: forecastData,
                address: req.query.address
            })
        }) 
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sakshi',
        errorMessage : 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sakshi',
        errorMessage : 'Page Not Found'
    })
})

app.listen(8080, () => {
    console.log('Listen on port 8080')
})
