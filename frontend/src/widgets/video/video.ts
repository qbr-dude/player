import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';

@Component({
  selector: 'player-video',
  imports: [],
  templateUrl: './video.html',
  styleUrl: './video.scss'
})
export class Video implements OnInit {
  readonly source = signal('');

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)) {
      this.source.set(`${location.protocol}//${location.hostname}:3000/videos/test.mp4`);
    }
  }
}
