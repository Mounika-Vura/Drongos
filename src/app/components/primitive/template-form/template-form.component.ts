import { Component, ComponentFactoryResolver, ElementRef, Renderer2, ViewChild, ViewContainerRef } from '@angular/core';
import { ButtonsComponent } from '../buttons/buttons.component';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent {
  formType!: string;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  @ViewChild('buttonContainer', { read: ViewContainerRef, static: true }) buttonContainer!: ViewContainerRef;

  ngOnInit(): void {
    const container = this.renderer.createElement('div');
    this.renderer.addClass(container, 'form-container');
    this.renderer.appendChild(this.el.nativeElement, container);

    if (this.formType === 'login') {
      this.createLoginForm(container);
    } else if (this.formType === 'signup') {
      this.createSignupForm(container);
    } else if (this.formType === 'feedback') {
      this.createFeedbackForm(container);
    }
  }

  createSignupForm(container: any) {
    const nameLabel = this.createLabelElement('Name');
    this.renderer.appendChild(container, nameLabel);
    const nameInput = this.createInputElement('Name');
    this.renderer.appendChild(container, nameInput);

    const emailLabel = this.createLabelElement('Email');
    this.renderer.appendChild(container, emailLabel);
    const emailInput = this.createInputElement('Email');
    this.renderer.appendChild(container, emailInput);

    const passwordLabel = this.createLabelElement('Password');
    this.renderer.appendChild(container, passwordLabel);
    const passwordInput = this.createInputElement('Password');
    this.renderer.appendChild(container, passwordInput);

    const phoneNumberLabel = this.createLabelElement('Phone Number');
    this.renderer.appendChild(container, phoneNumberLabel);
    const phoneNumberInput = this.createInputElement('Phone Number');
    this.renderer.appendChild(container, phoneNumberInput);

    const genderLabel = this.createLabelElement('Gender');
    this.renderer.appendChild(container, genderLabel);

    const genderContainer = this.renderer.createElement('div');
    this.renderer.addClass(genderContainer, 'gender-container');
    const maleRadio = this.createRadioElement('male', 'Male');
    this.renderer.appendChild(genderContainer, maleRadio);
    const femaleRadio = this.createRadioElement('female', 'Female');
    this.renderer.appendChild(genderContainer, femaleRadio);
    this.renderer.appendChild(container, genderContainer);

    const button = this.createButtonInstance('Submit');
    this.renderer.setStyle(button, 'paddingTop', '20px');
    this.renderer.appendChild(container, button);
  }

  createLoginForm(container: any) {
    const userNameLabel = this.createLabelElement('Name');
    this.renderer.appendChild(container, userNameLabel);

    const userNameInput = this.createInputElement('Email');
    this.renderer.appendChild(container, userNameInput);

    const passwordLabel = this.createLabelElement('Password');
    this.renderer.appendChild(container, passwordLabel);

    const passwordInput = this.createInputElement('Password');
    this.renderer.appendChild(container, passwordInput);

    const button = this.createButtonInstance('Submit');
    this.renderer.appendChild(container, button);
  }

  createFeedbackForm(container: any) {
    const nameLabel = this.createLabelElement('Name');
    this.renderer.appendChild(container, nameLabel);
    const nameInput = this.createInputElement('Name');
    this.renderer.appendChild(container, nameInput);

    const ratingLabel = this.createLabelElement('Rating');
    this.renderer.appendChild(container, ratingLabel);

    const starContainer = this.renderer.createElement('div');
    this.renderer.addClass(starContainer, 'star-container');
    for (let i = 0; i < 5; i++) {
      const star = this.renderer.createElement('span');
      this.renderer.addClass(star, 'star');
      this.renderer.setStyle(star, 'fontSize', '2em');
      this.renderer.setProperty(star, 'innerText', '☆');
      this.renderer.listen(star, 'click', () => this.fillStars(starContainer, i));
      this.renderer.appendChild(starContainer, star);
    }
    this.renderer.appendChild(container, starContainer);

    const feedbackLabel = this.createLabelElement('Feedback');
    this.renderer.setStyle(feedbackLabel, 'paddingTop', '15px');
    this.renderer.appendChild(container, feedbackLabel);
    const feedbackTextArea = this.createTextAreaElement();
    this.renderer.appendChild(container, feedbackTextArea);

    const button = this.createButtonInstance('Submit');
    this.renderer.setStyle(button, 'paddingTop', '20px');
    this.renderer.appendChild(container, button);
  }

  private fillStars(starContainer: any, index: number) {
    const stars = starContainer.children;
    for (let i = 0; i < stars.length; i++) {
      this.renderer.setProperty(stars[i], 'innerText', i <= index ? '★' : '☆');
    }
  }

  private createLabelElement(text: string): any {
    const label = this.renderer.createElement('label');
    this.renderer.setProperty(label, 'innerText', text);
    this.renderer.addClass(label, 'form-label');
    return label;
  }

  private createInputElement(placeholder: string): any {
    const input = this.renderer.createElement('input');
    this.renderer.setAttribute(input, 'placeholder', placeholder);
    this.renderer.addClass(input, 'form-control');
    return input;
  }

  private createTextAreaElement(): any {
    const textArea = this.renderer.createElement('textarea');
    this.renderer.addClass(textArea, 'form-control');
    this.renderer.setStyle(textArea, 'width', '347px'); 
    this.renderer.setStyle(textArea, 'height', '150px');
    return textArea;
  }

  private createRadioElement(value: string, label: string): any {
    const radioContainer = this.renderer.createElement('div');
    this.renderer.addClass(radioContainer, 'radio-container');

    const radioInput = this.renderer.createElement('input');
    this.renderer.setAttribute(radioInput, 'type', 'radio');
    this.renderer.setAttribute(radioInput, 'name', 'gender');
    this.renderer.setAttribute(radioInput, 'value', value);
    this.renderer.addClass(radioInput, 'form-radio');

    const radioLabel = this.renderer.createElement('label');
    this.renderer.setProperty(radioLabel, 'innerText', label);
    this.renderer.addClass(radioLabel, 'radio-label');

    this.renderer.appendChild(radioContainer, radioInput);
    this.renderer.appendChild(radioContainer, radioLabel);

    return radioContainer;
  }

  private createButtonInstance(placeholder: string): any {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ButtonsComponent);
    const projectableNodes = [
      [document.createTextNode(placeholder)]
    ];
    const componentRef = this.buttonContainer.createComponent(componentFactory, 0, undefined, projectableNodes);
    const dynamicButtonInstance = componentRef.instance;
    dynamicButtonInstance.type = 'primary';
    dynamicButtonInstance.border_radius = '10px';
    dynamicButtonInstance.heightbtn = '40px';
    dynamicButtonInstance.widthbtn = '100px';

    return componentRef.location.nativeElement;
  }
}
