import { Component, OnInit, Input } from '@angular/core';

import { Tracks } from '../shared/tracks.model';
import { TracksService } from '../shared/tracks.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss']
})
export class DescriptionComponent implements OnInit {
  tracks: Tracks[];

  constructor(private tracksService: TracksService) { }

  ngOnInit() {
        this.tracks = this.tracksService.getTracks();
  }

}
