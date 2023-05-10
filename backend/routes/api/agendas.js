const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Agenda = mongoose.model('Agenda');
const { requireUser } = require('../../config/passport');
const validateCreateAgenda = require('../../validation/agenda');
const User = mongoose.model('User');

router.get('/', async (req, res) => {
    try {
        const { userId } = req.query
        const agenda = await Agenda.find({user: userId}).populate('events');
        return res.json(agenda);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', validateCreateAgenda, async (req, res) => {
    try {
        const { user, events } = req.body;

        const newAgenda = new Agenda({
            user,
            events
        });

        await newAgenda.save();

        const userToUpdate = await User.findById(user);

        if (!userToUpdate) {
            return res.status(404).json({ error: 'User not found' });
        }

        userToUpdate.agenda = newAgenda._id;
        // await userToUpdate.populate('agenda');
        await userToUpdate.save();

        // const eventToUpdate = await Event.findById(events);

        // if(!eventToUpdate) {
        //     return res.status(404).json({ error: 'Event not found'});
        // }

        // eventToUpdate.agendas.push(newAgenda._id);
        // await eventToUpdate.populate('agendas');
        // await eventToUpdate.save();
        
        const payload = {
            agenda: newAgenda, 
            user: userToUpdate, 
            // event: eventToUpdate
        }

        return res.status(201).json(payload);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:agendaId', async (req, res) => {
    const { agendaId } = req.params;
    try {
        // Find the agenda by ID and remove it
        const agenda = await Agenda.findByIdAndRemove(agendaId);
        if (!agenda) {
            return res.status(404).json({ error: 'Agenda not found' });
        }

        return res.json({ message: 'Agenda removed successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router

testAgenda = {
    "user": "645c05ed8a4a9d541a0f4ed2",
    "events": ["645af79634cd12e0ff7ad1bd", "645af79634cd12e0ff7ad1c0"]
}