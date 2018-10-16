import { Calculations } from './calculations.model';


export class CalculationsService {
  //hardcoded sample tracks. In future will be loaded by JSON
  private calculations: Calculations[] = [
    new Calculations('55201', 6.90),
    new Calculations('55212', 7.90)
  ];

  constructor() { }

  getCalculations() {
    return this.calculations.slice();
  }
}
