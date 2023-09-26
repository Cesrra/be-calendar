const { response } = require("express")

const createUser = (req, res = response) => {
    const { name, email, password } = req.body

    res.status(201).json({
        ok: true,
        mgs: 'create',
        name,
        email,
        password,
    })
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