import { Component, ComponentFactoryResolver, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren, ViewContainerRef } from "@angular/core";
import { TemplateFormComponent } from "../template-form/template-form.component";
 
@Component({
  selector: 'app-screen-layout',
  templateUrl: './screen-layout.component.html',
  styleUrl: './screen-layout.component.scss'
})
export class ScreenLayoutComponent {

  constructor(private renderer: Renderer2, private el: ElementRef,private componentFactoryResolver: ComponentFactoryResolver) {}

  icons: string[] = ['desktop-alt', 'tablet-alt', 'mobile-alt'];
  alignmentIcons: string[] = ['align-left', 'align-center', 'align-right','align-justify',];
  sideBarIcons:string[]=['plus','arrows-alt','expand'];
  groupButton = [
    { viewName: 'desktop-alt', width: 715, height: 700,x:30,y:30 },
    { viewName: 'tablet-alt', width:300, height: 1024,x:310,y:30 },
    { viewName: 'mobile-alt', width: 150, height: 900,x:380,y:30 },
  ];
 
  selectedIcon: string=this.icons[0];
 
  onIconSelected(icon: string) {
    this.selectedIcon = icon;
    console.log("screen Layout-->",this.selectedIcon)
  }
  //=================Accordian============================//
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
  /* Template Forms */

@ViewChild('formContainer', { read: ViewContainerRef, static: true }) 
formContainer!: ViewContainerRef;

 addElement(type: string): void {
    const componentRef = this.formContainer.createComponent(TemplateFormComponent);
     componentRef.instance.formType = type;
 }
}
