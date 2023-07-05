import Coupom from "../entity/Coupom";

export default interface CoupomRepository {
  findByCode(code: string): Promise<Coupom | undefined>;
}
