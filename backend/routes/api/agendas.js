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
        const { user } = req.query
        const agendas = await Agenda.find({ user: user });
        const populatedAgendas = await Promise.all(agendas.map(async (agenda) => {
            await agenda.populate('events')
            return agenda;
        }));
        return res.json(populatedAgendas);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/unsaved', async (req, res) => {
    try {
        const { user } = req.query
        const agenda = await Agenda.find({user: user, saved: false})
        if(!agenda) {
            return res.status(404).json({ error: 'No Agenda Found'})
        };
        const populatedAgenda = await agenda.populate('events');
       
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
});


// router.get('/user/:userId/agendas', async (req, res) => {
//     const { userId } = req.params;
  
//     try {
//       const agenda = await Agenda.find({ user: userId, saved: false });
  
//       return res.json(agenda);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

router.post('/', validateCreateAgenda, async (req, res) => {
    try {
        const { user, event } = req.body;

        const newAgenda = new Agenda({
            user,
            events: event
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
        
        // const payload = {
        //     agenda: newAgenda, 
        //     user: userToUpdate, 
        //    // event: eventToUpdate
        // };

        return res.status(201).json(newAgenda);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:agendaId', async (req, res) => {
    const { agendaId } = req.params;
    try {
        const agenda = await Agenda.findById(agendaId);
        if(!agenda) {
            return res.status(404).json({ error: 'Agenda not found'})
        }
        const { events, saved, time, budget } = req.body;
        agenda.events = events || agenda.events
        agenda.saved = saved || false
        agenda.time = time || agenda.time
        agenda.budget = budget || agenda.budget
        
        // const populatedAgenda = await agenda.populate('events')
        await agenda.save()
        
        const populatedAgenda = await Agenda.findById(agendaId).populate('events');
        
        return res.json(populatedAgenda)
        // return res.json(agenda);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// router.put('/saved/:agendaId', validateCreateAgenda, async (req, res) => {
//     const { agendaId } = req.params;
//     try {
//         const agenda = await Agenda.findById(agendaId);
//         if(!agenda) {
//             return res.status(404).json({ error: 'Agenda not found'})
//         }
//         agenda.saved = true;
//         await agenda.save();

//         return res.json(agenda);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

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