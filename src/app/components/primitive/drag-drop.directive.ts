import { ComponentFactoryResolver, Directive, ElementRef, HostListener, Renderer2, RendererFactory2, ViewContainerRef } from '@angular/core';
import { IconComponent } from './icon/icon.component';

@Directive({
  selector: '[app-draggable]'
})
export class DragDropDirective {
  frame!: HTMLElement;
  renderer: Renderer2;
  newIcon!: HTMLElement;
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
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(IconComponent);
    const componentRef =
      this.viewContainerRef.createComponent(componentFactory);

    this.newIcon = (componentRef.hostView as any).rootNodes[0];
    this.newIcon.innerHTML = this.element.nativeElement.innerHTML;

    document.body.appendChild(this.newIcon);

    this.renderer.setStyle(this.newIcon, 'position', 'absolute');
    this.renderer.setStyle(this.newIcon, 'zIndex', '1000');
    this.renderer.setStyle(this.newIcon, 'pointerEvents', 'none');

    const iconRect = this.element.nativeElement.getBoundingClientRect();

    this.shiftX = event.clientX - iconRect.left;
    this.shiftY = event.clientY - iconRect.top;

    const moveAt = (pageX: number, pageY: number) => {
      this.renderer.setStyle(this.newIcon, 'left', `${pageX - this.shiftX}px`);
      this.renderer.setStyle(this.newIcon, 'top', `${pageY - this.shiftY}px`);
    };

    const onMouseMove = (moveEvent: MouseEvent) => {
      moveAt(moveEvent.pageX, moveEvent.pageY);
    };

    document.addEventListener('mousemove', onMouseMove);

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      const frameRect = this.frame.getBoundingClientRect();
      const iconRect = this.newIcon.getBoundingClientRect();

      const withinBounds =
        iconRect.left >= frameRect.left &&
        iconRect.top >= frameRect.top &&
        iconRect.right <= frameRect.right &&
        iconRect.bottom <= frameRect.bottom;

      if (withinBounds) {
        this.initDraggable(this.newIcon);
      } else {
        this.newIcon.remove();
      }
    };

    document.addEventListener('mouseup', onMouseUp);
  }

  private initDraggable(icon: HTMLElement): void {
    this.renderer.setStyle(icon, 'pointerEvents', 'auto');
    icon.addEventListener('mousedown', (event: MouseEvent) => {
      event.preventDefault();
      const rect = icon.getBoundingClientRect();

      this.shiftX = event.clientX - rect.left;
      this.shiftY = event.clientY - rect.top;

      const moveAt = (pageX: number, pageY: number) => {
        this.renderer.setStyle(icon, 'left', `${pageX - this.shiftX}px`);
        this.renderer.setStyle(icon, 'top', `${pageY - this.shiftY}px`);
      };

      const onMouseMove = (moveEvent: MouseEvent) => {
        moveAt(moveEvent.pageX, moveEvent.pageY);
      };

      document.addEventListener('mousemove', onMouseMove);

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        const frameRect = this.frame.getBoundingClientRect();
        const iconRect = icon.getBoundingClientRect();

        const withinBounds =
          iconRect.left >= frameRect.left &&
          iconRect.top >= frameRect.top &&
          iconRect.right <= frameRect.right &&
          iconRect.bottom <= frameRect.bottom;

        if (!withinBounds) {
          icon.remove();
        }
      };

      document.addEventListener('mouseup', onMouseUp);
    });
  }

}
