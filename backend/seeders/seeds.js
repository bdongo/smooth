const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');


const NUM_SEED_USERS = 60;
const NUM_SEED_TWEETS = 30;

// Create users
const users = [];

users.push(
    new User({
        username: 'demo-user',
        email: 'demo-user@appacademy.io',
        hashedPassword: bcrypt.hashSync('starwars', 10)
    })
)

for (let i = 1; i < NUM_SEED_USERS; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    users.push(
        new User({
            username: faker.internet.userName(firstName, lastName),
            email: faker.internet.email(firstName, lastName),
            hashedPassword: bcrypt.hashSync(faker.internet.password(), 10)
        })
    )
}

new Event({
    title: "Union Square",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    description: "Union Square is a public plaza located in the heart of San Francisco, California. It is a popular tourist destination and a hub of shopping, dining, and cultural activity in the city. The square is bordered by several major shopping streets, including Powell Street, Stockton Street, and Geary Street, which are lined with high-end department stores, boutiques, and specialty shops.",
    address: {
        street: "333 Post St",
        city: "San Francisco",
        state: "CA",
        zipcode: "94108" 
    },
    location: { lat: 37.788088, lng: -122.407534 }
})

new Event({
    title: "Westfield San Francisco Centre",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    description: "Located just two blocks from famed Union Square, Westfield San Francisco Centre has emerged as one of the most enticing downtown retail venues in the United States. Featuring the West Coast flagship Bloomingdale's and the second largest Nordstrom in the nation, this 1.5 million square foot shopping center is the largest urban shopping venue west of the Mississippi River encompassing over 200 shops and restaurants, a Burke Williams day spa and Century Theatres.",
    address: {
        street: "865 Market St",
        city: "San Francisco",
        state: "CA",
        zipcode: "94103"
    },
    location: { lat: 37.784083, lng: -122.406317 }
})


new Event({
    title: "Tacorea",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    description: "Home of the original Tater Tot California Burrito",
    address: {
        street: "809 Bush St",
        city: "San Francisco",
        state: "CA",
        zipcode: "94108"
    },
    location: { lat: 37.7897213, lng: -122.4105696 }
})

new Event({
    title: "App Academy",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    description: "App Academy is an immersive web development and job placement program offered in San Francisco, New York, and Online. 90% of our graduates have offers or are working in tech jobs. In SF, graduates receive an average salary of $100,000; in NY, graduates receive an average salary of $84,000.",
    address: {
        street: "180 Geary St",
        city: "San Francisco",
        state: "CA",
        zipcode: "94108"
    },
    location: { lat: 37.787235, lng: -122.407097 }
})

new Event({
    title: "Pagan Idol",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    description: "Pagan Idol is a Tiki bar located in the Financial District of San Francisco housed in a historical space that was once home to the infamous Tiki Bob's Mainland Rendezvous. As you enter Pagan Idol you find yourself in the belly of a wooden ship that will transport you off the streets of San Francisco and deliver you to an exotic escape. Enter the back room at your own risk and encounter the sounds and sights of a tropical island, complete with starry night sky and erupting volcano. Come to Pagan Idol to suspend reality and experience unparalleled hospitality while enjoying an extensive menu of modern Tiki cocktails and an almost limitless selection of fine rums.",
    address: {
        street: "375 Bush St",
        city: "San Francisco",
        state: "CA",
        zipcode: "94104"
    },
    location: { lat: 37.7904474, lng: -122.4027516 }
})

new Event({
    title: "Sushi On North Beach - Katsu",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    description: "Japanese food with a few ounces of love",
     address: {
        street: "745 Columbus Ave",
        city: "San Francisco",
        state: "CA",
        zipcode: "94133"
    },
    location: { lat: 37.800425, lng: -122.410740 }
})






mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB successfully');
        insertSeeds();
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });

// Reset and seed db
const insertSeeds = () => {
    console.log("Resetting db and seeding users...");

    User.collection.drop()
        .then(() => User.insertMany(users))
        .then(() => {
            console.log("Done!");
            mongoose.disconnect();
        })
        .catch(err => {
            console.error(err.stack);
            process.exit(1);
        });
}