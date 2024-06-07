// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-empty-box-layout',
//   template: `<div class="empty-box-layout">
//   <div class="container">
//   </div>
// </div>`,

// styles: [`
// .empty-box-layout .container {
// display: flex;
// width: 700px;
// height: 500px;
// border: 1px solid black;
// }
// `]
// })
// export class EmptyBoxLayoutComponent {

// }
import { Component } from '@angular/core';

@Component({
  selector: 'app-empty-box-layout',
  templateUrl: './empty-box-layout.component.html',
  styleUrl: './empty-box-layout.component.scss'
})
export class EmptyBoxLayoutComponent {
  width = 700;
  height = 500;

  
}
