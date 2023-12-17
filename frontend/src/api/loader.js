import { profile } from "./user";

export async function rootLoader() {
  return profile();
}
