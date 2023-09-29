/* 
    Rutas de Eventos / Events
    host + /api/events
*/

const { Router } = require('express')
const router = Router()
const { getEvents, createEvent, updateEvents, deleteEvent } = require('../controllers/events')
const { validateJWT } = require('../middlewares/validate-jwt')
const { check } = require('express-validator')
const { fieldValidators } = require('../middlewares/fields-validators')
const { isDate } = require('../helpers/isDate')

router.use( validateJWT )

router.get( '/', getEvents )

router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
        fieldValidators,
    ],
    createEvent
)

router.put(
    '/:id',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La fecha de finalización es obligatoria').custom( isDate ),
        fieldValidators,
    ],
    updateEvents
)

router.delete( '/:id', deleteEvent )

module.exports = router