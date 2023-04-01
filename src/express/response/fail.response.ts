import AbstractResponse from './abstract-response';
import { ResponseStatus } from './response-status';
import { Response } from 'express';
import ResponseCode from './response-code';

export default class FailResponse extends AbstractResponse {
  private readonly message: string;
  private readonly data: any;

  constructor(message: string, data?: any) {
    super(ResponseStatus.FAILED);
    this.message = message;
    this.data = data;
  }

  public send(res: Response, plain: boolean = false): FailResponse {
    res
      .status(ResponseCode.BAD_REQUEST)
      .send(plain ? (this.message ? this.message : this.data) : this);
    return this;
  }

  public getCode(): ResponseCode {
    return ResponseCode.BAD_REQUEST;
  }

  public getMessage(): string {
    return this.message;
  }

  public getData(): any {
    return this.data;
  }

  public toString = (): string => {
    return JSON.stringify(this);
  };
}
