import { Component } from "@angular/core";
 
@Component({
  selector: 'app-screen-layout',
  templateUrl: './screen-layout.component.html',
  styleUrl: './screen-layout.component.scss'
})
export class ScreenLayoutComponent {
  icons: string[] = ['desktop-alt', 'tablet-alt', 'mobile-alt'];
  alignmentIcons: string[] = ['align-left', 'align-center', 'align-right','align-justify',];
  groupButton = [
    { viewName: 'desktop-alt', width: 715, height: 700,x:30,y:30 },
    { viewName: 'tablet-alt', width:200, height: 1024,x:290,y:50 },
    { viewName: 'mobile-alt', width: 150, height: 900,x:70,y:70 },
  ];
 
  selectedIcon: string=this.icons[0];
 
  onIconSelected(icon: string) {
    this.selectedIcon = icon;
    console.log("screen Layout-->",this.selectedIcon)
  }
}