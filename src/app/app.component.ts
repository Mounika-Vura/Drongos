import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  //button starts
  isDisabled: boolean = true;
  primarybtn="primary";
  alternativebtn="alternative";
  secondarybtn="secondary";
  label="Label";
  icon="sign-in-alt";
  //button ends

  //accordian starts
  w="260px";
  h="60px";
   multiple = false;
   disabled:boolean=true;
  layoutItems = [
    { icon: 'empty-box' },
    { icon: 'column2_box' },
    { icon: 'column22_box'},
    { icon: 'column12_box' },
    { icon: 'column4_box' },
    { icon: 'column41_box' }
  ];

  mediaItems = [
    { icon: 'image', label:'Image' },
    { icon: 'video' , label:'Video'},
  ]
  
  typographyItems = [
    { icon: 'TextBox', label:'TextBox' },
    { icon: 'Heading' , label:'Heading'},
    { icon: 'TextLink' , label:'TextLink'}
  ]

  FormElements = [
    { icon: 'TextArea', label:'TextArea' },
    { icon: 'Label' , label:'Label'},
    { icon: 'Radio' , label:'Radio'},
    { icon: 'Checkbox', label:'CheckBox' },
    { icon: 'Input' , label:'Input'},
    { icon: 'Button' , label:'Button'}
  ]
 //accordian starts

 //groupButton starts
  // orientation = "vertical";
  icons: string[] = ['desktop-alt', 'tablet-alt', 'mobile-alt'];
  alignmentIcons: string[] = ['align-left', 'align-center', 'align-right','align-justify',];
  groupButton = [
    { viewName: 'desktop-alt', width: 1000, height: 700 },
    { viewName: 'tablet-alt', width:500, height: 1024 },
    { viewName: 'mobile-alt', width: 50, height: 552 },
  ];
 
  selectedIcon: string=this.icons[0];

  onIconSelected(icon: string) {
    this.selectedIcon = icon;
  }
  //groupButton ends
}
