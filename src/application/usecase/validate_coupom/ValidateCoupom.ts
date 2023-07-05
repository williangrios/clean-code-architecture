import Coupom from "../../../domain/entity/Coupom";
import CoupomRepository from "../../../domain/repository/CoupomRepository";
import PGPromiseConnectionAdapter from "../../../infra/database/PGPromiseConnectionAdapter";

export default class ValidateCoupom{
    constructor(readonly coupomRepository: CoupomRepository) {
  
    }

    async execute(code: string): Promise<boolean>{
        const coupom = await this.coupomRepository.findByCode(code);
        if (!coupom?.isValid()) return false;
        return coupom.isValid();
    }
}