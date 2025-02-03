import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagramVisualizationComponent } from './diagram-visualization.component';

describe('DiagramVisualizationComponent', () => {
  let component: DiagramVisualizationComponent;
  let fixture: ComponentFixture<DiagramVisualizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiagramVisualizationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiagramVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
