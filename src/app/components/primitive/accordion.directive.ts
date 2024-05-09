import { Directive, ElementRef,  HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAccordion]'
})
export class AccordionDirective {

  @Input() bg_color!: string;
  @Input() disabled!: boolean;
 
  constructor(private el: ElementRef, private renderer: Renderer2) { }


  @HostListener('mouseenter') onMouseEnter() {   
      this.accordionItemHoverStyle(); 
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.disabled !== true) {
     this.accordionItemStyle();
    }
  }

  ngOnChanges() { 
    if(this.disabled !== true){
      this.accordionItemStyle();
    }
    else{
      this.disable();
    }
  }


  private accordionItemStyle() {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'flex'); 
    this.renderer.setStyle(this.el.nativeElement, 'padding', '0 1rem'); 
    this.renderer.setStyle(this.el.nativeElement, 'justify-content', 'space-between'); 
    this.renderer.setStyle(this.el.nativeElement, 'align-items', 'center'); 
    this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid #B5B5B5');   
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '18px'); 
    const btn_svg = this.el.nativeElement.querySelector('.btn_svg');
    this.renderer.setStyle(this.el.nativeElement, 'cursor', 'pointer');
    
      if(this.bg_color == "white") {
          this.renderer.setStyle(this.el.nativeElement, 'background-color', this.bg_color);
          this.renderer.setStyle(btn_svg, 'color', 'black');
          this.renderer.setStyle(this.el.nativeElement, 'color', '#333333');
        }

        else{
        this.renderer.setStyle(this.el.nativeElement, 'background-color', this.bg_color);
        this.renderer.setStyle(btn_svg, 'color', 'white');
        this.renderer.setStyle(this.el.nativeElement, 'color', '#ffffff');
        this.renderer.removeStyle(this.el.nativeElement, 'opacity');
       }
}

private accordionItemHoverStyle() {
  if (!this.disabled) {
    if (this.bg_color == "white") {
      this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid black');
      this.renderer.setStyle(this.el.nativeElement, 'color', '#333333');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.9');
    }
  }
}

private disable() {
   this.renderer.setStyle(this.el.nativeElement, 'display', 'flex'); 
   this.renderer.setStyle(this.el.nativeElement, 'padding', '0 1rem'); 
   this.renderer.setStyle(this.el.nativeElement, 'justify-content', 'space-between'); 
   this.renderer.setStyle(this.el.nativeElement, 'align-items', 'center'); 
   this.renderer.setStyle(this.el.nativeElement, 'border', '1px solid #B5B5B5');   
   this.renderer.setStyle(this.el.nativeElement, 'font-size', '18px'); 
   this.renderer.setStyle(this.el.nativeElement, 'opacity', '0.8');
   this.renderer.setStyle(this.el.nativeElement, 'cursor', 'not-allowed');
   const btn_svg = this.el.nativeElement.querySelector('.btn_svg');
   
    if(this.bg_color == "white") {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', this.bg_color);
      this.renderer.setStyle(btn_svg, 'color', 'black');
      this.renderer.setStyle(this.el.nativeElement, 'color', '#333333');
    }

    else{
      this.renderer.setStyle(this.el.nativeElement, 'background-color', this.bg_color);
      this.renderer.setStyle(btn_svg, 'color', 'white');
      this.renderer.setStyle(this.el.nativeElement, 'color', '#ffffff');
    } 
  }
}
