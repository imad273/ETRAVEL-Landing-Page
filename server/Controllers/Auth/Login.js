const User = require('../../Model/Users');
const bcrypt = require('bcrypt');

const Login = async (request, response) => {
  // Check if the email acoount exist in our database
  var userInfo = await User.find({ Email: request.body.Email });
  console.log(userInfo);
  if (userInfo.length > 0) {
    if (userInfo[0].SignType === "google") {
      response.send({
        status: 'Fail',
        Message: "This account use Google Sign-In."
      })
    } else {
      bcrypt.compare(request.body.Password, userInfo[0].Password, function (err, isMatch) {
        if (err) {
          throw err
        } else if (!isMatch) {
          response.send({
            status: 'Fail',
            Message: "Password is wrong"
          });
        } else {
          response.send({
            status: 'Success',
            userID: userInfo[0]._id.toString()
          });
        }
      })
    }
  } else {
    response.send({
      status: 'Fail',
      Message: "Wrong Email"
    });
  }
}

module.exports = Login;