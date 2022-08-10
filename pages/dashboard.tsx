import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AppShell, Box, Table, ActionIcon, Alert, Radio } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { Pencil, Trash } from "tabler-icons-react";
import { Substitution, DashboardProps, Day } from "types";
import { Header, SubstitutionModal } from "ui";
import { useAuthentication } from "util/authentication";
import * as API from "api";

export default function Dashboard({
  todaySubstitutions,
  tomorrowSubstitutions,
  error,
}: DashboardProps) {
  const router = useRouter();
  const { authenticationToken, logout } = useAuthentication();
  const [day, toggleDay] = useToggle<Day>(["today", "tomorrow"]);
  const [modalOpened, setModalOpened] = useState(false);

  const handleEditSubstitution = (day: Day, id?: number) => {
    setModalOpened(true);
  };

  const handleDeleteSubstitution = (day: Day, id?: number) => {
    setModalOpened(true);
  };

  useEffect(() => {
    if (!authenticationToken) router.push("/login");
  }, [authenticationToken, router]);

  const rows = (
    day === "today" ? todaySubstitutions : tomorrowSubstitutions
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
            onClick={() => handleEditSubstitution(day, substitution.id)}
          >
            <Pencil size={18} />
          </ActionIcon>
          <ActionIcon
            variant="outline"
            color="red"
            ml={5}
            onClick={() => handleDeleteSubstitution(day, substitution.id)}
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
      header={<Header logout={logout} />}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.dark[8],
        },
      })}
    >
      <Box px="xl">
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

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Radio
            value="today"
            checked={day === "today"}
            label="Mai helyettesítések"
            size="md"
            color="red"
            onChange={() => toggleDay()}
          />
          <Radio
            value="tomorrow"
            checked={day === "tomorrow"}
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

      <SubstitutionModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onSuccess={() => console.log("asd")}
      />
    </AppShell>
  );
}

export async function getServerSideProps() {
  const result = await API.getSubstitutions();

  return {
    props: {
      todaySubstitutions: result.success ? result.todaySubstitutions : [],
      tomorrowSubstitutions: result.success ? result.tomorrowSubstitutions : [],
      error: !result.success && result.error,
    },
  };
}
