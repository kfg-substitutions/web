import { Instance } from "api";
import { AddSubstitutionProps } from "types";

export default async function getSubstitution({
  token,
  day,
  substitution,
}: AddSubstitutionProps) {
  return Instance.post(
    "/protected/add_substitution",
    { day, substitution },
    { headers: { "X-Auth-Token": token } }
  )
    .then((res) => res.data)
    .catch((err) => err.response?.data);
}
