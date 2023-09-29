/*
    Rutas De Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { fieldValidators } = require('../middlewares/fields-validators');
const { validateJWT } = require('../middlewares/validate-jwt');

router.post(
    "/new",
    [   //Middleware
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El amil no es válido, tambien es obligatorio').isEmail(),
        check('password', 'El password es obligatorio y de 5 carácteres').isLength({ min: 5 }),
        fieldValidators,
    ],
    createUser
)

router.post(
    "/",
    [   //Middleware
        check('email', 'El amil no es válido, tambien es obligatorio').isEmail(),
        check('password', 'La contraceña debe tener 5 carácteres').isLength({ min: 5 }),
        fieldValidators,
    ],
    loginUser 
)

router.get("/renew", validateJWT, renewToken )

module.exports = router;