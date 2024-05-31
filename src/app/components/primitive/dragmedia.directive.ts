import { ComponentFactoryResolver, Directive, ElementRef, HostListener, Renderer2, RendererFactory2, ViewContainerRef } from '@angular/core';
import { IconComponent } from './icon/icon.component';

@Directive({
  selector: '[appImage]'
})
export class DragmediaDirective {
  frame!: HTMLElement;
  renderer: Renderer2;
  newIconContainer!: HTMLElement;
  shiftX: number = 0;
  shiftY: number = 0;

  constructor(
    private element: ElementRef,
    private rendererFactory: RendererFactory2,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.createDraggableIcon(event);
  }

  private createDraggableIcon(event: MouseEvent): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(IconComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);

    const newIcon = (componentRef.hostView as any).rootNodes[0];
    newIcon.innerHTML = this.element.nativeElement.innerHTML;

    this.newIconContainer = this.renderer.createElement('div');
    this.renderer.setStyle(this.newIconContainer, 'position', 'absolute');
    this.renderer.setStyle(this.newIconContainer, 'zIndex', '1000');
    this.renderer.setStyle(this.newIconContainer, 'backgroundColor', 'lightgray');
    this.renderer.setStyle(this.newIconContainer, 'width', '100px');
    this.renderer.setStyle(this.newIconContainer, 'height', '100px');
    this.renderer.setStyle(this.newIconContainer, 'display', 'flex');
    this.renderer.setStyle(this.newIconContainer, 'flexDirection', 'column');
    this.renderer.setStyle(this.newIconContainer, 'alignItems', 'center');
    this.renderer.setStyle(this.newIconContainer, 'justifyContent', 'center');
    this.renderer.setStyle(this.newIconContainer, 'border', '1px dashed black');
    this.renderer.setStyle(this.newIconContainer, 'padding', '5%');


    this.renderer.setStyle(newIcon, 'opacity', '15%');
    this.renderer.appendChild(this.newIconContainer, newIcon);
    const pencilContainer = this.renderer.createElement('div');
    this.renderer.setStyle(pencilContainer, 'position', 'absolute');
    this.renderer.setStyle(pencilContainer, 'top', '100%');
    this.renderer.setStyle(pencilContainer, 'left', '0');
    this.renderer.setStyle(pencilContainer, 'width', '100%');
    this.renderer.setStyle(pencilContainer, 'paddingTop', '5px');

    const pencilIcon = this.renderer.createElement('i');
    this.renderer.addClass(pencilIcon, 'fas');
    this.renderer.addClass(pencilIcon, 'fa-pencil-alt'); 

    this.renderer.setStyle(pencilIcon, 'fontSize', '20px');
    this.renderer.setStyle(pencilIcon, 'color', 'black');
    this.renderer.setStyle(pencilIcon, 'margin', '5px');
    
    
    const input = this.renderer.createElement('input');
    this.renderer.setAttribute(input, 'placeholder', 'Enter Url');
    this.renderer.setStyle(input, 'width', '90%');
    this.renderer.setStyle(input, 'marginTop', '5px');
   
    this.renderer.listen(pencilContainer, 'click', () => {
   
    const isInputVisible = input.style.display === 'block';

  if (isInputVisible) {
   
    input.style.display = 'none';
    pencilIcon.style.display = 'block';
  } else {
    
    input.style.display = 'block';
    pencilIcon.style.display = 'none';
    this.renderer.appendChild(pencilContainer, input);
    input.focus();
  }
    });

    this.renderer.listen(input, 'input', () => {
      
      if (input.value.trim() === '') {
        
        pencilIcon.style.display = 'none';
      } 
        pencilIcon.style.display = 'none';
      
    });

