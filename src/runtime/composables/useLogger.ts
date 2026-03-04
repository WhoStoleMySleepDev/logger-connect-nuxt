import { useNuxtApp } from 'nuxt/app';
import type { Logger } from '@wsms/logger';

export const useLogger = () => {
  const nuxtApp = useNuxtApp() as unknown as { $logger: Logger };
  return nuxtApp.$logger;
};
