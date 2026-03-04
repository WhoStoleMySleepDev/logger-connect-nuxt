import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import { createLogger } from '@wsms/logger';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const moduleConfig = (config as Record<string, unknown>)['wsmsLogger'] as
    | {
        logger?: Record<string, unknown>;
        configPath?: string;
      }
    | undefined;

  const logger = createLogger(
    moduleConfig?.logger as Record<string, unknown> | undefined,
    moduleConfig?.configPath
  );

  return {
    provide: {
      logger,
    },
  };
});
