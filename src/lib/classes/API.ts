export abstract class API{

  protected getBaseUrl() : string{
      return null;
  }
}

export function BaseUrl(url: string) {
    return function <TFunction extends Function>(Target: TFunction): TFunction {
        Target.prototype.getBaseUrl = function() {
            return url;
        };
        return Target;
    };
}
