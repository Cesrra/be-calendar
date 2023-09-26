const mongoose = require("mongoose");

const dbConection = async () => {
    try {
        // Dado que la conexcion es una promesa podemos usar el await
        await mongoose.connect( process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true
        })
        console.log('DB online')
    } catch (error) {
        console.log(error)
        throw new Error('Error al inicializar la BD')
    }
}

module.exports = {
    dbConection
}