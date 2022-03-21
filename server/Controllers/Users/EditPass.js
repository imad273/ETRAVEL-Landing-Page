const User = require('../../Model/Users');
const bcrypt = require('bcrypt');

const EditPass = async (request, response) => {
  async function cryptPass(value) {
    const salt = await bcrypt.genSalt();
    var hashed = await bcrypt.hash(value, salt);
    return hashed;
  }

  var userInfo = await User.find({ _id: request.query.id });
  if (userInfo[0].Password === null) {
    response.send(JSON.stringify({
      status: 'Internal Error',
      Message: "You was signup with google"
    }));
  } else {
    bcrypt.compare(request.body.Password, userInfo[0].Password, async function (err, isMatch) {
      if (err) {
        throw err
      } else if (!isMatch) {
        response.send(JSON.stringify({
          status: 'Internal Error',
          Message: "Password is wrong"
        }));
      } else {
        var passwordHashed = await cryptPass(request.body.NewPssword);
        
        User.updateOne({ _id: request.query.id }, { Password: passwordHashed },
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
}

module.exports = EditPass