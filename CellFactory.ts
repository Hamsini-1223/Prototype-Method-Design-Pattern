// CellFactory.ts
// Registry that stores prototype cells for easy cloning

import { Cell } from "./Cell";
import { BloodCell, BrainCell } from "./SpecializedCells";

export class CellFactory {
  private prototypes: Map<string, Cell>;

  constructor() {
    this.prototypes = new Map();
    this.setupBasicCells();
  }

  private setupBasicCells(): void {
    // Create template cells that we can clone later
    const basicCell = new Cell("HUMAN_DNA");
    const bloodCell = new BloodCell("HUMAN_DNA", 50);
    const smartBrainCell = new BrainCell("HUMAN_DNA", ["2+2=4", "sky is blue"]);

    this.prototypes.set("basic", basicCell);
    this.prototypes.set("blood", bloodCell);
    this.prototypes.set("brain", smartBrainCell);
  }

  // Get a copy of stored prototype
  getCellCopy(type: string): Cell {
    const prototype = this.prototypes.get(type);
    if (!prototype) {
      throw new Error(`No prototype found for type: ${type}`);
    }

    // Use the cell's own divide method to create copy
    prototype.grow(); // Give it energy first
    return prototype.divide();
  }

  // Add new prototype
  addPrototype(name: string, cell: Cell): void {
    this.prototypes.set(name, cell);
    console.log(`Added new prototype: ${name}`);
  }

  listPrototypes(): string[] {
    return Array.from(this.prototypes.keys());
  }
}
