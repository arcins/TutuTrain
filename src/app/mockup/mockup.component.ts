import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mockup',
  templateUrl: './mockup.component.html',
  styleUrls: ['./mockup.component.scss']
})
export class MockupComponent implements OnInit {
  wasSelectedTrack: string;
  constructor() { }

  ngOnInit() {
  }
  navigateSelected(selectedTrack: string) {
    this.wasSelectedTrack=selectedTrack;
  }
}
