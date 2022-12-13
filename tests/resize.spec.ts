import { Application } from "express";
import request from "supertest";
import createServer from "../src/utils/createServer";

let app: Application;

beforeAll(async () => {
  app = await createServer();
});

// GET
describe("GET /api/resize", () => {
  test("An invalid url returns 400", async () => {
    const url = 99;
    const desiredWidth = 100;
    const desiredHeight = 100;

    await request(app)
      .get(
        `/api/resize?url=${url}&desiredWidth=${desiredWidth}&desiredHeight=${desiredHeight}`
      )
      .set("Accept", "application/json")
      .expect(500)
      .expect("Content-Type", "text/html; charset=utf-8");
  });
  test("An invalid url throws error and returns 500", async () => {
    const url = "";
    const desiredWidth = "100";
    const desiredHeight = 100;
    await request(app)
      .get(
        `/api/resize?url=${url}&desiredWidth=${desiredWidth}&desiredHeight=${desiredHeight}`
      )
      .set("Accept", "application/json")
      .expect(400)
      .expect("Content-Type", "text/html; charset=utf-8");
  });

  test("An invalid desiredWidth is converted to number and returns 200", async () => {
    const url =
      "https://thumbs.dreamstime.com/b/golden-retriever-dog-21668976.jpg";
    const desiredWidth = "100";
    const desiredHeight = 100;
    await request(app)
      .get(
        `/api/resize?url=${url}&desiredWidth=${desiredWidth}&desiredHeight=${desiredHeight}`
      )
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", "image/png");
  });

  test("An invalid desiredHeight is converted to number and returns 200", async () => {
    const url =
      "https://thumbs.dreamstime.com/b/golden-retriever-dog-21668976.jpg";
    const desiredWidth = 100;
    const desiredHeight = "100";
    await request(app)
      .get(
        `/api/resize?url=${url}&desiredWidth=${desiredWidth}&desiredHeight=${desiredHeight}`
      )
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", "image/png");
  });
});
