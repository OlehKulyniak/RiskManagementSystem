export class CriteriaExpertCoef {
  public criteriaName: string;
  public expertCoefficient: number;
  public expertGrade: number;

  public constructor(criteriaName: string) {
    this.criteriaName = criteriaName;
    this.expertCoefficient = 0;
    this.expertGrade = 0;
  }
}
