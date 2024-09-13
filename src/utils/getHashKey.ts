import * as crypto from "crypto";

export const getHashKey = (_filter: Document) => {
  let retKey = "";
  if (_filter) {
    const text = JSON.stringify(_filter);
    retKey = crypto.createHash("sha256").update(text).digest("hex");
  }
  return "CACHE_ASIDE_" + retKey;
};
