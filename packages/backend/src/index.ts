import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
app.use(cors());
const route = app.get("/", (c) => {
  console.log("request");
  return c.text("Hello Hono!");
});

const port = 3200;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export type AppType = typeof route;
