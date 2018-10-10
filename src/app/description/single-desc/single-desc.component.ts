import { Component, OnInit, Input } from '@angular/core';

import { Tracks } from '../../shared/tracks.model';
import { TracksService } from '../../shared/tracks.service';

@Component({
  selector: 'app-single-desc',
  templateUrl: './single-desc.component.html',
  styleUrls: ['./single-desc.component.scss']
})

export class SingleDescComponent implements OnInit {
  @Input() track: Tracks;

  constructor() { }

  ngOnInit() {
  }

}
