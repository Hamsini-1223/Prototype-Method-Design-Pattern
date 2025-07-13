// BiologyLab.ts
// Demo showing how cells divide themselves

import { Cell } from "./Cell";
import { BloodCell, BrainCell } from "./SpecializedCells";
import { CellFactory } from "./CellFactory";

export class BiologyLab {
  private cells: Cell[];
  private factory: CellFactory;

  constructor() {
    this.cells = [];
    this.factory = new CellFactory();
  }

  // Start with some initial cells
  startExperiment(): void {
    console.log("🧪 Starting Biology Lab Experiment");
    console.log("Creating initial cells from prototypes...\n");

    // Get copies of different cell types
    this.cells.push(this.factory.getCellCopy("basic"));
    this.cells.push(this.factory.getCellCopy("blood"));
    this.cells.push(this.factory.getCellCopy("brain"));

    console.log("Initial cells created:");
    this.cells.forEach((cell) => console.log("  " + cell.getInfo()));
  }

  // Let cells grow and divide
  simulateGrowth(): void {
    console.log("\n🌱 Simulating cell growth and division...\n");

    const newCells: Cell[] = [];

    for (const cell of this.cells) {
      // Cells grow (gain energy)
      cell.grow();
      cell.grow(); // Grow twice

      try {
        // Cell divides itself - this is the Prototype pattern in action!
        const newCell = cell.divide();
        newCells.push(newCell);

        // Special behavior for different cell types
        if (cell instanceof BloodCell) {
          (cell as BloodCell).carryOxygen(30);
        }

        if (cell instanceof BrainCell) {
          (cell as BrainCell).learn("I can divide myself!");
        }
      } catch (error) {
        console.log(`❌ ${error}`);
      }
    }

    // Add new cells to our collection
    this.cells.push(...newCells);

    console.log(`\nAfter division - Total cells: ${this.cells.length}`);
    this.cells.forEach((cell) => console.log("  " + cell.getInfo()));
  }

  // Show final results
  showResults(): void {
    console.log("\n📊 Experiment Results:");
    console.log(`Total cells: ${this.cells.length}`);

    const bloodCells = this.cells.filter((c) => c instanceof BloodCell);
    const brainCells = this.cells.filter((c) => c instanceof BrainCell);
    const basicCells = this.cells.filter(
      (c) => !(c instanceof BloodCell) && !(c instanceof BrainCell)
    );

    console.log(`- Basic cells: ${basicCells.length}`);
    console.log(`- Blood cells: ${bloodCells.length}`);
    console.log(`- Brain cells: ${brainCells.length}`);

    // Show that brain cells copied their knowledge
    if (brainCells.length > 0) {
      const brainCell = brainCells[0] as BrainCell;
      console.log(
        `\nBrain cell knowledge: ${brainCell.getKnowledge().join(", ")}`
      );
    }
  }
}
