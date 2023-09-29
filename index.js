const express = require('express');
require('dotenv').config();
const cors = require('cors')
const { dbConection } = require('./database/config');

//Make the Express Server
const app = express();

//DB Conection
dbConection()

//CORS
app.use( cors() )

//Public Directory
app.use(express.static('public'));

//Reading and Parcing of Body
app.use( express.json() )

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//Listening Request
app.listen( process.env.PORT, () => {
    console.log(`Server run in port ${process.env.PORT}`)
})