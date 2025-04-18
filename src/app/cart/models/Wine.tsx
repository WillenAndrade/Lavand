export class Wine {
  constructor(
    public id: number,
    public name: string,
    public src: string,
    public price: number,
    public quantity: number = 1
  ) {}

  getTotal(): number {
    return this.price * this.quantity;
  }

  increaseQuantity(amount: number = 1): void {
    this.quantity += amount;
  }

  decreaseQuantity(amount: number = 1): void {
    this.quantity = Math.max(1, this.quantity - amount);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      src: this.src,
      price: this.price,
      quantity: this.quantity,
    };
  }

  static fromJSON(data: any): Wine {
    return new Wine(data.id, data.name, data.src, data.price, data.quantity);
  }
}