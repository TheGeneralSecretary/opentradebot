export enum URI {
	BINANCE_FUTURES_API = 'https://fapi.binance.com',
	BINANCE_FUTURES_TESTNET_API = 'https://testnet.binancefuture.com',
	BINANCE_FUTURES_WS = 'wss://fstream.binance.com',
}

export enum Endpoint {
	EXCHANGE_INFO = 'fapi/v1/exchangeInfo',
	SYMBOL_PRICE_TICKER = 'fapi/v1/ticker/bookTicker',
	KLINE_DATA = 'fapi/v1/klines',
}

export enum Network {
	MAINNET,
	TESTNET,
}
