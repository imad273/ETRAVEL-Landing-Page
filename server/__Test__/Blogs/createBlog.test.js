const request = require("supertest");
const app = require("../../server");
const mongoose = require("mongoose");


jest.setTimeout(60000);

const BlogsModel = require('../../Model/Blogs');


const sendRequest = async (body, USER_ID) => {
  const response = await request(app).post(`/addBlog?userId=${USER_ID}`)
    .field("Title", body.Title)
    .field("User", body.User)
    .field("Description", body.Description)
    .attach("image", "server/__Test__/test_images/mainBg.jpg");
  return response;
}

// Connect to the testing database
beforeAll(async () => {
  const url = 'mongodb://localhost:27017/supertest'
  await mongoose.connect(url, { useNewUrlParser: true })
})

// Close the connection to avoid problem
afterAll(async () => {
  await BlogsModel.deleteOne({ User: "62e7e54b4eb14164d024b437" });
  await mongoose.connection.close();
})

describe("Testing Blogs", () => {
  test("Create Blog", async () => {
    const REAL_USER_ID = "62e7e54b4eb14164d024b437";

    const res = await sendRequest({
      User: REAL_USER_ID,
      Title: "Blog Title",
      Description: "Description"
    }, REAL_USER_ID);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    //console.log(res.body)

  })

  test("When users doesn't exist", async () => {
    const FAKE_USER_ID = "51bb793aca2ab77a3200000d";

    const res = await sendRequest({
      User: FAKE_USER_ID,
      Title: "Blog Title",
      Description: "Description"
    }, FAKE_USER_ID);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("fail");
    //console.log(res.body)

  })
}) 