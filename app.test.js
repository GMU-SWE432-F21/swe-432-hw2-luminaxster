const request = require("supertest");
// we also need our app for the correct routes!
const app = require("./app");

describe("GET / ", () => {
  test("It should respond with an array of cities", async () => {
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/cities");
    expect(response.body).toEqual(["Fairfax", "Vienna", "Falls Church", "Arlington"]);
    expect(response.statusCode).toBe(200);
  });
});
