import { Instance } from "api";
import { EditSubstitutionProps } from "types";

export default async function editSubstitution({
  token,
  day,
  id,
  substitution,
}: EditSubstitutionProps) {
  return Instance.post(
    "/protected/edit_substitution",
    { day, id, substitution },
    { headers: { "X-Auth-Token": token } }
  )
    .then((res) => res.data)
    .catch((err) => err.response?.data);
}
