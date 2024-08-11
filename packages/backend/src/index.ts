import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { validator } from "hono/validator";
import { z } from "zod";
import { db } from "./db";
import { usersTable } from "./db/schema";
const schema = z.object({
  name: z.string(),
  age: z.number(),
});

const app = new Hono();
app.use(cors());
const route = app
  .get("/", (c) => {
    console.log("request");
    return c.text("Hello Hono!");
  })
  .get("/create", async (c) => {
    const res = await db.insert(usersTable).values({
      name: "test2",
      age: 10,
      email: "test2@ahoo.co.jp",
    });
    console.log("res", res);
    return c.text("User created");
  })
  .post("/user", zValidator("json", schema), async (c) => {
    console.log("request", c.body);
    db.insert(usersTable).values({
      name: "test",
      age: 10,
      email: "test@ahoo.co.jp",
    });
    return c.json(c.body);
  });

const port = 3200;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export type AppType = typeof route;
