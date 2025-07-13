// InteractiveLab.ts
// Interactive console interface for cell division simulation

import * as readline from "readline-sync";
import { Cell } from "./Cell";
import { BloodCell, BrainCell } from "./SpecializedCells";
import { CellFactory } from "./CellFactory";

export class InteractiveLab {
  private cells: Cell[];
  private factory: CellFactory;
  private running: boolean;

  constructor() {
    this.cells = [];
    this.factory = new CellFactory();
    this.running = true;
  }

  // Main menu loop
  start(): void {
    console.log("🧬 Welcome to the Interactive Cell Division Lab!");
    console.log("=====================================");
    console.log("Experience the Prototype Design Pattern in action!\n");

    while (this.running) {
      this.showMenu();
      const choice = readline.question("\nEnter your choice (1-8): ");
      this.handleChoice(choice);

      if (this.running) {
        readline.question("\nPress Enter to continue...");
        console.clear();
      }
    }
  }

  private showMenu(): void {
    console.log("\n📋 CELL LAB MENU");
    console.log("================");
    console.log("1. 🔬 Create Cell from Prototype");
    console.log("2. 🌱 Make Cell Divide");
    console.log("3. 💪 Help Cell Grow");
    console.log("4. 📊 View All Cells");
    console.log("5. 🧠 Teach Brain Cell");
    console.log("6. 🩸 Give Oxygen to Blood Cell");
    console.log("7. 🏭 Manage Prototypes");
    console.log("8. 🚪 Exit Lab");

    if (this.cells.length > 0) {
      console.log(`\n📈 Current cells in lab: ${this.cells.length}`);
    }
  }

  private handleChoice(choice: string): void {
    switch (choice.trim()) {
      case "1":
        this.createCellFromPrototype();
        break;
      case "2":
        this.divideCellInteractive();
        break;
      case "3":
        this.growCellInteractive();
        break;
      case "4":
        this.viewAllCells();
        break;
      case "5":
        this.teachBrainCell();
        break;
      case "6":
        this.giveOxygenToBloodCell();
        break;
      case "7":
        this.managePrototypes();
        break;
      case "8":
        this.exitLab();
        break;
      default:
        console.log("❌ Invalid choice! Please enter 1-8.");
    }
  }

  private createCellFromPrototype(): void {
    console.log("\n🔬 CREATE NEW CELL");
    console.log("==================");

    const prototypes = this.factory.listPrototypes();
    console.log("Available cell prototypes:");
    prototypes.forEach((type, index) => {
      console.log(`${index + 1}. ${type}`);
    });

    const choice = readline.question(
      `\nChoose prototype (1-${prototypes.length}): `
    );
    const index = parseInt(choice) - 1;

    if (index >= 0 && index < prototypes.length) {
      const cellType = prototypes[index];
      try {
        const newCell = this.factory.getCellCopy(cellType);
        this.cells.push(newCell);
        console.log(`\n✅ Successfully created ${cellType} cell!`);
        console.log(`📋 ${newCell.getInfo()}`);
      } catch (error) {
        console.log(`❌ Failed to create cell: ${error}`);
      }
    } else {
      console.log("❌ Invalid choice!");
    }
  }

  private divideCellInteractive(): void {
    console.log("\n🌱 CELL DIVISION");
    console.log("================");

    if (this.cells.length === 0) {
      console.log("❌ No cells in the lab! Create some cells first.");
      return;
    }

    this.showCellList();
    const choice = readline.question(
      `\nChoose cell to divide (1-${this.cells.length}): `
    );
    const index = parseInt(choice) - 1;

    if (index >= 0 && index < this.cells.length) {
      const cell = this.cells[index];
      console.log(`\n🔍 Selected: ${cell.getInfo()}`);

      if (cell.energy < 50) {
        console.log("⚠️  Cell doesn't have enough energy to divide!");
        const grow = readline.question(
          "Would you like to help it grow first? (y/n): "
        );
        if (grow.toLowerCase() === "y") {
          cell.grow();
          cell.grow();
          console.log("💪 Cell has grown stronger!");
        }
      }

      try {
        const newCell = cell.divide();
        this.cells.push(newCell);
        console.log("\n🎉 Division successful!");
        console.log(`👶 New cell: ${newCell.getInfo()}`);
        console.log(`👴 Parent cell: ${cell.getInfo()}`);
      } catch (error) {
        console.log(`❌ Division failed: ${error}`);
      }
    } else {
      console.log("❌ Invalid cell number!");
    }
  }

