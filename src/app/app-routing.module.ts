import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriteriaCoefficientComponent } from './criteria-coefficient/criteria-coefficient.component';
import { ComplexGradesComponent } from './complex-grades/complex-grades.component';
import { DiagramVisualizationComponent } from './diagram-visualization/diagram-visualization.component';
import { WeightCoefficientComponent } from './weight-coefficient/weight-coefficient.component';

const routes: Routes = [
  { path: 'criteria/coefficients', component: CriteriaCoefficientComponent },
  { path: 'grade/complex', component: ComplexGradesComponent },
  { path: 'diagram/visualization', component: DiagramVisualizationComponent },
  {
    path: 'expert/weight/coefficients',
    component: WeightCoefficientComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
