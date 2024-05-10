import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionMainComponent } from './accordion-main.component';

describe('AccordionMainComponent', () => {
  let component: AccordionMainComponent;
  let fixture: ComponentFixture<AccordionMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccordionMainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccordionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
