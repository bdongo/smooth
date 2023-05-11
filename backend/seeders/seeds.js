const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Event = require('../models/Event');
const Review = require('../models/Review.js')
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');
// const Event = mongoose.model('Event');

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
    category: "historic",
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
    category: "shopping",
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
    category: "food",
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
    category: "learning",
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
    category: "drinks",
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
    category: "food",
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
    category: "drinks",
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
    category: "food",
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

events.push(
    new Event({
        title: "Lombard Street",
        category: "historic",
        author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
        description: "Lombard Street is an east–west street in San Francisco, California that is famous for a steep, one-block section with eight hairpin turns. Stretching from The Presidio east to The Embarcadero, most of the street's western segment is a major thoroughfare designated as part of U.S. Route 101.",
        address: {
            street: "1000-1099 Lombard St",
            city: "San Francisco",
            state: "CA",
            zipcode: "94133"
        },
        location: {
            lat: 37.8024852,
            lng: -122.4183064
        },
        imageUrls: ['https://smooth-mern.s3.us-west-1.amazonaws.com/lombard1.jpeg',
            "https://smooth-mern.s3.us-west-1.amazonaws.com/lombard2.jpeg"]
    }))

events.push(
    new Event({
        title: "Umbrella Alley San Francisco",
        category: "photos",
        author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
        description: "Hey there! If you're looking for a fun and Insta-worthy spot in Fisherman's Wharf, we've got just the place for you. Come check out Umbrella Alley and its interactive murals - it's like a rainbow exploded and made a permanent home there. And the best part? You can be a part of the art by leaving a little something for the talented mural artists. ",
        address: {
            street: "757 Beach St",
            city: "San Francisco",
            state: "CA",
            zipcode: "94108"
        },
        location: { lat: 37.807389, lng: -122.417601 },
        imageUrls: ['https://smooth-mern.s3.us-west-1.amazonaws.com/umbrella1.jpeg',
            "https://smooth-mern.s3.us-west-1.amazonaws.com/umbrella2.jpeg"]
    }))

events.push(
    new Event({
        title: "Andy Goldsworthy's Wood Line",
        category: "hiking",
        author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
        description: "A 1,200-ft. winding line of recycled eucalyptus trunks in the forest, created by Andy Goldsworthy.",
        address: {
           street: "103 Montgomery St",
            city: "San Francisco",
            state: "CA",
            zipcode: "94129"
        },
        location: { lat: 37.799144, lng: -122.462874 },
        imageUrls: ['https://smooth-mern.s3.us-west-1.amazonaws.com/andy1.jpeg',
            "https://smooth-mern.s3.us-west-1.amazonaws.com/andy2.jpeg"]
    }))

events.push(
    new Event({
        title: "Maiden Lane",
        author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
        category: "historic",
        description: "Maiden Lane is a pedestrian mall located in San Francisco, California, United States. A former section of the city's red light district, Maiden Lane is now home to high-end boutiques and art galleries. The street also serves as the location of San Francisco's only Frank Lloyd Wright designed building",
        address: {
            street: "Maiden Ln",
            city: "San Francisco",
            state: "CA",
            zipcode: "94108"
        },
        location: {
            lat: 37.7883649,
            lng: -122.4059232
        }
,
        imageUrls: ['https://smooth-mern.s3.us-west-1.amazonaws.com/maiden1.jpeg',
            "https://smooth-mern.s3.us-west-1.amazonaws.com/maiden2.jpeg"]
    }))

