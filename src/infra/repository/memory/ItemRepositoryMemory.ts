import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";

export default class ItemRepositoryMemory implements ItemRepository {
  items: Item[];
  constructor() {
    this.items = [
      new Item(1, "música", "cd", 30),
      new Item(2, "video", "dvd", 50),
      new Item(3, "video", "vhs", 10),
      new Item(4, "música", "guitarra", 1000, 100, 30, 10, 3),
      new Item(5, "video", "hd", 5000, 100, 50, 50, 20),
      new Item(6, "video", "dvd", 10, 10, 10, 10, 0.9),
    ];
  }

  findById(idItem: number): Promise<Item | undefined> {
    return Promise.resolve(this.items.find((item) => item.idItem === idItem));
  }
}
