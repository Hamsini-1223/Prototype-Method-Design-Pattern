// cell.ts
// Basic cell that can divide itself

export class Cell {
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

  // Core of Prototype pattern - cell copies itself
  divide(): Cell {
    if (this.energy < 50) {
      throw new Error("Not enough energy to divide!");
    }

    this.energy -= 30;
    this.age += 1;

    const newCell = new Cell(this.dna, 80, 0);
    console.log(`Cell divided! Parent: ${this.id}, Child: ${newCell.id}`);
    return newCell;
  }

  grow(): void {
    this.energy = Math.min(100, this.energy + 20);
    this.age += 1;
  }

  getId(): string {
    return this.id;
  }

  getInfo(): string {
    return `Cell ${this.id}: DNA=${this.dna}, Energy=${this.energy}, Age=${this.age}`;
  }
}
