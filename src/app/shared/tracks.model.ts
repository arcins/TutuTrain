export class Tracks {
  public name: string;
  public pikoNumber: string;
  public trackType: string;
  public description: string;
  public imagePath: string;

  constructor(name: string,
              pikoNumber: string,
              trackType: string,
              description: string,
              imagePath: string)  {
    this.name = name;
    this.pikoNumber = pikoNumber;
    this.trackType = trackType;
    this.description = description;
    this.imagePath = imagePath;
  }
}
