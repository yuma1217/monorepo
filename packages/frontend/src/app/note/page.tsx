"use client";

import { useEffect } from "react";
import type { AppType } from "@monorepo/backend";
import { hc } from "hono/client";

const client = hc<AppType>("http://localhost:3200");

const fetch = async () => {
  client.index.$get().then((res) => {
    console.log(res.body);
    console.log(res.text());
  });

  client.user
    .$post({
      json: {
        name: "John",
        age: 30,
      },
    })
    .then((res) => {
      console.log(res.body);
      console.log(res.text());
    });

  const t = await client.user.$post({
    json: {
      name: "John",
      age: 30,
    },
  });
  const data = await t.json();
  console.log(data.message);
};

export default function Page() {
  useEffect(() => {
    fetch();
  }, []);

  return <>test</>;
}
