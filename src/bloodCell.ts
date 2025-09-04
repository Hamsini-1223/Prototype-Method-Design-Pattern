// bloodCell.ts
// Blood cell that carries oxygen

import { Cell } from "./cell";

export class BloodCell extends Cell {
  public oxygen: number;

  constructor(dna: string, oxygen: number = 0) {
    super(dna);
    this.oxygen = oxygen;
  }

  // Blood cell copies itself and its oxygen level
  divide(): BloodCell {
    if (this.energy < 50) {
      throw new Error("Blood cell too weak to divide!");
    }

    this.energy -= 30;
    this.age += 1;

    const newBloodCell = new BloodCell(this.dna, this.oxygen);
    console.log(`Blood cell divided! Oxygen: ${this.oxygen}`);
    return newBloodCell;
  }

  addOxygen(amount: number): void {
    this.oxygen = Math.min(100, this.oxygen + amount);
    console.log(`Blood cell now has ${this.oxygen} oxygen`);
  }
}
