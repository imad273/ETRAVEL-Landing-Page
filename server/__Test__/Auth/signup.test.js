const request = require("supertest");
const app = require("../../server");

jest.setTimeout(60000);

const sendRequest = async (body) => {
  const response = await request(app).post("/SingUp").send(body);
  return response;
}

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

  it("should delete the test account that create in singup test", async () => {
    const response = await request(app).post("/deleteTestAccount").send({ Email: "kelo33666@gamil.com" });

    expect(response.statusCode).toBe(200);

    expect(response.body.status).toBe("success");

  })
}) 