import { Instance } from "api";
import { RemoveSubstitutionProps } from "types";

export default async function removeSubstitution({
  token,
  id,
}: RemoveSubstitutionProps) {
  return Instance.post(
    "/protected/remove_substitution",
    { id },
    { headers: { "X-Auth-Token": token } }
  )
    .then((res) => res.data)
    .catch((err) => err.response?.data);
}
