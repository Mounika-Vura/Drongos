import { Component, ContentChildren, ElementRef, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { GroupButtonDirectiveDirective } from '../group-button-directive.directive';

@Component({
  selector: 'app-group-button',
  templateUrl: './group-button.component.html',
  styleUrls: ['./group-button.component.scss']
})
export class GroupButtonComponent {
  @ContentChildren(GroupButtonDirectiveDirective) icons!: QueryList<GroupButtonDirectiveDirective>;
  @Output() iconSelected = new EventEmitter<string>();
  @Input() orientation: string = "horizontal";
  selectedIconIndex: number = 0;

  constructor() {}

  itemClicked: boolean[] = [];

  ngAfterContentInit() {
    this.icons.forEach(() => {
      this.itemClicked.push(false);
    });
    this.itemClicked[0] = true;
  }

  selectedIcon(index: number) {
    this.icons.forEach((icon, i) => {
      if (i === index) {
        this.itemClicked[i] = true;
        this.selectedIconIndex = i;
        // Emitting title property of the icon instead of icon itself
        this.iconSelected.emit(icon.title); 
      } else {
        this.itemClicked[i] = false;
      }
    });
  }
}
