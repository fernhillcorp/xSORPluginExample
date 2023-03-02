import { Plugin, IPluginConfig } from "@fernhillcorp/xsor";

/**
 * The example plugin.
 */
export class ExamplePlugin extends Plugin
{
	constructor (config: IPluginConfig)
	{
		super (config);

		this.name = "ExamplePlugin";
		this.version = "1.0.0";

		// Listen for ticker updates ONLY from Binance for BTC/USDT.
		this.exchangeManager.on ("tickerUpdate", (exchange: string, ticker: any) =>
			{
				let btcusdtBid: number = 0;

				if (exchange === "binance")
					btcusdtBid = ticker["BTC/USDT"].bid;

				console.log (`${exchange} ticker update for BTC/USDT bid: ${btcusdtBid}`);
			});

		// The exchange manager maintains all the connections  to each exchange. In 
		// addition it maintains the connections to each user that has been 
		// authenticated with the system.
	}
}