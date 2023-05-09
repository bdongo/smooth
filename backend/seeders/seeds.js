const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Event = require('../models/Event');
const Review = require('../models/Review.js')
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(`Error connecting to MongoDB: ${err}`));


const NUM_SEED_USERS = 60;

// Create users
const users = [];

users.push(
    new User({
        username: 'demo-user',
        email: 'demo-user@appacademy.io',
        hashedPassword: bcrypt.hashSync('password', 10)
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

// create events 

const events = [];

events.push(
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
    location: { lat: 37.788088, lng: -122.407534 },
    imageUrls: ["https://smooth-mern.s3.us-west-1.amazonaws.com/union1.jpeg",
    "https://smooth-mern.s3.us-west-1.amazonaws.com/union2.jpeg"
    ]
}))


events.push(
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
    location: { lat: 37.784083, lng: -122.406317 },
    imageUrls: [ "https://smooth-mern.s3.us-west-1.amazonaws.com/westfield1.jpeg",
    "https://smooth-mern.s3.us-west-1.amazonaws.com/westfield2.jpeg"
    ]
}))


events.push(
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
    location: { lat: 37.7897213, lng: -122.4105696 },
    imageUrls: ["https://smooth-mern.s3.us-west-1.amazonaws.com/tacorea1.jpeg",
    "https://smooth-mern.s3.us-west-1.amazonaws.com/tacorea2.jpeg"
    ]
}))

events.push(
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
    location: { lat: 37.787235, lng: -122.407097 },
    imageUrls: ['https://smooth-mern.s3.us-west-1.amazonaws.com/aa1.jpeg',
     'https://smooth-mern.s3.us-west-1.amazonaws.com/aa2.png']
}))

events.push(
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
    location: { lat: 37.7904474, lng: -122.4027516 },
    imageUrls: ["https://smooth-mern.s3.us-west-1.amazonaws.com/pagan-1.jpeg",
    "https://smooth-mern.s3.us-west-1.amazonaws.com/pagan2.jpeg"
    ]
}))

events.push(
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
    location: { lat: 37.800425, lng: -122.410740 },
    imageUrls: ["https://smooth-mern.s3.us-west-1.amazonaws.com/sushi1.jpeg",
    "https://smooth-mern.s3.us-west-1.amazonaws.com/sushi2.jpeg"
    ]
}))

events.push(
    new Event({
    title: "The Devil's Acre",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    description: "Apothecary style cocktails featuring house-revived extinct ingredients",
    address: {
        street: "256 Columbus Ave",
        city: "San Francisco",
        state: "CA",
        zipcode: "94133"
    },
    location: { lat: 37.797394, lng: -122.407822 },
    imageUrls: ['https://smooth-mern.s3.us-west-1.amazonaws.com/devils1.jpeg',
     "https://smooth-mern.s3.us-west-1.amazonaws.com/devils2.jpeg"]
}))

events.push(
    new Event({
    title: "Sam's",
    author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
    description: "Anthony Bourdain has been here",
    address: {
        street: "618 Broadway",
        city: "San Francisco",
        state: "CA",
        zipcode: "94133"
    },
    location: {
        lat: 37.797971,
        lng: -122.407057
    },
    imageUrls: ['https://smooth-mern.s3.us-west-1.amazonaws.com/sams1.jpeg',
     "https://smooth-mern.s3.us-west-1.amazonaws.com/sams2.jpeg"]
}))

const sampleReviews = ["This event was amazing! The atmosphere was great and the staff were really friendly.",
    "I had a great time at this event. The performers were really talented and the venue was beautiful.",
    "I would highly recommend this event to anyone looking for a fun night out. The music was great and the drinks were delicious.",
    "The food at this event was absolutely delicious. I couldn't stop eating!",
    "I had a lot of fun at this event. The activities were engaging and the staff were helpful.", 
    "The drinks at this event were really good. I especially liked the cocktails.", 
    "The performers at this event were really talented and put on a great show.", 
    "The staff at this event were really friendly and welcoming. I felt right at home.", 
    "This event was a great way to spend the weekend. I had a lot of fun and met some really cool people.", 
    "The venue for this event was really nice. I loved the decor and the ambiance.", 
    "I would definitely come back to this event again. It was so much fun!", 
    "The food at this event was some of the best I've ever had. I highly recommend it!", 
    "The music at this event was really good. I couldn't stop dancing!", 
    "The activities at this event were really fun. I especially enjoyed the photo booth.", 
    "The staff at this event went above and beyond to make sure everyone was having a good time. I really appreciated it.", 
    "I had a great time at this event. The company was great and the atmosphere was perfect.", 
    "This event was a great way to experience the local culture. I learned so much!", 
    "The drinks at this event were really unique and tasty. I loved trying something new.", 
    "I had a lot of fun at this event. The entertainment was great and the food was delicious.", 
    "The performers at this event were really entertaining. I couldn't take my eyes off the stage!"
]



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
        .then(() => Review.collection.drop())
        .then(() => Event.collection.drop())
        .then(() => User.insertMany(users))
        .then((insertedUsers) => Event.insertMany(events)
            .then((insertedEvents) => {
                const reviews = [];

                insertedEvents.forEach((event) => {
                    // create three reviews for each event
                    for (let i = 0; i < 5; i++) {
                        const review = {
                            author: insertedUsers[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
                            event: event._id,
                            rating: Math.floor(Math.random() * 3) + 3,
                            price: Math.floor(Math.random() * 4) + 1,
                            time: Math.floor(Math.random() * 4) + 1,
                            body: sampleReviews[Math.floor(Math.random() * sampleReviews.length)],
                        };
                        reviews.push(review);
                    }
                });

                for (let i = 0; i < 2; i++) {
                    const review = {
                        author: insertedUsers[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
                        event: insertedEvents[Math.floor(Math.random() * insertedEvents.length)]._id,
                        rating: Math.floor(Math.random() * 2) + 1,
                        price: Math.floor(Math.random() * 4) + 1,
                        time: Math.floor(Math.random() * 4) + 1,
                        body: sampleReviews[Math.floor(Math.random() * sampleReviews.length)],
                    };
                    reviews.push(review);
                }

                return Review.insertMany(reviews);
            }))
        .then(() => {
            console.log('Done!');
            mongoose.disconnect();
        })
        .catch(err => {
            console.error(err.stack);
            process.exit(1);
        });
}