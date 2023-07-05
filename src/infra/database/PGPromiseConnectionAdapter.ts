import Connection from "./Connection";
import pgp from "pg-promise";

export default class PGPromiseConnectionAdapter implements Connection {
  //padrão singleton: assegurar apenas uma instancia
  //1º construtor privado
  //2º método estático para pegar a instancia
  //3º propriedade estática da classe que estou construindo
  //4º agora ela está private, para usar vou usar
    //const connection = PgPromiseConnectionAdapter.getInstance()

  pgp: any;
  static instance: PGPromiseConnectionAdapter;

  private constructor() {
    //padrão adapter, estou convertendo uma interface em outra (estou envolvendo o PG promise, )
    this.pgp = pgp()("postgres://postgres:123456@localhost:5432/app");
  }

  static getInstance() {
    //aqui eu verifico se já existe, se não, eu crio uma nova
    if (!PGPromiseConnectionAdapter.instance) {
      PGPromiseConnectionAdapter.instance = new PGPromiseConnectionAdapter();
    }
    return PGPromiseConnectionAdapter.instance;
  }

  async query(statement: string, params: any[]): Promise<any> {
    return this.pgp.query(statement, params);
  }
}
