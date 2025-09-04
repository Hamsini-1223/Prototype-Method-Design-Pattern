// cellFactory.ts
// Factory that stores cell templates

import { Cell } from "./cell";
import { BloodCell } from "./bloodCell";
import { BrainCell } from "./brainCell";

export class CellFactory {
  private templates: Map<string, Cell>;

  constructor() {
    this.templates = new Map();
    this.setupTemplates();
  }

  private setupTemplates(): void {
    // Create template cells
    const basicCell = new Cell("HUMAN_DNA");
    const bloodCell = new BloodCell("HUMAN_DNA", 50);
    const brainCell = new BrainCell("HUMAN_DNA", ["Memory 1", "Memory 2"]);

    this.templates.set("basic", basicCell);
    this.templates.set("blood", bloodCell);
    this.templates.set("brain", brainCell);
  }

  // Get copy of template by using its divide method
  getCell(type: string): Cell | null {
    const template = this.templates.get(type);
    if (!template) {
      return null;
    }

    template.grow(); // Give energy
    return template.divide(); // Use prototype's divide method
  }

  getTypes(): string[] {
    return Array.from(this.templates.keys());
  }
}
