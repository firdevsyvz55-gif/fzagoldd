import { NextResponse } from 'next/server'

const CACHE_MS = 5_000
let cache: { data: GoldData; ts: number } | null = null

interface GoldData {
  has_altin:       number   // alış
  has_altin_satis: number   // satış
  altin_22k:       number
  altin_18k:       number
  altin_14k:       number
  altin_9k:   number
  usd_per_oz: number
  change24h:  number
  source:     string
  ts:         number
  cached?:    boolean
  stale?:     boolean
}

function round2(n: number) { return Math.round(n * 100) / 100 }

function makeRates(has_altin: number, usd_per_oz: number, change24h: number, source: string): GoldData {
  return {
    has_altin,
    has_altin_satis: round2(has_altin * 1.0015), // satış ≈ alıştan biraz fazla
    altin_22k:  round2(has_altin * 0.9166),
    altin_18k:  round2(has_altin * 0.75),
    altin_14k:  round2(has_altin * 0.585),
    altin_9k:   round2(has_altin * 0.375),
    usd_per_oz,
    change24h,
    source,
    ts: Date.now(),
  }
}

// ─── KAYNAK 1: Truncgil ──────────────────────────────────────────────────────
// Key'ler kesinleşti:
//   HAS  → { Buying: 7267.55, Selling: 7268.68, Change: -0.43 }  ← has altın
//   GRA  → { Buying: 7304.07, Selling: 7305.21 }                  ← gram altın
//   YIA  → { Buying: 6741.17, Selling: 6750.78 }                  ← 22 ayar bilezik
//   18AYARALTIN → { Buying: 5395.9, Selling: 5403.58 }
//   14AYARALTIN → { Buying: 4213.23, Selling: 4219.24 }
//   USD  → { Buying: 44.1044 }
async function fetchTruncgil(): Promise<GoldData | null> {
  const res = await fetch('https://finans.truncgil.com/v4/today.json', {
    cache: 'no-store',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Accept': 'application/json',
    },
    signal: AbortSignal.timeout(5000),
  })
  if (!res.ok) return null
  const j = await res.json()

  const has_altin       = round2(j['HAS']?.Buying  || 0)
  const has_altin_satis = round2(j['HAS']?.Selling || 0)
  if (!has_altin) return null

  const altin_22k  = round2(j['YIA']?.Buying          || has_altin * 0.9166)
  const altin_18k  = round2(j['18AYARALTIN']?.Buying  || has_altin * 0.75)
  const altin_14k  = round2(j['14AYARALTIN']?.Buying  || has_altin * 0.585)
  const change24h  = round2(j['HAS']?.Change || 0)
  const usdTry     = j['USD']?.Buying || 0
  const usd_per_oz = usdTry > 0 ? round2((has_altin * 31.1035) / usdTry) : 0

  return {
    has_altin,
    has_altin_satis,
    altin_22k,
    altin_18k,
    altin_14k,
    altin_9k:   round2(has_altin * 0.375),
    usd_per_oz,
    change24h,
    source: 'truncgil',
    ts: Date.now(),
  }
}

// ─── KAYNAK 2: CoinGecko PAXG/TRY ───────────────────────────────────────────
async function fetchCoinGecko(): Promise<GoldData | null> {
  const res = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=pax-gold&vs_currencies=try,usd&include_24hr_change=true',
    { cache: 'no-store', signal: AbortSignal.timeout(6000) }
  )
  if (!res.ok) return null
  const j = await res.json()
  const paxg = j['pax-gold']
  if (!paxg?.try) return null

  const has_altin = round2(paxg.try / 31.1035)
  return makeRates(has_altin, paxg.usd || 0, round2(paxg.try_24h_change || 0), 'coingecko')
}

// ─── KAYNAK 3: CoinGecko USD + Frankfurter kur ───────────────────────────────
async function fetchFrankfurter(): Promise<GoldData | null> {
  const [cgRes, fxRes] = await Promise.all([
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=pax-gold&vs_currencies=usd', {
      cache: 'no-store', signal: AbortSignal.timeout(6000),
    }),
    fetch('https://api.frankfurter.app/latest?from=USD&to=TRY', {
      cache: 'no-store', signal: AbortSignal.timeout(6000),
    }),
  ])
  if (!cgRes.ok || !fxRes.ok) return null
  const [cgJson, fxJson] = await Promise.all([cgRes.json(), fxRes.json()])
  const usd_per_oz = cgJson['pax-gold']?.usd
  const usdTry = fxJson?.rates?.TRY
  if (!usd_per_oz || !usdTry) return null

  const has_altin = round2((usd_per_oz * usdTry) / 31.1035)
  return makeRates(has_altin, usd_per_oz, 0, 'frankfurter')
}

// ─── HANDLER ──────────────────────────────────────────────────────────────────
export async function GET() {
  const now = Date.now()

  if (cache && now - cache.ts < CACHE_MS) {
    return NextResponse.json({ ...cache.data, cached: true })
  }

  for (const fn of [fetchTruncgil, fetchCoinGecko, fetchFrankfurter]) {
    try {
      const data = await fn()
      if (data && data.has_altin > 1000) {
        cache = { data, ts: now }
        return NextResponse.json(data)
      }
    } catch { /* sonrakine geç */ }
  }

  if (cache) return NextResponse.json({ ...cache.data, stale: true })

  return NextResponse.json({
    has_altin: 7268, altin_22k: 6663, altin_18k: 5451,
    altin_14k: 4252, altin_9k: 2725, usd_per_oz: 3050,
    change24h: 0, source: 'fallback', ts: 0,
  })
}