import { URI, Endpoint, Network } from './Gateway.ts';
import { makeHttpRequest } from '../../core/util.ts';

import logger from '../../core/logger.ts';
import { SymbolOrderBookTicker } from './interfaces/SymbolOrderBook.ts';
import { Candlestick } from './interfaces/Candlestick.ts';

export class BinanceFutures {
	private uri: URI;
	private prices: Map<string, Partial<SymbolOrderBookTicker>> = new Map();

	constructor(network: Network) {
		switch (network) {
			case Network.MAINNET:
				this.uri = URI.BINANCE_FUTURES_API;
				break;
			case Network.TESTNET:
				this.uri = URI.BINANCE_FUTURES_TESTNET_API;
				break;
		}

		logger.info('Binance connected to ' + Network[network]);
	}

	async getContracts() {
		const data = await makeHttpRequest(
			`${this.uri}/${Endpoint.EXCHANGE_INFO}`,
			'get'
		);

		return data
			? data.symbols.map((c: any) => {
					return c.pair;
			  })
			: null;
	}

	async getBidAsk(symbol: string) {
		const data = await makeHttpRequest(
			`${this.uri}/${Endpoint.SYMBOL_PRICE_TICKER}`,
			'get',
			{
				symbol,
			}
		);

		if (data)
			this.prices.set(symbol, {
				bidPrice: parseFloat(data.bidPrice),
				bidQty: parseFloat(data.bidQty),
				askPrice: parseFloat(data.askPrice),
				askQty: parseFloat(data.askQty),
				time: parseInt(data.time),
			});

		return this.prices.get(symbol);
	}

	async getCandlestick(symbol: string, interval: string) {
		const data = await makeHttpRequest(
			`${this.uri}/${Endpoint.KLINE_DATA}`,
			'get',
			{
				symbol,
				interval,
				limit: 1000,
			}
		);

		return data.map((c: any[]): Candlestick => {
			return {
				openTime: parseInt(c[0]),
				open: parseFloat(c[1]),
				high: parseFloat(c[2]),
				low: parseFloat(c[3]),
				close: parseFloat(c[4]),
				volume: parseFloat(c[5]),
				closeTime: parseInt(c[6]),
				quoteAssetVolume: parseFloat(c[7]),
				numberOfTrades: parseInt(c[8]),
				takerBuyBaseAssetVolume: parseFloat(c[9]),
				takerBuyQuoteAssetVolume: parseFloat(c[10]),
				ignore: parseFloat(c[11]),
			};
		});
	}
}
