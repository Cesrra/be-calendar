const express = require('express');
require('dotenv').config();

//Make the Express Server
const app = express();

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