import { createStyles, Paper, Container, Text } from "@mantine/core";
import { Substitution } from "types";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    transition: "transform 150ms ease, box-shadow 100ms ease",
    padding: theme.spacing.xl,
    paddingLeft: theme.spacing.xl * 2,

    "&:hover": {
      boxShadow: theme.shadows.md,
      transform: "scale(1.02)",
    },

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 6,
      backgroundImage: theme.fn.linearGradient(
        45,
        theme.colors.indigo[6],
        theme.colors.cyan[6]
      ),
    },
  },
}));

export default function SubstitutionCard(props: Substitution) {
  const { classes } = useStyles();

  return (
    <Paper
      key={props.id}
      withBorder
      radius="md"
      mb="xs"
      className={classes.card}
    >
      <Container
        sx={{
          backgroundSize: "30%",
          backgroundRepeat: "no-repeat",
          background: `linear-gradient(45deg, indigo 30%, cyan 80%);`,
          borderRadius: 20,
        }}
      >
        <Text>{props.class}</Text>
      </Container>
      <Text size="xl" weight={500} mt="md">
        {props.hour}. óra - {props.subject}
      </Text>
      <Text size="sm" mt="sm" color="dimmed">
        {props.room && (
          <>
            Terem: {props.room}
            <br />
          </>
        )}
      </Text>
      <Text size="sm" mt="sm" color="dimmed">
        {props.substitutor && (
          <>
            Helyettesítő: {props.substitutor}
            <br />
          </>
        )}
        Helyettesítendő: {props.substituted}
      </Text>
      {props.note && (
        <Text size="sm" mt="sm" color="dimmed">
          Megjegyzés: {props.note}
        </Text>
      )}
    </Paper>
  );
}
