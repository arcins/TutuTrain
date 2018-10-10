import { Component, OnInit } from '@angular/core';

import { Calculations } from './calculations.model';
import { CalculationsService } from './calculations.service';
import { MockupTracks } from '../mockup/mockup-tracks.model';
import { MockupTracksService } from '../mockup/mockup-tracks.service';

@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  providers: [CalculationsService],
  styleUrls: ['./calculations.component.scss']
})
export class CalculationsComponent implements OnInit {
  mockupTracks: MockupTracks[];
  calculates: Calculations[];
  constructor(private mockupTracksService: MockupTracksService,
              private calculationsService: CalculationsService) { }

  ngOnInit() {
    this.mockupTracks = this.mockupTracksService.getMockupTracks();
    this.calculateTracksPrice();
  }

  calculateTracksPrice() {
    for (var i = this.mockupTracks.length - 1; i >= 0; --i) {
      //this.calculationsService.this.mockupTracks.pikoNumber
    }
  }
}
