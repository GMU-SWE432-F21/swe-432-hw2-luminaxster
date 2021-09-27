const request = require("supertest");
// we also need our app for the correct routes!
const app = require("./app");

describe("GET / ", () => {
  console.log("tests start");
  test("It should respond with an array of cities", async () => {
    const response = await request(app).get("/cities");
    expect(response.body).toEqual(["Fairfax", "Vienna", "Falls Church", "Arlington"]);
    expect(response.statusCode).toBe(200);
  });

  test("It should respond with zipCodes service not available", async () => {
    const response = await request(app).get("/zipCodes");
    expect(response.statusCode).toBe(503);
  });

  test("It should respond with Fairfax zipCodes", async () => {
    // Introduce a pause to let the data finish being fetched form external service
    await new Promise((r) => setTimeout(r, 2000));
    const response = await request(app).get("/zipCodes");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{
    "city": "FAIRFAX",
    "state": "VA",
  }]);
  });

  test("It should respond with zipCodes added", async () => {
    const response = await request(app).post("/zipCodes/22033/FairOaks");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([
      { city: 'FAIRFAX', state: 'VA' },
      { code: '22033', city: 'FairOaks', state: 'VA' }
    ]);
  });

});
