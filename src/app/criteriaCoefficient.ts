export class CriteriaCoefficient {
  private _criteriaName: string;
  private _areaExpertCoef: number;
  private _usabilityExpertCoef: number;
  private _programmingExpertCoef: number;
  private _potentialUserCoef: number;

  public constructor(criteriaName: string) {
    this._criteriaName = criteriaName;
    this._areaExpertCoef = 0;
    this._usabilityExpertCoef = 0;
    this._programmingExpertCoef = 0;
    this._potentialUserCoef = 0;
  }

  public get criteriaName(): string {
    return this._criteriaName;
  }

  public set criteriaName(criteriaName: string) {
    this._criteriaName = criteriaName;
  }

  public get areaExpertCoef(): number {
    return this._areaExpertCoef;
  }

  public set areaExpertCoef(areaExpertCoefs: number) {
    this._areaExpertCoef = areaExpertCoefs;
  }

  public get usabilityExpertCoef(): number {
    return this._usabilityExpertCoef;
  }

  public set usabilityExpertCoef(usabilityExpertCoef: number) {
    this._usabilityExpertCoef = usabilityExpertCoef;
  }

  public get programmingExpertCoef(): number {
    return this._programmingExpertCoef;
  }

  public set programmingExpertCoef(programmingExpertCoef: number) {
    this._programmingExpertCoef = programmingExpertCoef;
  }

  public get potentialUserCoef(): number {
    return this._potentialUserCoef;
  }

  public set potentialUserCoef(potentialUserCoef: number) {
    this._potentialUserCoef = potentialUserCoef;
  }
}
