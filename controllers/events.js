const { response } = require("express");



const getEvents = ( req, res = response ) => {
    return res.status(200).json({
        ok: true,
        msg: 'getEvents'
    })
}

const createEvent = ( req, res = response ) => {
    return res.status(200).json({
        ok: true,
        msg: 'createEvent'
    })
}

const updateEvents = ( req, res = response ) => {
    const id = req.getEvents
    return res.status(200).json({
        ok: true,
        msg: 'updateEvents'
    })
}

const deleteEvent = ( req, res = response ) => {
    return res.status(200).json({
        ok: true,
        msg: 'deleteEvent'
    })
}

module.exports = {
    getEvents,
    createEvent,
    updateEvents,
    deleteEvent,
}