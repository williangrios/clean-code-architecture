//É UM AGREGADO, ABRAÇA CUPOM, TEM OPERAÇÕES, ITEMS
import Cpf from "./CPF";
import Coupom from "./Coupom";
import DefaultFreightCalculator from "./DefaultFreightCalculator";
import FreightCalculator from "./FreightCalculator";
import Item from "./Item";
import OrderCode from "./OrderCode";
import OrderItem from "./OrderItem";

export class Order {
  cpf: Cpf;
  private orderItems: OrderItem[];
  coupom: Coupom | undefined;
  private freight: number;
  private code: OrderCode;

  constructor(
    cpf: string,
    readonly date: Date = new Date(),
    readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator(),
    readonly sequence: number = 1
  ) {
    this.cpf = new Cpf(cpf);
    this.orderItems = [];
    this.freight = 0;
    this.code = new OrderCode(date, sequence);
  }

  addItem(item: Item, quantity: number) {
    this.freight += this.freightCalculator.calculate(item) * quantity;
    this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
  }

  getFreight(): number {
    return this.freight;
  }

  getCode(): string {
    return this.code.value;
  }

  getCpf() {
    return this.cpf.value;
  }

  getOrderItems() {
    return this.orderItems;
  }

  getTotal() {
    let total = 0;
    for (const orderItem of this.orderItems) {
      total += orderItem.getTotal();
    }
    if (this.coupom) {
      total -= (total * this.coupom.percentage) / 100;
    }
    total += this.getFreight();
    return total;
  }

  addCoupom(coupom: Coupom) {
    if (coupom.isExpired(this.date)) return;
    this.coupom = coupom;
  }
}
