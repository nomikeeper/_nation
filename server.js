const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
// Creating the app
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});

// Maintenance page
/*
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

*/
// Help static page
app.use(express.static(__dirname+ '/public'))

// Current Year getter
hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text)=> {
    return text.toUpperCase();
});

// Home page
app.get('/', (req, res)=> { 
   res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Welcome to Digital nation'
   });
});

// About Page
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});


app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});