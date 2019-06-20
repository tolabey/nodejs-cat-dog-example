const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const petRoutes = require('./routes/pet.js')(app);

const server = app.listen(3002, function() {
    console.log('Server running at http:localhost:3002');
});