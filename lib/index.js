/**
 * DeepSeek Colorful Plugin - Host entry
 */
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const name = 'deepseek-colorful';

export const inject = ['clientModules'];

export function apply(ctx) {
  const logger = ctx.logger ? ctx.logger('deepseek-colorful') : console;
  logger.info('[deepseek-colorful] Host plugin loaded');

  if (ctx.clientModules) {
    try {
      const clientPath = resolve(fileURLToPath(import.meta.url), '../../lib/client.js');
      ctx.clientModules.rebuilt('deepseek-colorful');
      logger.info('[deepseek-colorful] Notified clientModules rebuild');
    } catch (e) {
      logger.warn('[deepseek-colorful] Could not notify clientModules:', e);
    }
  }
}
