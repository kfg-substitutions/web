import { useState } from "react";
import { AppShell, Box, Table, ActionIcon, Group } from "@mantine/core";
import { Pencil, Trash } from "tabler-icons-react";
import { Header, SubstitutionModal } from "components";
import { DashboardProps } from "types";

const elements = [
  {
    substitutor: "A",
    substituted: "B",
    hour: "1.",
    class: "9.EK",
    subject: "Matek",
    room: "106",
    note: "megjegyzés",
  },
  {
    substitutor: "A",
    substituted: "B",
    hour: "1.",
    class: "9.EK",
    subject: "Matek",
    room: "106",
    note: "megjegyzés",
  },
  {
    substitutor: "A",
    substituted: "B",
    hour: "1.",
    class: "9.EK",
    subject: "Matek",
    room: "106",
    note: "megjegyzés",
  },
  {
    substitutor: "A",
    substituted: "B",
    hour: "1.",
    class: "9.EK",
    subject: "Matek",
    room: "106",
    note: "megjegyzés",
  },
  {
    substitutor: "A",
    substituted: "B",
    hour: "1.",
    class: "9.EK",
    subject: "Matek",
    room: "106",
    note: "megjegyzés",
  },
  {
    substitutor: "A",
    substituted: "B",
    hour: "1.",
    class: "9.EK",
    subject: "Matek",
    room: "106",
    note: "megjegyzés",
  },
  {
    substitutor: "A",
    substituted: "B",
    hour: "1.",
    class: "9.EK",
    subject: "Matek",
    room: "106",
    note: "megjegyzés",
  },
  {
    substitutor: "A",
    substituted: "B",
    hour: "1.",
    class: "9.EK",
    subject: "Matek",
    room: "106",
    note: "megjegyzés",
  },
];

export default function Dashboard({ token, logout }: DashboardProps) {
  const [modalOpened, setModalOpened] = useState(false);

  if (!token) return null;

  const handleEditSubstitution = (id: number) => {
    setModalOpened(true);
  };

  const handleDeleteSubstitution = (id: number) => {
    setModalOpened(true);
  };

  const rows = elements.map((element: any, index: number) => (
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
