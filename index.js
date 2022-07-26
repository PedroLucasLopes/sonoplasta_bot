require('dotenv').config();
const Twit = require('twit');

//Declaring a Twitter API
const twitter = new Twit({
    consumer_key: process.env.APPLICATION_CONSUMER_KEY,
    consumer_secret: process.env.APPLICATION_CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

//Function to log errors from requests
function responseCallback(err, data, response) {
    console.log(err);
}

let media;

//Calling the stream and tracking tweets
const stream = twitter.stream('statuses/filter', { track: `@sonoplasta_bot ${media}` });

// event handler
stream.on('tweet', tweet => {
    // retweet
    twitter.post('statuses/retweet/:id', { id: tweet.id_str }, responseCallback);
    // like
    twitter.post('favorites/create', { id: tweet.id_str }, responseCallback);
});
