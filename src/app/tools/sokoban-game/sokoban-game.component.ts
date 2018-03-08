import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Game } from './sokoban-models';

@Component({
  selector: 'app-sokoban-game',
  templateUrl: './sokoban-game.component.html',
  styleUrls: ['./sokoban-game.component.scss']
})
export class SokobanGameComponent implements OnInit {

  @ViewChild('game') canvasRef: ElementRef;

  constructor(private ngZone: NgZone) {
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => this.paint());
  }

  paint() {
    const game = new Game();
    game.run(this.canvasRef);
  }
}
