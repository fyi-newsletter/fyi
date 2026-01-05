"use client";

import { capitalizeFirst, NewsletterEnum } from "@t5mm-com/shared";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { TrackingEventEnum, useTracking } from "@t5mm-com/tracking";
import { useEffect, useState } from "react";

type FormData = {
  email: string;
  newsletters: string[];
};

export default function HomePage() {
  const { track } = useTracking();
  const { t } = useTranslation();

  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();

  const newslettersParam = searchParams.get("newsletters");
  const defaultNewsletters = newslettersParam
    ? newslettersParam
        .split(",")
        .map((n) => n.trim())
        .filter((n) =>
          Object.values(NewsletterEnum).includes(n as NewsletterEnum)
        )
    : [];

  const [firstDefaultNewsletter] = defaultNewsletters;

  const [role, setRole] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRole(t(firstDefaultNewsletter) || "professional");
  }, [t, firstDefaultNewsletter]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    defaultValues: {
      newsletters: defaultNewsletters,
      email: "",
    },
  });

  const formValues = watch();

  const onSubmit = async (data: FormData) => {
    track(TrackingEventEnum.Lead);
    track(TrackingEventEnum.Subscribe);

    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const [verificationResendAt, setVerificationResendAt] = useState<Date>();
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!verificationResendAt) return;

      const elapsed = Math.floor(
        (Date.now() - verificationResendAt.getTime()) / 1000
      );
      const remaining = Math.max(0, 30 - elapsed);
      setResendCooldown(remaining);
    }, 100);

    return () => clearInterval(interval);
  }, [verificationResendAt]);

  const resendVerificationEmail = async () => {
    setVerificationResendAt(new Date());
    await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/subscribers/${formValues.email}/send-verification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <>
      <div style={{ maxWidth: "30rem" }}>
        {isSubmitSuccessful ? (
          <>
            <h1>You&apos;re almost there...</h1>
            <p>We just sent an email to you to confirm your subscription.</p>
            <br />
            <ol>
              <li>Open your email inbox</li>
              <li>Find our email (check spam folder)</li>
              <li>Click the confirmation link in the email</li>
            </ol>
            <br />
            <p>Didn&apos;t receive the email?</p>
            <button
              data-variant="text"
              onClick={resendVerificationEmail}
              disabled={resendCooldown > 0}
              style={{ padding: 0 }}
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend"}
            </button>
          </>
        ) : (
          <>
            <h1>
              Become a<br />
              <span className="underlined">
                better <span suppressHydrationWarning>{role}</span>
              </span>
              <br />
              in 5 minutes a day.
            </h1>
            <p>1 email. 5 minutes. Smarter decisions.</p>
            <br />
            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <p>
                <b>Newsletters:</b>
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ".5rem",
                }}
              >
                {Object.values(NewsletterEnum).map((newsletter, index) => (
                  <label
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: ".35rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      value={newsletter}
                      {...register("newsletters", {
                        validate: (value) =>
                          value.length > 0 ||
                          "Please select at least one newsletter",
                      })}
                    />
                    {capitalizeFirst(t(newsletter))}
                  </label>
                ))}
                {errors.newsletters && (
                  <p
                    style={{
                      color: "#ff4444",
                      fontSize: ".9rem",
                      margin: ".25rem 0 0 0",
                    }}
                  >
                    {errors.newsletters.message}
                  </p>
                )}
              </div>
              <br />
              <div className="form-submit-group">
                <div>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    style={{ width: "100%", minWidth: "18rem" }}
                    autoFocus
                    autoComplete="on"
                    {...register("email", {
                      required: "Email is required",
                    })}
                  />
                  {errors.email && (
                    <p
                      style={{
                        color: "#ff4444",
                        fontSize: ".9rem",
                        margin: ".25rem 0 0 0",
                      }}
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  data-loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Subscribe
                </button>
              </div>
            </form>
            <p style={{ fontSize: ".9rem", marginTop: ".5rem" }}>
              <u>1 email a day</u> with the best curated news, insights and
              actionable tips from the web!
            </p>
          </>
        )}
      </div>
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