  private growCellInteractive(): void {
    console.log("\n💪 HELP CELL GROW");
    console.log("==================");

    if (this.cells.length === 0) {
      console.log("❌ No cells in the lab! Create some cells first.");
      return;
    }

    this.showCellList();
    const choice = readline.question(
      `\nChoose cell to help grow (1-${this.cells.length}): `
    );
    const index = parseInt(choice) - 1;

    if (index >= 0 && index < this.cells.length) {
      const cell = this.cells[index];
      console.log(`\n🔍 Before: ${cell.getInfo()}`);

      cell.grow();
      console.log(`✅ After:  ${cell.getInfo()}`);
      console.log("🌱 Cell has grown stronger and older!");
    } else {
      console.log("❌ Invalid cell number!");
    }
  }

  private viewAllCells(): void {
    console.log("\n📊 ALL CELLS IN LAB");
    console.log("===================");

    if (this.cells.length === 0) {
      console.log("🔬 Lab is empty! No cells found.");
      return;
    }

    console.log(`Total cells: ${this.cells.length}\n`);

    const basicCells = this.cells.filter(
      (c) => !(c instanceof BloodCell) && !(c instanceof BrainCell)
    );
    const bloodCells = this.cells.filter((c) => c instanceof BloodCell);
    const brainCells = this.cells.filter((c) => c instanceof BrainCell);

    if (basicCells.length > 0) {
      console.log("🔹 Basic Cells:");
      basicCells.forEach((cell, i) =>
        console.log(`   ${i + 1}. ${cell.getInfo()}`)
      );
    }

    if (bloodCells.length > 0) {
      console.log("\n🩸 Blood Cells:");
      bloodCells.forEach((cell, i) => {
        const bloodCell = cell as BloodCell;
        console.log(
          `   ${i + 1}. ${cell.getInfo()} | O2: ${bloodCell.oxygenLevel}`
        );
      });
    }

    if (brainCells.length > 0) {
      console.log("\n🧠 Brain Cells:");
      brainCells.forEach((cell, i) => {
        const brainCell = cell as BrainCell;
        console.log(`   ${i + 1}. ${cell.getInfo()}`);
        console.log(`      Knowledge: ${brainCell.getKnowledge().join(", ")}`);
      });
    }
  }

  private teachBrainCell(): void {
    console.log("\n🧠 TEACH BRAIN CELL");
    console.log("===================");

    const brainCells = this.cells.filter(
      (c) => c instanceof BrainCell
    ) as BrainCell[];

    if (brainCells.length === 0) {
      console.log("❌ No brain cells in the lab! Create a brain cell first.");
      return;
    }

    console.log("Available brain cells:");
    brainCells.forEach((cell, index) => {
      console.log(
        `${index + 1}. Cell ${cell.getId()} - Knowledge: ${cell
          .getKnowledge()
          .join(", ")}`
      );
    });

    const choice = readline.question(
      `\nChoose brain cell (1-${brainCells.length}): `
    );
    const index = parseInt(choice) - 1;

    if (index >= 0 && index < brainCells.length) {
      const brainCell = brainCells[index];
      const knowledge = readline.question("What would you like to teach? ");

      if (knowledge.trim()) {
        brainCell.learn(knowledge);
        console.log(`✅ Brain cell learned: "${knowledge}"`);
      } else {
        console.log("❌ Please enter some knowledge to teach!");
      }
    } else {
      console.log("❌ Invalid brain cell number!");
    }
  }

