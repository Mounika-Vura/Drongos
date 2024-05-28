import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss'
})
export class ButtonsComponent {
//  @Input() type: 'primary' | 'alternative' | 'secondary' = 'primary';
// @Input() state: 'default' | 'hover' | 'disabled' = 'default';
 

 @Input() type!:string; 
 @Input() isDisabled!:boolean; 
 @Input() widthbtn!:string; 
 @Input() heightbtn!:string; 
 @Input() border_radius!:string;
 @Output() onClick: EventEmitter<void> = new EventEmitter<void>();
 
//  ngOnChanges()
//  {
//   console.log(this.heightbtn,this.widthbtn);
//  }
 
}
