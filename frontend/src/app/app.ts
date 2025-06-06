import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Player } from "../widgets/player/player";

@Component({
  selector: 'app-root',
  imports: [Player],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'frontend';
}
