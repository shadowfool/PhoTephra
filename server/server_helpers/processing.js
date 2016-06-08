const Clarifai = require('clarifai');
const key = require('../../keys.js');

const client = new Clarifai({
  id: key.clarifaiClientID,
  secret: key.clarifaiClientSecret,
});

// Get new access tocken
client.getAccessToken((err, accessToken) => {
  // Callback code here
});

// Get tags from the url

// URL can be a url or an array of URLs
const url = [];

client.tagFromUrls('image', url, function(err, results) {
  // Callback code here
}, [language])