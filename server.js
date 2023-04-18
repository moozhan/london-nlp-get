const express = require('express');
const fs = require('fs');
// const cors = require('cors');


// const cors = require('cors');

const app = express();
app.use(express.json());

app.use(express.static(__dirname + '/static'));
app.set('view engine', 'ejs');
var areaFinder = require('./modules/areaFinder');
// var processPost = require('./modules/processPost');
// var apiFetcher = require('./modules/apiFetch');
var dataCentroids = require('./modules/dataCentroids');
var namesList = require('./modules/namesList');


// app.use(cors({
//     origin: "*",
// }));

camelize = function camelize(str) {
    return str.replace(/-/g, ' ').replace(/([A-Z])/g, ' $1').replace(/^./, function (str) { return str.toUpperCase(); })
};

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// ------------------------ Home Page ----------------------------------//

app.get('/', (req, res) => {
    res.render('pages/index');
});


// ------------------------ metadata related ----------------------------------//

app.get('/conformance', (req, res) => {
    // res.render('pages/index', { data: appData });
});

app.get('/collections', (req, res) => {
    // res.render('pages/index', { data: appData });
});

app.get('/collections/static', (req, res) => {
    // res.render('pages/index', { data: appData });
});

app.get('/collections/semi-static', (req, res) => {
    // res.render('pages/index', { data: appData });
});

app.get('/collections/real-time', (req, res) => {
    // res.render('pages/index', { data: appData });
});

// ------------------------ Post endpoint related ----------------------------------//


// app.post('/api/v1/collections/functions/items/geo', (req, res) => {
//     let userQuery = req.body.inputText;
//     let result = processPost.processPost(userQuery);
//     res.json(result);
// });

//---------------------------- All Static Collections -------------------------//
app.get('/api/v1/search/collections/static/items/areas', (req, res) => {
    const querytoPass = req.query.name;
    const result = areaFinder.areaFinder(querytoPass);
    res.json(result);
});

app.get('/api/v1/search/collections/semi-static/items/names', (req, res) => {
    const querytoPass = req.query.type;
    const result = namesList.namesList();
    res.send(result);
});

//---------------------------- All Semi-Static Collections -------------------//
app.get('/api/v1/search/collections/semi-static/items/facilities', (req, res) => {
    const querytoPass = req.query.type;
    const result = dataCentroids.dataCentroids(querytoPass);
    res.send(result);
});

//---------------------------- All Real-Time Collections -------------------//





const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port 3000'));