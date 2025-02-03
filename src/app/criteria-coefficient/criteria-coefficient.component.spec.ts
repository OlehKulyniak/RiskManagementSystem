import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaCoefficientComponent } from './criteria-coefficient.component';

describe('CriteriaCoefficientComponent', () => {
  let component: CriteriaCoefficientComponent;
  let fixture: ComponentFixture<CriteriaCoefficientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CriteriaCoefficientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CriteriaCoefficientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
