// lab.ts
// Simple interactive lab

import * as readline from "readline-sync";
import { Cell } from "./cell";
import { BloodCell } from "./bloodCell";
import { BrainCell } from "./brainCell";
import { CellFactory } from "./cellFactory";

export class Lab {
  private cells: Cell[] = [];
  private factory = new CellFactory();

  start(): void {
    console.log("Welcome to Cell Division Lab!");

    while (true) {
      this.showMenu();
      const choice = readline.question("Choose (1-5): ");

      if (choice === "1") this.createCell();
      else if (choice === "2") this.divideCell();
      else if (choice === "3") this.teachBrainCell();
      else if (choice === "4") this.showCells();
      else if (choice === "5") break;
      else console.log("Invalid choice!");

      readline.question("\nPress Enter...");
      console.clear();
    }

    console.log("Thanks for using Cell Division Lab!");
  }

  private showMenu(): void {
    console.log("\n=== CELL LAB ===");
    console.log("1. Create Cell");
    console.log("2. Divide Cell");
    console.log("3. Teach Brain Cell");
    console.log("4. Show All Cells");
    console.log("5. Exit");
    console.log(`\nCells in lab: ${this.cells.length}`);
  }

  private createCell(): void {
    const types = this.factory.getTypes();
    console.log("\nCell types:");
    types.forEach((type, i) => console.log(`${i + 1}. ${type}`));

    const choice = readline.question("Choose type: ");
    const index = parseInt(choice) - 1;

    if (index >= 0 && index < types.length) {
      const cell = this.factory.getCell(types[index]);
      if (cell) {
        this.cells.push(cell);
        console.log(`Created ${types[index]} cell: ${cell.getId()}`);
      }
    }
  }

  private divideCell(): void {
    if (this.cells.length === 0) {
      console.log("No cells to divide!");
      return;
    }

    console.log("\nCells:");
    this.cells.forEach((cell, i) => console.log(`${i + 1}. ${cell.getInfo()}`));

    const choice = readline.question("Choose cell: ");
    const index = parseInt(choice) - 1;

    if (index >= 0 && index < this.cells.length) {
      try {
        const cell = this.cells[index];
        if (cell.energy < 50) {
          cell.grow();
          console.log("Cell grew stronger!");
        }
        const newCell = cell.divide();
        this.cells.push(newCell);
        console.log("Division successful!");
      } catch (error) {
        console.log("Division failed: " + (error as Error).message);
      }
    }
  }

  private teachBrainCell(): void {
    const brainCells = this.cells.filter(
      (c) => c instanceof BrainCell
    ) as BrainCell[];

    if (brainCells.length === 0) {
      console.log("No brain cells found!");
      return;
    }

    console.log("\nBrain cells:");
    brainCells.forEach((cell, i) => {
      console.log(
        `${i + 1}. ${cell.getId()} - Memories: ${cell.getMemories().join(", ")}`
      );
    });

    const choice = readline.question("Choose brain cell: ");
    const index = parseInt(choice) - 1;

    if (index >= 0 && index < brainCells.length) {
      const memory = readline.question("What to teach? ");
      brainCells[index].learn(memory);
    }
  }

  private showCells(): void {
    if (this.cells.length === 0) {
      console.log("No cells in lab!");
      return;
    }

    console.log("\nAll cells:");
    this.cells.forEach((cell, i) => {
      let type = "Basic";
      if (cell instanceof BloodCell) type = "Blood";
      if (cell instanceof BrainCell) type = "Brain";
      console.log(`${i + 1}. [${type}] ${cell.getInfo()}`);
    });
  }
}
