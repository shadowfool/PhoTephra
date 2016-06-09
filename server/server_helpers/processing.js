// const Clarifai = require('clarifai');
// const key = require('../../keys.js');

// const client = new Clarifai({
//   id: key.clarifaiClientID,
//   secret: key.clarifaiClientSecret,
// });

const helpers = require('./helpers.js');

const testImages = [
  'http://i.imgur.com/FWGpCuk.jpg',
  'http://media.galaxant.com/000/108/061/desktop-1421344897.jpg',
];

helpers.getTags(testImages, (err, images) => {
  if (err) {
    console.error(err);
    return;
  }
  // console.log(JSON.stringify(images));
  const results = [];
  for (let i = 0; i < images.length; i++) {
		const url = images[i].url;
		const categories = helpers.classifyTags(images[i].apiData[0].tags);
		results.push({ url: url, categories: categories });
  }

  return results;
});

// helpers.classifyPhoto(testImages, '')
