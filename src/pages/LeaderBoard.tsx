import { Button, Container, Flex, Menu, Table, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../constants";
import { Member } from "../types";

type AllowedSort = "xp" | "messages" | "balance";

const LeaderBoard = () => {
  const [sort, setSort] = useState<AllowedSort>("xp");
  const [data, setData] = useState<{
    items: Member[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
  }>();
  const [page, setPage] = useState(1);
  const pathname = useParams<{ guildId: string }>();
  useEffect(() => {
    fetch(`${API_URL}/api/guild/leaderboard/${pathname.guildId}?sortBy=${sort}&page=${page}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [sort, pathname.guildId, page]);
  const rows = data?.items
    ? data.items.map((element, index) => (
        <Table.Tr key={element.id}>
          <Table.Td>{index}</Table.Td>
          <Table.Td>{element.expand?.user.username}</Table.Td>
          <Table.Td>{element.xp}</Table.Td>
          <Table.Td>{element.messages}</Table.Td>
          <Table.Td>{element.balance}</Table.Td>
        </Table.Tr>
      ))
    : null;

  return (
    <Container>
      <Flex m="md" justify={"right"}>
        <SortButton sort={sort} setSort={setSort} />
      </Flex>
      <Table stickyHeader>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Thứ hạn</Table.Th>
            <Table.Th>Tên</Table.Th>
            <Table.Th>XP</Table.Th>
            <Table.Th>Số lượng tin nhắn</Table.Th>
            <Table.Th>Số tiền trong TK</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <Flex m="md" justify={"right"}>
        {data && (
          <>
            <Text style={{ alignSelf: "center" }} mx="md">
              Trang {data?.page} / {data?.totalPages}
            </Text>
            <Button disabled={data?.page == 1} onClick={() => setPage((state) => Math.max(state - 1, 0))} mx="md">
              Trang trước
            </Button>
            <Button mx="md" disabled={data?.page == data?.totalPages} onClick={() => setPage((state) => Math.min(state + 1, data?.totalPages))}>
              Trang sau
            </Button>
          </>
        )}
      </Flex>
    </Container>
  );
};

export default LeaderBoard;

function SortButton({ sort, setSort }: { sort: AllowedSort; setSort: (sort: AllowedSort) => void }) {
  return (
    <Menu shadow="md" width={200}>
      <Flex justify="center" content="center" h="100%">
        <Text style={{ alignSelf: "center" }} mx="md">
          Sort By:
        </Text>
        <Menu.Target>
          <Button>{sort == "xp" ? sort.toLocaleUpperCase() : sort == "messages" ? "Số lượng tin nhắn" : "Số tiền trong Tk"}</Button>
        </Menu.Target>
      </Flex>

      <Menu.Dropdown>
        <Menu.Item onClick={() => setSort("xp")}>XP</Menu.Item>
        <Menu.Item onClick={() => setSort("messages")}>Số lượng tin nhắn</Menu.Item>
        <Menu.Item onClick={() => setSort("balance")}>Số tiền trong TK</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
