import { ExchangeService } from './services/ExchangeService.ts';
import { BinanceFutures } from './exchanges/binance/BinanceFutures.ts';
import { Network } from './exchanges/binance/Gateway.ts';

// const exchange = new ExchangeService();
// const contracts = await exchange.getContracts(
// 	new BinanceFutures(Network.TESTNET)
// );

const binance = new BinanceFutures(Network.TESTNET);
// console.log(contracts);
// console.log(await binance.getBidAsk('BTCUSDT'));
console.log(await binance.getCandlestick('BTCUSDT', '1h'));
