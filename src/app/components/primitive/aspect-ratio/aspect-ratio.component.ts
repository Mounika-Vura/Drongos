 
import { Component, HostListener, Input, OnInit } from '@angular/core';
 
@Component({
  selector: 'app-aspect-ratio',
  templateUrl: './aspect-ratio.component.html',
  styleUrls: ['./aspect-ratio.component.scss']
})
export class AspectRatioComponent implements OnInit {
 
  showEditInputs: boolean = false;
  @Input() size!: { w: number, h: number };
  constructor() { }
 
  ngOnInit(): void {
    this.getViewportDimensions();
  }
 
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.getViewportDimensions();
  }
 
  private getViewportDimensions() {
    this.size.w = window.innerWidth;
    this.size.h = window.innerHeight;
  }
 
  toggleEdit() {
    this.showEditInputs = !this.showEditInputs;
  }
 
  applyChanges() {
    window.resizeTo(this.size.w, this.size.h);
  }
}
 