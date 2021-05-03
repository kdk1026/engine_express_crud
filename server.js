const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const router = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.set('views', './views');  // default
app.set('view engine', 'ejs');

app.use(router);

app.listen(3000, function() {
    console.log('start, express server on port 3000');
});
