export class ExpertGrade {
  private _areaExpertGrade: number;
  private _usabilityExpertGrade: number;
  private _programmingExpertGrade: number;
  private _potentialUserGrade: number;

  public constructor() {
    this._areaExpertGrade = 0;
    this._usabilityExpertGrade = 0;
    this._programmingExpertGrade = 0;
    this._potentialUserGrade = 0;
  }

  public get areaExpertGrade(): number {
    return this._areaExpertGrade;
  }

  public set areaExpertGrade(areaExpertGrades: number) {
    this._areaExpertGrade = areaExpertGrades;
  }

  public get usabilityExpertGrade(): number {
    return this._usabilityExpertGrade;
  }

  public set usabilityExpertGrade(usabilityExpertGrades: number) {
    this._usabilityExpertGrade = usabilityExpertGrades;
  }

  public get programmingExpertGrade(): number {
    return this._programmingExpertGrade;
  }

  public set programmingExpertGrade(programmingExpertGrades: number) {
    this._programmingExpertGrade = programmingExpertGrades;
  }

  public get potentialUserGrade(): number {
    return this._potentialUserGrade;
  }

  public set potentialUserGrade(potentialUserGrades: number) {
    this._potentialUserGrade = potentialUserGrades;
  }
}
