import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexGradesComponent } from './complex-grades.component';

describe('ComplexGradesComponent', () => {
  let component: ComplexGradesComponent;
  let fixture: ComponentFixture<ComplexGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComplexGradesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComplexGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
