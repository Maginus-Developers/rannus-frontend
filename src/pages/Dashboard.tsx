import { Badge, Button, Card, Container, Flex, Group, SimpleGrid, Text } from "@mantine/core";
import { IconSettings } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useGuildStore } from "../states/guild";
const feature = [
  {
    title: "Automated Response To Messages",
    description: "thì nó là tính năng tự động nhắn trả lời thoy (không phải afk nha mấy friend)",
    id: "auto_response",
    link: "/dashboard/automated-response",
    newFeature: false,
  },
];

export default function Dashboard() {
  const currentGuild = useGuildStore((state) => state.chosenGuild);
  console.log(currentGuild);
  return (
    <Container>
      <h1>Dashboard</h1>
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
        {feature.map((item) => (
          <FeatureCard
            key={item.id}
            title={item.title}
            description={item.description}
            enable={false}
            link={item.link}
            newFeature={item.newFeature}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
}

function FeatureCard({
  title,
  description,
  enable,
  link,
  newFeature,
}: {
  title: string;
  description: string;
  enable: boolean;
  link: string;
  newFeature: boolean;
}) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {/* <Card.Section>
        <Image src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png" height={160} alt="Norway" />
      </Card.Section> */}

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{title}</Text>
        {newFeature && <Badge color="pink">New Feature</Badge>}
      </Group>

      <Text size="sm" c="dimmed">
        {description}
      </Text>

      {enable ? (
        <Flex justify="center" align="center" mt="md">
          <Button color="red" fullWidth radius="md">
            Disable
          </Button>
          <Button color="blue" radius="md" ml={"sm"} component={Link} to={link}>
            <IconSettings></IconSettings>
          </Button>
        </Flex>
      ) : (
        <Button color="blue" fullWidth mt="md" radius="md">
          Enable
        </Button>
      )}
    </Card>
  );
}
