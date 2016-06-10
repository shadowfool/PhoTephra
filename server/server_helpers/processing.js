// const Clarifai = require('clarifai');
// const key = require('../../keys.js');

// const client = new Clarifai({
//   id: key.clarifaiClientID,
//   secret: key.clarifaiClientSecret,
// });

// const helpers = require('./helpers.js');
const categories = require('./categories.js');
const _ = require('lodash');

const testImages = [
  // 'http://i.imgur.com/FWGpCuk.jpg',
  // 'http://media.galaxant.com/000/108/061/desktop-1421344897.jpg',
  // 'https://avatars2.githubusercontent.com/u/17420728?v=3&s=400/',
  // 'https://avatars3.githubusercontent.com/u/709295?v=3&s=400/#qwws',
  // 'https://avatars2.githubusercontent.com/u/2666121?v=3&s=400/#de',
  // 'http://cdn.grumpycats.com/wp-content/uploads/2016/02/12654647_974282002607537_7798179861389974677_n-758x758.jpg#adebdc',
  // "https://scontent.xx.fbcdn.net/v/t1.0-9/13100690_10208272746391839_223693133460415313_n.jpg?oh=ebf000696e6a9e4a5fc3f6b0f17b3cb2%26oe=57CBE11D#.jpg",
  "https://scontent.xx.fbcdn.net/t31.0-8/12484741_10207288525666936_5053017157545856962_o.jpg#.jpg",
  "https://scontent.xx.fbcdn.net/t31.0-8/12310036_10207056305501577_3307527667839448203_o.jpg#.jpg",
  // "https://scontent.xx.fbcdn.net/v/t1.0-9/12241323_10206996628689694_5449847592439127282_n.jpg?oh=8399ffd40d0a5d35d68d6369163ee074&oe=5800E2A3#.jpg",
  // "https://scontent.xx.fbcdn.net/t31.0-8/11109437_10205450636520856_3106000668922565474_o.jpg#.jpg",
  // "https://scontent.xx.fbcdn.net/v/t1.0-9/18687_10205445922363005_8643246825540455017_n.jpg?oh=1633adee9aeaf99a3803d1669be200ef&oe=57D674E0#.jpg",
  // "https://scontent.xx.fbcdn.net/v/t1.0-9/10639376_10204024796075736_2947119624606504994_n.jpg?oh=0dc848d16f97a42d2b784c57b97d9bfb&oe=57D7D106#.jpg",
  // "https://scontent.xx.fbcdn.net/t31.0-8/10506885_10203766215731389_8273713365625673583_o.jpg#.jpg",
  // "https://scontent.xx.fbcdn.net/v/t1.0-9/10372539_10202332334659952_3436401212391021871_n.jpg?oh=33c969e2bb49e78a5e7dc6da2731470a&oe=57CBDCF9#.jpg"
];

// helpers.getTags(testImages, (err, images) => {
//   const categorizedResponse = {
//     professional: [],
//     athletic: [],
//     adventurous: [],
//     headshot: [],
//   };

//   if (err) {
//     console.error(err);
//     return;
//   }
//   const photoArray = [];
//   _.each(images, (photo) => {
//     const imageUrl = photo.url;
//     const categorized = helpers.classifyTags(photo.apiData.tags);
//     photoArray.push({ imageUrl, categorized });
//   });
//   console.log('Photoarray', photoArray);
//   _.each(photoArray, (photo) => {
//     // console.log('photo', photo);
//     _.each(photo.categorized, (category) => {
//       // console.log('category', categorizedResponse[category]);
//       categorizedResponse[category].push(photo.imageUrl);
//     });
//   });
//   console.log(categorizedResponse);
// });

// const generateText = () => {
//   const tagLines = [
//     'Professional pillow fighter.',
//     'Ranked 5th in the world for thumb wrestling.',
//     'Shakira told me my hips don’t lie.',
//     'Runner-up at the world championship of snuggling.',
//     'Naked & Afraid occasionally constitutes as foreplay for me.',
//     'World champion of warm smiles.',
//     'It was the best of dates, it was the worst of dates.',
//     'Magic carpet certified',
//     'I love long carriage rides into the sunset',
//     'Dancing in the moonlight… it just feels so right',
//     'Looking for something dumb to do..',
//     'Our relationship should be like Nintendo 64-- classic, fun to spend hours with, and every issue is easily fixed by blowing on it then shoving it back in',
//   ];
//   return tagLines[Math.floor(Math.random() * tagLines.length)];
// };

// console.log(generateText());

const options = {
    host: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&callback=",
    path: 'http://api.icndb.com/jokes/random?firstName=Felix&lastName=Feng',
  };

// var request = require('request');
// request(options.host, function (error, response, body) {
//   if (error) {
//     console.log(error);
//   }
//   if (!error && response.statusCode == 200) {
//     console.log(JSON.parse(body)); // Show the HTML for the Google homepage.
//     // console.log(response);
//   }
// }

const classifyTags = (tags) => {
  const categorized = [];
  _.each(categories, (value, index) => {
    for (let i = 0; i < tags.length; i++) {
      if (_.indexOf(value.include, tags[i].class) !== -1) {
        // We need to make sure none of the tags are in the excluded array
        console.log('Tag included', tags[i].class);
        let flag = false;
        for (let j = 0; j < tags.length; j++) {
          if (_.indexOf(value.exclude, tags[j].class) !== -1) {
            console.log('Should be true', tags[j].class);
            flag = true;
          }
        }
        if (flag === false) {
          categorized.push(index);
          break;
        }
      }
    }
  });
  console.log("Categorized", categorized);
};

classifyTags([{class: 'success'}, {class: 'portrait'}, {class: 'people'} ]);
