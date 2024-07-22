import { DOCUMENT } from '@angular/common';
import { Component, ComponentFactoryResolver, ComponentRef, ElementRef, EventEmitter, Inject, Input, Output, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { layoutsComponent } from '../layouts/layouts.component';

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
  styleUrls: ['./frame-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class FrameComponentComponent {
  width!: number;
  private layoutComponentRef1?: ComponentRef<layoutsComponent>;

  @Output() messageEvent = new EventEmitter<any>();

  @ViewChild('wrapper', { static: true, read: ElementRef })
  frameTemplate!: ElementRef<HTMLElement>;

  @Input() selectedIcon!: string;
  @Input() groupButton!: { viewName: string, width: number, height: number, x: number, y: number }[];
  @ViewChild('resizeCorner') resizeCornerRef!: ElementRef;
  @ViewChild('wrapper') wrapperRef!: ElementRef;
  @ViewChild('topBar') topBarRef!: ElementRef;

  position: { x: number, y: number } = { x: 10, y: 10 };
  size: { w: number, h: number } = { w: 1000, h: 700 };
  lastPosition!: { x: number; y: number; };
  lastSize!: { w: number; h: number; };
  minSize: { w: number, h: number } = { w: 200, h: 400 };
  maxSize: { w: number, h: number } = { w: 2000, h: 800 };

  @ViewChild('formContainer', { read: ViewContainerRef, static: true }) formContainer!: ViewContainerRef;

  constructor(@Inject(DOCUMENT) private _document: Document,
              private _el: ElementRef, private resolver: ComponentFactoryResolver, private cdr: ChangeDetectorRef) {
    this.size = { w: 900, h: 700 };
    console.log('Constructor: Size initialized to', this.size);
  }

  ngOnInit(): void {
    const iconInfo = this.groupButton.find(icon => icon.viewName === this.selectedIcon);
      if (iconInfo) {
        this.size.w = iconInfo.width;
        this.size.h = iconInfo.height;
        console.log('ngOnINit: Size updated to', this.size);
      }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges triggered with changes:', changes);
    if (changes['selectedIcon'] && this.selectedIcon) {
      console.log('ngOnChanges: selectedIcon change detected:', this.selectedIcon);
      const iconInfo = this.groupButton.find(icon => icon.viewName === this.selectedIcon);
      if (iconInfo) {
        this.size.w = iconInfo.width;
        this.size.h = iconInfo.height;
        this.position.x=iconInfo.x;
        this.position.y=iconInfo.y;
        console.log('ngOnChanges: Size updated to', this.size);
        this.cdr.detectChanges(); 
      }
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

      if (anchors.includes('left')) {
        const newWidth = Math.max(Math.min(dw, this.maxSize.w), this.minSize.w);
        this.size.w = newWidth;
        this.position.x += this.size.w - newWidth; 
        console.log('startResize (left): Width updated to', this.size.w);
      }

      if (anchors.includes('top')) {
        const newHeight = Math.max(Math.min(dh, this.maxSize.h), this.minSize.h);
        this.size.h = newHeight;
        this.position.y += this.size.h - newHeight;
        console.log('startResize (top): Height updated to', this.size.h);
      }

      if (anchors.includes('bottom') || anchors.includes('right')) {
        this.size.w = Math.max(Math.min(dw, this.maxSize.w), this.minSize.w);
        this.size.h = Math.max(Math.min(dh, this.maxSize.h), this.minSize.h);
        console.log('startResize (bottom/right): Size updated to', this.size);
      }
      
      this.lastSize = { ...this.size };
    };

    const finishResize = (e: any) => {
      this._document.removeEventListener('mousemove', duringResize);
      this._document.removeEventListener('mouseup', finishResize);
    };

    this._document.addEventListener('mousemove', duringResize);
    this._document.addEventListener('mouseup', finishResize);
  }

  loadLayout(type: any) {
    if (this.layoutComponentRef1) {
      this.layoutComponentRef1.destroy();
    }

    this.layoutComponentRef1 = this.formContainer.createComponent(layoutsComponent);
    this.layoutComponentRef1.instance.layoutItem = type;
  }
}
