const Blog = require('../../Model/Blogs');
const User = require('../../Model/Users');
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'djdbajdv9',
  api_key: '898838273656418',
  api_secret: 'GJJvJI-v85IWBBlDVnwUo7hPS_4'
});

const Createblog = async (request, response) => {

  const Photo = request.files.image;

  const user = await User.findById(request.query.userId);

  if (user !== null) {

    cloudinary.v2.uploader.upload(Photo.tempFilePath,
      function (error, result) {
        Blog.create({
          User: request.query.userId,
          Title: request.body.Title,
          Picture: result.url,
          Description: request.body.Description
        }, async (err) => {
          if (err) {
            console.log(err)
            response.send({
              status: "fail"
            })
          } else {

            var increment = user.Blogs + 1;
            User.updateOne({ _id: request.query.userId }, { Blogs: increment },
              function (err) {
                if (err) {
                  console.log(err)
                } else {
                  response.send({
                    status: "success"
                  })
                }
              }
            )
          }
        })
      }
    )
  } else {
    response.send({
      status: "fail",
      msg: "user doesn't exist"
    })
  }

}

module.exports = Createblog