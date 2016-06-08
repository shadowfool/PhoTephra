const TaggedImages = require('./server_helpers/ImagesAlreadyTagged');
// For testing: retrieve all tags
const imageTags = new TaggedImages();
imageTags.retrieveAll((err, images) => {
  console.log(JSON.stringify(images, null, 2));
});
