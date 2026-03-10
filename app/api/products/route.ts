import { NextResponse } from 'next/server'
import { fetchHaremGold } from '@/lib/goldScraper'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const prices = await fetchHaremGold()
    await supabase.from('gold_rates').insert(prices)
    return NextResponse.json(prices)
  } catch {
    return NextResponse.json({ has_altin: 3180, altin_22k: 2915, altin_18k: 2385, altin_14k: 1860 })
  }
}