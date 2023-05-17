const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Agenda = mongoose.model('Agenda');
const { requireUser } = require('../../config/passport');
const validateCreateAgenda = require('../../validation/agenda');
const Review = require("../../models/Review");
const User = mongoose.model('User');

router.get('/', async (req, res) => {
    try {
        const { userId } = req.query
        const agendas = await Agenda.find({ user: userId});
        return res.json(agendas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/unsaved', async (req, res) => {
    try {
        const { userId } = req.query
        const agenda = await Agenda.find({user: userId, saved: false});
        return res.json(agenda);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/:agendaId', async(req, res) => {
    const { agendaId } = req.params
    try {
        const agenda = await Agenda.findById(agendaId).populate('events');
        if(!agenda) {
            return res.status(404).json({ error: 'No Agenda found'})
        }
        return res.json(agenda);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error'});
    }
})

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
        };

        userToUpdate.agendas.push(newAgenda._id);
        await userToUpdate.save();

        // // Logic for how many itineraries event was added to
        // const eventToUpdate = await Event.findById(events);

        // if(!eventToUpdate) {
        //     return res.status(404).json({ error: 'Event not found'});
        // };

        // eventToUpdate.agendas.push(newAgenda._id);
        // await eventToUpdate.save();
        
        const payload = {
            agenda: newAgenda, 
            user: userToUpdate, 
           // event: eventToUpdate
        };

        return res.status(201).json(payload);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:agendaId', validateCreateAgenda, async (req, res) => {
    const { agendaId } = req.params;
    try {
        const agenda = await Agenda.findById(agendaId);
        if(!agenda) {
            return res.status(404).json({ error: 'Agenda not found'})
        }
        const { event, saved } = req.body;
        agenda.event = event;
        agenda.saved = saved;
        await agenda.save();

        return res.json(agenda);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:agendaId', async (req, res) => {
    const { agendaId } = req.params;
    try {
        // Find the agenda by ID and remove it
        const agenda = await Agenda.findById(agendaId);
        if (!agenda) {
            return res.status(404).json({ error: 'Agenda not found' });
        }

        await Agenda.deleteOne({ _id: agendaId });

        const userToUpdate = await User.findOneAndUpdate(
            { agendas: agendaId },
            { $pull: { agendas: agendaId }},
            { new: true }
        );

        if(!userToUpdate){
            return res.status(404).json({ error: 'User not found'})
        };

        await userToUpdate.save()

        return res.json({ message: 'Agenda removed successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router

testAgenda = {
    "user": "645d238fa6e27c34fd77c7c9",
    "events": ["645d2393a6e27c34fd77c804", "645d2393a6e27c34fd77c805"]
}