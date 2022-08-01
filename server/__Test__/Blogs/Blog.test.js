const request = require("supertest");
const app = require("../../server");
const mongoose = require("mongoose");

jest.setTimeout(60000);

const sendRequest = async () => {
  const response = await request(app).get("/getBlogs");
  return response;
}

// Connect to the testing database
beforeAll(async () => {
  const url = 'mongodb://localhost:27017/supertest'
  await mongoose.connect(url, { useNewUrlParser: true })
})

// Close the connection to avoid problem
afterAll(async () => {
  await mongoose.connection.close();
})

describe("Testing Blogs", () => {
  test("find blogs", async () => {
    const response = await sendRequest();
    expect(response.statusCode).toBe(200);
    //console.log(response.body);
  })
}) 