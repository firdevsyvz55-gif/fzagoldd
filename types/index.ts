export interface Product {
  id: string
  name: string
  name_en?: string
  category: 'bilezik' | 'zincir' | 'kolye' | 'yuzuk' | 'kupe'
  karat: 9 | 14 | 18 | 22
  weight: number
  iscilik: number
  description?: string
  image_url?: string
  badge?: string
  is_active: boolean
  created_at: string
}

export interface GoldRates {
  has_altin: number
  altin_22k: number
  altin_18k: number
  altin_14k: number
  fetched_at?: string
}