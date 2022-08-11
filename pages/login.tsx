import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Button,
  Box,
  Stack,
  Center,
  LoadingOverlay,
  Alert,
} from "@mantine/core";
import {
  resetNavigationProgress,
  setNavigationProgress,
  startNavigationProgress,
} from "@mantine/nprogress";
import * as EmailValidator from "email-validator";
import * as API from "api";
import { LoginProps } from "types";
import { useAuthentication } from "util/authentication";

const initialValues = {
  email: "",
  password: "",
};

export default function Login() {
  const router = useRouter();
  const { authenticationToken, login } = useAuthentication();

  const form = useForm({
    initialValues,

    validate: {
      email: (val) =>
        EmailValidator.validate(val) ? null : "Helytelen email cím",

      password: (val) =>
        val.length >= 6
          ? null
          : "A jelszónak legalább 6 karakterből kell állnia",
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (values: LoginProps) => {
    resetNavigationProgress();
    startNavigationProgress();
    setLoading(true);

    const result = await API.login({
      email: values.email,
      password: values.password,
    });

    result.success ? login(result.token) : setError(result.error);

    setNavigationProgress(100);
    setLoading(false);
  };

  useEffect(() => {
    if (authenticationToken) router.push("/dashboard");
  }, [authenticationToken, router]);

  return (
    <Box
      sx={{
        position: "absolute",

        top: 0,
        bottom: 0,
        left: 0,
        right: 0,

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "500px", height: "300px" }} m="sm">
        <LoadingOverlay visible={loading} overlayBlur={2} />

        <Paper radius="md" p="xl" withBorder>
          <Center>
            <Text size="lg" weight={500}>
              Bejelentkezés
            </Text>
          </Center>

          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <Stack>
              <TextInput
                required
                label="Email"
                placeholder="hello@karinthy.hu"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email}
              />

              <PasswordInput
                required
                label="Jelszó"
                placeholder="Jelszavad"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                error={form.errors.password}
              />
            </Stack>

            <Button type="submit" color="red" mt="xl">
              Bejelentkezés
            </Button>

            {error && (
              <Box pt="md">
                <Alert
                  title="Sikertelen bejelentkezés"
                  color="red"
                  variant="outline"
                >
                  {error}
                </Alert>
              </Box>
            )}
          </form>
        </Paper>
      </Box>
    </Box>
  );
}
