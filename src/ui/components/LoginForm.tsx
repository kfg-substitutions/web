import { useState } from "react";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
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
import { login } from "api";
import { LoginProps, LoginFormProps } from "types";

export default function LoginForm(props: LoginFormProps) {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

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

    const result = await login({
      email: values.email,
      password: values.password,
    });

    setLoading(false);
    setNavigationProgress(100);

    if (!result.success) return setError(result.error);

    props.login(result.token);
  };

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
