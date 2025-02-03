import { Injectable } from '@angular/core';
import { CriteriaCoefficient } from './criteriaCoefficient';
import { ExpertGrade } from './expertGrade';
import { ExpertWeightCoefficient } from './expertWeightCoefficient';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public criteriaCoefficients: CriteriaCoefficient[];
  public criteriaCoefficientSumArr: number[];
  public areaExpertCoefSum: number;
  public usabilityExpertCoefSum: number;
  public programmingExpertCoefSum: number;
  public potentialUserCoefSum: number;
  public expertGrades: ExpertGrade[];
  public potentialUserGrades: number[][];
  public expertWeightCoefficients: ExpertWeightCoefficient[];

  public constructor() {
    let criteriaNames = [
      'Точність управління та обчислень',
      'Ступінь стандартності інтерфейсів',
      'Функціональна повнота',
      'Стійкість до помилок',
      'Можливість розширення',
      'Зручність роботи',
      'Простота роботи',
      'Відповідність чинним стандартам',
      'Переносимість між ПЗ',
      'Зручність навчання',
    ];
    this.criteriaCoefficients = [];
    this.expertGrades = [];
    for (let i = 0; i < criteriaNames.length; i++) {
      this.criteriaCoefficients.push(new CriteriaCoefficient(criteriaNames[i]));
      this.criteriaCoefficients[i].areaExpertCoef = Math.ceil(
        1 + Math.random() * 9
      );
      this.criteriaCoefficients[i].usabilityExpertCoef = Math.ceil(
        1 + Math.random() * 9
      );
      this.criteriaCoefficients[i].programmingExpertCoef = Math.ceil(
        1 + Math.random() * 9
      );
      this.criteriaCoefficients[i].potentialUserCoef = Math.ceil(
        1 + Math.random() * 9
      );

      this.expertGrades.push(new ExpertGrade());
      this.expertGrades[i].areaExpertGrade = Math.ceil(1 + Math.random() * 9);
      this.expertGrades[i].usabilityExpertGrade = Math.ceil(
        1 + Math.random() * 9
      );
      this.expertGrades[i].programmingExpertGrade = Math.ceil(
        1 + Math.random() * 9
      );
      this.expertGrades[i].potentialUserGrade = Math.ceil(
        1 + Math.random() * 9
      );
    }
    this.criteriaCoefficientSumArr = [];
    this.areaExpertCoefSum = 0;
    this.usabilityExpertCoefSum = 0;
    this.programmingExpertCoefSum = 0;
    this.potentialUserCoefSum = 0;

    let expertTypes = [
      'Експерт галузі',
      'Експерт юзабіліті',
      'Експерт з програмування',
      'Потенційні користувачі',
    ];
    this.expertWeightCoefficients = [];
    for (let i = 0; i < expertTypes.length; i++) {
      this.expertWeightCoefficients.push(
        new ExpertWeightCoefficient(expertTypes[i])
      );
    }

    this.potentialUserGrades = [];
    for (let i = 0; i < criteriaNames.length; i++) {
      this.potentialUserGrades.push([]);
      for (let j = 0; j < 20; j++) {
        this.potentialUserGrades[i].push(Math.ceil(4 + Math.random() * 6));
      }
    }
  }
}
