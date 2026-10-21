export type AssetGroup =
  | "us-equity"
  | "crypto"
  | "china-equity"
  | "commodity-fx"
  | "macro";

export interface TickerDef {
  symbol: string;
  displayName: string;
  displayNameEn?: string;
  group: AssetGroup;
}

export function getDisplayName(t: TickerDef, locale: "zh" | "en"): string {
  return locale === "en" ? (t.displayNameEn ?? t.displayName) : t.displayName;
}

const ASSET_GROUP_LABELS_ZH: Record<AssetGroup, string> = {
  "us-equity": "美股 / ETF",
  crypto: "加密货币",
  "china-equity": "A股 / 中概 / 港股",
  "commodity-fx": "商品 / 外汇",
  macro: "宏观信号",
};

const ASSET_GROUP_LABELS_EN: Record<AssetGroup, string> = {
  "us-equity": "US Stocks / ETF",
  crypto: "Crypto",
  "china-equity": "China / HK",
  "commodity-fx": "Commodities / FX",
  macro: "Macro",
};

export function getAssetGroupLabels(
  locale: "zh" | "en",
): Record<AssetGroup, string> {
  return locale === "en" ? ASSET_GROUP_LABELS_EN : ASSET_GROUP_LABELS_ZH;
}

export const ASSET_GROUP_ORDER: AssetGroup[] = [
  "china-equity",
  "commodity-fx",
  "crypto",
  "macro",
  "us-equity",
];

export const WATCHLIST: TickerDef[] = [
  // A-share benchmarks and liquid leaders
  { symbol: "000001.SS", displayName: "上证指数", displayNameEn: "SSE Composite", group: "china-equity" },
  { symbol: "399001.SZ", displayName: "深证成指", displayNameEn: "SZSE Component", group: "china-equity" },
  { symbol: "159915.SZ", displayName: "创业板ETF", displayNameEn: "ChiNext ETF", group: "china-equity" },
  { symbol: "510300.SS", displayName: "沪深300ETF", displayNameEn: "CSI 300 ETF", group: "china-equity" },
  { symbol: "600519.SS", displayName: "贵州茅台", displayNameEn: "Kweichow Moutai", group: "china-equity" },
  { symbol: "300750.SZ", displayName: "宁德时代", displayNameEn: "CATL", group: "china-equity" },
  { symbol: "601138.SS", displayName: "工业富联", displayNameEn: "Foxconn Industrial Internet", group: "china-equity" },
  // China / Hong Kong
  { symbol: "BABA", displayName: "阿里巴巴 (BABA)", displayNameEn: "Alibaba (BABA)", group: "china-equity" },
  { symbol: "0700.HK", displayName: "腾讯控股 (0700.HK)", displayNameEn: "Tencent (0700.HK)", group: "china-equity" },
  // Crypto
  { symbol: "BTC-USD", displayName: "Bitcoin", group: "crypto" },
  { symbol: "ETH-USD", displayName: "Ethereum", group: "crypto" },
  { symbol: "SOL-USD", displayName: "Solana", group: "crypto" },
  // Gold and FX
  { symbol: "GC=F", displayName: "COMEX 黄金期货", displayNameEn: "COMEX Gold Futures", group: "commodity-fx" },
  { symbol: "GLD", displayName: "黄金 ETF (GLD)", displayNameEn: "SPDR Gold Shares (GLD)", group: "commodity-fx" },
  { symbol: "USDCNY=X", displayName: "美元 / 人民币", displayNameEn: "USD / CNY", group: "commodity-fx" },
  // Macro
  { symbol: "^VIX", displayName: "VIX 恐慌指数", displayNameEn: "VIX (Volatility)", group: "macro" },
  { symbol: "^TNX", displayName: "10Y 美债收益率 (%)", displayNameEn: "10Y Treasury Yield (%)", group: "macro" },
  { symbol: "DX-Y.NYB", displayName: "美元指数 DXY", displayNameEn: "DXY (US Dollar Index)", group: "macro" },
  // US benchmarks and the main AI leader
  { symbol: "SPY", displayName: "S&P 500 ETF", group: "us-equity" },
  { symbol: "QQQ", displayName: "Nasdaq 100 ETF", group: "us-equity" },
  { symbol: "NVDA", displayName: "Nvidia", group: "us-equity" },
];
