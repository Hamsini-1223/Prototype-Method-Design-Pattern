// Cell.ts
// Basic cell that can divide itself (like mitosis in biology)

export interface Cloneable {
  divide(): Cell;
}

export class Cell implements Cloneable {
  public dna: string;
  public energy: number;
  public age: number;
  private id: string;

  constructor(dna: string, energy: number = 100, age: number = 0) {
    this.dna = dna;
    this.energy = energy;
    this.age = age;
    this.id = Math.random().toString(36).substring(2, 8);
  }

  // This is the core of Prototype pattern - the cell knows how to copy itself
  divide(): Cell {
    if (this.energy < 50) {
      throw new Error("Not enough energy to divide!");
    }

    // Parent cell loses energy when dividing
    this.energy = this.energy - 30;
    this.age = this.age + 1;

    // Create new cell with same DNA but fresh energy
    const newCell = new Cell(this.dna, 80, 0);

    console.log(`Cell ${this.id} divided! Created new cell ${newCell.getId()}`);
    return newCell;
  }

  grow(): void {
    this.energy = Math.min(100, this.energy + 20);
    this.age = this.age + 1;
  }

  getId(): string {
    return this.id;
  }

  getInfo(): string {
    return `Cell ${this.id}: DNA=${this.dna}, Energy=${this.energy}, Age=${this.age}`;
  }
}
