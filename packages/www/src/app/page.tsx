"use client";

import { NewsletterEnum } from "@t5mm-com/shared";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { TrackingEventEnum, useTracking } from "@t5mm-com/tracking";
import { useSearchParams } from "next/navigation";

type FormData = {
  email: string;
  newsletters: string[];
};

export default function Home() {
  const { track } = useTracking();
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  const capitalizeFirst = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1);

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
  const role = t(firstDefaultNewsletter) || "professional";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormData>({
    defaultValues: {
      newsletters: defaultNewsletters,
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    track(TrackingEventEnum.Lead);

    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/subscriptions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <>
      <div style={{ maxWidth: "30rem" }}>
        {isSubmitSuccessful ? (
          <>
            <h1>
              You&apos;re <span className="underlined">almost</span> there...
            </h1>
            <br />
            <p>
              Check your email inbox (+ spam folder) for a confirmation link.
            </p>
          </>
        ) : (
          <>
            <h1>
              Become a<br />
              <span className="underlined">better {role}</span>
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
