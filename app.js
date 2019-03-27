const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fs = require('fs');

const app = express();

app.set('view engine', 'ejs');
app.use(expressLayouts);

// app.use((req, res, next) => {
//     res.render('pages/maintenance', {
//         pageTitle: 'Maintenance Page'
//     });
// });

app.use(express.static(__dirname + '/public'));

// ejs helper functions
let convertToUppercase = text => {
    return text.toUpperCase();
};

// ejs global variables
app.locals.currentYear = new Date().getFullYear();
app.locals.upperCase = convertToUppercase;

// middleware
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.originalUrl}`;
    console.log(log);
    fs.appendFileSync('app.log', log + '\n');
    next();
});

app.get('/', (req, res) => {
    res.render('pages/home', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
    });
});

app.get('/about', (req, res) => {
    res.render('pages/about', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errMsg: 'Bad Request 400'
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});