import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { DataService } from '../dataService';
import { CriteriaExpertCoef } from './criteriaExpertCoef';
import { Chart, ChartData, ChartConfiguration, registerables } from 'chart.js';
import { registerLocaleData } from '@angular/common';
import localeIT from '@angular/common/locales/it';
import { isPlatformBrowser } from '@angular/common';

Chart.register(...registerables);
registerLocaleData(localeIT);

@Component({
  selector: 'app-diagram-visualization',
  templateUrl: './diagram-visualization.component.html',
  styleUrl: './diagram-visualization.component.css',
})
export class DiagramVisualizationComponent implements OnInit {
  public criteriaExpertCoefs: CriteriaExpertCoef[];
  public criteriaExpertCoefSum: number;
  public expertWeightCoefficient: number;
  public diagramType: string;
  public circleParts: number[];
  public circlePartsDegree: number[];
  public circlePartStartDegree: number;
  public generalCoefficients: number[];
  public aParamCoefficients: number[];
  public bParamCoefficients: number[];
  public cParamCoefficients: number[];
  public firstPartAreaParams: number[];
  public secondPartAreaParams: number[];
  public resultAreaParams: number[];
  public resultArea: number;
  public totalArea: number;
  public zCoefficient: number;
  public polarAreaChartData: ChartData<'radar'>;
  public polarAreaChartOptions: ChartConfiguration<'radar'>['options'];
  public isBrowserPlatform: boolean;

  constructor(
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platform_id: object
  ) {
    this.isBrowserPlatform = isPlatformBrowser(platform_id);
    this.criteriaExpertCoefs = [];

    for (let i = 0; i < dataService.criteriaCoefficients.length; i++) {
      this.criteriaExpertCoefs.push(
        new CriteriaExpertCoef(dataService.criteriaCoefficients[i].criteriaName)
      );
    }
    this.expertWeightCoefficient = 0;
    this.criteriaExpertCoefSum = 0;

    this.circleParts = [].constructor(this.criteriaExpertCoefs.length);
    this.circlePartsDegree = [].constructor(this.criteriaExpertCoefs.length);
    this.circlePartStartDegree = 0;
    this.generalCoefficients = [].constructor(this.criteriaExpertCoefs.length);
    this.aParamCoefficients = [].constructor(this.criteriaExpertCoefs.length);
    this.bParamCoefficients = [].constructor(this.criteriaExpertCoefs.length);
    this.cParamCoefficients = [].constructor(this.criteriaExpertCoefs.length);
    this.firstPartAreaParams = [].constructor(this.criteriaExpertCoefs.length);
    this.secondPartAreaParams = [].constructor(this.criteriaExpertCoefs.length);
    this.resultAreaParams = [].constructor(this.criteriaExpertCoefs.length);
    this.diagramType = '';
    this.totalArea = 0;
    this.resultArea = 0;
    this.zCoefficient = 0;
    this.polarAreaChartData = { datasets: [] };
    this.polarAreaChartOptions = {};
  }

