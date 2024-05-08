import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[accordionContent]'
})
export class AccordionContentDirective {

  constructor(public templateRef: TemplateRef<any>) { } 

}
