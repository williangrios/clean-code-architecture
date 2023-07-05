//usecase
//cria os repositorios, cria um dto de pedido, faz um pedido e verifica
import DefaultFreightCalculator from "../../../domain/entity/DefaultFreightCalculator";
import { Order } from "../../../domain/entity/Order";
import CoupomRepository from "../../../domain/repository/CoupomRepository";
import ItemRepository from "../../../domain/repository/ItemRepository";
import OrderRepository from "../../../domain/repository/OrderRepository";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";

export default class PlaceOrder{
    constructor(readonly itemRepository: ItemRepository, readonly orderRepository: OrderRepository, readonly coupomRepository: CoupomRepository){

    }

    async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput>{
        //caso de uso orquestrando as entidades, criando order, buscando items etc
        const sequence = await this.orderRepository.count() + 1
        const order = new Order(input.cpf, input.date, new DefaultFreightCalculator, sequence)
        for (const orderIterm of input.orderItems){
            const item = await this.itemRepository.findById(orderIterm.idItem)
            if (!item) throw new Error ("Item not found");
            order.addItem(item, orderIterm.quantity)
        }

        if (input.coupom){
            const coupom = await this.coupomRepository.findByCode(input.coupom);
            if(coupom) order.addCoupom(coupom)
        }
        await this.orderRepository.save(order);

        const total = order.getTotal();
        const output = new PlaceOrderOutput(order.getCode(),  total);
        return output
    }
}