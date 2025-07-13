// SpecializedCells.ts
// Different types of cells that inherit division ability

import { Cell } from "./Cell";

export class BloodCell extends Cell {
  public oxygenLevel: number;

  constructor(dna: string, oxygenLevel: number = 0) {
    super(dna);
    this.oxygenLevel = oxygenLevel;
  }

  // BloodCell knows how to copy itself properly
  divide(): BloodCell {
    if (this.energy < 50) {
      throw new Error("Blood cell too weak to divide!");
    }

    this.energy -= 30;
    this.age += 1;

    // Create new blood cell with same properties
    const newBloodCell = new BloodCell(this.dna, this.oxygenLevel);
    console.log(`Blood cell divided! Oxygen level: ${this.oxygenLevel}`);

    return newBloodCell;
  }

  carryOxygen(amount: number): void {
    this.oxygenLevel = Math.min(100, this.oxygenLevel + amount);
    console.log(`Blood cell carrying ${this.oxygenLevel} oxygen units`);
  }
}

export class BrainCell extends Cell {
  public knowledge: string[];

  constructor(dna: string, knowledge: string[] = []) {
    super(dna);
    this.knowledge = [...knowledge]; // Copy the knowledge array
  }

  // BrainCell knows how to copy itself including memories
  divide(): BrainCell {
    if (this.energy < 60) {
      throw new Error("Brain cell needs more energy to divide!");
    }

    this.energy -= 40;
    this.age += 1;

    // New brain cell gets copy of all knowledge
    const newBrainCell = new BrainCell(this.dna, this.knowledge);
    console.log(`Brain cell divided! Copied ${this.knowledge.length} memories`);

    return newBrainCell;
  }

  learn(fact: string): void {
    this.knowledge.push(fact);
    console.log(`Brain cell learned: ${fact}`);
  }

  getKnowledge(): string[] {
    return [...this.knowledge];
  }
}
