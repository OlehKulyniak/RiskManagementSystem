export class PotentialUserGrade {
  private _userGrade: number;

  public constructor() {
    this._userGrade = 0;
  }

  public get userGrade(): number {
    return this._userGrade;
  }

  public set userGrade(userGrade: number) {
    this._userGrade = userGrade;
  }
}
