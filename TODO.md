# Phase 0: acquire subscribers sustainably

Problems to solve:

<!-- - conversions are not being tracked -> double-check pixel + CAPI -->

- most signups do not confirm signup using email link
  - revamp form
    <!-- - Add caption that user will get need to confirm using email link -->
    <!-- - Add a checkbox: "☑ I understand I need to confirm my email to start receiving T5MM" -->
  - revamp post form submit page
    <!-- - show an ordered list of what they need to do -->
    - make it visually obvious that they just got an email and need to confirm
    - add "didn't receive email, resend confirmation email"
    <!-- - it can take up to 30s to receive the email -->
    - identify email provider from email and show provider-specific CTA (open Outlook)
    - Add exit intent popup on post-form page if the user is not verified yet
  - Revamp confirmation email
    <!-- - Move deliverability optimization steps after email confirmation and simplify confirmation email -->
    - Add preview text to confirmation email
    <!-- - Make email name more human instead of "The Five Minute Mail" -->
    <!-- - Add non-button confirmation link -->
    <!-- - ? change subject to be more action-oriented -->
  - confirm reminder (with unsubscribe/manage subscriptions button)
    - max 3 reminders (2h, 24h, 72h)

  - use separate domain for emails (mail.thefiveminutemail.com)
  - "Keep confirmation emails on a separate stream/IP from future newsletters"
  - Add social proof

[ Make sure we land in your inbox ] after confirmation
<!-- - Google Core Web vitals -->

When to move to phase 1:

- can acquire 500+ confirmed subscribers at ≤ €1 each

# Phase 1: full newsletter pipeline with random sources/articles from curated list

- ...

# Phase 2: robust tracking + simple reporting needed for reinforcement learning (multi-armed bandit)

- ...

# Phase 3: auto-curating with reinforcement learning

- ...