  public ngOnInit(): void {
    this.initializeDiagramData(this.dataService, 'AreaExpert');
    this.fillDiagramAreaParams();
    this.polarAreaChartData = {
      labels: this.circlePartsDegree,
      datasets: [
        {
          data: this.generalCoefficients,
          backgroundColor: ['#E7F285'],
          borderWidth: 2,
          borderColor: '#000000',
          pointRadius: 0,
        },
      ],
    };
    this.polarAreaChartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
    };
  }

  public updateDiagramData(dataType: string): void {
    this.initializeDiagramData(this.dataService, dataType);
    this.fillDiagramAreaParams();
    this.polarAreaChartData = {
      labels: this.circlePartsDegree,
      datasets: [
        {
          data: this.generalCoefficients,
          backgroundColor: ['#CCCC00'],
          borderColor: '#000000',
          pointRadius: 0,
        },
      ],
    };
  }

  public fillDiagramAreaParams() {
    this.criteriaExpertCoefSum = this.criteriaExpertCoefs
      .map((elem) => elem.expertCoefficient)
      .reduce((prevElem, nextElem) => prevElem + nextElem, 0);
    for (let i = 0; i < this.circleParts.length; i++) {
      this.circleParts[i] =
        (this.criteriaExpertCoefs[i].expertCoefficient /
          this.criteriaExpertCoefSum) *
        360;
    }

    this.circlePartStartDegree = Number((this.circleParts[0] / 2).toFixed(2));
    this.circlePartsDegree[0] = Number(
      (this.circlePartStartDegree + this.circleParts[0]).toFixed(0)
    );

    for (let i = 0; i < this.circlePartsDegree.length - 1; i++) {
      this.circlePartsDegree[i + 1] = Number(
        (this.circlePartsDegree[i] + this.circleParts[i]).toFixed(0)
      );
    }

    for (let i = 0; i < this.generalCoefficients.length; i++) {
      this.generalCoefficients[i] =
        (this.criteriaExpertCoefs[i].expertCoefficient *
          this.criteriaExpertCoefs[i].expertGrade *
          this.expertWeightCoefficient) /
        10;
      this.aParamCoefficients[i] =
        this.generalCoefficients[i] *
        Math.sin(this.getRadians(this.circlePartsDegree[i]));
      this.bParamCoefficients[i] =
        this.generalCoefficients[i] *
        Math.cos(this.getRadians(this.circlePartsDegree[i]));
      this.cParamCoefficients[i] = Math.sqrt(
        this.aParamCoefficients[i] ** 2 + this.bParamCoefficients[i] ** 2
      );
    }

    let secondIndex;
    for (let i = 0; i < this.firstPartAreaParams.length; i++) {
      secondIndex = i + 1 < this.firstPartAreaParams.length ? i + 1 : 0;
      this.firstPartAreaParams[i] =
        this.aParamCoefficients[i] * this.bParamCoefficients[secondIndex];
      this.secondPartAreaParams[i] =
        this.bParamCoefficients[i] * this.aParamCoefficients[secondIndex];
      this.resultAreaParams[i] =
        this.secondPartAreaParams[i] - this.firstPartAreaParams[i];
    }
    this.resultArea = this.resultAreaParams.reduce(
      (prevElem, nextElem) => prevElem + nextElem,
      0
    );
    this.totalArea = Math.PI * (this.criteriaExpertCoefs.length * 10) ** 2;
    this.zCoefficient = this.resultArea / this.totalArea;
  }

  private initializeDiagramData(
    dataService: DataService,
    dataType: string
  ): void {
    this.diagramType = dataType;
    for (let i = 0; i < dataService.criteriaCoefficients.length; i++) {
      let expertCoefficient = 0;
      let expertGrade = 0;

      if (dataType == 'AreaExpert') {
        expertCoefficient = dataService.criteriaCoefficients[i].areaExpertCoef;
        expertGrade = dataService.expertGrades[i].areaExpertGrade;
      } else if (dataType == 'UsabilityExpert') {
        expertCoefficient =
          dataService.criteriaCoefficients[i].usabilityExpertCoef;
        expertGrade = dataService.expertGrades[i].usabilityExpertGrade;
      } else if (dataType == 'ProgrammingExpert') {
        expertCoefficient =
          dataService.criteriaCoefficients[i].programmingExpertCoef;
        expertGrade = dataService.expertGrades[i].programmingExpertGrade;
      } else if (dataType == 'PotentialUser') {
        expertCoefficient =
          dataService.criteriaCoefficients[i].potentialUserCoef;
        expertGrade = dataService.expertGrades[i].potentialUserGrade;
      } else {
        expertCoefficient =
          (dataService.criteriaCoefficients[i].areaExpertCoef +
            dataService.criteriaCoefficients[i].usabilityExpertCoef +
            dataService.criteriaCoefficients[i].programmingExpertCoef +
            dataService.criteriaCoefficients[i].potentialUserCoef) /
          4;
        expertGrade =
          (dataService.expertGrades[i].usabilityExpertGrade +
            dataService.expertGrades[i].usabilityExpertGrade +
            dataService.expertGrades[i].programmingExpertGrade +
            dataService.expertGrades[i].potentialUserGrade) /
          4;
      }
      this.criteriaExpertCoefs[i].expertCoefficient = expertCoefficient;
      this.criteriaExpertCoefs[i].expertGrade = expertGrade;
    }
    let expertWeightCoefficientIndex = 0;

    if (dataType == 'AreaExpert') {
      expertWeightCoefficientIndex = 0;
    } else if (dataType == 'UsabilityExpert') {
      expertWeightCoefficientIndex = 1;
    } else if (dataType == 'ProgrammingExpert') {
      expertWeightCoefficientIndex = 2;
    } else if (dataType == 'PotentialUser') {
      expertWeightCoefficientIndex = 3;
    }

    if (dataType != 'Average') {
      this.expertWeightCoefficient =
        dataService.expertWeightCoefficients[
          expertWeightCoefficientIndex
        ]._weightCoefficient;
    } else {
      for (let i = 0; i < dataService.expertWeightCoefficients.length; i++) {
        this.expertWeightCoefficient +=
          dataService.expertWeightCoefficients[i]._weightCoefficient;
      }
      this.expertWeightCoefficient /= 4;
    }
  }

  public getDiagramType(): string {
    if (this.diagramType == 'AreaExpert') {
      return 'Експерт галузі';
    } else if (this.diagramType == 'UsabilityExpert') {
      return 'Експерт юзабіліті';
    } else if (this.diagramType == 'ProgrammingExpert') {
      return 'Експерт з програмування';
    } else {
      return 'Потенційні користувачі';
    }
  }

  public getRadians(degreeValue: number) {
    return (degreeValue / 180) * Math.PI;
  }
}
