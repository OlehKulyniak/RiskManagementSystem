import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightCoefficientComponent } from './weight-coefficient.component';

describe('WeightCoefficientComponent', () => {
  let component: WeightCoefficientComponent;
  let fixture: ComponentFixture<WeightCoefficientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeightCoefficientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeightCoefficientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
