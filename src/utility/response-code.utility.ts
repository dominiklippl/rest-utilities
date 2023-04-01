import ResponseCode from '../express/response/response-code';

export default class ResponseCodeUtility {
  public static getByHttpCode(code: number): ResponseCode | undefined {
    // @ts-ignore
    let keys = Object.keys(ResponseCode).filter((x) => ResponseCode[x] === code);
    // @ts-ignore
    return keys.length > 0 ? ResponseCode[keys[0]] : undefined;
  }
}
