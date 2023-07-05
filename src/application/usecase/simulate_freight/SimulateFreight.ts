import FreightCalculator from "../../../domain/entity/FreightCalculator";
import ItemRepository from "../../../domain/repository/ItemRepository";
import SimulateFreightInput from "./SimulateFreightInput";
import SimulateFreightOutput from "./SimulateFreightOutput";

export default class SimulateFreight {

    //integração de serviço de dominio com serviço de aplicação
    constructor(readonly itemRepository: ItemRepository, readonly freightCalculator: FreightCalculator){

    }


    async execute (input: SimulateFreightInput): Promise<SimulateFreightOutput>{
        let amount = 0;
        for(const inputItem of input.items){
            const item = await this.itemRepository.findById(inputItem.idItem)
            if (!item) throw new Error('Item Not Found');
            amount += this.freightCalculator.calculate(item) * inputItem.quantity;
        }
        return new SimulateFreightOutput(amount);
    }
}