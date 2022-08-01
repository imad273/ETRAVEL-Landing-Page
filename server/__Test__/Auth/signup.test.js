const request = require("supertest");
const app = require("../../server");
const mongoose = require("mongoose");

jest.setTimeout(60000);

const sendRequest = async (body) => {
  const response = await request(app).post("/SingUp").send(body);
  return response;
}

const UserModel = require('../../Model/Users');

// Connect to the testing database
beforeAll(async () => {
  // Connect to a Mongo DB
  const url = 'mongodb://localhost:27017/supertest'
  await mongoose.connect(url, { useNewUrlParser: true })
})

// Delete te data that created when testing and Close the connection to avoid problem
afterAll(async () => {
  await UserModel.deleteOne({ Email: "kelo33666@gamil.com" })
  await mongoose.connection.close();
})

describe("Testing user input", () => {

  test("When user enter an exicting email", async () => {
    const res = await sendRequest({
      SignType: "normal",
      Name: "emad",
      Picture: "avatar.png",
      // This email is just a random email for testing, it should be registered on the database
      Email: "emad@gmail.com",
      Password: "emad",
      Description: "",
      Blogs: 0,
      GoogleAccountID: ""
    })

    expect(res.statusCode).toBe(200);

    expect(res.body.status).toBe("Fail");
    expect(res.body.Message).toBe("This email is already exist");

  })

  test("When user enter correct information", async () => {
    const res = await sendRequest({
      SignType: "normal",
      Name: "emad",
      Picture: "avatar.png",
      // This email is just a random email for testing, it shouldn't be registered on the database
      Email: "kelo33666@gamil.com",
      Password: "emad",
      Description: "",
      Blogs: 0,
      GoogleAccountID: ""
    })

    expect(res.statusCode).toBe(200);

    expect(res.body.status).toBe("success");

  })
}) 