const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Agenda = mongoose.model('Agenda');
const { requireUser } = require('../../config/passport');
const validateCreateAgenda = require('../../validation/agenda');
const User = mongoose.model('User');

router.get('/', async (req, res) => {
    try {
        const agendas = await Agenda.find();
        return res.json(agendas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/', validateCreateAgenda, async (req, res) => {
    try {
        const { user, event, time } = req.body;

        const newAgenda = new Agenda({
            user,
            event,
            time
        });

        await newAgenda.populate('event')
        await newAgenda.save();
        // await agenda.populate('event').execPopulate();

        const userToUpdate = await User.findById(user).populate({
            path: 'agendas',
            populate: { path: 'event' }
        });

        if (!userToUpdate) {
            return res.status(404).json({ error: 'User not found' });
        }

        userToUpdate.agendas.push(newAgenda._id);
        await userToUpdate.populate('agendas');
        await userToUpdate.save();
        
        const payload = {
            agenda: newAgenda, user: userToUpdate
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
    "user": "645bcae8c26f2be356ffbf3e",
    "event": "645af79634cd12e0ff7ad1bd",
    "time": 12
}