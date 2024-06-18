import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemogridComponent } from './layouts.component';

describe('DemogridComponent', () => {
  let component: DemogridComponent;
  let fixture: ComponentFixture<DemogridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemogridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemogridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
