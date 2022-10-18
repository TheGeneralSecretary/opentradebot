import * as log from 'https://deno.land/std@0.130.0/log/mod.ts';
import { format } from 'https://deno.land/std@0.130.0/datetime/mod.ts';

await Deno.stat('logs').catch(async () => await Deno.mkdir('logs'));

await log.setup({
	handlers: {
		console: new log.handlers.ConsoleHandler('NOTSET', {
			formatter: `${format(
				new Date(),
				'yyyy-MM-dd HH:mm:ss'
			)} {levelName}: {msg}`,
		}),

		file: new log.handlers.FileHandler('NOTSET', {
			filename: 'logs/log.txt',
			formatter: `${format(
				new Date(),
				'yyyy-MM-dd HH:mm:ss'
			)} {levelName}: {msg}`,
		}),
	},

	loggers: {
		default: {
			level: 'NOTSET',
			handlers: ['console', 'file'],
		},
	},
});

export default log;
