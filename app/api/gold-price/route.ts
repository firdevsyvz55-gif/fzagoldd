import { NextResponse } from 'next/server'

let cache: { data: any; ts: number } | null = null

export async function GET() {
  const now = Date.now()

  if (cache && now - cache.ts < 3000) {
    return NextResponse.json({ ...cache.data, cached: true })
  }

  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=pax-gold&vs_currencies=try,usd&include_24hr_change=true',
      { cache: 'no-store' }
    )
    if (res.ok) {
      const json = await res.json()
      const paxg = json['pax-gold']
      if (paxg?.try) {
        const has_altin = Math.round((paxg.try / 31.1035) * 100) / 100
        const data = {
          has_altin,
          altin_22k: Math.round(has_altin * 0.9166 * 100) / 100,
          altin_18k: Math.round(has_altin * 0.75   * 100) / 100,
          altin_14k: Math.round(has_altin * 0.585  * 100) / 100,
          altin_9k:  Math.round(has_altin * 0.375  * 100) / 100,
          usd_per_oz: paxg.usd || 0,
          change24h: Math.round((paxg.try_24h_change || 0) * 100) / 100,
          source: 'coingecko',
          ts: now,
        }
        cache = { data, ts: now }
        return NextResponse.json(data)
      }
    }
  } catch {}

  try {
    const res2 = await fetch('https://metals.live/api/spot', { cache: 'no-store' })
    if (res2.ok) {
      const json2 = await res2.json()
      const xauUsd = json2.find((m: any) => m.metal === 'gold')?.price
      if (xauUsd) {
        const fx = await fetch('https://api.frankfurter.app/latest?from=USD&to=TRY')
        const fxJson = await fx.json()
        const usdTry = fxJson?.rates?.TRY || 38.5
        const has_altin = Math.round((xauUsd * usdTry / 31.1035) * 100) / 100
        const data = {
          has_altin,
          altin_22k: Math.round(has_altin * 0.9166 * 100) / 100,
          altin_18k: Math.round(has_altin * 0.75   * 100) / 100,
          altin_14k: Math.round(has_altin * 0.585  * 100) / 100,
          altin_9k:  Math.round(has_altin * 0.375  * 100) / 100,
          usd_per_oz: xauUsd,
          change24h: 0,
          source: 'metals.live',
          ts: now,
        }
        cache = { data, ts: now }
        return NextResponse.json(data)
      }
    }
  } catch {}

  if (cache) {
    return NextResponse.json({ ...cache.data, stale: true })
  }

  return NextResponse.json({
    has_altin: 7325, altin_22k: 6714, altin_18k: 5494,
    altin_14k: 4285, altin_9k: 2747, usd_per_oz: 2910,
    change24h: 0, source: 'fallback', ts: now,
  })
}