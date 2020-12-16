const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const path = require('path');
const api = require('./routes/api');

const port =process.env.PORT || 3000;

const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')));
 
app.use(bodyParser.json()); 

/* Netlify Updates */
//app.use('/api', api);
app.use('/api', api);


app.listen(port, function(){
    console.log("Server running on localhost:" + port);
});