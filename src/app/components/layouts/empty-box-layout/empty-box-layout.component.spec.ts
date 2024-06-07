import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyBoxLayoutComponent } from './empty-box-layout.component';

describe('EmptyBoxLayoutComponent', () => {
  let component: EmptyBoxLayoutComponent;
  let fixture: ComponentFixture<EmptyBoxLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyBoxLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmptyBoxLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
