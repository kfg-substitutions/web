import { Instance } from "api";

export default async function getSubstitutions() {
  return Instance.get("/public/get_substitutions").then((res) => res.data);
}
