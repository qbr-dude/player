import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'player-player',
  imports: [],
  templateUrl: './player.html',
  styleUrl: './player.scss'
})
export class Player {
  readonly source = signal('');
  readonly type = signal('video/mp4');

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if(isPlatformBrowser(this.platformId)) {
      this.source.set(`${location.protocol}//${location.hostname}:3000/videos/test.mp4`);
    }
  }
}
