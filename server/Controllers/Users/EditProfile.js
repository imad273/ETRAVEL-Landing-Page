const User = require('../../Model/Users');

const Edit = (request, response) => {
  User.updateOne({ _id: request.query.id }, {
    Name: request.body.Name,
    Description: request.body.Description
  }, function (err, docs) {
    if (err) {
      console.log(err)
    }
    else {
      response.send({
        status: "success"
      })
    }
  })
}

module.exports = Edit