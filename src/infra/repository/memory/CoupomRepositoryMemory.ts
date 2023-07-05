import Coupom from "../../../domain/entity/Coupom";
import CoupomRepository from "../../../domain/repository/CoupomRepository";

export default class CoupomRepositoryMemory implements CoupomRepository {
  coupoms: Coupom[];
  constructor() {
    this.coupoms = [new Coupom("VALE20", 20)];
  }
  findByCode(code: string): Promise<Coupom | undefined> {
    return Promise.resolve(this.coupoms.find((coupom) => coupom.code === code));
  }
}
