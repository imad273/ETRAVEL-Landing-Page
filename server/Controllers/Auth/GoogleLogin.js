const User = require('../../Model/Users');
const { OAuth2Client } = require('google-auth-library');

const Login = async (request, response) => {

  const clientID = "979036408383-pirlj9fbitkvki3309mc8fcbnq7bvjfr.apps.googleusercontent.com"
  const client = new OAuth2Client(clientID);

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: request.body.Token,
      audience: clientID,
    });

    const payload = ticket.getPayload();
    const userid = payload['sub'];

    // Check if the user already has an acoount in our database
    var userInfo = await User.find({ GoogleAccountID: userid });

    // Send his account ID to the front-end if the user email is exist
    if (userInfo.length > 0) {
      response.send(JSON.stringify({
        status: 'success',
        userID: userInfo[0]._id.toString()
      }));
    } else {
      try {
        // create new account if the user didn't create one before
        var newUser = await User.create({
          SignType: request.body.LogType,
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
      } catch (error) {
        response.send(JSON.stringify({
          status: 'External Error',
          Message: error
        }));
        console.log(error);
      }
    }
  }
  verify().catch(console.error);
}

module.exports = Login