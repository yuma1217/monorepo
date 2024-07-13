"use client";

import { useEffect } from "react";
import type { AppType } from "@monorepo/backend";
import { hc } from "hono/client";

const client = hc<AppType>("http://localhost:3200");

export default function Page() {
  useEffect(() => {
    client.index.$get().then((res) => {
      console.log(res.body);
      console.log(res.text());
    });
  }, []);

  return <>test</>;
}
