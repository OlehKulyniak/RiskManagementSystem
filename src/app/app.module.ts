import { NgModule, LOCALE_ID } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CriteriaCoefficientComponent } from './criteria-coefficient/criteria-coefficient.component';
import { DiagramVisualizationComponent } from './diagram-visualization/diagram-visualization.component';
import { ComplexGradesComponent } from './complex-grades/complex-grades.component';
import { WeightCoefficientComponent } from './weight-coefficient/weight-coefficient.component';

@NgModule({
  declarations: [
    AppComponent,
    CriteriaCoefficientComponent,
    DiagramVisualizationComponent,
    ComplexGradesComponent,
    WeightCoefficientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BaseChartDirective,
  ],
  providers: [
    provideClientHydration(),
    { provide: LOCALE_ID, useValue: 'it-IT' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
