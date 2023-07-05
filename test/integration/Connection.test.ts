import PGPromiseConnectionAdapter from "../../src/infra/database/PGPromiseConnectionAdapter";

test("deve criar uma conexao com o bd", async function () {
  const connection = PGPromiseConnectionAdapter.getInstance();
  const itemsData = await connection.query("select * from ccca.item", []);
  expect(itemsData).toHaveLength(6);
});
