const app = require("../app/index");
const request = require("supertest");

describe("GET /", () => {
  it("return 200 ok", (done) => {
    request(app).get("/").expect("Conten-Type", "application/json; charset=utf8").expect(200, done);
  });
});
