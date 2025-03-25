import axios from "axios";

import { APP_URL } from "@/config";

export const api = axios.create({
  baseURL: APP_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
