import { ConsoleLogger } from '@nestjs/common';
import { yellow } from '@nestjs/common/utils/cli-colors.util';

export class Logger extends ConsoleLogger {
  private lastTimestampAt: number = 0;

  log(message: any, ...optionalParams: any[]) {
    if (optionalParams[0] !== 'HTTP') {
      super.log(message, optionalParams[0]);
    } else {
      process['stdout'].write(
        this.formatMessage(
          'log',
          message,
          this.formatPid(process.pid),
          'log'.toUpperCase().padStart(7, ' '),
          yellow(`[HTTP]`),
          this.customUpdateAndGetTimestampDiff(),
        ),
      );
    }
  }

  private customUpdateAndGetTimestampDiff(): string {
    const includeTimestamp = this.lastTimestampAt && this.options?.timestamp;
    const result = includeTimestamp
      ? this.formatTimestampDiff(Date.now() - this.lastTimestampAt)
      : '';
    this.lastTimestampAt = Date.now();
    return result;
  }

  protected formatTimestampDiff(timestampDiff: number) {
    return yellow(` +${timestampDiff}ms`);
  }
}
