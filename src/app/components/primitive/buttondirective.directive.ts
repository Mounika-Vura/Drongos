import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appButtondirective]'
})
export class ButtondirectiveDirective {

  private _type!: string;
  private _isDisabled!: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    if (!this._isDisabled) {
      this.setHoverStyle();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (!this._isDisabled) {
      this.resetStyle();
    }
  }

  @Input() set type(value: string) {
    this._type = value;
    this.setStyle();
  }

  get type(): string {
    return this._type;
  }

  @Input() set isDisabled(value: boolean) {
    this._isDisabled = value;
    if (this._isDisabled) {
      this.applyDisabledStyles();
    }
  }

  get isDisabled(): boolean {
    return this._isDisabled;
  }

  private setStyle() {
    switch (this._type) {
      case 'primary':
        this.el.nativeElement.style.backgroundColor = '#E85B81';
        this.renderer.setStyle(this.el.nativeElement, 'color', '#ffffff');
        break;
      case 'alternative':
        this.renderer.setStyle(this.el.nativeElement, 'background-color', '#5E48E8');
        this.renderer.setStyle(this.el.nativeElement, 'color', '#ffffff');
        break;
      case 'secondary':
        this.renderer.setStyle(this.el.nativeElement, 'background-color', '#ffffff');
        this.renderer.setStyle(this.el.nativeElement, 'color', '#505050');
        this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid #B5B5B5');
        break;
      default:
        break;
    }
  }

  private setHoverStyle() {
    switch (this.type) {
      case 'primary':
        this.renderer.setStyle(this.el.nativeElement, 'background-color', '#C12F5D');
        break;
      case 'alternative':
        this.renderer.setStyle(this.el.nativeElement, 'background-color', '#5028C6');
        break;
      case 'secondary':
        this.renderer.setStyle(this.el.nativeElement, 'background-color', '#ffffff');
        this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid #252525');
        break;
      default:
        break;
    }
  }

  private resetStyle() {
    switch (this.type) {
      case 'primary':
        this.renderer.setStyle(this.el.nativeElement, 'background-color', '#E85B81');
        break;
      case 'alternative':
        this.renderer.setStyle(this.el.nativeElement, 'background-color', '#5E48E8');
        break;
      case 'secondary':
        this.renderer.setStyle(this.el.nativeElement, 'background-color', '#ffffff');
        this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid #B5B5B5');
        break;
      default:
        break;
    }
  }

  private applyDisabledStyles() {
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.5');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'not-allowed');
  }
}
