"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function VerifySubscriberPage() {
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();

  const tokenParam = searchParams.get("token");

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
      <Suspense fallback={<div style={{ maxWidth: "30rem" }}>Loading...</div>}>
        <h1>Confirm subscription</h1>
        {isLoading ? <p>Loading...</p> : <p>Done! You&apos;re good to go!</p>}
      </Suspense>
    </>
  );
}
