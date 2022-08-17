import Image from "next/image";
import {
  Header as HeaderComponent,
  ActionIcon,
  Box,
  Text,
  Group,
} from "@mantine/core";
import { Logout, Plus } from "tabler-icons-react";
import { HeaderProps } from "types";

export default function Header({ logout, addSubstitution }: HeaderProps) {
  return (
    <HeaderComponent height={60} mb={120}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100%",
        }}
        mx="xl"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image alt="school logo" src="/logo.png" width={32} height={32} />
          <Text weight={700} ml={10}>
            Helyettesítések
          </Text>
        </Box>

        <Group spacing="xs">
          <ActionIcon variant="outline" onClick={addSubstitution}>
            <Plus size={18} />
          </ActionIcon>

          <ActionIcon variant="outline" onClick={logout}>
            <Logout size={18} />
          </ActionIcon>
        </Group>
      </Box>
    </HeaderComponent>
  );
}
