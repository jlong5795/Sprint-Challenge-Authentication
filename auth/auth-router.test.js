const request = require("supertest");
const server = require("../api/server");
const Users = require("./model");

// Test login Endpoint
describe("Auth Router Tests", function() {
  it("Should run test suite", function() {
    expect(true).toBe(true);
  });

  describe('POST /api/auth/register', function() {
    it('Should return 500 Server Error', async function () {
        const user = { username: "testuser"}
        await Users.clear();
        return request(server)
          .post('/api/auth/register')
          .send(user)
          .then(res => {
              expect(res.status).toBe(500);
          });
    });
});

  describe('POST /api/auth/register', function() {
      it('Should return 201 CREATED', async function () {
          const user = { username: "testuser", password: "password" }
          await Users.clear();
          return request(server)
            .post('/api/auth/register')
            .send(user)
            .then(res => {
                expect(res.status).toBe(201);
            });
      });
  });

  describe("POST /api/auth/login", function() {
    it("Should return 200 success", function() {
      
      return request(server)
        .post("/api/auth/login")
        .send({ username: "testuser", password: "password" })
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("POST /api/auth/login", function() {
    it("Should return 401 Unauthorized", function() {
      
      return request(server)
        .post("/api/auth/login")
        .send({ username: "testuser"})
        .then(res => {
          expect(res.status).toBe(401);
        });
    });
  });
});

// Test register Endpoint

// Test jokes Endpoint
