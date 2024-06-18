import { Component, ComponentFactoryResolver, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren, ViewContainerRef } from "@angular/core";
import { TemplateFormComponent } from "../template-form/template-form.component";
import { DragDropDirective } from "../drag-drop.directive";
import { DragmediaDirective } from "../dragmedia.directive";
import { TypographyComponent } from "../typography/typography.component";
import { FrameComponentComponent } from "../frame-component/frame-component.component";
 
@Component({
  selector: 'app-screen-layout',
  templateUrl: './screen-layout.component.html',
  styleUrl: './screen-layout.component.scss'
})
export class ScreenLayoutComponent {

  constructor(private resolver: ComponentFactoryResolver, private renderer: Renderer2, private el: ElementRef,private componentFactoryResolver: ComponentFactoryResolver) {}

  icons: string[] = ['desktop-alt', 'tablet-alt', 'mobile-alt'];
  alignmentIcons: string[] = ['align-left', 'align-center', 'align-right','align-justify',];
  sideBarIcons:string[]=['plus','arrows-alt','expand'];
  groupButton = [
    { viewName: 'desktop-alt', width: 715, height: 700,x:30,y:30 },
    { viewName: 'tablet-alt', width:300, height: 1024,x:310,y:30 },
    { viewName: 'mobile-alt', width: 150, height: 900,x:380,y:30 },
  ];
  @ViewChild('typoContainer', { read: ViewContainerRef  }) 
  typoContainer!: ViewContainerRef;
  selectedIcon: string=this.icons[0];
 
  onIconSelected(icon: string) {
    this.selectedIcon = icon;
    console.log("screen Layout-->",this.selectedIcon)
  }
  onClick(label: string ) {
    const factory = this.resolver.resolveComponentFactory(TypographyComponent);
   const componentRef = this.Container.createComponent(factory);
   componentRef.instance.typographytype = label;
 }

  //=================Accordian============================//
  w="260px";
  h="60px";
   multiple = true;
   disabled:boolean=true;
   layoutItems = [
    {
      icon: 'empty-box',
      label: 'Layout1' ,
      grid: [
        { cols: 4, rows: 4, color: 'lightblue', text: 'A' },
      ]
    },
    {
      icon: 'column2_box',
      label: 'Layout2' ,
      grid: [
        { cols: 2, rows: 4, color: 'lightblue', text: 'A' },
        { cols: 2, rows: 4, color: 'lightgreen', text: 'B' },
      ]
    },
    {
      icon: 'column22_box',
      label: 'Layout3' ,
      grid: [
        { cols: 2, rows: 2, color: 'lightblue', text: 'A' },
        { cols: 2, rows: 4, color: 'lightgreen', text: 'B' },
        { cols: 2, rows: 2, color: 'lightcoral', text: 'C' },
      ]
    },
    {
      icon: 'column12_box',
      label: 'Layout4' ,
      grid: [
        { cols: 2, rows: 4, color: 'lightblue', text: 'A' },
        { cols: 2, rows: 2, color: 'lightgreen', text: 'B' },
        { cols: 2, rows: 2, color: 'lightcoral', text: 'C' },
      ]
    },
    {
      icon: 'column4_box',
      label: 'Layout5' ,
      grid: [
        { cols: 1, rows: 4, color: 'lightblue', text: 'A' },
        { cols: 1, rows: 4, color: 'lightgreen', text: 'B' },
        { cols: 1, rows: 4, color: 'lightpink', text: 'C' },
        { cols: 1, rows: 4, color: 'lightcoral', text: 'D' },
      ]
    },
    {
      icon: 'column41_box',
      label: 'Layout6' ,
      grid: [
        { cols: 3, rows: 2, color: 'lightblue', text: 'A' },
        { cols: 1, rows: 2, color: 'lightgreen', text: 'B' },
        { cols: 1, rows: 2, color: 'lightpink', text: 'C' },
        { cols: 3, rows: 2, color: 'lightcoral', text: 'D' },
      ]
    }
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

@ViewChild('Container', { read: ViewContainerRef, static: true }) 
Container!: ViewContainerRef;

// @ViewChild(FrameComponentComponent) frameComponent!: FrameComponentComponent;
 addElement(type: string): void {
    const componentRef = this.Container.createComponent(TemplateFormComponent);
     componentRef.instance.formType = type;
 }
 
    //Layout starts
@ViewChild('Container', { static: true }) layoutContainer!: FrameComponentComponent;
// Method to create Template Form instances
 addLayout(Labeltype: any): void {
    this.layoutContainer.loadLayout(Labeltype);
 }
//Layout ends


 //dragdrop start 
 @ViewChildren(DragDropDirective) draggableIcons!: QueryList<DragDropDirective>;
 @ViewChildren(DragmediaDirective) draggablemedia!: QueryList<DragmediaDirective>;

 frameTemplate1:any;
 
 ngAfterViewInit() {
   this.draggableIcons.forEach((directive) => {
     directive.frame = this.frameTemplate1.nativeElement;
   });
   this.draggablemedia.forEach((directive) => {
    directive.frame = this.frameTemplate1.nativeElement;
  });
 }
//dragdrop ends
}
