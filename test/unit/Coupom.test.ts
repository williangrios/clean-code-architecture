import Coupom from "../../src/domain/entity/Coupom";

test("deve criar um cupom de desconto válido", function () {
  const coupom = new Coupom("VALE20", 20, new Date());
  const today = new Date();
  const isValid = coupom.isValid(today);
  expect(isValid).toBeTruthy();
});

test("deve criar um cupom de desconto expirado", function () {
  const coupom = new Coupom("VALE20", 20, new Date("2022-01-01"));
  const today = new Date();
  const isExpired = coupom.isExpired(today);
  expect(isExpired).toBeTruthy();
});
