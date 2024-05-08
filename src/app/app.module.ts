import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputBoxComponent } from './components/primitive/forms/customForms/input-box/input-box.component';
import { ButtonComponent } from './components/primitive/forms/customForms/button/button.component';
import { LoginFormComponent } from './components/primitive/forms/login-form/login-form.component';
import { SignupFormComponent } from './components/primitive/forms/signup-form/signup-form.component';
import { FeedbackFormComponent } from './components/primitive/forms/feedback-form/feedback-form.component';
import { TextareaComponent } from './components/primitive/forms/customForms/textarea/textarea.component';
import { RadiobuttonComponent } from './components/primitive/forms/customForms/radiobutton/radiobutton.component';
import { LabelsComponent } from './components/primitive/forms/customForms/labels/labels.component';
import { CheckboxComponent } from './components/primitive/forms/customForms/checkbox/checkbox.component';
import { ViewportComponent } from './components/primitive/viewport/viewport.component';
import { DesktopScreenComponent } from './components/primitive/forms/customForms/desktop-screen/desktop-screen.component';
import { ButtondirectiveDirective } from './components/primitive/buttondirective.directive';
import { ButtonsComponent } from './components/primitive/buttons/buttons.component';
import{FontAwesomeModule}from'@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { AccordionComponent } from './components/primitive/accordion/accordion.component';
import { AccordionContentDirective } from './components/primitive/accordion-content.directive';
import { AccordionDirective } from './components/primitive/accordion.directive';
import { AccordionItemDirective } from './components/primitive/accordion-item.directive';
//import { AccordionTitleDirective } from './components/primitive/accordion-title.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    InputBoxComponent,
    ButtonComponent,
    LoginFormComponent,
    SignupFormComponent,
    FeedbackFormComponent,
    TextareaComponent,
    RadiobuttonComponent,
    LabelsComponent,
    CheckboxComponent,
    ViewportComponent,
    DesktopScreenComponent,
    ButtondirectiveDirective,
    ButtonsComponent,
    AccordionComponent,
    AccordionContentDirective,
    AccordionDirective,
    AccordionItemDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    CommonModule
    //BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
