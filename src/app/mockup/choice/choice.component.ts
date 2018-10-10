import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Tracks } from '../../shared/tracks.model';
import { TracksService } from '../../shared/tracks.service';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnInit {
  @Output() onSelectedTrack = new EventEmitter<string>();
  tracks: Tracks[];
  selectedTrack: string;

  constructor(private tracksService: TracksService) { }

  ngOnInit() {
    this.tracks = this.tracksService.getTracks();
    this.selectedTrack="55201";
  }
  onSelected(selectedTrack: string) {
    this.selectedTrack=selectedTrack;
    this.onSelectedTrack.emit(selectedTrack);

  }

}