  private giveOxygenToBloodCell(): void {
    console.log("\n🩸 GIVE OXYGEN TO BLOOD CELL");
    console.log("============================");

    const bloodCells = this.cells.filter(
      (c) => c instanceof BloodCell
    ) as BloodCell[];

    if (bloodCells.length === 0) {
      console.log("❌ No blood cells in the lab! Create a blood cell first.");
      return;
    }

    console.log("Available blood cells:");
    bloodCells.forEach((cell, index) => {
      console.log(
        `${index + 1}. Cell ${cell.getId()} - O2 Level: ${cell.oxygenLevel}/100`
      );
    });

    const choice = readline.question(
      `\nChoose blood cell (1-${bloodCells.length}): `
    );
    const index = parseInt(choice) - 1;

    if (index >= 0 && index < bloodCells.length) {
      const bloodCell = bloodCells[index];
      const amount = readline.question("How much oxygen to give (1-50)? ");
      const oxygenAmount = parseInt(amount);

      if (oxygenAmount > 0 && oxygenAmount <= 50) {
        bloodCell.carryOxygen(oxygenAmount);
        console.log(
          `✅ Blood cell now carrying ${bloodCell.oxygenLevel}/100 oxygen!`
        );
      } else {
        console.log("❌ Please enter a valid amount (1-50)!");
      }
    } else {
      console.log("❌ Invalid blood cell number!");
    }
  }

  private managePrototypes(): void {
    console.log("\n🏭 PROTOTYPE MANAGEMENT");
    console.log("======================");

    const prototypes = this.factory.listPrototypes();
    console.log("Current prototypes:");
    prototypes.forEach((type, index) => {
      console.log(`${index + 1}. ${type}`);
    });

    console.log("\nOptions:");
    console.log("1. Add custom prototype");
    console.log("2. View prototype details");
    console.log("3. Go back");

    const choice = readline.question("\nChoose option (1-3): ");

    switch (choice) {
      case "1":
        this.addCustomPrototype();
        break;
      case "2":
        this.viewPrototypeDetails();
        break;
      case "3":
        break;
      default:
        console.log("❌ Invalid choice!");
    }
  }

  private addCustomPrototype(): void {
    console.log("\n➕ ADD CUSTOM PROTOTYPE");
    console.log("======================");

    const name = readline.question("Enter prototype name: ");
    const dna = readline.question("Enter DNA sequence: ");

    console.log("Choose cell type:");
    console.log("1. Basic Cell");
    console.log("2. Blood Cell");
    console.log("3. Brain Cell");

    const typeChoice = readline.question("Enter choice (1-3): ");

    try {
      let newCell: Cell;

      switch (typeChoice) {
        case "1":
          newCell = new Cell(dna);
          break;
        case "2":
          const oxygen = parseInt(
            readline.question("Initial oxygen level (0-100): ") || "0"
          );
          newCell = new BloodCell(dna, oxygen);
          break;
        case "3":
          const knowledge = readline.question(
            "Initial knowledge (comma-separated): "
          );
          const knowledgeArray = knowledge
            ? knowledge.split(",").map((k) => k.trim())
            : [];
          newCell = new BrainCell(dna, knowledgeArray);
          break;
        default:
          console.log("❌ Invalid cell type!");
          return;
      }

      this.factory.addPrototype(name, newCell);
      console.log(`✅ Added prototype "${name}" successfully!`);
    } catch (error) {
      console.log(`❌ Failed to add prototype: ${error}`);
    }
  }

  private viewPrototypeDetails(): void {
    const prototypes = this.factory.listPrototypes();
    const choice = readline.question(
      `\nChoose prototype to view (1-${prototypes.length}): `
    );
    const index = parseInt(choice) - 1;

    if (index >= 0 && index < prototypes.length) {
      const prototypeName = prototypes[index];
      console.log(`\n📋 Prototype: ${prototypeName}`);
      console.log("Details: This is a template cell ready for cloning");
    } else {
      console.log("❌ Invalid prototype number!");
    }
  }

  private showCellList(): void {
    console.log("Cells in lab:");
    this.cells.forEach((cell, index) => {
      let type = "Basic";
      if (cell instanceof BloodCell) type = "Blood";
      if (cell instanceof BrainCell) type = "Brain";
      console.log(`${index + 1}. [${type}] ${cell.getInfo()}`);
    });
  }

  private exitLab(): void {
    console.log("\n🎯 Lab Session Complete!");
    console.log("========================");
    console.log(`Final Results:`);
    console.log(`- Total cells created: ${this.cells.length}`);
    console.log(`- Prototype pattern demonstrated: ✅`);
    console.log(`- Cells learned to divide themselves: ✅`);
    console.log("\nThanks for exploring the Prototype Design Pattern! 🧬");
    this.running = false;
  }
}
