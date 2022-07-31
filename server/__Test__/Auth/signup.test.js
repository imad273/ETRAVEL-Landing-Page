const request = require("supertest");
const app = require("../../server");

jest.setTimeout(60000);

const sendRequest = async (body) => {
  const response = await request(app).post("/SingUp").send(body);
  return response;
}

describe("Testing user input", () => {

  test("When user enter correct information", async () => {
    const res = await sendRequest({
      // This email is just a random email for testing, it shouldn't be registered on the database
      Name: "emad",
      Email: "eamd@gamil.com",
      Password: "emad"
    })

    expect(res.statusCode).toBe(200);

    expect(res.body.status).toBe("success");

  })
})