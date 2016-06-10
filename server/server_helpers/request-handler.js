// IF DATABASE DOES NOT WORK, UNCOMMENT DEPENDENCIES
// const bodyParser = require('body-parser');
const path = require('path');
const _ = require('lodash');
// const bluebird = require('bluebird');
const url = require('url');
// const db = require('../db/config.js');
const Users = require('../db/collections/users');
const User = require('../db/models/user');

// const Arc = require('../db/models/arc');
// const Arcs = require('../db/collections/arcs');

// const Image = require('../db/models/image.js');
// const Images = require('../db/collections/images.js');

const helpers = require('./helpers.js');
const categories = require('./categories.js');

// const limit = 5;

module.exports.main = {
  get(req, res) {
    res.redirect('/signin');
  },
};

// SIGNIN: If user does not exist, add to the database. Then respond
module.exports.signin = {
  get(req, res) {
    res.sendFile(path.normalize(`${__dirname}/../../public/index.html`));
  },

  post(req, res) {
    // console.log('post request', req.body);
    Users.reset()
      .query({ where: { fbId: req.body.userId } })
      .fetch()
      .then((allUsers) => {
        if (allUsers.length > 0) {
          // this needs to update database and not just console log
          console.log(`This username, ${req.body.userId} already exists in the database`);
        } else {
          new User({
            name: req.body.name,
            fbId: req.body.userId,
            access_token: req.body.access_token,
          })
          .save()
          .then((data) => {
            console.log('user should have saved', data);
          });
        }
        res.writeHead(201);
        // res.redirect('/dashboard'); // How do you redirect to React path?
        res.end();
      });
  },
};

// CREATE: Store obj from API calls to DB
// module.exports.create = {
//   get(req, res) {
//     res.send('success');
//   },

//   post(req, res) {
//     // store obj from fb api calls into db
//     console.log('post request from client', req.body.photos.data.length);
//     const imgUrl = helpers.minimizeAndRandArr(req.body.photos.data, limit);
//       // user has already been created
//     User.forge({ fbId: req.body.id })
//       .fetch()
//       .then((userMatched) => {
//         // make new arc
//         const arc = new Arc({
//           name: Date(),
//         });
//         return arc.save({ user_id: userMatched.id });
//       })
//       .then((newArc) => {
//         console.log('Images in arc =>', imgUrl);

//       // store img into new arc
//         for (let imgId = 0; imgId < imgUrl.length; imgId++) {
//           const imgSizeArr = imgUrl[imgId].images;
//           // for (var imgSize = 0; imgSize < imgSizeArr.length; imgSize++) {
//             // var img = imgSizeArr[imgSize];
//           const img = imgSizeArr[0];
//           console.log('Img instance', img);
//           const image = new Image({
//             height: img.height,
//             width: img.width,
//             url: img.source,
//           });

//           image.save({ arc_id: newArc.id });
//             // console.log("A new img has been added => ", image);
//           // }
//         }
//       });
//     res.send('success');
//   },
// };

//
// module.exports.dashboard = {
//   get(req, res) {
//     const urlParts = url.parse(req.url, true); // Parse URL
//     const userId = urlParts.query.user_id; // Get user ID from URL
//     const results = [];
//     User.forge({ fbId: userId }) // Create new user with ID
//       .fetch()
//       .then((userMatched) => {
//         Arcs.reset() // Empty out the current collection of story Arcs
//           .query({ where: { user_id: userMatched.id } }) // Query userID's arcs
//           .fetch()
//           .then((arcMatched) => {
//             // make array of matching arc id using recursive function next
//             const next = (index) => {
//               if (index === arcMatched.length) {
//                 res.json(results);
//                 return;
//               }
//               Images.reset()
//                 .query((qb) => {
//                   qb.where('arc_id', '=', arcMatched.models[index].id);
//                 })
//                 .fetch()
//                 .then((imageMatched) => {
//                   console.log('for index...', index);
//                   // loop through all images in each arc and return an array
//                   const imageArray = helpers.createArrayOfPhotos(imageMatched);
//                   results.push(imageArray);
//                   next(index + 1);
//                 });
//             };
//             next(0);
//           });
//       });
//   },
// };

module.exports.categorize = {
  post(req, res) {
    helpers.getTags(req.body, (err, images) => {
      const categorizedResponse = {
        professional: [],
        athletic: [],
        adventurous: [],
        headshot: [],
      };
      if (err) {
        console.error(err);
        res.end(500);
      }
      const photoArray = [];
      _.each(images, (photo) => {
        const imageUrl = photo.url;
        const categorized = helpers.classifyTags(photo.apiData.tags);
        const tags = photo.apiData.tags;
        photoArray.push({ imageUrl, categorized, tags });
      });
      _.each(photoArray, (photo) => {
        _.each(photo.categorized, (category) => {
          const urls = photo.imageUrl;
          const tags = photo.tags;
          categorizedResponse[category].push({ urls, tags });
        });
      });
      res.json(categorizedResponse);
    });
  },
};

// Generate random comment
  // Myers Briggs
  // Horoscope
  // Funny comments. Jokes

