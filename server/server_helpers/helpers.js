// const _ = require('lodash');
const Clarifai = require('clarifai');
const DbForSavingPhotoAPIResults = require('./DbForSavingPhotoAPIResults');
const key = require('../../keys.js');

console.log(key);

const client = new Clarifai({
  id: key.clarifaiClientID,
  secret: key.clarifaiClientSecret,
});
console.log(client);

// take an array and return arr selecting only =limit # of elements
module.exports.minimizeAndRandArr = (arr, targetLength) => {
  const totalLen = arr.length;
  const di = totalLen / targetLength;
  const results = [];

  if (totalLen <= targetLength) {
    return arr;
  }
  for (let i = 0; i < totalLen; i += di) {
    const ind = Math.floor(i + Math.floor(Math.random() * di));
    console.log(ind);
    results.push(arr[ind]);
  }
  return results;
};

// OLD: Takes an array of photos and return an array w/ attributes
module.exports.createArrayOfPhotos = (imageArray) => {
  const result = [];
  for (let img = 0; img < imageArray.length; img++) {
    result.unshift({
      thumbnail: imageArray.models[img].attributes.url,
      src: imageArray.models[img].attributes.url,
      arcId: imageArray.models[img].attributes.arc_id,
    });
  }
  return result;
};

// Get Tags from Clarifai (memoized on database) and return array with photos
module.exports.getTags = (photoArray, callback) => {
  // TODO: COMPLETE FUNCTION
  // Input: Takes an array of photos
    // Send ajax request to Clarifai server in its required format
  // let returnArray = [];
  // Get new access token
  client.getAccessToken((clarifaiAccessErr, accessToken) => {
    if (clarifaiAccessErr) {
      callback(clarifaiAccessErr);
      return;
    }

    const db = new DbForSavingPhotoAPIResults();

    // Check if these have already been checked
    db.retrieveUsingArray(photoArray, (dbRetrieveErr, imagesFound, imagesNotFound) => {
      console.log('images in db:', imagesFound.length);
      console.log('images not in db:', imagesNotFound.length);
      if (dbRetrieveErr) {
        callback(dbRetrieveErr);
        return;
      }
      const finishedCallback = (newlyTagged) => {
        let images = Array(imagesNotFound.length);
        const saveToDbCallback = saveToDbErr => {
          if (saveToDbErr) {
            callback(saveToDbErr);
            return;
          }
          console.log('saved something to DB');
        };
        for (let i = 0; i < imagesNotFound.length; i++) {
          images[i] = { url: imagesNotFound[i], apiData: newlyTagged[i] };

          // Add image to db
          db.add(images[i].url, images[i].apiData, saveToDbCallback);
          console.log('newly tagged:', images[i].url);
        }
        images = images.concat(imagesFound);
        callback(null, images);
      };

      if (imagesNotFound.length > 0) {
        client.tagFromUrls('image', imagesNotFound, (clarifaiTagErr, newlyTagged) => {
          if (clarifaiTagErr) {
            callback(clarifaiTagErr);
            return;
          }
          finishedCallback(newlyTagged);
        });
      } else {
        finishedCallback([]);
      }
    });

    console.log(accessToken);
    //   // TODO: Photo Array May need cleaning up
    // const arrayOfPhotos = photoArray;
    // client.tagFromUrls('image', arrayOfPhotos, (err1, results) => {
    //   if (err1) {
    //     console.log('Error in getting images from Clarifai', err1);
    //     return;
    //   }
    //   console.log("Results from Clarifai", results);
    //   // Clean up each photo and return replace new array
    //   returnArray = _.map(results.tags, (photo) => {
    //     const newPhoto = photo;
    //     // add the URL of the photo along that was sent
    //     newPhoto.url = photoArray.url;
    //     // Also, remove the concept ID. We don't need it
    //     delete newPhoto.conceptId;
    //     return newPhoto;
    //   });
    // });

  });
  // console.log(client.tagFromUrls);
  // Returns array of photos with tags from clarifai
  // [{results: [url: 'url', result: {tag: {classes: [...] }, {probs: [...] }   }]   }]
  // return returnArray;
};

// Classify photo based
// module.exports.classifyPhoto = (photoObj, categories) => {
//   // TODO: Complete Function
//   // Takes in an object or array of categories
//   // categories will be ['outdoors', 'professional']
//   // for(var i = 0; i < photoObj[0].result.tag.classes.length; i++) {
//   //   if()
//   // }
//   //   results[0].result.tag.classes
//     // Create a new object with a score of each category
//     // Only check scores that are >15%
//     // Goes through photo tags and looks for matches in the categories object
//     // If there's a match, then add probability / score to the score/array

//   // Return object with the original photo and most relevant category
// };

// Helper Functions that I need
  // Get the facebook photos that I need from the array Andy is sending me
    // PENDING: May already have from createArrayofPhotos Helper

