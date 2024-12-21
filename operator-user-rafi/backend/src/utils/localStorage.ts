interface Item {
  id: string;
  name: string;
  amount: number;
  condition: string;
  created_at: Date;
}

interface BorrowItem {
  id: string;
  item_name: string;
  amount: number;
  borrow_date: Date;
  return_date: Date;
  borrower_name: string;
  officer_name: string;
}

class LocalStorage {
  private items: Item[] = [];
  private borrowItems: BorrowItem[] = [];

  addItem(item: Omit<Item, 'id'>) {
    const newItem = { ...item, id: Date.now().toString() };
    this.items.push(newItem);
    return newItem;
  }

  getAllItems() {
    return this.items;
  }

  addBorrowItem(borrowItem: Omit<BorrowItem, 'id'>) {
    const newBorrowItem = { ...borrowItem, id: Date.now().toString() };
    this.borrowItems.push(newBorrowItem);
    return newBorrowItem;
  }

  getAllBorrowItems() {
    return this.borrowItems;
  }
}

export const localStorage = new LocalStorage();