    document.addEventListener('click', (event) => {
      
      if (!input.contains(event.target as Node) && event.target !== pencilIcon) {
        input.style.display = 'none';
        pencilIcon.style.display = 'block';
      }
    });

   
    this.renderer.listen(input, 'keypress', (event: KeyboardEvent) => {
      if (event.key === 'Enter' && input.value.trim() !== '') {
        const mediaUrl = input.value.trim();
    
        const imagePattern = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/gi;
        const youtubePattern = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    
        if (mediaUrl.match(imagePattern)) {
          const image = new Image();
          image.src = mediaUrl;
          image.onload = () => {
            const containerWidth = this.newIconContainer.offsetWidth;
            const containerHeight = this.newIconContainer.offsetHeight;
    
            const imageWidth = image.width;
            const imageHeight = image.height;
    
            if (imageWidth > containerWidth || imageHeight > containerHeight) {
              const widthScale = containerWidth / imageWidth;
              const heightScale = containerHeight / imageHeight;
              const scale = Math.min(widthScale, heightScale);
    
              const newWidth = Math.round(imageWidth * scale);
              const newHeight = Math.round(imageHeight * scale);
    
              image.width = newWidth;
              image.height = newHeight;
            }
    
            input.style.display = 'none';
            pencilIcon.style.display = 'block';
            this.newIconContainer.style.backgroundColor = 'white';
    
            while (this.newIconContainer.firstChild) {
              this.newIconContainer.removeChild(this.newIconContainer.firstChild);
            }
    
            this.renderer.appendChild(this.newIconContainer, image);
          };
          image.onerror = () => {
            alert('Failed to load image. Please enter a valid image URL.');
          };
        } else if (mediaUrl.match(youtubePattern)) {
          const iframe = this.renderer.createElement('iframe');
          iframe.src = mediaUrl.replace("watch?v=", "embed/");
          this.renderer.setStyle(iframe, 'width', '100%');
          this.renderer.setStyle(iframe, 'height', '100%');
          this.renderer.setStyle(iframe, 'border', 'none');
    
          input.style.display = 'none';
          pencilIcon.style.display = 'none';
          this.newIconContainer.style.backgroundColor = 'white';
    
          while (this.newIconContainer.firstChild) {
              this.newIconContainer.removeChild(this.newIconContainer.firstChild);
          }   
          this.renderer.appendChild(this.newIconContainer, iframe);
        } else {
          alert('Invalid media URL format. Please enter a valid image or YouTube URL.');
        }
      }
    });
    
    this.renderer.appendChild(pencilContainer, pencilIcon); 
    this.renderer.appendChild(this.newIconContainer, pencilContainer);

    document.body.appendChild(this.newIconContainer);
    const iconRect = this.element.nativeElement.getBoundingClientRect();

    this.shiftX = event.clientX - iconRect.left;
    this.shiftY = event.clientY - iconRect.top;

    const moveAt = (pageX: number, pageY: number) => {
      this.renderer.setStyle(this.newIconContainer, 'left', `${pageX - this.shiftX}px`);
      this.renderer.setStyle(this.newIconContainer, 'top', `${pageY - this.shiftY}px`);
    };

    const onMouseMove = (moveEvent: MouseEvent) => {
      moveAt(moveEvent.pageX, moveEvent.pageY);
    };

    document.addEventListener('mousemove', onMouseMove);

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      const frameRect = this.frame.getBoundingClientRect();
      const iconRect = this.newIconContainer.getBoundingClientRect();

      const withinBounds =
        iconRect.left >= frameRect.left &&
        iconRect.top >= frameRect.top &&
        iconRect.right <= frameRect.right &&
        iconRect.bottom <= frameRect.bottom;

      if (withinBounds) {
        this.initDraggable(this.newIconContainer);
      } else {
        this.newIconContainer.remove();
      }
    };

    document.addEventListener('mouseup', onMouseUp);
  }

  private initDraggable(container: HTMLElement): void {
    const onMouseDown = (event: MouseEvent) => {
      event.preventDefault();
      const rect = container.getBoundingClientRect();

      this.shiftX = event.clientX - rect.left;
      this.shiftY = event.clientY - rect.top;

      const moveAt = (pageX: number, pageY: number) => {
        this.renderer.setStyle(container, 'left', `${pageX - this.shiftX}px`);
        this.renderer.setStyle(container, 'top', `${pageY - this.shiftY}px`);
      };

      const onMouseMove = (moveEvent: MouseEvent) => {
        moveAt(moveEvent.pageX, moveEvent.pageY);
      };

      document.addEventListener('mousemove', onMouseMove);

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        const frameRect = this.frame.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const withinBounds =
          containerRect.left >= frameRect.left &&
          containerRect.top >= frameRect.top &&
          containerRect.right <= frameRect.right &&
          containerRect.bottom <= frameRect.bottom;

        if (!withinBounds) {
          container.remove();
        }
      };

      document.addEventListener('mouseup', onMouseUp);
    };
    container.addEventListener('mousedown', onMouseDown);
  }

}
