"use client";

import { NewsletterEnum } from "@t5mm/shared";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  newsletters: string[];
};

export default function Home() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      newsletters: [],
      email: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("=== FORM SUBMITTED ===");
    console.log("Email:", data.email);
    console.log("Newsletters:", data.newsletters);
    console.log("Full data:", data);
    alert(
      `Form submitted! Email: ${
        data.email
      }, Newsletters: ${data.newsletters.join(", ")}`
    );
  };

  return (
    <>
      <h1>
        Become a <span className="underlined">better professional</span> in 5
        minutes a day.
      </h1>
      <br />
      {/* <h3>Get free daily</h3> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <b>Newsletters:</b>
        </p>
        <div
          style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
        >
          {Object.values(NewsletterEnum).map((newsletter, index) => (
            <label
              key={index}
              style={{ display: "flex", alignItems: "center", gap: ".35rem" }}
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
        <div style={{ display: "flex", gap: ".5rem" }}>
          <input
            id="email"
            type="email"
            placeholder="you@company.com"
            style={{ flex: 1, maxWidth: "16rem" }}
            autoFocus
            {...register("email")}
          />
          <button type="submit">Subscribe</button>
        </div>
      </form>
      <p style={{ fontSize: ".9rem", marginTop: ".5rem" }}>
        The best news, insights and actionable tips from the web!
      </p>
    </>
  );
}
