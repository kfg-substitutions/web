import { useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Box,
  Stack,
  Alert,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  resetNavigationProgress,
  setNavigationProgress,
  startNavigationProgress,
} from "@mantine/nprogress";
import { Substitution, SubstitutionModalProps } from "types";

const initialValues = {
  substitutor: "",
  substituted: "",
  hour: "",
  class: "",
  subject: "",
  room: "",
  note: "",
};

export default function SubstitutionModal({
  opened,
  onClose,
  onSuccess,
}: SubstitutionModalProps) {
  const form = useForm({
    initialValues,

    validate: {
      substitutor: (val) => (!val ? "Kötelező megadni" : null),
      substituted: (val) => (!val ? "Kötelező megadni" : null),
      hour: (val) => (!val ? "Kötelező megadni" : null),
      class: (val) => (!val ? "Kötelező megadni" : null),
      subject: (val) => (!val ? "Kötelező megadni" : null),
      room: (val) => (!val ? "Kötelező megadni" : null),
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (values: Substitution) => {
    resetNavigationProgress();
    startNavigationProgress();
    setLoading(true);

    /*const result = await login({
      email: values.email,
      password: values.password,
    }); { success: true, error: "no" };

    setLoading(false);
    setNavigationProgress(100);

    if (!result.success) return setError(result.error);*/

    onSuccess();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      title="This is fullscreen modal!"
    >
      <LoadingOverlay visible={loading} overlayBlur={2} />

      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Stack>
          <TextInput
            required
            label="Helyettesítő tanár"
            placeholder="Minta Katalin"
            value={form.values.substitutor}
            onChange={(event) =>
              form.setFieldValue("substitutor", event.currentTarget.value)
            }
            error={form.errors.substitutor}
          />

          <TextInput
            required
            label="Helyettesítendő tanár"
            placeholder="Gipsz Jakab"
            value={form.values.substituted}
            onChange={(event) =>
              form.setFieldValue("substituted", event.currentTarget.value)
            }
            error={form.errors.substituted}
          />

          <TextInput
            required
            label="Óra"
            placeholder="X. óra"
            value={form.values.hour}
            onChange={(event) =>
              form.setFieldValue("hour", event.currentTarget.value)
            }
            error={form.errors.hour}
          />

          <TextInput
            required
            label="Osztály"
            placeholder="9.EK"
            value={form.values.class}
            onChange={(event) =>
              form.setFieldValue("class", event.currentTarget.value)
            }
            error={form.errors.class}
          />

          <TextInput
            required
            label="Tantárgy"
            placeholder="Földrajz"
            value={form.values.subject}
            onChange={(event) =>
              form.setFieldValue("subject", event.currentTarget.value)
            }
            error={form.errors.subject}
          />

          <TextInput
            required
            label="Terem"
            placeholder="106"
            value={form.values.room}
            onChange={(event) =>
              form.setFieldValue("room", event.currentTarget.value)
            }
            error={form.errors.room}
          />

          <TextInput
            label="Megjegyzés"
            placeholder="..."
            value={form.values.note}
            onChange={(event) =>
              form.setFieldValue("note", event.currentTarget.value)
            }
            error={form.errors.note}
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
    </Modal>
  );
}
