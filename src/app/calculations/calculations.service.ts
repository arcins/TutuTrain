import { Calculations } from './calculations.model';


export class CalculationsService {
  //hardcoded sample tracks. In future will be loaded by JSON
  private calculations: Calculations[] = [
    new Calculations('55201', 6),
    new Calculations('55212', 8)
  ];

  constructor() { }

  getCalculations() {
    return this.calculations.slice();
  }
}
