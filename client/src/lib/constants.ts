export const CURRENCY_SYMBOLS: Record<string, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  CHF: "CHF",
};

export const MOCK_EXCHANGE_RATES: Record<string, Record<string, number>> = {
  EUR: {
    USD: 1.0605,
    GBP: 0.8580,
    CHF: 0.9650,
  },
  USD: {
    EUR: 0.9430,
    GBP: 0.8090,
    CHF: 0.9100,
  },
  GBP: {
    EUR: 1.1654,
    USD: 1.2360,
    CHF: 1.1250,
  },
  CHF: {
    EUR: 1.0363,
    USD: 1.0989,
    GBP: 0.8889,
  },
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
