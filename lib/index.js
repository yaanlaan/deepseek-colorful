/**
 * DeepSeek Colorful Plugin - Host entry
 */
export const name = 'deepseek-colorful';

export function apply(ctx) {
  const logger = ctx.logger ? ctx.logger('deepseek-colorful') : console;
  logger.info('DeepSeek Colorful host plugin initialized successfully');
}
