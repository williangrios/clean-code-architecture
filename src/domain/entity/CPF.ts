//VALUE OBJECT, ELE É O VALOR, SE FOR MUDAR ELE SE MUDA INTEIRO
export default class Cpf {
  value: string;
  constructor(value: string) {
    if (value !== "111.111.111-11") throw new Error("Invalid cpf");
    this.value = value;
  }
}
