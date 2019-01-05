import { EventEmitter } from '@angular/core';
import { MockupTracks } from './mockup-tracks.model';


export class MockupTracksService {
  //hardcoded sample tracks. In future will be loaded by JSON
  private mockupTracks: MockupTracks[] = [];
  idNumber: number=0;

  constructor() { }

  getMockupTracks() {
    return this.mockupTracks;
  }
  addMockupTrack(newTrack: string, points) {
    this.idNumber++;
    this.mockupTracks.push(new MockupTracks(this.idNumber, newTrack, points));
  }
  deleteFromMockupTrack(idTrack: number) {
//    this.mockupTracks.splice(this.mockupTracks.indexOf(idTrack), 1);
    for (var i = this.mockupTracks.length - 1; i >= 0; --i) {
      if (this.mockupTracks[i].idNumber == idTrack) {
        this.mockupTracks.splice(i,1);
      }
    }
  }
}
