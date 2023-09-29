const { response } = require("express");
const Event = require("../models/Event");



const getEvents = async ( req, res = response ) => {
    const events = await Event.find()
                              .populate('user', 'name')
    res.status(200).json({
        ok: true,
        events
    })
}

const createEvent = async ( req, res = response ) => {
    const event = new Event( req.body )
    
    try {
        event.user = req.uid
        const eventSaved = await event.save()
        res.status(201).json({
            ok: true,
            event: eventSaved,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor comuniquece con el administrador'
        })
    }
}

const updateEvents = async ( req, res = response ) => {
    const eventId = req.params.id
    const uid = req.uid

    try {
        const event = await Event.findById({_id: eventId})

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe evento con ese ID'
            })
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permisos para modificar el evento'
            })
        }

        const eventNew = {
            ...req.body,
            user: uid
        }

        const updatedEvent = await Event.findByIdAndUpdate( eventId, eventNew, { new: true} )

        res.status(200).json({
            ok: true,
            event: updatedEvent
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false, 
            msg: 'Por favor comuníquese con el adminstrador'
        })
    }
}

const deleteEvent = async ( req, res = response ) => {
    const eventId = req.params.id
    const uid = req.uid

    const event = await Event.findById({_id: eventId})
    
    if ( !event ) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe evento con ese ID'
        })
    }
    
    if ( event.user.toString() !== uid ) {
        return res.status(401).json({
            ok: false,
            msg: 'No tiene permisos para eliminar el evento'
        })
    }
    
    const eventDeleted = await Event.findByIdAndDelete({_id: eventId})

    res.status(200).json({
        ok: true,
        event: eventDeleted
    })
}

module.exports = {
    getEvents,
    createEvent,
    updateEvents,
    deleteEvent,
}