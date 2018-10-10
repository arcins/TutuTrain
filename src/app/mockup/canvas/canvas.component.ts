import { Component, OnInit, Input } from '@angular/core';

import { MockupTracks } from '../mockup-tracks.model';
import { MockupTracksService } from '../mockup-tracks.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  @Input() newSelectedTrack: string;
  mockupTracks: MockupTracks[];
  constructor(private mockupTracksService: MockupTracksService) {}

  ngOnInit() {
    this.mockupTracks = this.mockupTracksService.getMockupTracks();
    this.newSelectedTrack = '55201';
  }
  addToMockup() {
    this.mockupTracksService.addMockupTrack(this.newSelectedTrack);
  }
  deleteFromMockup(idNumber: number) {
    this.mockupTracksService.deleteFromMockupTrack(idNumber);
  }
}
