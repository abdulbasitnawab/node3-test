const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

const port = process.env.PORT || 3000;

const publicDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname,'../src/templates/views');
const partialPath = path.join(__dirname,'../src/templates/partials');

//setup handelbar engine and view location
app.set('views',viewPath);
app.set('view engine', 'hbs');
console.log("partial path == "+partialPath);
hbs.registerPartials(partialPath);
// setup static directory
app.use(express.static(publicDirectory));
// app.get('',(req,res) => {
//     res.send('<h1>Hellow express</h1>');
// });
debugger;
app.get('', (req, res) => {
    res.render('index', {
        title: 'Index page'
    })
});
app.get('/help', (req, res) => {
    res.render('help',{
        title:"help page"
    });
});

app.get('/about', (req, res) => {
    res.render('about',{
        about: "About the company",
        title:"about page"
    });
});

app.get('/products',(req,res) => {
    if(!req.query.search) {
       return res.send({
            error:'Must provide a search term'
        })
    }
    res.send({
        prducts: []
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Please provide valid address"
        })
    }
    geoCode(req.query.address,(error,dataAddress) =>{
        if(error){
            return res.send({
                error: "Please provide valid address"
            })  
        }
        forecast(dataAddress.latitude,dataAddress.longitude,(error, data) =>{
            if(error){
                return res.send({
                    error: "Please provide valid address"
                })  
            }
            res.send({
                forecast: data.chancesOfRain + ', ' +data.temprature,
                location: dataAddress.location, 
                address: req.query.address
            });
            
        });
    })
    
});

app.get('/help/*', (req,res) =>{
    res.render('404',{
        title:"404 Error Help",
        message: "The help article you are looking is not available"
    });
})
app.get('*', (req,res) =>{
    res.render('404',{
        title:"404 Error",
        message: "The page article you are looking is not available"
    });
})
//app.com app.com/about app.com/help

app.listen(port, () => {
    console.log('Server is up on port 3000');
});