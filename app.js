// Express modules
const express = require('express');
const bodyParser = require('body-parser');

// Custom modules
const imageRoutes = require('./routes/images');

// Server variables
const app = express();
app.set('view engine', 'ejs');

// Add middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(imageRoutes);

app.listen(3000);