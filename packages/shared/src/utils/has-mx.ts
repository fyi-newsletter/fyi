import { promises as dns } from "dns";

const hasMX = async (domain: string) => {
  try {
    const records = await dns.resolveMx(domain);
    const validRecords = records.filter((mx) => mx.exchange !== ".");
    return validRecords.length > 0;
  } catch {
    return false;
  }
};

export default hasMX;
