type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class DebugLogger {
  private isDebugMode: boolean;

  constructor() {
    this.isDebugMode = process.env.NODE_ENV === 'development';
  }

  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const dataString = data ? `\nData: ${JSON.stringify(data, null, 2)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${dataString}`;
  }

  debug(message: string, data?: any) {
    if (this.isDebugMode) {
      console.debug(this.formatMessage('debug', message, data));
    }
  }

  info(message: string, data?: any) {
    console.info(this.formatMessage('info', message, data));
  }

  warn(message: string, data?: any) {
    console.warn(this.formatMessage('warn', message, data));
  }

  error(message: string, error?: Error, data?: any) {
    console.error(
      this.formatMessage('error', message, {
        error: error?.message,
        stack: error?.stack,
        ...data
      })
    );
  }

  group(name: string) {
    if (this.isDebugMode) {
      console.group(name);
    }
  }

  groupEnd() {
    if (this.isDebugMode) {
      console.groupEnd();
    }
  }

  // Performance monitoring
  startPerformanceMonitor(label: string) {
    if (this.isDebugMode) {
      console.time(label);
    }
  }

  endPerformanceMonitor(label: string) {
    if (this.isDebugMode) {
      console.timeEnd(label);
    }
  }
}

export const logger = new DebugLogger(); 