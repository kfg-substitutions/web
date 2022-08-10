import Link from "next/link";
import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  Box,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  center: {
    position: "absolute",

    top: 0,
    bottom: 0,
    left: 0,
    right: 0,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  title: {
    fontWeight: 900,
    fontSize: 34,
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  control: {
    [theme.fn.smallerThan("sm")]: {
      width: "100%",
    },
  },

  mobileImage: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  desktopImage: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
}));

export default function Page404() {
  const { classes } = useStyles();

  return (
    <Box className={classes.center}>
      <Container className={classes.root}>
        <SimpleGrid
          spacing={80}
          cols={2}
          breakpoints={[{ maxWidth: "sm", cols: 1, spacing: 40 }]}
        >
          <Image
            alt="404 error"
            src="/404.svg"
            className={classes.mobileImage}
          />
          <div>
            <Title className={classes.title}>Valami nem stimmel...</Title>
            <Text color="dimmed" size="lg">
              A felkeresett oldal nem létezik. Lehet, hogy hibás címet adtál
              meg, vagy a lap áthelyezve lett egy másik címre. Ha gondolod, lépj
              kapcsolatba a fejlesztővel.
            </Text>
            <Link href="/">
              <Button
                variant="outline"
                size="md"
                mt="xl"
                className={classes.control}
              >
                Vissza a főoldalra
              </Button>
            </Link>
          </div>
          <Image
            alt="404 text"
            src="/404.svg"
            className={classes.desktopImage}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
}
