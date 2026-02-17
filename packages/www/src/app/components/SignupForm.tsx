"use client";

import { capitalizeFirst, NewsletterEnum } from "@readfyi/shared";
import { TrackingEventEnum, useTracking } from "@readfyi/tracking";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type FormData = {
  email: string;
  newsletters: string[];
};

interface SignupFormProps {
  newsletter?: NewsletterEnum;
}

const SignupForm: React.FC<SignupFormProps> = ({ newsletter }) => {
  const { track } = useTracking();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    defaultValues: {
      newsletters: newsletter ? [newsletter] : [],
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

  const newsletterLabel = newsletter
    ? capitalizeFirst(t(newsletter))
    : "Newsletter";
  const newsletterEmoji = newsletter ? t(`${newsletter}_emoji`) : "📰";
  const subheader = newsletter
    ? t(`${newsletter}_subheader`)
    : "Become a better professional in 5 mins.";

  return (
    <div style={{ maxWidth: "30rem", textAlign: "center" }}>
      {!isSubmitSuccessful ? (
        <>
          <h1>
            FYI: {newsletterLabel} {newsletterEmoji}
          </h1>
          <h2>{subheader}</h2>
          <p>
            Get our free daily newsletter with curated trends, tactics and
            tools.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            {!newsletter && (
              <div style={{ margin: '1.5rem' }}>
                <p>
                  <b>Newsletters:</b>
                </p>
                <div
                  style={{
                    display: "inline-flex",
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
              </div>
            )}
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
            Join other readers for <u>1 email a day</u>
          </p>
        </>
      ) : (
        <>
          <h1>You&apos;re almost there...</h1>
          <p>We've emailed you a link to confirm your subscription.</p>
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
      )}
    </div>
  );
};

export default SignupForm;
