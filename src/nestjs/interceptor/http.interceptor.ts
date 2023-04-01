import { NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { clc, yellow } from '@nestjs/common/utils/cli-colors.util';
import { colors } from '../utilities/color.utility';

export class HttpInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.getArgByIndex(0);

    const method = request.method;
    const url = request.url;
    const user = request.user;

    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            ` --> ${this.formatMethod(method)} ${clc.green(url)} ${yellow(
              `+${Date.now() - now}ms`,
            )} ${user ? colors.bg_green(`(${user.name})`) : ''} `,
          ),
        ),
      );
  }

  private formatMethod(method: string): string {
    switch (method) {
      case 'POST':
        return clc.green(method);
      case 'PUT':
      case 'PATCH':
        return clc.yellow(method);
      case 'GET':
        return colors.blue(method);
      case 'DELETE':
        return clc.red(method);
      default:
        return colors.bg_blue(method);
    }
  }
}
