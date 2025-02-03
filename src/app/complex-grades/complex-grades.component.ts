import { Component } from '@angular/core';
import { CriteriaGrade } from './criteriaGrade';
import { DataService } from '../dataService';
import { registerLocaleData } from "@angular/common";
import localeIT from "@angular/common/locales/it";

registerLocaleData(localeIT);

@Component({
  selector: 'app-complex-grades',
  templateUrl: './complex-grades.component.html',
  styleUrl: './complex-grades.component.css',
})
export class ComplexGradesComponent {
  public criteriaGrades: CriteriaGrade[];
  public criteriaWeightCoefs: number[];
  public criteriaWeightCoefSum: number;
  public averagedGrades: number[];
  public expertWeightedGrades: number[];
  public productCoefficients: number[];
  public xProductCoefficients: number[];

  constructor(private dataService: DataService) {
    this.criteriaGrades = [];
    this.criteriaWeightCoefs = [];
    this.productCoefficients = [].constructor(this.criteriaGrades.length);
    this.xProductCoefficients = [].constructor(this.criteriaGrades.length);
    this.averagedGrades = [].constructor(6);
    this.expertWeightedGrades = [].constructor(6);

    for (let i = 0; i < this.dataService.criteriaCoefficients.length; i++) {
      this.criteriaGrades.push(
        new CriteriaGrade(dataService.criteriaCoefficients[i].criteriaName)
      );
      this.criteriaGrades[i]._areaExpertGrade =
        dataService.criteriaCoefficients[i].areaExpertCoef *
        dataService.expertGrades[i].areaExpertGrade;
      this.criteriaGrades[i]._usabilityExpertGrade =
        dataService.criteriaCoefficients[i].usabilityExpertCoef *
        dataService.expertGrades[i].usabilityExpertGrade;
      this.criteriaGrades[i]._programmingExpertGrade =
        dataService.criteriaCoefficients[i].programmingExpertCoef *
        dataService.expertGrades[i].programmingExpertGrade;
      this.criteriaGrades[i]._potentialUserGrade =
        dataService.criteriaCoefficients[i].potentialUserCoef *
        dataService.expertGrades[i].potentialUserGrade;
    }
    this.criteriaWeightCoefs = dataService.expertWeightCoefficients.map(
      (elem) => elem._weightCoefficient / 10
    );
    this.criteriaWeightCoefSum = this.criteriaWeightCoefs.reduce(
      (prevElem, nextElem) => prevElem + nextElem,
      0
    );
  }

  public ngOnInit(): void {
    for (let i = 0; i < this.criteriaGrades.length; i++) {
      this.productCoefficients[i] =
        (this.criteriaGrades[i]._areaExpertGrade * this.criteriaWeightCoefs[0] +
          this.criteriaGrades[i]._usabilityExpertGrade *
            this.criteriaWeightCoefs[1] +
          this.criteriaGrades[i]._programmingExpertGrade *
            this.criteriaWeightCoefs[2] +
          this.criteriaGrades[i]._usabilityExpertGrade *
            this.criteriaWeightCoefs[3]) /
        this.criteriaWeightCoefSum;

      this.xProductCoefficients[i] =
        this.productCoefficients[i] /
        this.dataService.criteriaCoefficientSumArr[i] /
        4;
    }

    this.averagedGrades[0] =
      this.getSumOfElements(
        this.criteriaGrades.map((elem) => elem._areaExpertGrade)
      ) / this.dataService.areaExpertCoefSum;
    this.averagedGrades[1] =
      this.getSumOfElements(
        this.criteriaGrades.map((elem) => elem._usabilityExpertGrade)
      ) / this.dataService.usabilityExpertCoefSum;
    this.averagedGrades[2] =
      this.getSumOfElements(
        this.criteriaGrades.map((elem) => elem._programmingExpertGrade)
      ) / this.dataService.programmingExpertCoefSum;
    this.averagedGrades[3] =
      this.getSumOfElements(
        this.criteriaGrades.map((elem) => elem._potentialUserGrade)
      ) / this.dataService.potentialUserCoefSum;
    this.averagedGrades[4] =
      this.getSumOfElements(this.productCoefficients) /
      this.productCoefficients.length /
      (this.getSumOfElements(this.dataService.criteriaCoefficientSumArr) /
        this.dataService.criteriaCoefficientSumArr.length);
    this.averagedGrades[5] =
      this.getSumOfElements(this.xProductCoefficients) /
      this.xProductCoefficients.length;

    let averagedGradeSum = 0;
    let expertWeightedGradeSum = 0;
    for (let i = 0; i < 4; i++) {
      this.expertWeightedGrades[i] =
        this.averagedGrades[i] * this.criteriaWeightCoefs[i];
      averagedGradeSum += this.averagedGrades[i];
      expertWeightedGradeSum += this.expertWeightedGrades[i];
    }

    this.expertWeightedGrades[4] = averagedGradeSum / 4;
    this.expertWeightedGrades[5] =
      expertWeightedGradeSum / 4 / this.criteriaWeightCoefSum;
  }

  public getSumOfElements(valueArr: number[]): number {
    return valueArr.reduce((prevElem, nextElem) => prevElem + nextElem, 0);
  }
}
