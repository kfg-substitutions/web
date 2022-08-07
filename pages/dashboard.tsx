import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AppShell, Box, Table, ActionIcon } from "@mantine/core";
import { Pencil, Trash } from "tabler-icons-react";
import { Substitution } from "types";
import { Header, SubstitutionModal } from "ui";
import { useAuthentication } from "util/authentication";
import * as API from "api";

const elements = [
  {
    id: 1,
    substitutor: "A",
    substituted: "B",
    hour: "1.",
    class: "9.EK",
    subject: "Matek",
    room: "106",
    note: "megjegyzés",
  },
  {
    id: 2,
    substitutor: "A",
    substituted: "B",
    hour: "1.",
    class: "9.EK",
    subject: "Matek",
    room: "106",
    note: "megjegyzés",
  },
  {
    id: 3,
    substitutor: "A",
    substituted: "B",
    hour: "1.",
    class: "9.EK",
    subject: "Matek",
    room: "106",
    note: "megjegyzés",
  },
  {
    id: 4,
    substitutor: "A",
    substituted: "B",
    hour: "1.",
    class: "9.EK",
    subject: "Matek",
    room: "106",
    note: "megjegyzés",
  },
  {
    id: 5,
    substitutor: "A",
    substituted: "B",
    hour: "1.",
    class: "9.EK",
    subject: "Matek",
    room: "106",
    note: "megjegyzés",
  },
  {
    id: 6,
    substitutor: "A",
    substituted: "B",
    hour: "1.",
    class: "9.EK",
    subject: "Matek",
    room: "106",
    note: "megjegyzés",
  },
  {
    id: 7,
    substitutor: "A",
    substituted: "B",
    hour: "1.",
    class: "9.EK",
    subject: "Matek",
    room: "106",
    note: "megjegyzés",
  },
  {
    id: 8,
    substitutor: "A",
    substituted: "B",
    hour: "1.",
    class: "9.EK",
    subject: "Matek",
    room: "106",
    note: "megjegyzés",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const { authenticationToken, logout } = useAuthentication();
  const [modalOpened, setModalOpened] = useState(false);

  const handleEditSubstitution = (id: number) => {
    setModalOpened(true);
  };

  const handleDeleteSubstitution = (id: number) => {
    setModalOpened(true);
  };

  useEffect(() => {
    if (!authenticationToken) router.push("/login");
  }, [authenticationToken, router]);

  const rows = elements.map((element: Substitution, index: number) => (
    <tr key={index}>
      <td>{element.substitutor}</td>
      <td>{element.substituted}</td>
      <td>{element.hour}</td>
      <td>{element.class}</td>
      <td>{element.subject}</td>
      <td>{element.room}</td>
      <td>{element.note}</td>
      <td>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <ActionIcon
            variant="outline"
            color="orange"
            mr={5}
            onClick={() => handleEditSubstitution(index)}
          >
            <Pencil size={18} />
          </ActionIcon>
          <ActionIcon
            variant="outline"
            color="red"
            ml={5}
            onClick={() => handleDeleteSubstitution(index)}
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

/*export function getServerSideProps() {
  return {
    props: {
      token: "asd",
    },
  };
}*/
