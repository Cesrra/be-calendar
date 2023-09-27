const { response } = require("express")
const User = require('../models/User')

const createUser = async (req, res = response) => {
    
    try {        
        const { email } = req.body
        let user = await User.findOne({ email })
        
        if ( user) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya ha sido usado en otra cuenta'
            })
        }

        user = new User( req.body )
        await user.save()
        
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquece con el Administrador'
        })
    }
}

const loginUser =(req, res = response) => {
    const { email, password } = req.body

    res.status(200).json({
        ok: true,
        msg: 'login',
        email,
        password,
    })
}

const renewToken = (req, res = response) => {
    res.json({
        ok: true,
        mgs: 'renew'
    })
}


module.exports = {
    createUser,
    loginUser,
    renewToken,
}