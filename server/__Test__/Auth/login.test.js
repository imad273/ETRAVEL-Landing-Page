const request = require("supertest");
const app = require("../../server");

jest.setTimeout(60000);

const sendRequest = async (body) => {
  const response = await request(app).post("/Login").send(body);
  return response;
}

describe("Testing user input", () => {

  test("When user enter wrong email", async () => {
    const res = await sendRequest({
      // This email is just a random email for testing, it shouldn't be registered on the database
      Email: "random@email.com",
      Password: "Password"
    })

    expect(res.statusCode).toBe(200);

    expect(res.body.status).toBe("Fail");
    expect(res.body.Message).toBe("Wrong Email");

  })

  test("When user enter wrong password", async () => {
    const res = await sendRequest({
      Email: "kelo@helo.com",
      // This password is just a random password for testing, it shouldn't be registered or realeted to an account on the database
      Password: "password123"
    })

    expect(res.statusCode).toBe(200);

    expect(res.body.status).toBe("Fail");
    expect(res.body.Message).toBe("Password is wrong");

  })

  test("When user enter the correct email and password", async () => {
    const res = await sendRequest({
      // Email and should be correct and registered on the database
      Email: "kelo@helo.com",
      Password: "emad"
    })

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("Success");
    // Also this id must be correct
    expect(res.body.userID).toBe("62e548981c2311e91fbc5d93");

  })
})