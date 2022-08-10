import { Instance } from "api";

export default async function getSubstitutions() {
  return Instance.get("/get_substitutions")
    .then((res) => res.data)
    .catch((err) => err.response.data);
}
