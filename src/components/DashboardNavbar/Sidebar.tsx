import { Button, em, Text } from "@mantine/core";
import { useHover, useMediaQuery } from "@mantine/hooks";
import { Link, useLocation } from "react-router-dom";
import { SidebarPath } from "./SideBarPath";
import { RouteObjectWithMeta } from "../../types";

const Sidebar = () => {
  const currentPath = useLocation();
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
  return (
    <>
      {SidebarPath.map((key, index) => (
        <CustomButton
          key={index}
          feat={key}
          chosen={checkPath(currentPath.pathname, key.path)}
          isMobile={isMobile}
        ></CustomButton>
      ))}
    </>
  );
};

const CustomButton = ({
  feat,
  chosen,
  isMobile = false,
}: {
  feat: RouteObjectWithMeta;
  chosen?: boolean;
  isMobile?: boolean;
}) => {
  // const theme = useMantineTheme();
  const { hovered, ref } = useHover();
  return (
    <Button
      variant="light"
      w={"100%"}
      bg={(hovered && !isMobile) || chosen ? "#30323F" : "transparent"}
      leftSection={feat.icon}
      size="md"
      color={chosen ? "#AAB2DE" : "white"}
      justify="space-between"
      radius={"md"}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      component={Link}
      to={feat.getUrl ? feat.getUrl() : feat.path}
    >
      <Text>{feat.name}</Text>
    </Button>
  );
};

// check path match with SidebarPath
function checkPath(path: string, featPath: string) {
  const pathArr = path.trim().split("/");
  const featPathArr = featPath.trim().split("/");
  if (pathArr.length != featPathArr.length) {
    return false;
  }
  for (let i = 0; i < featPathArr.length; i++) {
    if (featPathArr[i].startsWith(":")) {
      continue;
    }
    if (pathArr[i] != featPathArr[i]) {
      return false;
    }
  }
  return true;
}

export default Sidebar;
