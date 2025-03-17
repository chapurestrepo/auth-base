import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const config = {
  port: process.env.PORT || 5000,
  mongoURI: isProduction ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV,
  clientURL: isProduction ? process.env.CLIENT_URL_PROD : process.env.CLIENT_URL_DEV,
  sessionSecret: process.env.SESSION_SECRET || "secreto",
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID || "",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  },
};
