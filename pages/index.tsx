import { useState } from "react";
import { useQuery } from "react-query";
import {
  Container,
  Select,
  Group,
  Image,
  Text,
  Button,
  Box,
  LoadingOverlay,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import * as API from "api";
import { SubstitutionCard } from "ui";
import { Day, Substitution } from "types";
import CLASS_OPTIONS from "util/classes";

export default function Home() {
  const { data, isLoading } = useQuery("substitutions", API.getSubstitutions, {
    refetchInterval: 1000 * 60 * 5,
  });
  const [selectedDay, toggleSelectedDay] = useToggle([Day.Today, Day.Tomorrow]);
  const [selectedClass, setSelectedClass] = useState<string | null>();

  const substitutionsToShow = (
    (selectedDay === Day.Today
      ? data?.todaySubstitutions
      : data?.tomorrowSubstitutions) ?? []
  ).filter(
    (substitution: Substitution) =>
      !selectedClass ||
      selectedClass === "Minden helyettesítés" ||
      substitution.class === selectedClass
  );

  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />

      <header>
        <Container size="xl" py="lg">
          <Group position="center">
            <Image alt="school logo" src="/logo.png" width={32} height={32} />
            <Text weight={700} ml={10} size="lg">
              Karinthy Helyettesítések
            </Text>
          </Group>
        </Container>
      </header>

      <main>
        <Container p="sm">
          <Group position="center">
            <Button variant="outline" onClick={() => toggleSelectedDay()}>
              {selectedDay === Day.Today ? "Következő nap" : "Mai nap"}
            </Button>
          </Group>

          <Box sx={{ marginBottom: 20 }}>
            <Select
              data={["Minden helyettesítés"].concat(CLASS_OPTIONS)}
              label="Válaszd ki, melyik osztály helyettesítései érdekelnek!"
              placeholder="Pl. 9.AK"
              onChange={setSelectedClass}
              value={selectedClass}
            />
          </Box>

          {!substitutionsToShow.length && (
            <Text size="xl" align="center">
              Nincs helyettesítés!
            </Text>
          )}

          {substitutionsToShow.map((substitution: Substitution) => (
            <SubstitutionCard key={substitution.id} {...substitution} />
          ))}
        </Container>
      </main>
    </>
  );
}
