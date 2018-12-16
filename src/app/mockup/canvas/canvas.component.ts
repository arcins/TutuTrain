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

  //canvas
  cTracks;
  ctx;
  width;
  height;
  scale = 2;
  //buffer Canvas
  cTracksBuffer;
  ctxBuffer;
  cBackBuffer;
  ctxBack;

  //frame
  delay = 1000 / 30;
  time = 0;
  frame = -1;
  req;
  isPlaying = false;
  requestId;

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
    //buffer for mouse movement
    this.cTracksBuffer =  <HTMLCanvasElement> document.createElement('canvas');
    this.cTracksBuffer.width = this.cTracks.width;
    this.cTracksBuffer.height = this.cTracks.height;
    this.ctxBuffer = this.cTracksBuffer.getContext('2d');
    //buffer for background
    this.cBackBuffer =  <HTMLCanvasElement> document.createElement('canvas');
    this.cBackBuffer.width = this.cTracks.width;
    this.cBackBuffer.height = this.cTracks.height;
    this.ctxBack = this.cBackBuffer.getContext('2d');
    this.ctx.restore(); // restores the coordinate system back to (0,0)
    this.ctx.save();
    this.ctxBuffer.restore(); // restores the coordinate system back to (0,0)
    this.ctxBuffer.save();
    this.ctxBack.restore(); // restores the coordinate system back to (0,0)
    this.ctxBack.save();



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
    //const animLoop = new FpsCtrl(30, this.draw);
    this.start();
    //this.loop();
    this.cTracks.addEventListener("click", ($event) => {this.putTrack($event, this.newSelectedTrack)}, false);
  }

  draw() {
    this.cTracks.addEventListener("mousemove", ($event) => {this.moveMouseTrack($event, this.newSelectedTrack, this.ctxBuffer)}, false);
    //render the buffered canvas onto the original canvas element
    //this.ctx.drawImage(this.cTracksBuffer, 0, 0);
  }

  moveMouseTrack(e, trackType, canvas) {
    canvas.clearRect(0, 0, this.width, this.height);
    this.ctx.clearRect(0, 0, this.width, this.height);
    let rotate_glob = 0;
    if (trackType=='55201')	{
      this.torProsty(canvas, e.offsetX,e.offsetY, rotate_glob, this.scale, '#666');
    }
    if (trackType=='55212') {
      this.torLukowy(canvas, e.offsetX,e.offsetY, rotate_glob, this.scale);
      rotate_glob +=30;
    }
    this.ctxBuffer.drawImage(this.cBackBuffer, 0, 0);
    this.ctx.drawImage(this.cTracksBuffer, 0, 0);


  }

  putTrack(e, trackType) {
    //this.ctxBack.clearRect(0, 0, this.width, this.height);
    this.ctx.clearRect(0, 0, this.width, this.height);
    let rotate_glob = 0;
    if (trackType=='55201')	{
      this.torProsty(this.ctxBack, e.offsetX,e.offsetY, rotate_glob, this.scale, '#990066');
      this.mockupTracksService.addMockupTrack(trackType);
    }
    if (trackType=='55212') {
      this.torLukowy(this.ctxBack, e.offsetX,e.offsetY, rotate_glob, this.scale);
      rotate_glob +=30;
      this.mockupTracksService.addMockupTrack(trackType);
    }
    this.ctxBuffer.drawImage(this.cBackBuffer, 0, 0);
    this.ctx.drawImage(this.cTracksBuffer, 0, 0);
  }

  drawLukowy(canvas, x,y,trackR, trackAngle, beginAngle) {
    trackR=trackR/this.scale;
  	beginAngle;
  	x=x+trackR;
    let ctx = canvas;
    ctx.beginPath();
    ctx.arc(x,y,(trackR-((16.5/2)/this.scale)), this.radianAngle(180 + beginAngle), this.radianAngle(180 + trackAngle + beginAngle),false);
    ctx.arc(x,y,(trackR+((16.5/2)/this.scale)), this.radianAngle(180 + trackAngle + beginAngle), this.radianAngle(180 + beginAngle),true);
    ctx.lineTo((x-((trackR-(16.5/2)/this.scale))),y);

    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x,y,trackR, this.radianAngle(180 + beginAngle), this.radianAngle(180 + trackAngle + beginAngle),false);
    ctx.stroke();
  }

  torLukowy(canvas, pos_x, pos_y, rotate, scale) {
    let ctx = canvas;
    ctx.translate(Math.round(pos_x), Math.round(pos_y));
    ctx.rotate((rotate*Math.PI/180));
    ctx.moveTo(0,0) // this will actually be (250,50) in relation to the upper left corner
    this.drawLukowy(ctx, 0, 0, 545.63/scale, 30, 0);
    ctx.restore(); // restores the coordinate system back to (0,0)
    ctx.save();

  }

  torProsty(canvas, pos_x, pos_y, rotate,scale, color) {
    let ctx = canvas;
    ctx.translate(Math.round(pos_x), Math.round(pos_y)); // now the position (0,0) is found at (250,50)
    ctx.rotate(rotate*Math.PI/180); // rotate around the start point of your line
    ctx.moveTo(0,0) // this will actually be (250,50) in relation to the upper left corner
    ctx.strokeStyle = color;
    ctx.strokeRect(-8.25/scale, 0 , 16.5/scale, -239.07/scale); // (250,250)
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.restore(); // restores the coordinate system back to (0,0)
    ctx.save();
    let y2 = (239.07 * Math.sin(rotate)) + pos_y;
    let x2 = (239.07 * Math.cos(rotate)) + pos_x;
    //console.log(' x1 = ', pos_x, ' y1 = ', pos_y, 'rotate = ', rotate);
    //console.log(' x2 = ', x2, ' y2 = ', y2);
  }

  loop(timestamp) {
      if (this.time == 0) {
          this.time = timestamp;
      }
      let seg = Math.floor((timestamp - this.time) / this.delay);
      if (seg > this.frame) {
          this.frame = seg;

          this.draw(//{
              //time: timestamp,
              //frame: this.frame
          //}
          )
      }
      this.req = requestAnimationFrame(this.loop.bind(this))
  }

  start() {
      this.requestId = requestAnimationFrame(this.loop.bind(this))
  }

  pause() {
      cancelAnimationFrame(this.requestId)
  }


}
