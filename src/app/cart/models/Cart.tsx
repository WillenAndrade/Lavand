import { CartItem } from "../CartContext";

export class Cart {
  private items: CartItem[];

  constructor(items: CartItem[] = []) {
    this.items = items;
  }

  getItems(): CartItem[] {
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  addItem(item: CartItem): void {
    const existingItem = this.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.push({ ...item });
    }
  }

  removeItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  increaseQuantity(id: number): void {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.quantity += 1;
    }
  }

  decreaseQuantity(id: number): void {
    const item = this.items.find(i => i.id === id);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    }
  }

  clearCart(): void {
    this.items = [];
  }

  // Agora retorna um OBJETO, não string
  toJSON(): { items: CartItem[] } {
    return { items: this.items };
  }

  // Construtor seguro a partir do JSON
  static fromJSON(json: string): Cart {
    try {
      const parsed = JSON.parse(json);
      if (parsed && Array.isArray(parsed.items)) {
        const validItems = parsed.items.filter((item: any) =>
          item &&
          typeof item.id === "number" &&
          typeof item.name === "string" &&
          typeof item.price === "number" &&
          typeof item.quantity === "number" &&
          typeof item.src === "string"
        );
        return new Cart(validItems);
      }
      return new Cart();
    } catch (e) {
      console.error("Erro ao fazer parse do carrinho:", e);
      return new Cart();
    }
  }
}

/*import { CartItem } from "../CartContext"

export class Cart {
  private items: CartItem[];

  constructor(items: CartItem[] = []) {
    this.items = items;
  }

  getItems(): CartItem[] {
    return this.items;
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  addItem(item: CartItem): void {
    const existingItem = this.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.items.push({ ...item });
    }
  }

  removeItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  increaseQuantity(id: number): void {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.quantity += 1;
    }
  }

  decreaseQuantity(id: number): void {
    const item = this.items.find(i => i.id === id);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
    }
  }

  clearCart(): void {
    this.items = []; 
  }

  toJSON(): string {
    return JSON.stringify({ items: this.items });
  }

  static fromJSON(json: string): Cart {
    try {
      const parsed = JSON.parse(json);
      if (parsed.items && Array.isArray(parsed.items)) {
        return new Cart(parsed.items);
      }
      return new Cart();
    } catch (e) {
      console.error("Erro ao fazer parse do carrinho:", e);
      return new Cart();
    }
  }
}*/

