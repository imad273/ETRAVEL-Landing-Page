const User = require('../../Model/Users');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'djdbajdv9',
  api_key: '898838273656418',
  api_secret: 'GJJvJI-v85IWBBlDVnwUo7hPS_4'
});

const editPic = (request, response) => {
  const Photo = request.files.image;
  
  cloudinary.v2.uploader.upload(Photo.tempFilePath,
     function (error, result) {
      User.updateOne({ _id: request.query.id }, { Picture: result.url }, (err) => {
        if (err) {
          console.log(err);
          response.send({
            status: "failed"
          });
        }
        else {
          response.send({
            status: "success"
          });
        }
      })
    })
}

module.exports = editPic