events.push(
    new Event({
        title: "Coit Tower",
        author: users[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
        category: "historic",
        description: "Coit Tower is a 210-foot tower in the Telegraph Hill neighborhood of San Francisco, California, offering panoramic views over the city and the bay. The tower, in the city's Pioneer Park, was built between 1932 and 1933 using Lillie Hitchcock Coit's bequest to beautify the city of San Francisco.",
        address: {
            street: "1 Telegraph Hill Blvd",
            city: "San Francisco",
            state: "CA",
            zipcode: "94133"
        },
        location: {
            lat: 37.8026,
            lng: -122.4053
        }
        ,
        imageUrls: ['https://smooth-mern.s3.us-west-1.amazonaws.com/coit1.jpeg',
            "https://smooth-mern.s3.us-west-1.amazonaws.com/coit2.jpeg"]
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
    "The performers at this event were really entertaining. I couldn't take my eyes off the stage!",
    "I had a great experience at this hair salon. The staff were friendly and knowledgeable, and I left feeling really happy with my haircut.",
    "I recently went to this concert venue to see one of my favorite bands play, and it was an amazing experience. The sound quality was great and the atmosphere was electric.",
    "I booked a tour with this travel company and it was such a fun and informative experience. Our guide was knowledgeable and engaging, and the itinerary was well-planned.",
    "I went to this gym for the first time and was impressed with the variety of equipment and classes they offer. The staff were friendly and helpful, and the facilities were clean and well-maintained.",
    "I've been a customer of this online retailer for a few years now, and I'm always impressed with their fast shipping and great customer service. The quality of their products is also top-notch.",
    "I recently visited this art museum and was blown away by the quality and variety of the exhibits. It's definitely worth a visit if you're a fan of contemporary art.",
    "I had a great experience at this car dealership. The salesperson I worked with was friendly and helpful, and they had a great selection of cars to choose from.",
    "I stayed at this hotel on a recent business trip and was impressed with the level of service and amenities they offered. The room was clean and comfortable, and the staff were attentive to my needs.",
    "I attended a yoga class at this studio and was really impressed with the quality of instruction. The teacher was knowledgeable and supportive, and the atmosphere was calming and relaxing.",
    "I've been a member of this book club for a few months now, and I'm really enjoying it. The selections are diverse and interesting, and the discussions are thought-provoking.",
    "I recently visited this historical site and was blown away by the rich history and architecture. The staff were knowledgeable and friendly, and the exhibits were well-presented.",
    "I took my kids to this amusement park and we all had a blast. The rides were thrilling and the food was delicious. We can't wait to go back!",
    "I visited this nature preserve on a recent hike and was amazed by the beautiful scenery and wildlife. It's definitely worth a visit if you're a fan of the outdoors.",
    "I recently saw a play at this theater and was blown away by the talent of the actors and the quality of the production. It's a great venue for live performances.",
    "I went to this dance club with some friends and had a great time. The music was fantastic and the atmosphere was lively and energetic.",
    "I visited this science museum and was impressed with the variety of exhibits and interactive displays. It's a great place for kids and adults alike.",
    "I took a cooking class at this culinary school and learned so much. The instructor was knowledgeable and patient, and the food we made was delicious.",
    "I attended a stand-up comedy show at this club and laughed so hard my sides hurt. The comedians were hilarious and the drinks were good.",
    "I went to this escape room with a group of friends and we had a blast. The puzzles were challenging but not too difficult, and the theme was really fun.",
    "I recently visited this botanical garden and was blown away by the beauty of the plants and flowers. It's a great place to relax and appreciate nature."
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
const insertSeeds = async () => {
    console.log("Resetting db and seeding users...");

    try {
        // drop collections to start fresh
        await User.collection.drop();
        await Review.collection.drop();
        await Event.collection.drop();

        // insert seed users
        const insertedUsers = await User.insertMany(users);

        // insert seed events
        const insertedEvents = await Event.insertMany(events);

        console.log("Users and Events done. Seeding Reviews....");

        // create reviews for each event
        const reviews = [];
        for (let i = 0; i < insertedEvents.length; i++) {
            const event = insertedEvents[i];
            for (let j = 0; j < 5; j++) {
                const review = new Review({
                    author: insertedUsers[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
                    event: event._id,
                    rating: Math.floor(Math.random() * 3) + 3,
                    price: Math.floor(Math.random() * 30) + 1,
                    time: Math.floor(Math.random() * 3) + 1,
                    text: sampleReviews[Math.floor(Math.random() * sampleReviews.length)],
                });
                // reviews.push(review);
                await review.save()
                event.reviews.push(review._id);
            }
            
            await event.save();
        }

        console.log("reviews made!")

        // create additional reviews for random events
        for (let i = 0; i < 3; i++) {
            const event = insertedEvents[Math.floor(Math.random() * insertedEvents.length)];
            const review = new Review({
                author: insertedUsers[Math.floor(Math.random() * NUM_SEED_USERS)]._id,
                event: event._id,
                rating: Math.floor(Math.random() * 2) + 1,
                price: Math.floor(Math.random() * 100) + 1,
                time: Math.floor(Math.random() * 6) + 1,
                text: sampleReviews[Math.floor(Math.random() * sampleReviews.length)],
            });
            await review.save()
            event.reviews.push(review._id);
            await event.save();
            // reviews.push(review);
            
        }


        for (let i = 0; i < insertedEvents.length; i++) {
            const event = insertedEvents[i];
            const populated = await event.populate('reviews');
            console.log("populated",populated )
            event.updateAverages();
            await event.save();
        }

        console.log('Done!');
        mongoose.disconnect();
    } catch (err) {
        console.error(err.stack);
        process.exit(1);
    }
}