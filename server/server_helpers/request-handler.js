// IF DATABASE DOES NOT WORK, UNCOMMENT DEPENDENCIES
// const bodyParser = require('body-parser');
const path = require('path');
// const bluebird = require('bluebird');
const url = require('url');
// const db = require('../db/config.js');
const Users = require('../db/collections/users');
const User = require('../db/models/user');

const Arc = require('../db/models/arc');
const Arcs = require('../db/collections/arcs');

const Image = require('../db/models/image.js');
const Images = require('../db/collections/images.js');

const helpers = require('./helpers.js');

const limit = 5;

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
module.exports.create = {
  get(req, res) {
    res.send('success');
  },

  post(req, res) {
    // store obj from fb api calls into db
    console.log('post request from client', req.body.photos.data.length);
    const imgUrl = helpers.minimizeAndRandArr(req.body.photos.data, limit);
      // user has already been created
    User.forge({ fbId: req.body.id })
      .fetch()
      .then((userMatched) => {
        // make new arc
        const arc = new Arc({
          name: Date(),
        });
        return arc.save({ user_id: userMatched.id });
      })
      .then((newArc) => {
        console.log('Images in arc =>', imgUrl);

      // store img into new arc
        for (let imgId = 0; imgId < imgUrl.length; imgId++) {
          const imgSizeArr = imgUrl[imgId].images;
          // for (var imgSize = 0; imgSize < imgSizeArr.length; imgSize++) {
            // var img = imgSizeArr[imgSize];
          const img = imgSizeArr[0];
          console.log('Img instance', img);
          const image = new Image({
            height: img.height,
            width: img.width,
            url: img.source,
          });

          image.save({ arc_id: newArc.id });
            // console.log("A new img has been added => ", image);
          // }
        }
      });
    res.send('success');
  },
};

module.exports.dashboard = {
  get(req, res) {
    const urlParts = url.parse(req.url, true);
    const userId = urlParts.query.user_id;
    const results = [];
    User.forge({ fbId: userId })
      .fetch()
      .then((userMatched) => {
        Arcs.reset()
          .query({ where: { user_id: userMatched.id } })
          .fetch()
          .then((arcMatched) => {
            // make array of matching arc id
            // Images.reset();
            // for (var arcNo = 0; arcNo < arcMatched.length; arcNo++) {
              // results.push([]);
            (function next(index) {
              if (index === arcMatched.length) {
                res.json(results);
                return;
              }
              Images.reset()
                .query((qb) => {
                  qb.where('arc_id', '=', arcMatched.models[index].id);
                })
                .fetch()
                .then((imageMatched) => {
                  console.log('for index...', index);
									// console.log('full imageMatched is...', imageMatched)
                  // loop through all images in each arc
                  const result = [];
                  for (let img = 0; img < imageMatched.length; img++) {
                    // console.log('All images in this arc =>', imageMatched.models[img].attributes.url, 'here is n =>', n);
                    
                    result.unshift({thumbnail: imageMatched.models[img].attributes.url, src: imageMatched.models[img].attributes.url, arcId: imageMatched.models[img].attributes.arc_id});
                  }
                  results.push(result);
                  next(index + 1);
                })
            }) (0);
            });
          })
      }

		// console.log('query is an object as: ', );
		// res.send('success');
}; 