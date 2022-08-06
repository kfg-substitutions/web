import Image from "next/image";
import {
  Header as HeaderComponent,
  Container,
  ActionIcon,
  Box,
  Text,
} from "@mantine/core";
import { Logout } from "tabler-icons-react";

interface Props {
  logout: () => void;
}

export default function Header({ logout }: Props) {
  return (
    <HeaderComponent height={60} mb={120}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            src="https://www.karinthy.hu/web/kepek/logo.png"
            width={32}
            height={32}
          />
          <Text weight={700} ml={10}>
            Helyettesítések
          </Text>
        </Box>

        <ActionIcon variant="outline" onClick={logout}>
          <Logout size={18} />
        </ActionIcon>
      </Container>
    </HeaderComponent>
  );
}
