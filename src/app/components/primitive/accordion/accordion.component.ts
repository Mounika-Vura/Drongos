import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList
} from "@angular/core";
import { AccordionItemDirective } from "../accordion-item.directive";

@Component({
  selector: "accordion",
  templateUrl: "./accordion.component.html",
  styleUrls: ["./accordion.component.scss"],
})
export class AccordionComponent {

  expanded = new Set<number>();  
  @Input() multiple!: boolean;
  @Input() disabled!: boolean;
  @Input() bg_color!: string;
 
  constructor() { }

  @ContentChildren(AccordionItemDirective) items!: QueryList<AccordionItemDirective>;

  getToggleFunction(index: number) {
    return () => this.toggleState(index);
  }

  toggleState = (index: number) => {
    if (this.expanded.has(index)) {
      this.expanded.delete(index);
    } else {
      if (!this.multiple) {
        this.expanded.clear();
      }
      this.expanded.add(index);
    }
  };


}