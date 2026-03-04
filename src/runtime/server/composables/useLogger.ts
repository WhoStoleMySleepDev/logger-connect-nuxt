import { useRuntimeConfig } from '#imports';
import type { Logger } from '@wsms/logger';
import { createLogger } from '@wsms/logger';

let _logger: Logger | undefined;

export const useLogger = (): Logger => {
  if (!_logger) {
    const config = useRuntimeConfig();
    const moduleConfig = (config as Record<string, unknown>)['wsmsLogger'] as
      | { logger?: Record<string, unknown>; configPath?: string }
      | undefined;
    _logger = createLogger(
      moduleConfig?.logger as Record<string, unknown> | undefined,
      moduleConfig?.configPath
    );
  }
  return _logger;
};
