import { Instance } from "api";
import { RemoveSubstitutionProps } from "types";

export default async function removeSubstitution({
  token,
  day,
  id,
}: RemoveSubstitutionProps) {
  return Instance.post(
    "/protected/edit_substitution",
    { day, id },
    { headers: { "X-Auth-Token": token } }
  )
    .then((res) => res.data)
    .catch((err) => err.response?.data);
}
