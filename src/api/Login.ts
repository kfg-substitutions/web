import { Instance } from "api";
import { LoginProps } from "types";

export default async function login({ email, password }: LoginProps) {
  return Instance.post("/login", { email, password })
    .then((res) => res.data)
    .catch((err) => err.response?.data);
}
