'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('./mongoDbConnection'); // connect to db

class DBForSavingProfile {
  constructor() {
    const profileSchema = new Schema({
      username: { type: String, required: true, unique: true },
      headshot: { type: String },
      athletic: { type: String },
      professional: { type: String },
      adventurous: { type: String },
      quote: { type: String },

    });
    this.Profile = mongoose.model('Profile', profileSchema);
  }

  // .add(imageUrl, tags[], callback(err))
  add(username, headshot, athletic, professional, adventurous, quote, callback) {
    (new this.Profile({
      username,
      headshot,
      athletic,
      professional,
      adventurous,
      quote,
    }))
    .save(callback);
  }

  // .retrieve(imageUrl, callback(err, image{}))
  // retrieve(username, callback) {
  //   this.Profile.findOne({ username }, callback);
  // }

  // .retrieveAll(callback(err, images))
  retrieveAll(username, callback) {
    this.Profile.find({ username }, callback);
  }
  // .retrieveUsingArray(imageUrls[], callback(err, { imagesFound[{}], imagesNotFound[] }))
  // retrieveUsingArray(urls, callback) {
  //   const imagesFound = [];
  //   const imagesNotFound = [];
  //   let callbacksRemaining = urls.length;

  //   // Cycle through each url
  //   urls.forEach(url => {
  //     this.retrieve(url, (err, image) => {
  //       if (err) {
  //         callback(err);
  //         return;
  //       }
  //       // Categorize images
  //       if (image === null) {
  //         imagesNotFound.push(url);
  //       } else {
  //         imagesFound.push({ url: image.url, apiData: image.apiData });
  //       }

  //       // Callback when all items are checked
  //       if (--callbacksRemaining === 0) {
  //         callback(null, { imagesFound, imagesNotFound });
  //       }
  //     });
  //   });
  // }
}

// // EXAMPLE USE
// const imageTags = new DbForSavingPhotoAPIResults();
// imageTags.add(
//   'house.jpg',
//   ['barn', 'suburb'],
//   err => {
//     if (err) {
//       console.error('error saving link');
//     }
//   });

// imageTags.retrieveUsingArray(
//   ['animal.jpg', 'car.jpg', 'house.jpg', 'super.jpg'],
//   (err, imagesFound, imagesNotFound) => {
//     if(err) {
//       console.error(err);
//     }
//     console.log('not found\n', imagesNotFound);
//     console.log('\n\nfound\n', imagesFound);
//   });

module.exports = DBForSavingProfile;
