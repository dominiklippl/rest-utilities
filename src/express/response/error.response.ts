import AbstractResponse from './abstract-response';
import { Response } from 'express';
import { ResponseStatus } from './response-status';
import ResponseCode from './response-code';

export default class ErrorResponse extends AbstractResponse {
  private readonly code: number;
  private readonly message: string;

  private readonly data: any;

  constructor(code: ResponseCode, message: string, data?: any);
  constructor(code: number, message: string, data?: any) {
    super(ResponseStatus.ERROR);
    this.message = message;
    this.code = code;
    this.data = data;
  }

  send(res: Response, plain: boolean = false): ErrorResponse {
    res.status(this.code).send(plain ? (this.message ? this.message : this.data) : this);
    return this;
  }

  public getCode(): number {
    return this.code;
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
