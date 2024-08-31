import { Container, Fieldset, Grid, Text, TextInput } from "@mantine/core";
import React from "react";
import DiscordEmbed from "../components/DiscordEmbed/DiscordEmbed";
import { RichEditor } from "../components/RichTextEditor/RichTextEditor";

const WelcomeChannel = () => {
  const [data, setData] = React.useState({
    title: "Welcome to {server.name}",
    content: "Hãy kể lại cho chúng tui hành trình bạn đến đây đi nào",
    url: "",
    image: "https://picsum.photos/300/300",
    thumbnail: "https://picsum.photos/300/300",
    authorName: "Mantine",
    authorUrl: "https://mantine.dev",
    authorIconUrl: "https://picsum.photos/300/300",
    footerIconUrl: "https://picsum.photos/300/300",
    footerText: "Mantine",
  });
  const onFieldChange =
    (key: string) => (e: string | React.ChangeEvent<HTMLInputElement>) => {
      if (typeof e === "string") {
        setData({ ...data, [key]: e });
      } else if (e.target) {
        setData({ ...data, [key]: e.target.value });
      }
    };
  return (
    <Grid>
      <Grid.Col span={6}>
        <Fieldset legend="Welcome Embed" radius="xl" mb="md">
          <Container m="md">
            <Text>Title: </Text>
            <RichEditor
              setContent={onFieldChange("title")}
              content={data.title}
              header={false}
              quote={false}
              listed={false}
              oneLine={true}
            ></RichEditor>
          </Container>
          <Container m="md">
            <Text>Description: </Text>
            <RichEditor
              setContent={onFieldChange("content")}
              content={data.content}
              quote={false}
            ></RichEditor>
          </Container>
          <Container mx={"md"}>
            <TextInput
              label="url"
              placeholder="Url For title"
              onChange={onFieldChange("url")}
              value={data.url}
              size="sm"
              radius="md"
            />
          </Container>
          <Container mx={"md"}>
            <TextInput
              label="image"
              placeholder="Image For embed"
              onChange={onFieldChange("image")}
              value={data.image}
              size="sm"
              radius="md"
            />
          </Container>
          <Container mx={"md"}>
            <TextInput
              label="thumbnail"
              placeholder="Thumbnail For embed"
              onChange={onFieldChange("thumbnail")}
              value={data.thumbnail}
              size="sm"
              radius="md"
            />
          </Container>
        </Fieldset>
        {/* embed author config */}
        <Fieldset legend="Embed author config" radius="xl" my="md">
          <Container mx={"md"}>
            <TextInput
              label="author"
              placeholder="author of embed"
              onChange={onFieldChange("authorName")}
              value={data.authorName}
              size="sm"
              radius="md"
            />
          </Container>
          <Container mx={"md"}>
            <TextInput
              label="author url"
              placeholder="author url For embed"
              onChange={onFieldChange("authorUrl")}
              value={data.authorUrl}
              size="sm"
              radius="md"
            />
          </Container>
          <Container mx={"md"}>
            <TextInput
              label="author icon"
              placeholder="Author Icon For embed"
              onChange={onFieldChange("authorIconUrl")}
              value={data.authorIconUrl}
              size="sm"
              radius="md"
            />
          </Container>
        </Fieldset>
        {/* Embed Footer Config */}
        <Fieldset legend="Embed Footer Config" radius="xl" my="md">
          <Container mx={"md"}>
            <TextInput
              label="footer text"
              placeholder="text of footer"
              onChange={onFieldChange("footerText")}
              value={data.footerText}
              size="sm"
              radius="md"
            />
          </Container>
          <Container mx={"md"}>
            <TextInput
              label="footer icon"
              placeholder="icon of footer"
              onChange={onFieldChange("footerIconUrl")}
              value={data.footerIconUrl}
              size="sm"
              radius="md"
            />
          </Container>
        </Fieldset>
      </Grid.Col>
      <Grid.Col span={6} mt={"md"}>
        <DiscordEmbed
          embed={{
            title: data.title,
            description: data.content,
            url: data.url,
            author: {
              name: data.authorName,
              url: data.authorUrl,
              iconUrl: data.authorIconUrl,
            },
            fields: [
              {
                inline: true,
                name: "Mantine",
                value: "https://mantine.dev",
              },
            ],
            color: "#00b0f4",
            footer: {
              text: data.footerText,
              iconUrl: data.footerIconUrl,
            },
            image: data.image,
            thumbnail: data.thumbnail,
          }}
        ></DiscordEmbed>
      </Grid.Col>
    </Grid>
  );
};

export default WelcomeChannel;
