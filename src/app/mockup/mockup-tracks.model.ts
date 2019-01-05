export class MockupTracks {
  public pikoNumber: string;
  public idNumber: number;
  public points: number[][];


  constructor (idNumber: number, pikoNumber: string, points)  {
    this.pikoNumber = pikoNumber;
    this.idNumber = idNumber;
    this.points = points;
  }
}
