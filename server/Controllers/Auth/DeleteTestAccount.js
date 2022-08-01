const User = require('../../Model/Users');

const DeleteTestAccount = async (request, response) => {
  // Check if the email acoount exist in our database
  await User.deleteOne({ Email: request.body.Email });
  response.send({ status: "success" })
}

module.exports = DeleteTestAccount;