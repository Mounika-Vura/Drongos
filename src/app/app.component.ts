import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isDisabled: boolean = true;
  primarybtn="primary";
  alternativebtn="alternative";
  secondarybtn="secondary";
  label="Label";
  icon="sign-in-alt";
  w="260px";
  h="60px";
  orientation="horizontal";
  // icons: string[] = ['desktop-alt', 'tablet-alt', 'mobile-alt'];

  
 //   activeIndex!: number;
//   isMultiple: boolean = true;
//   isDisabled: boolean = true;
//   disabled: boolean = true;
//   primarybtn="primary";
//   alternativebtn="alternative";
//   secondarybtn="secondary";
//   label="Label";
//   icon = "sign-in-alt";
// ItemIndex!: number;
// selectedAccordian=[];

   
   multiple = false;
   disabled:boolean=true;
   //#E85B81---------#C12F5D
   //bg_color="white";
 
   items =[
    'Layout' ,
    'Media' ,
    'Typography',
     'Forms' ,
   'Custom Layout' 
   ];

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

  // buttons = [
  //   { header: 'Template Forms' },
  //   { header: 'Custom Forms' },
  //   { header: 'Form Elements' }
  // ];

  FormElements = [
    { icon: 'TextArea', label:'TextArea' },
    { icon: 'Label' , label:'Label'},
    { icon: 'Radio' , label:'Radio'},
    { icon: 'Checkbox', label:'CheckBox' },
    { icon: 'Input' , label:'Input'},
    { icon: 'Button' , label:'Button'}
  ]

}
