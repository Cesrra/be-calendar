/* 
    Rutas de Eventos / Events
    host + /api/events
*/

const { Router } = require('express')
const router = Router()
const { getEvents, createEvent, updateEvents, deleteEvent } = require('../controllers/events')
const { validateJWT } = require('../middlewares/validate-jwt')

router.use( validateJWT )

router.get( '/', getEvents )

router.post( '/', createEvent )

router.put( '/:id', updateEvents )

router.delete( '/:id', deleteEvent )

module.exports = router