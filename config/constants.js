const FRONTEND_DEV_URL = "http://localhost:5173"; // or 3000 if using CRA
const FRONTEND_PROD_URL = "https://portfolio-frontend-five-cyan.vercel.app/"; // set when deployed

const FRONTEND_URL =
  process.env.NODE_ENV === "production" ? FRONTEND_PROD_URL : FRONTEND_DEV_URL;

module.exports = { FRONTEND_URL };
