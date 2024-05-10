// zoom-scroll.directive.ts
import { Directive, ElementRef, HostListener, Input } from "@angular/core"
 
@Directive({
  selector: '[appZoom]',
})
export class ZoomScrollDirective {
  @Input() zoomStep = 0.1;
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  private offsetX = 0;
  private offsetY = 0;
  private maxX = 0;
  private maxY = 0;
  private minZoom = 0.8;
  private maxZoom = 8;
 
  constructor(private elementRef: ElementRef) {}
 
  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = Math.sign(event.deltaY) * this.zoomStep;
    const zoom = this.getCurrentZoom() + delta;
    this.setZoom(zoom);
  }
 
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    event.preventDefault();
    this.isDragging = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    this.offsetX = rect.left;
this.offsetY = rect.top;
    this.maxX = rect.width - this.elementRef.nativeElement.offsetWidth;
    this.maxY = rect.height - this.elementRef.nativeElement.offsetHeight;
  }
 
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      let newLeft = mouseX - this.startX + this.offsetX;
      let newTop = mouseY - this.startY + this.offsetY;
 
      newLeft = Math.max(Math.min(newLeft, this.maxX), 0);
      newTop = Math.max(Math.min(newTop, this.maxY), 0);
 
this.elementRef.nativeElement.style.left = newLeft + 'px';
this.elementRef.nativeElement.style.top = newTop + 'px';
    }
  }
 
  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    this.isDragging = false;
  }
 
  private getCurrentZoom(): number {
const currentTransform = this.elementRef.nativeElement.style.transform;
    const regex = /scale\((\d+(?:\.\d+)?)\)/;
    const match = currentTransform.match(regex);
    return match ? parseFloat(match[1]) : 1;
  }
 
  private setZoom(zoom: number): void {
    const clampedZoom = Math.min(Math.max(zoom, this.minZoom), this.maxZoom);
this.elementRef.nativeElement.style.transform = `scale(${clampedZoom})`;
  }
}