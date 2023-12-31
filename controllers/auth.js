const { response } = require("express")
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { generateJWT } = require('../helpers/jwt')

const createUser = async (req, res = response) => {
    
    try {        
        const { email, password } = req.body
        let user = await User.findOne({ email })
        
        if ( user) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya ha sido usado en otra cuenta'
            })
        }

        user = new User( req.body )
        //Password Encripta
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync( password, salt )
        await user.save()

        const token = await generateJWT( user.id, user.name )
        
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquece con el Administrador'
        })
    }
}

const loginUser = async (req, res = response) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        
        if ( !user) {
            return res.status(400).json({
                ok: false,
                msg: 'Los paramétros son incorrectos (P)'
            })
        }

        //Confirm Passwords
        const validPassword = bcrypt.compareSync( password, user.password )

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Los paramétros son incorrectos (C)'
            })
        }

        const token = await generateJWT( user.id, user.name )
        
        res.status(200).json({
            ok: true,
            uid: user.id,
            email: user.email,
            name: user.name,
            token,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquece con el Administrador'
        })
    }
}

const renewToken = async (req, res = response) => {
    const { uid, name } = req
    const token = await generateJWT( uid, name )
    
    res.json({
        ok: true,
        uid,
        name,
        token
    })
}


module.exports = {
    createUser,
    loginUser,
    renewToken,
}