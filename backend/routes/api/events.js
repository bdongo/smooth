const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mongoose = require('mongoose');
const Event = mongoose.model('Event');
const { requireUser } = require('../../config/passport');
const validateEventInput = require('../../validation/events');

const { isProduction } = require('../../config/keys');



// GET all events by price, time
router.get('/', async (req, res) => {
    try {
        const { rating, price, time } = req.query;
        const filter = {};

        if (rating) {
            // Filter events by average rating
            filter.avgRating = { $gte: parseFloat(rating) };
        }

        if (price) {
            // Filter events by average price
            filter.avgPrice = { $lte: parseFloat(price) };
        }

        if (time) {
            // Filter events by average time
            filter.avgTime = { $gte: parseInt(time) };
        }

        const events = await Event.find(filter);

        return res.json(events);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


// GET a specific event by ID
router.get('/:eventId', async (req, res) => {
    const { eventId } = req.params;
    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        return res.json(event);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST create a new event
router.post('/', requireUser, validateEventInput, async (req, res) => {
    try {
        const { author, description, title, address, location } = req.body;

        // Create a new event object
        const newEvent = new Event({
            author,
            description,
            title,
            address, 
            location
        });

        // Save the event to the database
        const event = await newEvent.save();

        return res.status(201).json(event);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT update an existing event
router.put('/:eventId', requireUser, validateEventInput, async (req, res) => {
    const { eventId } = req.params;
    try {
        const { author, description, title, address, location} = req.body;

        // Find the event by ID
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Update the event properties
        event.author = author;
        event.description = description;
        event.title = title;
        event.address = address;
        event.location = location;

        // Save the updated event
        const updatedEvent = await event.save();

        return res.json(updatedEvent);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE an event
router.delete('/:eventId', async (req, res) => {
    const { eventId } = req.params;
    try {
        // Find the event by ID and remove it
        const event = await Event.findByIdAndRemove(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        return res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;