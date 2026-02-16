import { NewsletterEnum } from "../types";

export default {
  [NewsletterEnum.AI]: "AI",
  [NewsletterEnum.Founder]: "founder",
  [NewsletterEnum.Marketer]: "marketer",
  [NewsletterEnum.DigitalAdvertiser]: "digital advertiser",
  [NewsletterEnum.Solopreneur]: "solopreneur",
  [NewsletterEnum.LeadgenSpecialist]: "leadgen specialist",

  [`${NewsletterEnum.AI}_emoji`]: "🧠",
  [`${NewsletterEnum.Founder}_emoji`]: "👨‍💼",
  [`${NewsletterEnum.Marketer}_emoji`]: "📣",
  [`${NewsletterEnum.DigitalAdvertiser}_emoji`]: "📊",
  [`${NewsletterEnum.Solopreneur}_emoji`]: "🚀",
  [`${NewsletterEnum.LeadgenSpecialist}_emoji`]: "🧲",

  [`${NewsletterEnum.AI}_subheader`]: "Keep up with AI in 5 mins.",
  [`${NewsletterEnum.Founder}_subheader`]: "Become a better founder in 5 mins.",
  [`${NewsletterEnum.Marketer}_subheader`]: "Become a better marketer in 5 mins.",
  [`${NewsletterEnum.DigitalAdvertiser}_subheader`]: "Become a better digital advertiser in 5 mins.",
  [`${NewsletterEnum.Solopreneur}_subheader`]: "Become a better solopreneur in 5 mins.",
  [`${NewsletterEnum.LeadgenSpecialist}_subheader`]: "Become a better leadgen specialist in 5 mins.",
  // [NewsletterEnum.CEO]: 'CEO',
};
