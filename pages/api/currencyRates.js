import axios from 'axios';

export default async function currencyRates(req, res) {
  const data = await getCurrencyRates();

  res.status(200).json({
    data,
  });
}

const OUT_CURRENCY = 'USD';

const formatCurrencyRates = (data) => {
  const displayData = data.DISPLAY;

  const rates = Object.keys(displayData).map((currencyName) => {
    const names = {
      btc: 'Bitcoin',
      eth: 'Ethereum',
      usdt: 'Tether',
      bnb: 'BNB',
      usdc: 'USD Coin',
      xpr: 'XPR',
      ada: 'Cardano',
      matic: 'Polygon',
      doge: 'Dogecoin',
      sol: 'Solana',
      ton: 'Toncoin',
      dot: 'Polkadot',
      link: 'Chainlink',
      ltc: 'Litecoin',
      xlm: 'Stellar',
      atom: 'Cosmos',
      vet: 'VeChain',
      fil: 'Filecoin',
      cake: 'PancakeSwap',
      aave: 'Aave',
      etc: 'Ethereum Classic',
      xrp: 'Ripple',
      nano: 'Nano',
      bch: 'Bitcoin Cash',
    };

    const dayPercent = displayData[currencyName][OUT_CURRENCY].CHANGEPCT24HOUR;
    const isPositive = !dayPercent.startsWith('-');

    return {
      name: names[currencyName.toLowerCase()],
      shortName: currencyName.toLowerCase(),
      price: displayData[currencyName][OUT_CURRENCY].PRICE.replace(/\s/g, ''),
      dayPercent,
      isPositive,
    };
  });

  return rates;
};

export async function getCurrencyRates() {
  const apiKey = process.env.CRYPTOCOMPARE_API_KEY;
  const cryptoSymbols = 'ADA,BNB,BTC,DOGE,ETH,MATIC,SOL,TON,USDC,USDT,XPR';

  try {
    const { data } = await axios.get(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptoSymbols}&tsyms=${OUT_CURRENCY}&api_key=${apiKey}`,
    );

    console.log('formatCurrencyRates(data)', formatCurrencyRates(data));
    return formatCurrencyRates(data);
  } catch (error) {
    throw new Error('Error fetching crypto prices');
  }
}
