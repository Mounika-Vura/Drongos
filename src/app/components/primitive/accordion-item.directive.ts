import { ContentChild, Directive, Input } from '@angular/core';
import { AccordionContentDirective } from './accordion-content.directive';



@Directive({
  selector: '[accordion-item]'
})
export class AccordionItemDirective { 
  @Input() expanded!: boolean;
  @Input() title!: string;
  @Input() disabled!: boolean;
  @ContentChild(AccordionContentDirective) content!: AccordionContentDirective;
}
