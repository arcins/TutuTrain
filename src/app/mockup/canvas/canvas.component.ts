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

  cTracks;
  ctx;
  width;
  height;
  scale = 2;

  constructor(private mockupTracksService: MockupTracksService) {}

  ngOnInit() {
    this.mockupTracks = this.mockupTracksService.getMockupTracks();
    this.newSelectedTrack = '55201';
  }

  ngAfterViewInit() {
    this.cTracks = <HTMLCanvasElement> document.getElementById('tutu-tracks');
    this.ctx = this.cTracks.getContext('2d');
    this.width = this.cTracks.width;
    this.height = this.cTracks.height;
    this.ctx.restore(); // restores the coordinate system back to (0,0)
    this.ctx.save();

    this.canvasLoop();
  }

  addToMockup() {
    this.mockupTracksService.addMockupTrack(this.newSelectedTrack);
  }

  deleteFromMockup(idNumber: number) {
    this.mockupTracksService.deleteFromMockupTrack(idNumber);
  }

  radianAngle(angle) {
      return (Math.PI/180)*angle;
  }

  //main canvas loop
  canvasLoop () {
    this.cTracks.addEventListener("click", ($event) => {this.putTrack($event, this.newSelectedTrack)}, false);
  }

  putTrack(e, trackType) {
    let rotate_glob = 0;
    if (trackType=='55201')	{
      this.torProsty(e.offsetX,e.offsetY, rotate_glob, this.scale);
      this.mockupTracksService.addMockupTrack(trackType);
    }
    if (trackType=='55212') {
      this.torLukowy(e.offsetX,e.offsetY, rotate_glob, this.scale);
      rotate_glob +=30;
      this.mockupTracksService.addMockupTrack(trackType);
    }
  }
  drawLukowy(x,y,trackR, trackAngle, beginAngle) {
    trackR=trackR/this.scale;
  	beginAngle;
  	x=x+trackR;
    let ctx = this.ctx;
    ctx.beginPath();
    ctx.arc(x,y,(trackR-((16.5/2)/this.scale)), this.radianAngle(180 + beginAngle), this.radianAngle(180 + trackAngle + beginAngle),false);
    ctx.arc(x,y,(trackR+((16.5/2)/this.scale)), this.radianAngle(180 + trackAngle + beginAngle), this.radianAngle(180 + beginAngle),true);
    ctx.lineTo((x-((trackR-(16.5/2)/this.scale))),y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x,y,trackR, this.radianAngle(180 + beginAngle), this.radianAngle(180 + trackAngle + beginAngle),false);
    ctx.stroke();
  }

  torLukowy(pos_x, pos_y, rotate, scale) {
    let ctx = this.ctx;
    ctx.translate(Math.round(pos_x), Math.round(pos_y));
    ctx.rotate((rotate*Math.PI/180));
    ctx.moveTo(0,0) // this will actually be (250,50) in relation to the upper left corner
    this.drawLukowy(0, 0, 545.63/scale, 30, 0);
    ctx.restore(); // restores the coordinate system back to (0,0)
    ctx.save();

  }

  torProsty(pos_x, pos_y, rotate,scale) {
    let ctx = this.ctx;
    ctx.translate(Math.round(pos_x), Math.round(pos_y)); // now the position (0,0) is found at (250,50)
    ctx.rotate(rotate*Math.PI/180); // rotate around the start point of your line
    ctx.moveTo(0,0) // this will actually be (250,50) in relation to the upper left corner
    ctx.strokeRect(-8.25/scale, 0 , 16.5/scale, -239.07/scale); // (250,250)
    ctx.stroke();
    ctx.restore(); // restores the coordinate system back to (0,0)
    ctx.save();
    let y2 = (239.07 * Math.sin(rotate)) + pos_y;
    let x2 = (239.07 * Math.cos(rotate)) + pos_x;
    console.log(' x1 = ', pos_x, ' y1 = ', pos_y, 'rotate = ', rotate);
    console.log(' x2 = ', x2, ' y2 = ', y2);
  }



}
