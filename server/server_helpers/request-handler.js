// IF DATABASE DOES NOT WORK, UNCOMMENT DEPENDENCIES
// const bodyParser = require('body-parser');
const path = require('path');
const _ = require('lodash');
// const bluebird = require('bluebird');
const url = require('url');
// const db = require('../db/config.js');
// const Users = require('../db/collections/users');
// const User = require('../db/models/user');

// const Arc = require('../db/models/arc');
// const Arcs = require('../db/collections/arcs');

// const Image = require('../db/models/image.js');
// const Images = require('../db/collections/images.js');

const helpers = require('./helpers.js');
const categories = require('./categories.js');

// const limit = 5;

// module.exports.main = {
//   get(req, res) {
//     res.redirect('/signin');
//   },
// };

// SIGNIN: If user does not exist, add to the database. Then respond
// module.exports.signin = {
//   get(req, res) {
//     res.sendFile(path.normalize(`${__dirname}/../../public/index.html`));
//   },

//   post(req, res) {
//     // console.log('post request', req.body);
//     Users.reset()
//       .query({ where: { fbId: req.body.userId } })
//       .fetch()
//       .then((allUsers) => {
//         if (allUsers.length > 0) {
//           // this needs to update database and not just console log
//           console.log(`This username, ${req.body.userId} already exists in the database`);
//         } else {
//           new User({
//             name: req.body.name,
//             fbId: req.body.userId,
//             access_token: req.body.access_token,
//           })
//           .save()
//           .then((data) => {
//             console.log('user should have saved', data);
//           });
//         }
//         res.writeHead(201);
//         // res.redirect('/dashboard'); // How do you redirect to React path?
//         res.end();
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

module.exports.getQuotes = {
  get(req, res) {
    res.json(helpers.generateTagline());
  },
};

module.exports.save = {
  get(req, res) {
    helpers.getProfile(req.body, (err, profile) => {
      if (err) {
        console.log(err);
      }

      res.json(profile);
    });
  },
  post(req, res) {
    const username = req.body.username;
    const headshot = req.body.headshot;
    const athletic = req.body.athletic;
    const professional = req.body.professional;
    const adventurous = req.body.adventurous;
    const quote = req.body.quote;

    helpers.postProfile(username, headshot, athletic, professional, adventurous, quote, (err, success) => {
      if (err) {
        console.log(err);
      }
      console.log('Posted profile.');
      res.send();
    });
  },
};


