import { ResponseStatus } from './response-status';
import { Response } from 'express';
import ResponseCode from './response-code';

export default abstract class AbstractResponse {
  protected readonly status: ResponseStatus;

  protected constructor(status: ResponseStatus) {
    this.status = status;
  }

  public abstract send(res: Response): AbstractResponse;
  public abstract send(res: Response, plain: boolean): AbstractResponse;
  /**
   * Send the response
   * @param res express response object
   * @param plain if true, only the message or data field get sent (depends on which field is set)
   */
  public abstract send(res: Response, plain: boolean): AbstractResponse;

  /**
   * Return the defined response code
   */
  public abstract getCode(): ResponseCode;

  /**
   * Returns the defined response status
   */
  public getStatus(): ResponseStatus {
    return this.status;
  }
}
