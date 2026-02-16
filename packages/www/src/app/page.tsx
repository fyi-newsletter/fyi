"use client";

import { capitalizeFirst, NewsletterEnum } from "@fyi-newsletter/shared";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { TrackingEventEnum, useTracking } from "@fyi-newsletter/tracking";
import { useEffect, useState } from "react";
import SignupForm from "./components/SignupForm";

// type FormData = {
//   email: string;
//   newsletters: string[];
// };

export default function HomePage() {
  const { track } = useTracking();
  const { t } = useTranslation();

//   const searchParams =
//     typeof window !== "undefined"
//       ? new URLSearchParams(window.location.search)
//       : new URLSearchParams();

//   const newslettersParam = searchParams.get("newsletters");
//   const defaultNewsletters = newslettersParam
//     ? newslettersParam
//         .split(",")
//         .map((n) => n.trim())
//         .filter((n) =>
//           Object.values(NewsletterEnum).includes(n as NewsletterEnum)
//         )
//     : [];

//   const [firstDefaultNewsletter] = defaultNewsletters;

//   const [role, setRole] = useState("");

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     setRole(t(firstDefaultNewsletter) || "professional");
//   }, [t, firstDefaultNewsletter]);

  

  return (
    <>
      <SignupForm />
    </>
  );
}

// export default function HomePage() {
//   return (
//     <Suspense fallback={<div style={{ maxWidth: "30rem" }}>Loading...</div>}>
//       <HomePageContent />
//     </Suspense>
//   );
// }
