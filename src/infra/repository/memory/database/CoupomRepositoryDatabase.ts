import Coupom from "../../../../domain/entity/Coupom";
import CoupomRepository from "../../../../domain/repository/CoupomRepository";
import Connection from "../../../database/Connection";

export default class CoupomRepositoryDatabase implements CoupomRepository {
  constructor(readonly connection: Connection) {}

  async findByCode(code: string): Promise<Coupom | undefined> {
    const [coupomData] = await this.connection.query(
      "select * from ccca.coupon where code = $1",
      [code]
    );
    if (!coupomData) return;
    return new Coupom(
      coupomData.code,
      coupomData.percentage,
      coupomData.expire_date
    );
  }
}
