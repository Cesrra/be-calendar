const express = require('express');
require('dotenv').config();
const { dbConection } = require('./database/config');

//Make the Express Server
const app = express();

//DB Conection
dbConection()

//Public Directory
app.use(express.static('public'));

//Reading and Parcing of Body
app.use( express.json() )

//Routes
app.use('/api/auth', require('./routes/auth'));

//Listening Request
app.listen( process.env.PORT, () => {
    console.log(`Server run in port ${process.env.PORT}`)
})