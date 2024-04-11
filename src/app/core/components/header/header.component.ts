import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input({required:true}) userImg: string = ''
  @Input() username: string = ''
  @Output() signOutBtn = new EventEmitter()
  navList = ["Home","TV Shows","News & Popular","My List","Browse by Language"]

  signout(){
    this.signOutBtn.emit()
  }
  
}
