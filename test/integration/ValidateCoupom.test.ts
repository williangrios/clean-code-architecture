import ValidateCoupom from "../../src/application/usecase/validate_coupom/ValidateCoupom";
import PGPromiseConnectionAdapter from "../../src/infra/database/PGPromiseConnectionAdapter";
import CoupomRepositoryDatabase from "../../src/infra/repository/memory/database/CoupomRepositoryDatabase";

test("deve validar um cupom de desconto", async function () {
  const connection = PGPromiseConnectionAdapter.getInstance();
  const coupomRepository = new CoupomRepositoryDatabase(connection);
  const validadeCoupom = new ValidateCoupom(coupomRepository);
  //aqui estamos fazendo sem um dto de entrada
  const isValid = await validadeCoupom.execute("VALE20");
  expect(isValid).toBeTruthy();
});
