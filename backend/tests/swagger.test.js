import test from "node:test";
import assert from "node:assert/strict";
import http from "node:http";

process.env.NODE_ENV = "test";

const { default: app } = await import("../server.js");

test("GET /api/docs/ serves Swagger UI HTML", async () => {
  const server = http.createServer(app);

  await new Promise((resolve) => server.listen(0, resolve));
  const { port } = server.address();

  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/docs/`);
    const body = await response.text();

    assert.equal(response.status, 200);
    assert.match(body, /swagger/i);
  } finally {
    server.close();
  }
});
