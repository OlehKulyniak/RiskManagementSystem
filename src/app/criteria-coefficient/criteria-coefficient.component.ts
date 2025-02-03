import { Component, OnDestroy } from '@angular/core';
import { CriteriaCoefficient } from '../criteriaCoefficient';
import { ExpertGrade } from '../expertGrade';
import { DataService } from '../dataService';
import { registerLocaleData } from "@angular/common";
import localeIT from "@angular/common/locales/it";

registerLocaleData(localeIT);

@Component({
  selector: 'app-criteria-coefficient',
  templateUrl: './criteria-coefficient.component.html',
  styleUrl: './criteria-coefficient.component.css',
})
export class CriteriaCoefficientComponent implements OnDestroy {
  public criteriaCoefficients: CriteriaCoefficient[];
  public expertGrades: ExpertGrade[];
  public potentialUserGrades: number[][];
  public criteriaCoefficientSumArr: number[];
  public expertGradeSumArr: number[];
  public areaExpertCoefSum: number;
  public usabilityExpertCoefSum: number;
  public programmingExpertCoefSum: number;
  public potentialUserCoefSum: number;
  public areaExpertGradeSum: number;
  public usabilityExpertGradeSum: number;
  public programmingExpertGradeSum: number;
  public potentialUserGradeSum: number;

  public constructor(private dataService: DataService) {
    this.criteriaCoefficients = dataService.criteriaCoefficients;
    this.expertGrades = dataService.expertGrades;
    this.potentialUserGrades = dataService.potentialUserGrades;
    this.areaExpertCoefSum = 0;
    this.usabilityExpertCoefSum = 0;
    this.programmingExpertCoefSum = 0;
    this.potentialUserCoefSum = 0;
    this.criteriaCoefficientSumArr = [].constructor(
      this.criteriaCoefficients.length
    );
    this.expertGradeSumArr = [].constructor(this.criteriaCoefficients.length);
    this.areaExpertGradeSum = 0;
    this.usabilityExpertGradeSum = 0;
    this.programmingExpertGradeSum = 0;
    this.potentialUserGradeSum = 0;
    this.updateCoefficientTable();
    this.updateExpertGradeTable();
  }

  public updateCoefficientTable(): void {
    this.areaExpertCoefSum = this.getSumOfElements(
      this.criteriaCoefficients.map((elem) => elem.areaExpertCoef)
    );
    this.usabilityExpertCoefSum = this.getSumOfElements(
      this.criteriaCoefficients.map((elem) => elem.usabilityExpertCoef)
    );
    this.programmingExpertCoefSum = this.getSumOfElements(
      this.criteriaCoefficients.map((elem) => elem.programmingExpertCoef)
    );
    this.potentialUserCoefSum = this.getSumOfElements(
      this.criteriaCoefficients.map((elem) => elem.potentialUserCoef)
    );
    for (let i = 0; i < this.criteriaCoefficients.length; i++) {
      this.criteriaCoefficientSumArr[i] =
        this.criteriaCoefficients[i].areaExpertCoef +
        this.criteriaCoefficients[i].usabilityExpertCoef +
        this.criteriaCoefficients[i].programmingExpertCoef +
        this.criteriaCoefficients[i].potentialUserCoef;
    }
  }

  public updateAreaCoefficient(i: number): void {
    this.criteriaCoefficients[i].areaExpertCoef = this.validateInputValue(
      this.criteriaCoefficients[i].areaExpertCoef
    );
    this.updateCoefficientTable();
  }

  public updateUsabilityCoefficient(i: number): void {
    this.criteriaCoefficients[i].usabilityExpertCoef = this.validateInputValue(
      this.criteriaCoefficients[i].usabilityExpertCoef
    );
    this.updateCoefficientTable();
  }

  public updateProgrammingCoefficient(i: number): void {
    this.criteriaCoefficients[i].programmingExpertCoef =
      this.validateInputValue(
        this.criteriaCoefficients[i].programmingExpertCoef
      );
    this.updateCoefficientTable();
  }

  public updatePotentialUserCoefficient(i: number): void {
    this.criteriaCoefficients[i].potentialUserCoef = this.validateInputValue(
      this.criteriaCoefficients[i].potentialUserCoef
    );
    this.updateCoefficientTable();
  }

  public updateAreaGrade(i: number): void {
    this.expertGrades[i].areaExpertGrade = this.validateInputValue(
      this.expertGrades[i].areaExpertGrade
    );
    this.updateExpertGradeTable();
  }

  public updateUsabilityGrade(i: number): void {
    this.expertGrades[i].usabilityExpertGrade = this.validateInputValue(
      this.expertGrades[i].usabilityExpertGrade
    );
    this.updateExpertGradeTable();
  }

  public updateProgrammingGrade(i: number): void {
    this.expertGrades[i].programmingExpertGrade = this.validateInputValue(
      this.expertGrades[i].programmingExpertGrade
    );
    this.updateExpertGradeTable();
  }

  public updatePotentialUserGrade(i: number, j: number, event: Event): void {
    this.potentialUserGrades[i][j] = this.validateInputValue(
      Number((event.target as HTMLInputElement).value)
    );
    this.updateExpertGradeTable();
  }

  public validateInputValue(newValue: number): number {
    if (newValue > 10) {
      return 10;
    } else if (newValue < 0) {
      return 0;
    }
    return newValue;
  }

  public updateExpertGradeTable() {
    for (let i = 0; i < this.expertGradeSumArr.length; i++) {
      this.expertGradeSumArr[i] =
        this.expertGrades[i].areaExpertGrade +
        this.expertGrades[i].usabilityExpertGrade +
        this.expertGrades[i].programmingExpertGrade +
        this.expertGrades[i].potentialUserGrade;
    }
    this.areaExpertGradeSum = this.getSumOfElements(
      this.expertGrades.map((elem) => elem.areaExpertGrade)
    );
    this.usabilityExpertGradeSum = this.getSumOfElements(
      this.expertGrades.map((elem) => elem.usabilityExpertGrade)
    );
    this.programmingExpertGradeSum = this.getSumOfElements(
      this.expertGrades.map((elem) => elem.programmingExpertGrade)
    );
    this.potentialUserGradeSum = this.getSumOfElements(
      this.expertGrades.map((elem) => elem.potentialUserGrade)
    );
    for (let i = 0; i < this.criteriaCoefficients.length; i++) {
      this.expertGrades[i].potentialUserGrade =
        this.getSumOfElements(this.potentialUserGrades[i]) /
        this.potentialUserGrades[i].length;
    }
  }

  public ngOnDestroy(): void {
    this.dataService.criteriaCoefficientSumArr = this.criteriaCoefficientSumArr;
    this.dataService.areaExpertCoefSum = this.areaExpertCoefSum;
    this.dataService.usabilityExpertCoefSum = this.usabilityExpertCoefSum;
    this.dataService.programmingExpertCoefSum = this.programmingExpertCoefSum;
    this.dataService.potentialUserCoefSum = this.potentialUserCoefSum;
  }

  public getSumOfElements(valueArr: number[]): number {
    return valueArr.reduce((prevElem, nextElem) => prevElem + nextElem, 0);
  }
}
