import { EventEmitter } from '@angular/core';
import { Tracks } from './tracks.model';


export class TracksService {
  //hardcoded sample tracks. In future will be loaded by JSON
  private tracks: Tracks[] = [
    new Tracks('G231', '55201', 'tor prosty',
      'Tor prosty G231, długość 230,93 mm, G231 + G239 dają moduł o długości 470,0 mm',
      '../assets/tracks/G231_55201.jpg')
    ,
    new Tracks('R2', '55212', 'tor łukowy',
      'Tor łukowy R2, r = 421,88 mm/30°, 12 sztuk/koło',
      '../assets/tracks/R2_55212.jpg')
  ];

  constructor() { }

  getTracks() {
    return this.tracks.slice();
  }
}
