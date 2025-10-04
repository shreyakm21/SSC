/*
const request = require("supertest");
const app = require("../server"); // import your Express app

describe("GET /products", () => {
  it("should return a list of products", async () => {
    const res = await request(app).get("/products");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const product = res.body[0];
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("imageUrl");
    }
  });
});
*/

// backend/tests/products.test.js
const request = require("supertest");
const app = require("../server"); // Import Express app

describe("GET /products endpoint", () => {
  it("should return an array of products with correct properties", async () => {
    const response = await request(app).get("/products");

    // HTTP status check
    expect(response.statusCode).toBe(200);

    // Response should be an array
    expect(Array.isArray(response.body)).toBe(true);

    // Check properties of the first product if array is not empty
    if (response.body.length > 0) {
      const product = response.body[0];
      expect(product).toHaveProperty("id");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("price");
      expect(product).toHaveProperty("imageUrl");
    }
  });
});

