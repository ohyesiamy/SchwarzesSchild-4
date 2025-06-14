export const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  CHF: "CHF",
  JPY: "¥",
  CNY: "¥",
  CAD: "C$",
  AUD: "A$",
  HKD: "HK$",
  SGD: "S$",
  BTC: "₿",
};

export const MOCK_EXCHANGE_RATES: Record<string, Record<string, number>> = {
  EUR: {
    USD: 1.0605,
    GBP: 0.8580,
    CHF: 0.9650,
    JPY: 162.75,
    CNY: 7.6920,
    CAD: 1.4560,
    AUD: 1.6150,
    HKD: 8.2800,
    SGD: 1.4360,
    BTC: 0.000018,
  },
  USD: {
    EUR: 0.9430,
    GBP: 0.8090,
    CHF: 0.9100,
    JPY: 153.25,
    CNY: 7.2562,
    CAD: 1.3725,
    AUD: 1.5230,
    HKD: 7.8120,
    SGD: 1.3540,
    BTC: 0.000017,
  },
  GBP: {
    EUR: 1.1654,
    USD: 1.2360,
    CHF: 1.1250,
    JPY: 188.45,
    CNY: 8.9205,
    CAD: 1.6870,
    AUD: 1.8723,
    HKD: 9.6035,
    SGD: 1.6645,
    BTC: 0.000021,
  },
  CHF: {
    EUR: 1.0363,
    USD: 1.0989,
    GBP: 0.8889,
    JPY: 168.95,
    CNY: 7.9780,
    CAD: 1.5090,
    AUD: 1.6745,
    HKD: 8.5915,
    SGD: 1.4890,
    BTC: 0.000019,
  },
  JPY: {
    EUR: 0.00615,
    USD: 0.00653,
    GBP: 0.00531,
    CHF: 0.00592,
    CNY: 0.04735,
    CAD: 0.00896,
    AUD: 0.00994,
    HKD: 0.05098,
    SGD: 0.00884,
    BTC: 0.00000011,
  },
  CNY: {
    EUR: 0.1300,
    USD: 0.1378,
    GBP: 0.1121,
    CHF: 0.1253,
    JPY: 21.120,
    CAD: 0.1891,
    AUD: 0.2099,
    HKD: 1.0764,
    SGD: 0.1866,
    BTC: 0.00000234,
  },
  CAD: {
    EUR: 0.6868,
    USD: 0.7287,
    GBP: 0.5928,
    CHF: 0.6627,
    JPY: 111.66,
    CNY: 5.2869,
    AUD: 1.1097,
    HKD: 5.6917,
    SGD: 0.9866,
    BTC: 0.000012,
  },
  AUD: {
    EUR: 0.6192,
    USD: 0.6567,
    GBP: 0.5341,
    CHF: 0.5971,
    JPY: 100.62,
    CNY: 4.7646,
    CAD: 0.9011,
    HKD: 5.1294,
    SGD: 0.8891,
    BTC: 0.000011,
  },
  HKD: {
    EUR: 0.1208,
    USD: 0.1280,
    GBP: 0.1041,
    CHF: 0.1164,
    JPY: 19.618,
    CNY: 0.9290,
    CAD: 0.1757,
    AUD: 0.1950,
    SGD: 0.1734,
    BTC: 0.00000218,
  },
  SGD: {
    EUR: 0.6963,
    USD: 0.7385,
    GBP: 0.6008,
    CHF: 0.6717,
    JPY: 113.18,
    CNY: 5.3591,
    CAD: 1.0136,
    AUD: 1.1247,
    HKD: 5.7694,
    BTC: 0.000013,
  },
  BTC: {
    EUR: 55570.37,
    USD: 58930.14,
    GBP: 47940.95,
    CHF: 53598.78,
    JPY: 9031650.85,
    CNY: 427510.59,
    CAD: 80896.22,
    AUD: 89751.73,
    HKD: 460522.12,
    SGD: 79805.76,
  }
};

export const TRANSACTION_CATEGORIES = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Housing",
  "Income",
  "Currency Exchange",
  "Travel",
  "Services",
  "Other",
];

export const TIME_FILTERS = [
  { label: "Last 30 Days", value: "30days" },
  { label: "Last 3 Months", value: "3months" },
  { label: "Last 6 Months", value: "6months" },
  { label: "This Year", value: "year" },
];
