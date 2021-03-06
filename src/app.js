const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000


const publicpath = path.join(__dirname, '../public')
const partialpath = path.join(__dirname, '../partials')

app.set('view engine', 'hbs')
app.use(express.static(publicpath))
hbs.registerPartials(partialpath)


app.get('', (req, res) => {

    res.render('index', {
        title: 'Weather App',
        name: 'adarsh'
    })
})

app.get('/about', (req, res) => {

    res.render('about', {

        title: 'About',
        name: 'adarsh'

    })
})

app.get('/help', (req, res) => {

    res.render('help', {


        title: 'Help',
        name: 'Adarsh'

    })
})


// app.get('', (req, res) => {
//     res.send('Hello Express')
// })
// app.get('/help', (req, res) => {
//     res.send('Help Page')
// })
// app.get('/about', (req, res) => {
//     res.send('<h1>ABOUT</h1>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'you must provide a address'
        })
    }
    //forecast: 'Sunny',
    //location: address
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address


            })
        })
    })
})



// app.get('/products', (req,res) => {
//     if(!req.query.search){
//         return res.send({
//             error: 'you must provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({

//         products: {}
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'adarsh',
        errormsg: 'help page not found'


    })

})

app.get('*', (req, res) => {
    res.render('error', {

        title: '404',
        name: 'adarsh',
        errormsg: 'page not found'
    })

})
app.listen(port, () => {

    console.log('server is up and running')
})

