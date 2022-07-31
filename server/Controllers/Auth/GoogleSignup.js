const User = require('../../Model/Users');

const GoogleSignup = async (request, response) => {

  // Check if the user already has an acoount on database
  var findUser = await User.find({ Email: request.body.Email });

  try {
    // Send his account ID to the front-end if the user email is exist
    if (findUser.length > 0) {
      response.send(JSON.stringify({
        status: 'success',
        userID: findUser[0]._id.toString()
      }));
    } else {
      // create new account if the user didn't create one before
      var newUser = await User.create({
        SignType: request.body.SignType,
        Name: request.body.Name,
        Picture: "avatar.png",
        Email: request.body.Email,
        Password: null,
        Description: "",
        Blogs: 0,
        GoogleAccountID: request.body.GoogleID
      })

      response.send(JSON.stringify({
        status: 'success',
        userID: newUser._id.toString()
      }));
    }

  } catch (error) {
    response.send(JSON.stringify({
      status: 'External Error',
      Message: error
    }));
    console.log(error);
  }
}

module.exports = GoogleSignup