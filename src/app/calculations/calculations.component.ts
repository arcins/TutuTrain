import { Component, OnInit } from '@angular/core';

import { Calculations } from './calculations.model';
import { CalculationsService } from './calculations.service';
import { MockupTracks } from '../mockup/mockup-tracks.model';
import { MockupTracksService } from '../mockup/mockup-tracks.service';
import { Tracks } from '../shared/tracks.model';
import { TracksService } from '../shared/tracks.service';

@Component({
  selector: 'app-calculations',
  templateUrl: './calculations.component.html',
  providers: [CalculationsService],
  styleUrls: ['./calculations.component.scss']
})
export class CalculationsComponent implements OnInit {
  mockupTracks: MockupTracks[];
  tracks: Tracks[];
  calculates: Calculations[];
  sumOfTracks: number = 0;
  priceOfTrack: {id: number, price: number}[];
  constructor(private mockupTracksService: MockupTracksService,
              private calculationsService: CalculationsService,
              private tracksService: TracksService) { }

  ngOnInit() {
    this.mockupTracks = this.mockupTracksService.getMockupTracks();
    this.calculates = this.calculationsService.getCalculations();
    this.tracks = this.tracksService.getTracks();
    this.calculateTracksPrice();
  }

  calculateTracksPrice() {
    this.sumOfTracks=0;
    this.priceOfTrack=[];
    for (var i = this.mockupTracks.length - 1; i >= 0; --i) {
      for (var j = this.calculates.length - 1; j >= 0; --j) {
        if (this.calculates[j].pikoNumber==this.mockupTracks[i].pikoNumber) {
          for (var k = this.tracks.length - 1; k >= 0; --k) {
            if (this.tracks[k].pikoNumber==this.mockupTracks[i].pikoNumber) {
              this.priceOfTrack.push({id: k,
                                      price: this.calculates[j].price});
            }
          }

          this.sumOfTracks
            = ((this.sumOfTracks*10)+(this.calculates[j].price*10))/10;
        };
      }
    }
  }
}
