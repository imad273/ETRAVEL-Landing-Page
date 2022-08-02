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
    
    // The conent should inserted into testing database
    expect(response.body).toStrictEqual([
      {
        _id: '6232397f54db45862c38a663',
        User: '622f84571207e7dc1c54f2a9',
        Title: 'The Ultimate Packing List for Female Travelers',
        Picture: 'http://res.cloudinary.com/djdbajdv9/image/upload/v1647802904/hrowgjncsbbmznbuagtd.jpg',
        Description: 'Description2',
        __v: 0
      },
      {
        _id: '6232f5024250dd2ef9fe45ec',
        User: '622f84571207e7dc1c54f2a9',
        Title: 'Approaching Elephant Rock',
        Picture: 'http://res.cloudinary.com/djdbajdv9/image/upload/v1647802947/ip595zv8os4fmvzg02yk.jpg',
        Description: `Saudi Arabia is known for the largest sand desert in the world. Not to get too technical, but don't get hung up on the word "desert" here as many locations in the world have deserts. But....Saudi Arabia has both a desert and the requisite sand. And that is what most people think of when they think of a desert. For contrast, Antarctica is technically a desert....but most do not think of it that way. Meanwhile..... Our trip continued to take us deeper into the desert. We are traveling by bus and our time driving down the highways give us time to have deeper discussions and ask questions we may not want to ask in a public area. As we are a small group, this better facilitates such discussions`,
        __v: 0
      }
    ])
  })
}) 