const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Review = mongoose.model('Review');
const { requireUser } = require('../../config/passport');
const validateReviewInput = require('../../validation/review');
const Event = mongoose.model('Event');

const { isProduction } = require('../../config/keys');

// GET all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        return res.json(reviews);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET a specific review by ID
router.get('/:reviewId', async (req, res) => {
    const { reviewId } = req.params;
    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        return res.json(review);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST create a new review
router.post('/', validateReviewInput, async (req, res) => {
    try {
        const { text, title, rating, price, time, author, event } = req.body;

        // console.log(event)
        // Create a new review object
        const newReview = new Review({
            text,
            title,
            rating,
            price,
            time, 
            author,
            event 
        });

        // Save the review to the database
        const review = await newReview.save();

        const eventToUpdate = await Event.findById(event);
        if (!eventToUpdate) {
            return res.status(404).json({ error: 'Event not found' });
        }

        eventToUpdate.reviews.push(review._id);
        await eventToUpdate.save();

        return res.status(201).json(review);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT update a review
router.put('/:reviewId', requireUser, validateReviewInput, async (req, res) => {
    const { reviewId } = req.params;
    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        const { text, title, rating, price, time, author, event } = req.body;
        review.text = text;
        review.title = title;
        review.rating = rating;
        review.price = price;
        review.time = time;
        review.author = author;
        review.event = event;
        await review.save();
        return res.json(review);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a review
router.delete('/:reviewId', async (req, res) => {
    const { reviewId } = req.params;
    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        await review.remove();
        return res.status(204).json({ message: 'Review deleted' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;