import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { validator } from "hono/validator";
import { z } from "zod";
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
  .post("/user", zValidator("json", schema), (c) => {
    const validated = c.req.valid("json");
    console.log(validated);
    return c.json({
      message: `Hello ${validated.name}! You are ${validated.age} years old.`,
    });
  });

const port = 3200;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export type AppType = typeof route;
