import SignupForm from "@/app/components/SignupForm";
import { NewsletterEnum } from "@readfyi/shared";

export function generateStaticParams() {
  return Object.values(NewsletterEnum).map((n) => ({ id: n }));
}

export default async function NewsletterPage({
  params,
}: {
  params: Promise<{ id: NewsletterEnum }>;
}) {
  const { id } = await params;
  return <SignupForm newsletter={id} />;
}
