import { Component } from '@angular/core';

@Component({
  selector: 'app-two-column-layout',
  templateUrl: './two-column-layout.component.html',
  styleUrl: './two-column-layout.component.scss'
})
export class TwoColumnLayoutComponent {


leftColumnWidth = 350;  
rightColumnWidth = 350; 
showModal = false;
resizingColumn: 'left' | 'right' | null = null;
newWidth = 0;

onColumnClick(column: 'left' | 'right') {
  this.resizingColumn = column;
  this.newWidth = column === 'left' ? this.leftColumnWidth : this.rightColumnWidth;
  // Assuming height is not being modified in this example
  this.showModal = true;
}

updateDimensions() {
  if (this.resizingColumn === 'left') {
    this.leftColumnWidth = this.newWidth;
    this.rightColumnWidth = 700 - this.newWidth;
  } else if (this.resizingColumn === 'right') {
    this.rightColumnWidth = this.newWidth;
    this.leftColumnWidth = 700 - this.newWidth;
  }
  this.closeModal();
}

closeModal() {
  this.showModal = false;
}
}