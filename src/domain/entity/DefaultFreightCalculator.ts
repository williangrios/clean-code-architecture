//DOMAIN SERVICE, VARIOS SERVICOES PODEM USA-LO
//DOMAIN SERVICES NORMALMENTE TEM UM VERBO NO NOME ENQUANTO QUE ENTITY E VALUE OBJECT SÃO SUBSTANTIVOS
import FreightCalculator from "./FreightCalculator";
import Item from "./Item";

export default class DefaultFreightCalculator implements FreightCalculator {
  calculate(item: Item): number {
    if (!item.width || !item.height || !item.length || !item.weight) return 0;
    const freight = 1000 * item.getVolume() * (item.getDensity() / 100);
    return Math.max(10, freight);
  }
}
