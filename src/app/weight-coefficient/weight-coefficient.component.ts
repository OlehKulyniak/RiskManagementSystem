import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExpertWeightCoefficient } from '../expertWeightCoefficient';
import { DataService } from '../dataService';
import { registerLocaleData } from '@angular/common';
import localeIT from '@angular/common/locales/it';

registerLocaleData(localeIT);

@Component({
  selector: 'app-weight-coefficient',
  templateUrl: './weight-coefficient.component.html',
  styleUrl: './weight-coefficient.component.css',
})
export class WeightCoefficientComponent implements OnDestroy {
  public expertWeightCoefficients: ExpertWeightCoefficient[];
  public expertWeightCoefficientSum: number;

  public constructor(private dataService: DataService) {
    this.expertWeightCoefficients = dataService.expertWeightCoefficients;
    this.expertWeightCoefficientSum = 0;
  }

  public changeWeightCoefficient(i: number): void {
    if (
      this.expertWeightCoefficients[i]._weightCoefficient > 10 ||
      this.expertWeightCoefficients[i]._weightCoefficient < 0
    ) {
      this.expertWeightCoefficients[i]._weightCoefficient = 0;
    }
    this.expertWeightCoefficientSum = this.getSumOfElements(
      this.expertWeightCoefficients.map((elem) => elem._weightCoefficient)
    );
  }

  public validateWeightCoefficient(newValue: number): number {
    if (newValue > 10) {
      return 10;
    } else if (newValue < 0) {
      return 0;
    }
    return newValue;
  }

  public ngOnDestroy(): void {
    this.dataService.expertWeightCoefficients = this.expertWeightCoefficients;
  }

  public getSumOfElements(valueArr: number[]) {
    return valueArr.reduce((prevElem, nextElem) => prevElem + nextElem);
  }
}
