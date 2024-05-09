import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appGroupButtonDirective]'
})
export class GroupButtonDirectiveDirective {

  constructor() { }
  @Input() title!: string;
}
