import { URI, Endpoint } from './Gateway.ts';

import logger from '../../core/logger.ts';

export class Bitmex {
	private uri: URI;

	constructor() {
		this.uri = URI.BITMEX_API;
	}

	async getContracts() {
		const data = await (
			await fetch(`${this.uri}/${Endpoint.ACTIVE_INSTRUMENT}`, {
				method: 'get',
			})
		).json();

		return data.map((c: any) => {
			return c.symbol;
		});
	}
}
