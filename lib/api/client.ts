import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
  throw new Error("Base URL is not set");
}

export const api = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});
