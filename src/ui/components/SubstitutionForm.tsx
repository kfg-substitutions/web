import { useState } from "react";
import {
  TextInput,
  Button,
  Box,
  Stack,
  Alert,
  LoadingOverlay,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals } from "@mantine/modals";
import {
  resetNavigationProgress,
  setNavigationProgress,
  startNavigationProgress,
} from "@mantine/nprogress";
import { Substitution, SubstitutionFormProps } from "types";
import CLASS_OPTIONS from "util/classes";

const getInitialValues = (substitution?: Substitution) => ({
  substitutor: substitution?.substitutor || "",
  substituted: substitution?.substituted || "",
  hour: substitution?.hour || "",
  class: substitution?.class || "",
  subject: substitution?.subject || "",
  room: substitution?.room || "",
  note: substitution?.note || "",
});

export default function SubstitutionForm(props: SubstitutionFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const form = useForm({
    initialValues: getInitialValues(props.substitution),

    validate: {
      substitutor: (val) => (!val ? "Kötelező megadni" : null),
      substituted: (val) => (!val ? "Kötelező megadni" : null),
      hour: (val) => (!val ? "Kötelező megadni" : null),
      class: (val) => (!val ? "Kötelező megadni" : null),
      subject: (val) => (!val ? "Kötelező megadni" : null),
      room: (val) => (!val ? "Kötelező megadni" : null),
    },
  });

  const handleSubmit = (substitution: Substitution) => {
    resetNavigationProgress();
    startNavigationProgress();
    setLoading(true);

    const result = props.onSubmit({
      id: props.substitution?.id,
      ...substitution,
    });

    Promise.resolve(result).then((result) => {
      if (!result.success) return setError(result.error);

      closeAllModals();
    });

    setNavigationProgress(100);
    setLoading(false);
  };

  return (
    <>
      <LoadingOverlay visible={loading} overlayBlur={2} />

      <form
        onSubmit={form.onSubmit((substitution) => handleSubmit(substitution))}
      >
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

          <Select
            data={CLASS_OPTIONS}
            label="Osztály"
            placeholder="Pl. 9.AK"
            value={form.values.class}
            onChange={(selection) =>
              form.setFieldValue("class", selection ?? "")
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
          Küldés
        </Button>

        {error && (
          <Box pt="md">
            <Alert title="Hiba történt" color="red" variant="outline">
              {error}
            </Alert>
          </Box>
        )}
      </form>
    </>
  );
}
