import PlaceOrder from "../../src/application/usecase/place_order/PlaceOrder";
import PGPromiseConnectionAdapter from "../../src/infra/database/PGPromiseConnectionAdapter";
import CoupomRepositoryDatabase from "../../src/infra/repository/memory/database/CoupomRepositoryDatabase";
import ItemRepositoryDatabase from "../../src/infra/repository/memory/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../../src/infra/repository/memory/database/OrderRepositoryDatabase";

let placeOrder: PlaceOrder;
let orderRepository: OrderRepositoryDatabase;

beforeEach(function () {
  const connection = PGPromiseConnectionAdapter.getInstance();
  const itemRepository = new ItemRepositoryDatabase(connection);
  orderRepository = new OrderRepositoryDatabase(connection);
  const coupomRepository = new CoupomRepositoryDatabase(connection);
  placeOrder = new PlaceOrder(
    itemRepository,
    orderRepository,
    coupomRepository
  );
});

test("Deve fazer um pedido", async function () {
  const input = {
    cpf: "111.111.111-11",
    orderItems: [
      { idItem: 1, quantity: 1 },
      { idItem: 2, quantity: 1 },
      { idItem: 3, quantity: 3 },
    ],
    date: new Date(),
    coupom: "VALE20",
  };
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(138);
});

test("Deve fazer um pedido com cálculo de frete", async function () {
  const input = {
    cpf: "111.111.111-11",
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date(),
  };
  const output = await placeOrder.execute(input);
  expect(output.total).toBe(6290);
});

test("Faz um pedido com código", async function () {
  const input = {
    cpf: "111.111.111-11",
    orderItems: [
      { idItem: 4, quantity: 1 },
      { idItem: 5, quantity: 1 },
      { idItem: 6, quantity: 3 },
    ],
    date: new Date(),
  };
  const output = await placeOrder.execute(input);
  expect(output.code).toBe("202300000001");
});

afterEach(async function () {
  await orderRepository.clear();
});
