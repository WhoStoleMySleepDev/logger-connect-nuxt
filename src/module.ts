import {
  addImportsDir,
  addPluginTemplate,
  addServerHandler,
  addServerImportsDir,
  addTypeTemplate,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit';
import type { Nuxt } from '@nuxt/schema';
import type { LoggerOptions } from '@wsms/logger';
import { join } from 'node:path';

export interface LoggerConnectNuxtOptions {
  logger?: Partial<LoggerOptions>;
  configPath?: string;
  runtimeConfigKey?: string;
}

export default defineNuxtModule<LoggerConnectNuxtOptions>({
  meta: {
    name: '@wsms/logger-connect-nuxt',
    configKey: 'wsmsLogger',
  },
  defaults: {
    runtimeConfigKey: 'wsmsLogger',
  },
  setup(options: LoggerConnectNuxtOptions, nuxt: Nuxt) {
    const resolver = createResolver(import.meta.url);

    const runtimeConfigKey = options.runtimeConfigKey || 'wsmsLogger';
    nuxt.options.runtimeConfig[runtimeConfigKey] = {
      logger: options.logger,
      configPath: options.configPath,
    };

    const logEndpoint = '/_wsms/log';

    addPluginTemplate({
      filename: 'wsms-logger-connect-nuxt.plugin.mjs',
      getContents: () => `import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { createLogger } from '@wsms/logger'

const LOG_ENDPOINT = ${JSON.stringify(logEndpoint)}

const createRemoteLogger = () => {
  const send = (level, message, data) => {
    $fetch(LOG_ENDPOINT, { method: 'POST', body: { level, message, data } }).catch(() => {})
  }
  const remote = {
    info: (msg, data) => send('info', msg, data),
    warn: (msg, data) => send('warn', msg, data),
    error: (msg, data) => send('error', msg, data),
    debug: (msg, data) => send('debug', msg, data),
    log: (level, msg, data) => send(level, msg, data),
    child: () => remote,
    flush: () => Promise.resolve(),
    close: () => Promise.resolve(),
  }
  return remote
}

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    return { provide: { logger: createRemoteLogger() } }
  }

  const config = useRuntimeConfig()
  const moduleConfig = config[${JSON.stringify(runtimeConfigKey)}]

  const logger = createLogger(moduleConfig?.logger, moduleConfig?.configPath)

  return {
    provide: {
      logger,
    },
  }
})
`,
    });

    addServerHandler({
      route: logEndpoint,
      method: 'post',
      handler: resolver.resolve('runtime/server/routes/log.post'),
    });

    addImportsDir(resolver.resolve('runtime/composables'));
    addServerImportsDir(resolver.resolve('runtime/server/composables'));

    addTypeTemplate({
      filename: 'types/wsms-logger-connect-nuxt.d.ts',
      getContents: () => `import type { Logger } from '@wsms/logger';

declare module '#app' {
  interface NuxtApp {
    $logger: Logger;
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $logger: Logger;
  }
}

export {};\n`,
    });

    nuxt.hook('prepare:types', (opts) => {
      opts.references.push({
        path: join(nuxt.options.buildDir, 'types/wsms-logger-connect-nuxt.d.ts'),
      });
    });
  },
});
