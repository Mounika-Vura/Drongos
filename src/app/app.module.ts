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
    GroupButtonComponent
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
