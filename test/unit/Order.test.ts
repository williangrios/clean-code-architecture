import Coupom from "../../src/domain/entity/Coupom";
import DefaultFreightCalculator from "../../src/domain/entity/DefaultFreightCalculator";
import FixedFreightCalculator from "../../src/domain/entity/FixedFreightCalculator";
import Item from "../../src/domain/entity/Item";
import { Order } from "../../src/domain/entity/Order";

test("deve criar um pedido vazio com cpf válido", function () {
  const cpf = "111.111.111-11";
  const order = new Order(cpf);
  const total = order.getTotal();
  expect(total).toBe(0);
});

test("deve tentar criar um pedido vazio com cpf inválido", function () {
  const cpf = "938.435.452-13";
  expect(() => new Order(cpf)).toThrow(new Error("Invalid cpf"));
});

test("deve criar um pedido vazio com 3 itens", function () {
  const cpf = "111.111.111-11";
  const order = new Order(cpf);
  order.addItem(new Item(1, "música", "cd", 30), 3);
  order.addItem(new Item(2, "video", "dvd", 50), 1);
  order.addItem(new Item(3, "video", "vhs", 40), 2);
  const total = order.getTotal();
  expect(total).toBe(30 * 3 + 50 * 1 + 40 * 2);
});

test("deve criar um pedido com cupom de desconto", function () {
  const cpf = "111.111.111-11";
  const order = new Order(cpf);
  order.addItem(new Item(1, "música", "cd", 10), 1);
  order.addItem(new Item(2, "video", "dvd", 50), 1);
  order.addItem(new Item(3, "video", "vhs", 40), 1);
  order.addCoupom(new Coupom("VALE20", 20));
  const total = order.getTotal();
  expect(total).toBe(80);
});

test("deve criar um pedido com cupom de desconto expirado", function () {
  const cpf = "111.111.111-11";
  const order = new Order(cpf, new Date("2023-07-03"));
  order.addItem(new Item(1, "música", "cd", 10), 1);
  order.addItem(new Item(2, "video", "dvd", 50), 1);
  order.addItem(new Item(3, "video", "vhs", 40), 1);
  order.addCoupom(new Coupom("VALE20", 20, new Date("2022-07-04")));
  const total = order.getTotal();
  expect(total).toBe(100);
});

test("deve criar um pedido com 3 itens com o calculo do frete com estratégia Default", function () {
  const cpf = "111.111.111-11";
  const order = new Order(cpf, new Date(), new DefaultFreightCalculator());
  order.addItem(new Item(4, "música", "guitarra", 1000, 100, 30, 10, 3), 1); //30 de frete
  order.addItem(new Item(5, "video", "hd", 5000, 100, 50, 50, 20), 1); //
  order.addItem(new Item(6, "video", "dvd", 10, 10, 10, 10, 0.9), 3);
  const freight = order.getFreight();
  console.log(freight);

  expect(freight).toBe(260);
});

test("deve criar um pedido com 3 itens com o calculo do frete com a estratégia fixo", function () {
  const cpf = "111.111.111-11";
  const order = new Order(cpf, new Date(), new FixedFreightCalculator());
  order.addItem(new Item(4, "música", "guitarra", 1000, 100, 30, 10, 3), 1); //30 de frete
  order.addItem(new Item(5, "video", "hd", 5000, 100, 50, 50, 20), 1); //
  order.addItem(new Item(6, "video", "dvd", 10, 10, 10, 10, 0.9), 3);
  const freight = order.getFreight();
  console.log(freight);

  expect(freight).toBe(50);
});

test("deve criar um pedido com CÓDIGO", function () {
  const cpf = "111.111.111-11";
  const order = new Order(cpf, new Date(), new FixedFreightCalculator());
  order.addItem(new Item(4, "música", "guitarra", 1000, 100, 30, 10, 3), 1); //30 de frete
  order.addItem(new Item(5, "video", "hd", 5000, 100, 50, 50, 20), 1); //
  order.addItem(new Item(6, "video", "dvd", 10, 10, 10, 10, 0.9), 3);
  const code = order.getCode();
  expect(code).toBe("202300000001");
});
