import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtondirectiveDirective } from './components/primitive/buttondirective.directive';
import { ButtonsComponent } from './components/primitive/buttons/buttons.component';
import{FontAwesomeModule}from'@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { AccordionComponent } from './components/primitive/accordion/accordion.component';
import { AccordionContentDirective } from './components/primitive/accordion-content.directive';
import { AccordionDirective } from './components/primitive/accordion.directive';
import { AccordionItemDirective } from './components/primitive/accordion-item.directive';
import { CommonModule } from '@angular/common';
import { GroupButtonDirectiveDirective } from './components/primitive/group-button-directive.directive';
import { AspectRatioComponent } from './components/primitive/aspect-ratio/aspect-ratio.component';
import { FrameComponentComponent } from './components/primitive/frame-component/frame-component.component';
import { GroupButtonComponent } from './components/primitive/group-button/group-button.component';
import { ZoomScrollDirective } from './zoomscroll.directive';
import { ScreenLayoutComponent } from './components/primitive/screen-layout/screen-layout.component';
import { TemplateFormComponent } from './components/primitive/template-form/template-form.component';
import { IconComponent } from './components/primitive/icon/icon.component';
import { DragmediaDirective } from './components/primitive/dragmedia.directive';
import { DragDropDirective } from './components/primitive/drag-drop.directive';
import { TypographyComponent } from './components/primitive/typography/typography.component';
import { EmptyBoxLayoutComponent } from './components/primitive/layouts/empty-box-layout/empty-box-layout.component';
import { TwoColumnLayoutComponent } from './components/primitive/layouts/two-column-layout/two-column-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtondirectiveDirective,
    ButtonsComponent,
    AccordionComponent,
    AccordionContentDirective,
    AccordionDirective,
    AccordionItemDirective,
    GroupButtonDirectiveDirective,
    AspectRatioComponent,
    FrameComponentComponent,
    GroupButtonComponent,
    ScreenLayoutComponent,
    ZoomScrollDirective,
    TemplateFormComponent,
    IconComponent,
    DragmediaDirective,
    DragDropDirective,
    TypographyComponent,
    EmptyBoxLayoutComponent,
    TwoColumnLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    FontAwesomeModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
