const app = require("../app/index");
const request = require("supertest");
let token = "";

beforeAll(async () => {
  const credentialsLogin = {
    email: "johnny@binar.co.id",
    password: "123456",
  };

  const response = await request(app).post("/v1/auth/login").send(credentialsLogin);

  token = response.body.accessToken;
});

describe("GET /", () => {
  it("return 200 ok", (done) => {
    request(app).get("/").expect("Content-Type", "application/json; charset=utf-8").expect(200, done);
  });
});

describe("GET /v1/cars", () => {
  it("return 200 ok", (done) => {
    request(app).get("/v1/cars").expect("Content-Type", "application/json; charset=utf-8").expect(200, done);
  });
});

describe("POST /v1/cars", () => {
  it("return 201 created", async () => {
    const payload = {
      name: "Avanza Test",
      price: 150000,
      size: "medium",
      image: "www.google.com",
    };

    await request(app)
      .post("/v1/cars")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .set(payload)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(201);
  });
});
