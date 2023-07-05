import OrderCode from "../../src/domain/entity/OrderCode";

test("deve criar um codigo de pedido", function () {
  const date = new Date("2023-02-01");
  const sequence = 1;
  const orderCode = new OrderCode(date, sequence);
  expect(orderCode.value).toBe("202300000001");
});
