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
