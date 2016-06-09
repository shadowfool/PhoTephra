// const Clarifai = require('clarifai');
// const key = require('../../keys.js');

// const client = new Clarifai({
//   id: key.clarifaiClientID,
//   secret: key.clarifaiClientSecret,
// });

const helpers = require('./helpers.js');

const testImages = [
  // 'http://i.imgur.com/FWGpCuk.jpg',
  // 'http://media.galaxant.com/000/108/061/desktop-1421344897.jpg',
  'https://avatars2.githubusercontent.com/u/17420728?v=3&s=400/',
  // 'https://avatars3.githubusercontent.com/u/709295?v=3&s=400/#qwws',
  'https://avatars2.githubusercontent.com/u/2666121?v=3&s=400/#de',
  // 'http://cdn.grumpycats.com/wp-content/uploads/2016/02/12654647_974282002607537_7798179861389974677_n-758x758.jpg#adebdc',
];

helpers.getTags(testImages, (err, images) => {
  if (err) {
    console.error(err);
    return;
  }
  // console.log(JSON.stringify(images[0].apiData[0].tags));
  const results = [];
  for (let i = 0; i < images.length; i++) {
    const url = images[i].url;
    const categories = helpers.classifyTags(images[i].apiData.tags);
    results.push({ url, categories });
  }
  console.log(results);
});


// helpers.getTags2(testImages);
