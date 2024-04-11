import { Component, Input, OnChanges, inject , SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnChanges {
  @Input({required:true})  bannerTitle: string = ''
  @Input() bannerOverview: string = ''
  @Input() bannerVideoKey:any = "_inKs4eeHiI"
  test: string = this.bannerVideoKey[0].key
  
  
  private sanitizer = inject(DomSanitizer)
   videoUrl: any = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.bannerVideoKey}?autoplay=1&mute=1&loop=1&controls=0`)
  
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['bannerVideoKey']){
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.bannerVideoKey}?autoplay=1&mute=1&loop=1&controls=0`);
    }
  }

  
}
