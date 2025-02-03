export class CriteriaGrade {
  public criteriaName: string;
  public _areaExpertGrade: number;
  public _usabilityExpertGrade: number;
  public _programmingExpertGrade: number;
  public _potentialUserGrade: number;

  constructor(criteriaName: string) {
    this.criteriaName = criteriaName;
    this._areaExpertGrade = 0;
    this._usabilityExpertGrade = 0;
    this._programmingExpertGrade = 0;
    this._potentialUserGrade = 0;
  }
}
