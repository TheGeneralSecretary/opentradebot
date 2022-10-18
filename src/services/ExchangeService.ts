import { BinanceFutures } from '../exchanges/binance/BinanceFutures.ts';
import { Bitmex } from '../exchanges/bitmex/Bitmex.ts';

export class ExchangeService {
	getContracts(exchange: BinanceFutures | Bitmex) {
		return exchange.getContracts();
	}
}
