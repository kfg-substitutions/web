import { Instance } from "api";

interface LoginProps {
  email: string;
  password: string;
}

export default async function login({ email, password }: LoginProps) {
  return Instance.post("/login", { email, password }).then((res) => res.data);
}
