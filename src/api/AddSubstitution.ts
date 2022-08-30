import { Instance } from "api";
import { AddSubstitutionProps } from "types";

export default async function getSubstitution({
  token,
  substitution,
}: AddSubstitutionProps) {
  return Instance.post(
    "/protected/add_substitution",
    { substitution },
    { headers: { "X-Auth-Token": token } }
  )
    .then((res) => res.data)
    .catch((err) => err.response?.data);
}
