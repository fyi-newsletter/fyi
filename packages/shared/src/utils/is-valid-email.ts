import isEmail from "validator/lib/isEmail";
import hasMX from "./has-mx";

const isValidEmail = async (email: string) => {
  if (
    !isEmail(email, {
      allow_utf8_local_part: false,
      require_tld: true,
      allow_ip_domain: false,
    })
  ) {
    return false;
  }

  const [local, domain] = email.split("@");

  if (local.length > 64 || domain.length > 253) return false;

  if (/[\u200B-\u200F\u202A-\u202E]/.test(email)) return false;

  if (!(await hasMX(domain))) return false;

  return true;
};

export default isValidEmail;

// Check A records
// Block temporary emails
// Some domains exist but never allow inbound mail (facebook.com, instagram.com, github.com)
//
