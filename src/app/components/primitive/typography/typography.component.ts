
import { ElementRef, Input, Renderer2 } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.scss']
})
export class TypographyComponent implements OnInit {

  @Input() typographytype!: string;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    console.log("clicked");
  }

  ngOnInit(): void {
    const container = this.renderer.createElement('div');
    this.renderer.addClass(container, 'Typography-container');
    this.renderer.setStyle(container, 'position', 'absolute');
    this.renderer.setStyle(container, 'top', '50%');
    this.renderer.setStyle(container, 'left', '50%');
    this.renderer.setStyle(container, 'transform', 'translate(-50%, -50%)');
    this.renderer.setStyle(container, 'border', '2px dotted #000');
    this.renderer.setStyle(container, 'padding', '10px');
    this.renderer.appendChild(this.el.nativeElement, container);

    if (this.typographytype === 'TextBox') {
      this.createTextBox(container);
    } else if (this.typographytype === 'Heading') {
      this.createHeading(container);
    } else if (this.typographytype === 'TextLink') {
      this.createTextLink(container);
    }

    this.makeDraggable(container);
  }

  private createTextBox(container: any) {
    const TextBoxInput = this.createInputElement('Enter your Text here...');
    this.renderer.appendChild(container, TextBoxInput);
    this.addFocusAndEnterEvents(TextBoxInput, container);
  }

  private createHeading(container: any) {
    const HeadingInput = this.createInputElement('This is a Heading');
    this.renderer.appendChild(container, HeadingInput);
    this.addFocusAndEnterEvents(HeadingInput, container);
  }

  private createTextLink(container: any) {
    const LinkInput = this.createInputElement('Enter Link');
    this.renderer.appendChild(container, LinkInput);
    this.addFocusAndEnterEvents(LinkInput, container);
  }

  private createInputElement(placeholder: string): any {
    const input = this.renderer.createElement('input');
    this.renderer.setAttribute(input, 'placeholder', placeholder);
    this.renderer.addClass(input, 'form-control');
    this.renderer.setStyle(input, 'border', 'none');
    return input;
  }

  private addFocusAndEnterEvents(input: any, container: any) {
    this.renderer.listen(input, 'focus', () => {
      this.renderer.setStyle(container, 'border', '2px dotted #000');
    });

    this.renderer.listen(input, 'blur', () => {
      if (input.value.trim() !== '') {
        this.renderer.setStyle(container, 'border', 'none');
      }
    });

    this.renderer.listen(input, 'keydown', (event: KeyboardEvent) => {
      if (event.key === 'Enter' && input.value.trim() !== '') {
        this.renderer.setStyle(container, 'border', 'none');
        input.blur();
      }
    });
  }

  private makeDraggable(element: any) {
    let isDown = false;
    let offset = { x: 0, y: 0 };

    this.renderer.listen(element, 'mousedown', (event: MouseEvent) => {
      isDown = true;
      offset = {
        x: element.getBoundingClientRect().left - event.clientX,
        y: element.getBoundingClientRect().top - event.clientY
      };
      this.renderer.setStyle(element, 'cursor', 'grabbing');
    });

    this.renderer.listen('window', 'mouseup', () => {
      isDown = false;
      this.renderer.setStyle(element, 'cursor', 'grab');
    });

    this.renderer.listen('window', 'mousemove', (event: MouseEvent) => {
      event.preventDefault();
      if (isDown) {
        const screenLayout = this.el.nativeElement.parentElement;
        const screenRect = screenLayout.getBoundingClientRect();
        const elementRect = element.getBoundingClientRect();

        let left = event.clientX + offset.x;
        let top = event.clientY + offset.y;

        left = Math.max(screenRect.left, Math.min(left, screenRect.right - elementRect.width));
        top = Math.max(screenRect.top, Math.min(top, screenRect.bottom - elementRect.height));

        this.renderer.setStyle(element, 'left', `${left}px`);
        this.renderer.setStyle(element, 'top', `${top}px`);
        this.renderer.setStyle(element, 'transform', `translate(0, 0)`);
      }
    });
  }
}
