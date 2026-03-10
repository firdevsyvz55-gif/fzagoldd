export interface GoldPrices {
  has_altin: number
  altin_22k: number
  altin_18k: number
  altin_14k: number
}

export async function fetchHaremGold(): Promise<GoldPrices> {
  try {
    const res = await fetch('https://finance.google.com/finance/info?client=ig&q=CURRENCY:XAUTRY', {
      cache: 'no-store',
    })
    const text = await res.text()
    const json = JSON.parse(text.replace('//', ''))
    const onsTry = parseFloat(json[0]?.l_cur?.replace(/[^0-9.]/g, '') || '0')
    if (!onsTry) throw new Error()
    const hasAltin = parseFloat((onsTry / 31.1035).toFixed(2))
    return {
      has_altin: hasAltin,
      altin_22k: parseFloat((hasAltin * 0.9166).toFixed(2)),
      altin_18k: parseFloat((hasAltin * 0.75).toFixed(2)),
      altin_14k: parseFloat((hasAltin * 0.585).toFixed(2)),
    }
  } catch {
    return { has_altin: 3180, altin_22k: 2915, altin_18k: 2385, altin_14k: 1860 }
  }
}