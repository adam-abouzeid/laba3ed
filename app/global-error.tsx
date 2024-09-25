"use client";
import { useRouter } from "next/navigation";

// Error boundaries must be Client Components

export default function GlobalError() {
  const router = useRouter();
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button
          onClick={() => {
            router.replace("/");
          }}
        >
          Go Home
        </button>
      </body>
    </html>
  );
}
