import { defineEventHandler, readBody } from 'h3';
import { useLogger } from '../composables/useLogger';

export default defineEventHandler(async (event) => {
  const body = await readBody<{ level: string; message: string; data?: unknown }>(event);
  const logger = useLogger();

  if (body.level === 'info') logger.info(body.message, body.data);
  else if (body.level === 'warn') logger.warn(body.message, body.data);
  else if (body.level === 'error') logger.error(body.message, body.data);
  else if (body.level === 'debug') logger.debug(body.message, body.data);

  return { ok: true };
});
