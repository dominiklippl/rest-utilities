import AbstractResponse from './abstract-response';
import { Response } from 'express';
import { ResponseStatus } from './response-status';
import ResponseCode from './response-code';

export default class SuccessResponse extends AbstractResponse {
  private readonly message: string;
  private readonly data: any;

  constructor(message: string, data?: any) {
    super(ResponseStatus.SUCCESS);
    this.message = message;
    this.data = data;
  }

  send(res: Response, plain: boolean = false): SuccessResponse {
    res.status(this.getCode()).send(plain ? (this.message ? this.message : this.data) : this);
    return this;
  }

  public getCode(): ResponseCode {
    return ResponseCode.OK;
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
