import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, ViewChild, OnChanges, SimpleChanges, ChangeDetectorRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { EmptyBoxLayoutComponent } from '../layouts/empty-box-layout/empty-box-layout.component';
import { TwoColumnLayoutComponent } from '../layouts/two-column-layout/two-column-layout.component';

export type ResizeAnchorType =
  | 'top'
  | 'left'
  | 'bottom'
  | 'right';

export type ResizeDirectionType =
  | 'x'
  | 'y'
  | 'xy';

@Component({
  selector: 'app-frame-component',
  templateUrl: './frame-component.component.html',
  styleUrls: ['./frame-component.component.scss']
})
export class FrameComponentComponent implements OnChanges {

  @Input() selectedIcon!: string; 
  @Input() groupButton!: { viewName: string, width: number, height: number }[];
  @ViewChild('resizeCorner') resizeCornerRef!: ElementRef;
  @ViewChild('wrapper') wrapperRef!: ElementRef;
  @ViewChild('topBar') topBarRef!: ElementRef;
  @ViewChild('layoutContainer', { read: ViewContainerRef }) layoutContainer!: ViewContainerRef;

  position: { x: number, y: number } = { x: 10, y: 10 };
  size: { w: number, h: number } = { w: 1000, h: 700 };
  lastPosition!: { x: number; y: number; };
  lastSize!: { w: number; h: number; };
  minSize: { w: number, h: number } = { w: 200, h: 400 };
  maxSize: { w: number, h: number } = { w: 1000, h: 800 };
  layoutColumns: boolean = false;
  layoutClass: string = "";

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _el: ElementRef,
    private cdr: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.size = { w: 900, h: 700 };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedIcon'] && this.selectedIcon) {
      const iconInfo = this.groupButton.find(icon => icon.viewName === this.selectedIcon);
      if (iconInfo) {
        this.size.w = iconInfo.width;
        this.size.h = iconInfo.height;
        this.cdr.detectChanges(); // Mark the component for change detection
      }
    }

    if (changes['selectedIcon'] && this.selectedIcon) {
      this.addLayout(this.selectedIcon);
    }
  }

  startDrag($event: any): void {
    $event.preventDefault();
    const mouseX = $event.clientX;
    const mouseY = $event.clientY;

    const positionX = this.position.x;
    const positionY = this.position.y;

    const duringDrag = (e: { clientX: number; clientY: number; }) => {
      const dx = e.clientX - mouseX;
      const dy = e.clientY - mouseY;
      this.position.x = positionX + dx;
      this.position.y = positionY + dy;
      this.lastPosition = { ...this.position };
    };

    const finishDrag = (e: any) => {
      this._document.removeEventListener('mousemove', duringDrag);
      this._document.removeEventListener('mouseup', finishDrag);
    };

    this._document.addEventListener('mousemove', duringDrag);
    this._document.addEventListener('mouseup', finishDrag);
  }

  startResize($event: any, anchors: ResizeAnchorType[], direction: ResizeDirectionType): void {
    $event.preventDefault();
    const mouseX = $event.clientX;
    const mouseY = $event.clientY;
    const lastX = this.position.x;
    const lastY = this.position.y;
    const dimensionWidth = this.resizeCornerRef.nativeElement.parentNode.offsetWidth;
    const dimensionHeight = this.resizeCornerRef.nativeElement.parentNode.offsetHeight;

    const duringResize = (e: { clientX: number; clientY: number; }) => {
      let dw = dimensionWidth;
      let dh = dimensionHeight;
      if (direction === 'x' || direction === 'xy') {
        if (anchors.includes('left')) {
          dw += (mouseX - e.clientX);
        } else if (anchors.includes('right')) {
          dw -= (mouseX - e.clientX);
        }
      }
      if (direction === 'y' || direction === 'xy') {
        if (anchors.includes('top')) {
          dh += (mouseY - e.clientY);
        } else if (anchors.includes('bottom')) {
          dh -= (mouseY - e.clientY);
        }
      }

      // Adjust the width and height to stay within the limits
      if (anchors.includes('left')) {
        const newWidth = Math.max(Math.min(dw, this.maxSize.w), this.minSize.w);
        this.size.w = newWidth;
        this.position.x += this.size.w - newWidth; // Adjust position if necessary
      }

      if (anchors.includes('top')) {
        const newHeight = Math.max(Math.min(dh, this.maxSize.h), this.minSize.h);
        this.size.h = newHeight;
        this.position.y += this.size.h - newHeight; // Adjust position if necessary
      }

      if (anchors.includes('bottom') || anchors.includes('right')) {
        this.size.w = Math.max(Math.min(dw, this.maxSize.w), this.minSize.w);
        this.size.h = Math.max(Math.min(dh, this.maxSize.h), this.minSize.h);
      }

      this.lastSize = { ...this.size };
      this.cdr.detectChanges(); // Mark the component for change detection
    };

    const finishResize = (e: any) => {
      this._document.removeEventListener('mousemove', duringResize);
      this._document.removeEventListener('mouseup', finishResize);
    };

    this._document.addEventListener('mousemove', duringResize);
    this._document.addEventListener('mouseup', finishResize);
  }

  addLayout(icon: string): void {
    this.layoutContainer.clear(); // Clear existing layout

    switch (icon) {
      case 'empty-box':
        const emptyBoxFactory = this.resolver.resolveComponentFactory(EmptyBoxLayoutComponent);
        this.layoutContainer.createComponent(emptyBoxFactory);
        break;
      case 'column2_box':
        const twoColumnFactory = this.resolver.resolveComponentFactory(TwoColumnLayoutComponent);
        this.layoutContainer.createComponent(twoColumnFactory);
        break;
      // Add more cases for other icons
      default:
        return;
    }
  }

}
