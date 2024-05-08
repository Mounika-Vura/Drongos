import { Component, ViewChild } from '@angular/core';
import { GroupButtonComponent } from './components/primitive/group-button/group-button.component';

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

  orientation="horizontal";
  icons: string[] = ['desktop-alt', 'tablet-alt', 'mobile-alt'];
}
