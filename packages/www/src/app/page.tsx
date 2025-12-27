"use client";

import { NewsletterEnum } from "@t5mm/shared";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

type FormData = {
  email: string;
  newsletters: string[];
};

export default function Home() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  const newsletterParam = searchParams.get("newsletter");
  const defaultNewsletters = newsletterParam
    ? newsletterParam
        .split(",")
        .map((n) => n.trim())
        .filter((n) =>
          Object.values(NewsletterEnum).includes(n as NewsletterEnum)
        )
    : [];

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
    console.log("=== FORM SUBMITTED ===");
    console.log("Email:", data.email);
    console.log("Newsletters:", data.newsletters);
    console.log("Full data:", data);

    // Wait 5 seconds
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    // alert(
    //   `Form submitted! Email: ${
    //     data.email
    //   }, Newsletters: ${data.newsletters.join(", ")}`
    // );
  };

  return (
    <>
      {isSubmitSuccessful ? (
        <>
          <h1>
           You&apos;re <span className="underlined">almost</span> there...
          </h1>
		  <br />
		  <p>Check your email inbox (+ spam folder) for a confirmation link.</p>
        </>
      ) : (
        <>
          <h1>
            Become a <span className="underlined">better professional</span> in
            5 minutes a day.
          </h1>
          <br />
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <p>
              <b>Newsletters:</b>
            </p>
            <div
              style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
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
                  {t(newsletter)}
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
                  style={{ width: "100%", minWidth: "16rem" }}
                  autoFocus
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
            The best news, insights and actionable tips from the web!
          </p>
        </>
      )}
    </>
  );
}
