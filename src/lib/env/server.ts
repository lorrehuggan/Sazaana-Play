export const BASE_PATH =
  process.env.NODE_ENV === "development"
    ? process.env.LOCAL_DOMAIN ?? ""
    : process.env.PRODUCTION_DOMAIN ?? "";
