"use client";

import {
  capitalizeFirst,
  NewsletterEnum,
  useSubscriptions,
} from "@readfyi/shared";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type FormData = {
  newsletters: NewsletterEnum[];
};

export default function ManageSubscriptionsPage() {
  const { t } = useTranslation();

  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();

  const tokenParam = searchParams.get("token");

  const subscriptions = useSubscriptions({ subscriberUuid: tokenParam });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  useEffect(() => {
    if (!subscriptions.subscriptions.length) return;
    reset({
      newsletters: subscriptions.subscriptions.map((s) => s.newsletter),
    });
  }, [subscriptions.subscriptions, reset]);

  const onSubmit = async (data: FormData) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/subscriptions`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subscriberUuid: tokenParam,
        ...data,
      }),
    });
  };

  return (
    <>
      <h1>Manage your subscriptions</h1>
      {subscriptions.isFetching ? (
        <p>Loading...</p>
      ) : subscriptions.error ? (
        <p>Something went wrong</p>
      ) : (
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
                  {...register("newsletters")}
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
            <button
              type="submit"
              data-loading={isSubmitting}
              disabled={isSubmitting}
            >
              Update
            </button>
          </div>
        </form>
      )}
    </>
  );
}
