"use client";

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  const router = useRouter();

  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button
          onClick={() => {
            router.replace("/");
          }}
        >
          Go Home
        </button>{" "}
      </body>
    </html>
  );
}
