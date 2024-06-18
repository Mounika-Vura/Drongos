import { Component, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss'
})
export class layoutsComponent {

  width!: number;
  height!: number;
  layoutItem!: { 
    icon: string,
    label: string,
    grid: { cols: number, rows: number, color: string, text: string }[],
  };
}
