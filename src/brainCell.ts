// brainCell.ts
// Brain cell that stores memories

import { Cell } from "./cell";

export class BrainCell extends Cell {
  public memories: string[];

  constructor(dna: string, memories: string[] = []) {
    super(dna);
    this.memories = [...memories];
  }

  // Brain cell copies itself and all its memories
  divide(): BrainCell {
    if (this.energy < 60) {
      throw new Error("Brain cell needs more energy!");
    }

    this.energy -= 40;
    this.age += 1;

    const newBrainCell = new BrainCell(this.dna, this.memories);
    console.log(`Brain cell divided! Copied ${this.memories.length} memories`);
    return newBrainCell;
  }

  learn(memory: string): void {
    this.memories.push(memory);
    console.log(`Brain cell learned: ${memory}`);
  }

  getMemories(): string[] {
    return [...this.memories];
  }
}
