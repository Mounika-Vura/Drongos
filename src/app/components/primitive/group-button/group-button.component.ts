// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-group-button',
// //   templateUrl: './group-button.component.html',
// //   styleUrl: './group-button.component.scss'
// // })
// // export class GroupButtonComponent {

// // }
// // group-button.component.ts
// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-group-button',
//   templateUrl: './group-button.component.html',
//   styleUrls: ['./group-button.component.scss']
// })
// export class GroupButtonComponent {
//   @Input() icons: string[] = [];
//   @Input() orientation: string = '';
//   selectedIndex: number | null = null;
  
//   selectedIcon(index: number): void {
//     this.selectedIndex = this.selectedIndex === index ? null : index;
//     console.log(this.orientation);
//   }
//   }
// group-button.component.ts
import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-group-button',
  templateUrl: './group-button.component.html',
  styleUrls: ['./group-button.component.scss']
})
export class GroupButtonComponent {
  constructor(private el: ElementRef) { }

  @Input() icons: string[] = [];
  @Input() orientation: string = '';
  selectedIconIndex: number | null = null;

  selectedIcon(index: number): void {
   this.selectedIconIndex = this.selectedIconIndex === index ? null : index;
  }
}
