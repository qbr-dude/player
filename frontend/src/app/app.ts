import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Video } from "../widgets/video/video";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Video],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'frontend';
}
