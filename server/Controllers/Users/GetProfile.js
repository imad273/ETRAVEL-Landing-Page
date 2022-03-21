const User = require('../../Model/Users');

const Get = async (request, response) => {
  var user = await User.find({ _id: request.query.id });
  response.send({
    Description: user[0].Description,
    Email: user[0].Email,
    Name: user[0].Name,
    Picture: user[0].Picture,
    Blogs: user[0].Blogs,
    SignType: user[0].SignType,
  });
}

module.exports = Get