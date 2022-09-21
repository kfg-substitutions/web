import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import {
  AppShell,
  Box,
  Table,
  ActionIcon,
  Alert,
  Radio,
  Text,
  LoadingOverlay,
} from "@mantine/core";
import { openModal, openConfirmModal } from "@mantine/modals";
import { useToggle } from "@mantine/hooks";
import { Pencil, Trash } from "tabler-icons-react";
import { Substitution, Day } from "types";
import { Header, SubstitutionForm } from "ui";
import { useAuthentication } from "util/authentication";
import * as API from "api";

export default function Dashboard() {
  const { data, isLoading, refetch } = useQuery(
    "substitutions",
    API.getSubstitutions,
    {
      refetchInterval: 1000 * 60 * 5,
    }
  );
  const todaySubstitutions = data?.todaySubstitutions || [];
  const tomorrowSubstitutions = data?.tomorrowSubstitutions || [];

  const router = useRouter();
  const { authenticationToken, logout } = useAuthentication();
  const [day, toggleDay] = useToggle<Day>([Day.Today, Day.Tomorrow]);
  const [error, setError] = useState<string | undefined>(data?.err);

  const displayNoSubstitutions =
    (day === Day.Today && todaySubstitutions.length <= 0) ||
    (day === Day.Tomorrow && tomorrowSubstitutions.length <= 0);

  const handleAddSubstitution = () => {
    openModal({
      title: "Helyettesítés hozzáadása",
      children: (
        <SubstitutionForm
          onSubmit={(substitution: Substitution) =>
            submitAddSubstitution(substitution)
          }
        />
      ),
    });
  };

  const submitAddSubstitution = async (substitution: Substitution) => {
    const substitutionWithDay = {
      ...substitution,
      day: day,
    };

    const result = await API.addSubstitution({
      token: authenticationToken,
      substitution: substitutionWithDay,
    });

    if (result.success) {
      await refetch();
    }

    return result;
  };

  const handleEditSubstitution = (substitution: Substitution) => {
    if (!substitution) return;

    openModal({
      title: "Helyettesítés szerkesztése",
      children: (
        <SubstitutionForm
          substitution={substitution}
          onSubmit={(substitution: Substitution) =>
            submitEditSubstitution(substitution.id!, substitution)
          }
        />
      ),
    });
  };

  const submitEditSubstitution = async (
    id: string,
    editedSubstitution: Substitution
  ) => {
    const { id: _id, ...substitution } = editedSubstitution;

    const result = await API.editSubstitution({
      token: authenticationToken,
      id: id!,
      substitution,
    });

    if (result.success) {
      await refetch();
    }

    return result;
  };

  const handleDeleteSubstitution = (substitution: Substitution) => {
    if (!substitution) return;

    openConfirmModal({
      title: "Helyettesítés törlése",
      children: (
        <Text size="sm">
          Biztosan törlöd ezt a helyettesítést? Ez a művelet nem visszavonható!
        </Text>
      ),
      labels: { confirm: "Törlés", cancel: "Mégsem" },
      onConfirm: () => submitDeleteSubstitution(substitution.id),
    });
  };

  const submitDeleteSubstitution = async (id: string | undefined) => {
    if (!id) return;

    const result = await API.removeSubstitution({
      token: authenticationToken,
      id,
    });

    if (!result.success) return setError(result.error);

    await refetch();
  };

  useEffect(() => {
    if (!authenticationToken) router.push("/login");
  }, [authenticationToken, router]);

  const rows = (
    day === Day.Today ? todaySubstitutions : tomorrowSubstitutions
  ).map((substitution: Substitution, index: number) => (
    <tr key={index}>
      <td>{substitution.substitutor}</td>
      <td>{substitution.substituted}</td>
      <td>{substitution.hour}</td>
      <td>{substitution.class}</td>
      <td>{substitution.subject}</td>
      <td>{substitution.room}</td>
      <td>{substitution.note}</td>
      <td>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <ActionIcon
            variant="outline"
            color="orange"
            mr={5}
            onClick={() => handleEditSubstitution(substitution)}
          >
            <Pencil size={18} />
          </ActionIcon>
          <ActionIcon
            variant="outline"
            color="red"
            ml={5}
            onClick={() => handleDeleteSubstitution(substitution)}
          >
            <Trash size={18} />
          </ActionIcon>
        </Box>
      </td>
    </tr>
  ));

  return (
    <AppShell
      padding="md"
      header={
        <Header logout={logout} addSubstitution={handleAddSubstitution} />
      }
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.dark[8],
        },
      })}
    >
      <LoadingOverlay visible={isLoading} overlayBlur={2} />

      <Box px="xl">
        {displayNoSubstitutions && (
          <Box py="md">
            <Alert title="Nincs helyettesítés" color="red" variant="outline">
              Ezen a napon még nincsen egyetlen feljegyzett helyettesítés sem.
            </Alert>
          </Box>
        )}

        {error && (
          <Box py="md">
            <Alert
              title="Sikertelen bejelentkezés"
              color="red"
              variant="outline"
            >
              {error}
            </Alert>
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Radio
            value={Day.Today}
            checked={day === Day.Today}
            label="Mai helyettesítések"
            size="md"
            color="red"
            onChange={() => toggleDay()}
          />
          <Radio
            value={Day.Tomorrow}
            checked={day === Day.Tomorrow}
            label="Holnapi helyettesítések"
            size="md"
            color="red"
            onChange={() => toggleDay()}
          />
        </Box>

        <Table
          highlightOnHover
          striped
          horizontalSpacing={15}
          verticalSpacing={15}
        >
          <thead>
            <tr>
              <th>Helyettesítő tanár</th>
              <th>Helyettesítendő tanár</th>
              <th>Óra</th>
              <th>Osztály</th>
              <th>Tantárgy</th>
              <th>Terem</th>
              <th>Megjegyzés</th>
              <th>Műveletek</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Box>
    </AppShell>
  );
}
