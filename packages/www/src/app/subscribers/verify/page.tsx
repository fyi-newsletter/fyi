"use client";

import { useEffect, useState } from "react";

export default function VerifySubscriberPage() {
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : ""
  );

  const tokenParam = searchParams.get("token");

  console.log("searchParams", searchParams);

  useEffect(() => {
    (async () => {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/subscribers/${tokenParam}/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, [tokenParam]);

  return (
    <>
      <h1>Verify subscription</h1>
      {isLoading ? <p>Loading...</p> : <p>Done! You&apos;re good to go!</p>}
    </>
  );
}
