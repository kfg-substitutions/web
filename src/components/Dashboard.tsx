import { AppShell } from "@mantine/core";
import { Header } from "components";

interface Props {
  token: string | undefined;
  logout: () => void;
}

export default function Dashboard({ token, logout }: Props) {
  if (!token) return null;

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
      {/* The Internal Application Logic */}
    </AppShell>
  );
}
