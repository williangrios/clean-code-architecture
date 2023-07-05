import Cpf from "../../src/domain/entity/CPF";

test("testa com cpf correto", function () {
  const cpf = "111.111.111-11";
  expect(() => new Cpf(cpf));
});

test("testa com cpf incorreto", function () {
  const cpf = "938.435.452-13";
  expect(() => new Cpf(cpf)).toThrow(new Error("Invalid cpf"));
});
