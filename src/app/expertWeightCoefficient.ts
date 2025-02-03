export class ExpertWeightCoefficient {
  public _expertType: string;
  public _weightCoefficient: number;

  public constructor(expertType: string) {
    this._expertType = expertType;
    this._weightCoefficient = 0;
  }
}
