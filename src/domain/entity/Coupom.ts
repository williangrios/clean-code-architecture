//PODE SER UMA ENTIDADE, CASO ALGUEM MUDE O PERCENTUAL, EXPIRE DATE
//SE PENSARMOS QUE O CUPOM NÃO PODE SER ALTERADO PODERÁ SER UM VALUE OBJECT, DO JEITO QUE ESTÁ AQUI ESTÁ MAIS PARA VO MESMO
export default class Coupom {
  constructor(
    readonly code: string,
    readonly percentage: number,
    readonly expireDate?: Date
  ) {}

  //D do SOLID conceitos de alto nivel não podem depender de conceitos de baixo nivel, por isso estou recebendo a data
  isValid(today: Date = new Date()) {
    if (!this.expireDate) return true;
    return this.expireDate.getTime() >= today.getTime();
  }

  isExpired(today: Date = new Date()) {
    return !this.isValid(today);
  }
}
