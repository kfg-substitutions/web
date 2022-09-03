import { useQuery } from "react-query";
import {
  Container,
  Select,
  Group,
  Image,
  Text,
  ActionIcon,
  Box,
} from "@mantine/core";
import { SubstitutionCard } from "ui";
import * as API from "api";

export default function Home() {
  const { data, isLoading, error } = useQuery(
    "substitutions",
    API.getSubstitutions
  );

  console.log(isLoading, error, data);

  return (
    <>
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
          <Group sx={{ marginBottom: 20 }}>
            <Select
              data={["9A", "9B", "9C", "9D", "9E"]}
              label="Válaszd ki, melyik osztály helyettesítései érdekelnek!"
              placeholder="Pl. 9.AK"
              onChange={() => {}}
              value={""}
            />

            <ActionIcon variant="outline" onClick={() => {}}>
              {">"}
            </ActionIcon>
          </Group>

          <SubstitutionCard
            key={1}
            substitutor="John Doe"
            substituted="John Doe"
            hour="6"
            class="8.A"
            subject="Matek"
            room="102"
            note="hazamehet"
          />
          <SubstitutionCard
            key={2}
            substitutor="John Doe"
            substituted="John Doe"
            hour="6"
            class="8.A"
            subject="Matek"
            room="102"
            note="hazamehet"
          />
        </Container>
      </main>
    </>
  );
}
