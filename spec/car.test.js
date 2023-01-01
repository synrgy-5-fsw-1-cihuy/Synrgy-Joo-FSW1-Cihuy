const app = require("../app/index");
const request = require("supertest");
const models = require("../app/models");
const Car = models.Car;
let token = "";

beforeAll(async () => {
  const credentialsLogin = {
    email: "johnny@binar.co.id",
    password: "123456",
  };

  const response = await request(app).post("/v1/auth/login").send(credentialsLogin);

  token = response.body.accessToken;
});

const payload = {
  name: "Avanza Test",
  price: 150000,
  size: "medium",
  image: "www.google.com",
};

// GET
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

describe("GET /v1/cars/:id", () => {
  it("return 200 ok", async () => {
    const car = await Car.create(payload);

    await request(app).get(`/v1/cars/${car.id}`).expect("Content-Type", "application/json; charset=utf-8").expect(200);
  });
});

// Create
describe("POST /v1/cars", () => {
  it("return 201 created", async () => {
    await request(app)
      .post("/v1/cars")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send(payload)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(201);
  });
});

// Update
describe("PUT /v1/cars/:id", () => {
  it("return 200 updated", async () => {
    const payloadCreate = {
      name: "Pajero",
      price: 200000,
      size: "Large",
      image: "www.google.com",
    };

    const car = await Car.create(payloadCreate);

    const payloadUpdate = {
      name: "All New Pajero",
      price: 230000,
      size: "Large",
      image: "www.google.com",
    };

    await request(app)
      .put(`/v1/cars/${car.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .send(payloadUpdate)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200);
  });
});

// Delete

describe("DELETE /v1/cars/:id", () => {
  it("respond 204 deleted", async () => {
    const car = await Car.create({
      name: "Brio",
      price: 150000,
      size: "small",
      image: "www.google.com",
      isCurrentlyRented: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await request(app)
      .delete(`/v1/cars/${car.id}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(204);
  });
});
