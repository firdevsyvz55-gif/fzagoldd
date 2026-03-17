'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'

// ─── LOGO (base64) ───────────────────────────────────────────────────────────
const LOGO = "data:image/png;base64,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"

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface Product {
  id: string
  name: string
  name_en?: string
  category: string
  karat: number
  weight: number
  iscilik: number
  description?: string
  image_url?: string
  badge?: string
  is_active: boolean
}
interface Settings { [key: string]: string }
interface Rates {
  has_altin: number
  has_altin_satis: number
  altin_22k: number
  altin_18k: number
  altin_14k: number
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function Home() {
  const [lang, setLang] = useState<'tr' | 'en'>('tr')
  const [settings, setSettings] = useState<Settings>({})
  const [products, setProducts] = useState<Product[]>([])
  const [filter, setFilter] = useState('all')
  const [modal, setModal] = useState<Product | null>(null)
  const [navSolid, setNavSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [calcKarat, setCalcKarat] = useState(0.585)
  const [calcWeight, setCalcWeight] = useState(10)
  const [calcKdv, setCalcKdv] = useState(0)
  const [rates, setRates] = useState<Rates>({ has_altin: 3180, has_altin_satis: 3185, altin_22k: 2915, altin_18k: 2385, altin_14k: 1860 })

  // ─── HELPERS ──────────────────────────────────────────────────────────────
  const T = (tr: string, en: string) => lang === 'tr' ? tr : en
  const S = (key: string, fallback = '') => settings[key] || fallback
  const fmt = (n: number) => n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  const fmtInt = (n: number) => Math.round(n).toLocaleString('tr-TR')

  const KARAT_FACTOR: Record<number, number> = { 22: 0.9166, 18: 0.75, 14: 0.585, 9: 0.375 }
  const CATS = ['all', 'bilezik', 'zincir', 'kolye', 'yuzuk', 'kupe']
  const CAT_LABEL: Record<string, string> = {
    all: T('Tümü', 'All'),
    bilezik: T('Bilezik', 'Bracelet'),
    zincir: T('Zincir', 'Chain'),
    kolye: T('Kolye', 'Necklace'),
    yuzuk: T('Yüzük', 'Ring'),
    kupe: T('Küpe', 'Earring'),
  }

  const defaultIscilik = parseFloat(S('iscilik_default', '500'))
  const goldCost = rates.has_altin * calcKarat * calcWeight
  const calcTotal = goldCost + defaultIscilik + (goldCost + defaultIscilik) * calcKdv
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter)

  // ─── EFFECTS ──────────────────────────────────────────────────────────────
  useEffect(() => {
    fetchRates()
    loadData()
    const iv = setInterval(fetchRates, 5000)
    const onScroll = () => setNavSolid(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => { clearInterval(iv); window.removeEventListener('scroll', onScroll) }
  }, [])

  async function fetchRates() {
    try {
      const r = await fetch(`/api/gold-price?t=${Date.now()}`, { cache: 'no-store' })
      const d = await r.json()
      if (d.has_altin) setRates(d)
    } catch { }
  }

  async function loadData() {
    const [{ data: p }, { data: s }] = await Promise.all([
      supabase.from('products').select('*').eq('is_active', true).order('created_at', { ascending: false }),
      supabase.from('settings').select('key,value'),
    ])
    if (p) setProducts(p)
    if (s) {
      const o: Settings = {}
      s.forEach((r: any) => (o[r.key] = r.value))
      setSettings(o)
    }
  }

  // ─── STYLES ───────────────────────────────────────────────────────────────
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&display=swap');

    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box }
    html { scroll-behavior:smooth }
    body { font-family:'Jost',sans-serif; font-weight:300; background:#fff; color:#0d1b2a; overflow-x:hidden }
    ::-webkit-scrollbar { width:2px } ::-webkit-scrollbar-thumb { background:#c9a84c }
    ::selection { background:rgba(201,168,76,.2) }

    @keyframes fadeUp { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn { from{opacity:0} to{opacity:1} }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes shimmer { 0%{background-position:200%} 100%{background-position:-200%} }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.25} }

    .au { animation:fadeUp .85s cubic-bezier(.16,1,.3,1) both }
    .d1 { animation-delay:.1s } .d2 { animation-delay:.2s } .d3 { animation-delay:.35s } .d4 { animation-delay:.5s }
    .ai { animation:fadeIn 1s ease both }

    .gold-text {
      background:linear-gradient(135deg,#f0d080 0%,#c9a84c 40%,#f5e09a 70%,#a07830 100%);
      background-size:250% auto;
      -webkit-background-clip:text; -webkit-text-fill-color:transparent;
      background-clip:text;
      animation:shimmer 5s linear infinite
    }
    .gold-line { height:1px; background:linear-gradient(90deg,transparent,#c9a84c,transparent) }
    .gold-border { border:1px solid rgba(201,168,76,.2) }

    /* ── NAV ── */
    .nav {
      position:fixed; top:0; left:0; right:0; z-index:900;
      height:72px; padding:0 6%;
      display:flex; align-items:center; justify-content:space-between;
      transition:all .4s ease
    }
    .nav.solid {
      background:rgba(255,255,255,.97);
      backdrop-filter:blur(20px);
      border-bottom:1px solid rgba(13,27,42,.06);
      box-shadow:0 1px 20px rgba(13,27,42,.04)
    }
    .nav {
      position:fixed; top:0; left:0; right:0; z-index:900;
      height:72px; padding:0 6%;
      display:flex; align-items:center; justify-content:space-between;
      transition:all .4s ease
    }
    .nav.solid {
      background:rgba(255,255,255,.97);
      backdrop-filter:blur(20px);
      border-bottom:1px solid rgba(13,27,42,.06);
      box-shadow:0 1px 20px rgba(13,27,42,.04)
    }
    .nav-logo { display:flex; align-items:center; gap:12px; text-decoration:none }
    .nav-logo img { width:40px; height:40px; border-radius:50%; object-fit:cover; border:1.5px solid rgba(201,168,76,.5) }
    .nav-logo-name { font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:600; letter-spacing:5px; transition:color .4s }
    .nav:not(.solid) .nav-logo-name { color:#fff }
    .nav.solid .nav-logo-name { color:#0d1b2a }
    .nav-logo-sub { font-size:7px; letter-spacing:3px; color:rgba(201,168,76,.85); text-transform:uppercase; display:block; margin-top:1px }
    .nav-links { display:flex; gap:40px }
    .nav-a { font-size:9px; letter-spacing:3px; text-transform:uppercase; text-decoration:none; transition:color .25s; cursor:pointer }
    .nav:not(.solid) .nav-a { color:rgba(255,255,255,.75) }
    .nav.solid .nav-a { color:rgba(13,27,42,.55) }
    .nav-a:hover { color:#c9a84c !important }
    .nav-right { display:flex; align-items:center; gap:14px }
    .lang-btn { background:none; border:none; font-size:9px; letter-spacing:2px; cursor:pointer; padding:5px 8px; transition:color .2s; font-family:'Jost',sans-serif }
    .nav:not(.solid) .lang-btn { color:rgba(255,255,255,.5) }
    .nav.solid .lang-btn { color:rgba(13,27,42,.35) }
    .lang-btn.on { color:#c9a84c !important; border-bottom:1px solid #c9a84c }
    /* ── BURGER ── */
    .burger { display:none; flex-direction:column; gap:5px; background:none; border:none; cursor:pointer; padding:6px }
    .burger span { display:block; width:22px; height:1.5px; transition:all .3s }
    .nav:not(.solid) .burger span { background:rgba(255,255,255,.8) }
    .nav.solid .burger span { background:#0d1b2a }
    /* ── MOBİL MENÜ ── */
    .mobile-menu { display:none; position:fixed; top:72px; left:0; right:0; z-index:899; flex-direction:column; padding:16px 0 20px }
    .mobile-menu.open { display:flex }
    .nav.solid ~ .mobile-menu, .mobile-menu-solid { background:rgba(255,255,255,.98); border-bottom:1px solid rgba(13,27,42,.06) }
    .mobile-menu-dark { background:rgba(13,27,42,.97); backdrop-filter:blur(20px) }
    .mobile-menu a, .mobile-menu button { display:block; padding:13px 7%; font-size:9px; letter-spacing:3px; text-transform:uppercase; text-decoration:none; border:none; background:none; cursor:pointer; font-family:'Jost',sans-serif; text-align:left; width:100% }
    .wa-btn { background:#0d1b2a; color:#fff; border:none; padding:10px 22px; font-size:8px; letter-spacing:2.5px; text-transform:uppercase; cursor:pointer; font-family:'Jost',sans-serif; font-weight:500; transition:all .3s; text-decoration:none }
    .wa-btn:hover { background:#c9a84c; color:#0d1b2a }

    /* ── HERO ── */
    .hero {
      position:relative; height:100vh; min-height:660px;
      display:flex; align-items:center;
      background:#0d1b2a; overflow:hidden
    }
    .hero-img {
      position:absolute; inset:0;
      background-position:center; background-size:cover; background-repeat:no-repeat;
      opacity:.35
    }
    .hero-grad { position:absolute; inset:0; background:linear-gradient(105deg,rgba(13,27,42,.95) 0%,rgba(13,27,42,.7) 50%,rgba(13,27,42,.4) 100%) }
    .hero-dots { position:absolute; inset:0; background-image:radial-gradient(rgba(201,168,76,.06) 1px,transparent 1px); background-size:32px 32px }
    .hero-content { position:relative; z-index:2; padding:0 6%; max-width:700px }
    .hero-tag { font-size:8px; letter-spacing:5px; text-transform:uppercase; color:rgba(201,168,76,.7); display:flex; align-items:center; gap:14px; margin-bottom:28px }
    .hero-tag::before { content:''; width:36px; height:1px; background:#c9a84c }
    .hero-h1 { font-family:'Cormorant Garamond',serif; font-weight:300; line-height:1; margin-bottom:26px }
    .hero-h1 span { display:block }
    .hero-h1-1 { font-size:clamp(56px,7.5vw,96px); color:#fff }
    .hero-h1-2 { font-size:clamp(60px,8.5vw,108px); font-style:italic }
    .hero-p { font-size:13px; color:rgba(255,255,255,.5); line-height:2.1; max-width:420px; margin-bottom:44px }
    .hero-btns { display:flex; gap:12px; flex-wrap:wrap }
    .btn-gold { display:inline-block; padding:14px 38px; background:linear-gradient(135deg,#c9a84c,#f0d080,#a07830); background-size:200%; color:#0d1b2a; border:none; font-size:8px; letter-spacing:3px; text-transform:uppercase; font-weight:600; cursor:pointer; text-decoration:none; font-family:'Jost',sans-serif; transition:all .4s }
    .btn-gold:hover { background-position:right; transform:translateY(-2px); box-shadow:0 10px 30px rgba(201,168,76,.3) }
    .btn-outline { display:inline-block; padding:13px 38px; background:transparent; color:rgba(255,255,255,.7); border:1px solid rgba(255,255,255,.2); font-size:8px; letter-spacing:3px; text-transform:uppercase; cursor:pointer; text-decoration:none; font-family:'Jost',sans-serif; transition:all .35s }
    .btn-outline:hover { border-color:#c9a84c; color:#c9a84c }

    /* Rate Card */
    .rate-card {
      position:absolute; right:6%; top:50%; transform:translateY(-50%);
      background:rgba(13,27,42,.88); backdrop-filter:blur(28px);
      border:1px solid rgba(201,168,76,.15); padding:30px 26px; width:256px;
      z-index:2; animation:float 7s ease-in-out infinite
    }
    .rate-card::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,#c9a84c,#f0d080,#a07830) }
    .rate-live { display:flex; align-items:center; gap:8px; margin-bottom:18px }
    .rate-dot { width:6px; height:6px; border-radius:50%; background:#22c55e; animation:pulse 2s infinite }
    .rate-live-txt { font-size:8px; letter-spacing:3px; color:rgba(201,168,76,.7); text-transform:uppercase }
    .rate-big { font-family:'Cormorant Garamond',serif; font-size:42px; font-weight:300; color:#fff; line-height:1; margin-bottom:4px }
    .rate-sub { font-size:7.5px; letter-spacing:2px; color:rgba(255,255,255,.2); margin-bottom:18px }
    .rate-divider { height:1px; background:rgba(201,168,76,.1); margin-bottom:14px }
    .rate-row { display:flex; justify-content:space-between; margin-bottom:9px }
    .rate-row-l { font-size:8px; letter-spacing:1.5px; color:rgba(255,255,255,.25) }
    .rate-row-r { font-size:11px; color:#c9a84c }

    /* ── TICKER ── */
    .ticker-wrap { background:#0d1b2a; border-top:1px solid rgba(201,168,76,.08); border-bottom:1px solid rgba(201,168,76,.08); padding:10px 0; overflow:hidden }
    .ticker { display:flex; gap:60px; animation:ticker 45s linear infinite; white-space:nowrap }
    .tk-item { display:flex; align-items:center; gap:10px; flex-shrink:0 }
    .tk-l { font-size:8px; letter-spacing:2.5px; color:rgba(255,255,255,.5); text-transform:uppercase }
    .tk-v { font-size:11px; color:#c9a84c }
    .tk-sep { color:rgba(201,168,76,.3); font-size:7px }

    /* ── SECTIONS ── */
    .sec { padding:100px 6% }
    .sec-dark { background:#0d1b2a }
    .sec-light { background:#fff; color:#0d1b2a }
    .sec-grey { background:#f7f8fa; color:#0d1b2a }

    .eyebrow { font-size:8.5px; letter-spacing:4px; text-transform:uppercase; color:#c9a84c; display:flex; align-items:center; gap:14px; margin-bottom:16px }
    .eyebrow::before { content:''; width:28px; height:1px; background:#c9a84c }
    .sec-h2 { font-family:'Cormorant Garamond',serif; font-weight:300; line-height:1.05; margin-bottom:0 }
    .sec-h2 span { display:block }

    /* ── CATEGORIES ── */
    .cat-grid { display:grid; grid-template-columns:2fr 1fr 1fr; grid-template-rows:260px 260px; gap:3px; margin-top:56px }
    .cat-card { position:relative; overflow:hidden; cursor:pointer; background:#111 }
    .cat-card.big { grid-row:1/span 2 }
    .cat-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transition:transform .8s cubic-bezier(.16,1,.3,1); filter:brightness(.55) }
    .cat-card:hover .cat-img { transform:scale(1.08) }
    .cat-ov { position:absolute; inset:0; background:linear-gradient(to top,rgba(13,27,42,.92) 0%,rgba(13,27,42,.1) 65%,transparent 100%) }
    .cat-info { position:absolute; bottom:0; left:0; right:0; padding:26px }
    .cat-line { width:20px; height:1.5px; background:#c9a84c; margin-bottom:10px }
    .cat-name { font-family:'Cormorant Garamond',serif; color:#fff; font-size:22px; font-weight:400; margin-bottom:3px }
    .cat-card.big .cat-name { font-size:32px }
    .cat-sub { font-size:7.5px; letter-spacing:2.5px; color:rgba(255,255,255,.35); text-transform:uppercase }
    .cat-badge { position:absolute; top:18px; left:18px; background:#c9a84c; color:#0d1b2a; font-size:7px; letter-spacing:2px; text-transform:uppercase; padding:4px 11px; font-weight:600 }

    /* ── CALCULATOR ── */
    .calc-wrap { display:grid; grid-template-columns:1fr 1fr; gap:3px; margin-top:56px }
    .calc-left { background:rgba(255,255,255,.04); border:1px solid rgba(201,168,76,.08); padding:44px }
    .calc-right { display:flex; flex-direction:column; gap:3px }
    .calc-result { flex:1; background:linear-gradient(135deg,#c9a84c,#f5e090,#a07830); padding:44px; display:flex; flex-direction:column; justify-content:center; align-items:center; text-align:center }
    .calc-res-lbl { font-size:8px; letter-spacing:4px; color:rgba(13,27,42,.55); margin-bottom:12px; text-transform:uppercase }
    .calc-res-val { font-family:'Cormorant Garamond',serif; font-size:clamp(42px,5vw,62px); font-weight:400; color:#0d1b2a; line-height:1 }
    .calc-res-sub { font-size:10px; color:rgba(13,27,42,.45); margin-top:8px }
    .calc-break { background:rgba(255,255,255,.04); border:1px solid rgba(201,168,76,.08); padding:28px }
    .c-lbl { font-size:7.5px; letter-spacing:3px; text-transform:uppercase; color:rgba(255,255,255,.3); display:block; margin-bottom:7px }
    .c-sel { width:100%; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.07); color:#e8e0d0; padding:12px 14px; font-size:13px; outline:none; margin-bottom:18px; font-family:'Jost',sans-serif; cursor:pointer }
    .c-inp { width:100%; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.07); color:#e8e0d0; padding:12px 14px; font-size:13px; outline:none; margin-bottom:18px; font-family:'Jost',sans-serif }
    .c-sel:focus, .c-inp:focus { border-color:rgba(201,168,76,.35) }
    .bd-row { display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,.04); font-size:12px }
    .bd-l { color:rgba(255,255,255,.35) } .bd-r { color:rgba(255,255,255,.75) }
    .bd-total { display:flex; justify-content:space-between; padding:13px 0 0; font-size:14px; color:#c9a84c }

    /* ── PRODUCTS ── */
    .filter-bar { display:flex; border:1px solid rgba(13,27,42,.1); width:fit-content; margin-bottom:42px; overflow:hidden }
    .f-btn { padding:10px 20px; border:none; background:transparent; font-size:8.5px; letter-spacing:2.5px; text-transform:uppercase; color:#777; cursor:pointer; font-family:'Jost',sans-serif; border-right:1px solid rgba(13,27,42,.07); transition:all .25s }
    .f-btn:last-child { border-right:none }
    .f-btn:hover { background:rgba(13,27,42,.04) }
    .f-btn.on { background:#0d1b2a; color:#fff }
    .prod-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(260px,1fr)); gap:2px }
    .pcard { background:#fff; cursor:pointer; transition:transform .4s cubic-bezier(.16,1,.3,1),box-shadow .4s; border:1px solid rgba(13,27,42,.06) }
    .pcard:hover { transform:translateY(-5px); box-shadow:0 16px 48px rgba(13,27,42,.1) }
    .pcard-img { aspect-ratio:1; background:#f0f0f0; overflow:hidden; position:relative }
    .pcard-img img { width:100%; height:100%; object-fit:cover; transition:transform .65s }
    .pcard:hover .pcard-img img { transform:scale(1.06) }
    .pcard-ph { width:100%; height:100%; background:linear-gradient(135deg,#e8f0f8,#dce8f4); display:flex; align-items:center; justify-content:center }
    .pcard-bdg { position:absolute; top:12px; left:12px; background:#c9a84c; color:#0d1b2a; font-size:6.5px; letter-spacing:2px; padding:4px 10px; font-weight:700; text-transform:uppercase }
    .pcard-body { padding:20px 24px 26px }
    .pcard-meta { display:flex; align-items:center; gap:7px; margin-bottom:7px }
    .pcard-karat { font-size:7.5px; letter-spacing:3px; color:#c9a84c; text-transform:uppercase }
    .pcard-dot { color:rgba(13,27,42,.15); font-size:7px }
    .pcard-cat { font-size:7.5px; letter-spacing:2px; color:rgba(13,27,42,.38); text-transform:uppercase }
    .pcard-name { font-family:'Cormorant Garamond',serif; font-size:20px; color:#0d1b2a; margin-bottom:5px; line-height:1.2 }
    .pcard-weight { font-size:10px; color:rgba(13,27,42,.35); margin-bottom:13px }
    .pcard-cta { font-size:8.5px; color:#c9a84c; letter-spacing:1px; border-bottom:1px solid rgba(201,168,76,.3); padding-bottom:1px; display:inline-block }
    .no-prod { text-align:center; padding:80px 0; color:#aaa }

    /* ── ABOUT ── */
    .about-grid { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center }
    .about-p { font-size:13.5px; color:#374151; line-height:2.3; margin-bottom:40px }
    .about-items { display:flex; flex-direction:column; gap:2px }
    .about-item { display:flex; gap:18px; padding:16px 20px; background:#f8fafc; border-left:2px solid transparent; transition:all .3s }
    .about-item:hover { border-left-color:#c9a84c; background:#fff; box-shadow:2px 0 12px rgba(13,27,42,.04) }
    .about-item-icon { font-size:15px; flex-shrink:0; margin-top:1px }
    .about-item-t { font-size:8.5px; letter-spacing:2px; text-transform:uppercase; color:#0d1b2a; margin-bottom:5px; font-weight:500 }
    .about-item-v { font-size:12px; color:#475569; line-height:2; white-space:pre-line }
    .stat-grid { display:grid; grid-template-columns:1fr 1fr; gap:2px; margin-bottom:2px }
    .stat-box { background:#0d1b2a; padding:30px 24px }
    .stat-n { font-family:'Cormorant Garamond',serif; font-size:38px; font-weight:400; line-height:1; margin-bottom:8px }
    .stat-l { font-size:8px; letter-spacing:2px; text-transform:uppercase; color:rgba(255,255,255,.65) }
    .stat-brand { background:linear-gradient(135deg,#c9a84c,#f0d080,#a07830); padding:22px 26px; display:flex; align-items:center; gap:16px }
    .stat-brand img { width:44px; height:44px; border-radius:50%; object-fit:cover; border:2px solid rgba(13,27,42,.2); flex-shrink:0 }
    .stat-brand-n { font-family:'Cormorant Garamond',serif; font-size:16px; color:#0d1b2a; letter-spacing:4px; font-weight:600 }
    .stat-brand-s { font-size:7px; letter-spacing:2px; color:rgba(13,27,42,.65); margin-top:2px }

    /* ── CONTACT ── */
    .contact-grid { display:grid; grid-template-columns:1fr 1fr; gap:2px; margin-bottom:2px }
    .c-card { background:rgba(255,255,255,.04); border:1px solid rgba(201,168,76,.1); padding:28px; display:flex; gap:18px; transition:all .3s }
    .c-card:hover { background:rgba(201,168,76,.06); border-color:rgba(201,168,76,.25) }
    .c-icon { width:42px; height:42px; flex-shrink:0; background:rgba(201,168,76,.1); border:1px solid rgba(201,168,76,.18); display:flex; align-items:center; justify-content:center; font-size:16px }
    .c-title { font-size:10.5px; letter-spacing:1.5px; color:#fff; margin-bottom:6px; font-weight:500 }
    .c-text { font-size:11.5px; color:rgba(255,255,255,.6); line-height:2; white-space:pre-line; margin-bottom:10px }
    .c-link { font-size:8.5px; color:#c9a84c; letter-spacing:1px; text-decoration:none; border-bottom:1px solid rgba(201,168,76,.35); padding-bottom:1px }
    .c-cta { background:rgba(201,168,76,.06); border:1px solid rgba(201,168,76,.12); padding:38px 48px; display:flex; justify-content:space-between; align-items:center }
    .c-cta-h { font-family:'Cormorant Garamond',serif; font-size:26px; color:#fff; margin-bottom:7px }
    .c-cta-p { font-size:11.5px; color:rgba(255,255,255,.55); line-height:1.9 }

    /* ── FOOTER ── */
    .footer { background:#060a14; border-top:1px solid rgba(201,168,76,.06); padding:60px 6% 0 }
    .footer-grid { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:56px; padding-bottom:44px }
    .footer-col-t { font-size:7.5px; letter-spacing:3px; text-transform:uppercase; color:rgba(201,168,76,.55); margin-bottom:18px }
    .footer-lnk { font-size:10.5px; color:rgba(255,255,255,.18); display:block; margin-bottom:11px; transition:color .25s; cursor:pointer; text-decoration:none }
    .footer-lnk:hover { color:#c9a84c }
    .footer-bot { border-top:1px solid rgba(255,255,255,.04); padding:16px 0; display:flex; justify-content:space-between; align-items:center }
    .footer-copy { font-size:9.5px; color:rgba(255,255,255,.12) }

    /* ── WA FAB ── */
    .wa-fab { position:fixed; bottom:26px; right:26px; width:52px; height:52px; border-radius:50%; background:#25D366; display:flex; align-items:center; justify-content:center; font-size:22px; text-decoration:none; box-shadow:0 4px 20px rgba(37,211,102,.4); z-index:999; transition:transform .3s }
    .wa-fab:hover { transform:scale(1.12) }

    /* ── MODAL ── */
    .modal-ov { position:fixed; inset:0; background:rgba(6,10,20,.88); backdrop-filter:blur(16px); z-index:2000; display:flex; align-items:center; justify-content:center; padding:20px }
    .modal { background:#fff; max-width:600px; width:100%; overflow:hidden }
    .modal-top { height:3px; background:linear-gradient(90deg,#c9a84c,#f0d080,#a07830) }
    .modal-head { padding:30px 38px 22px; border-bottom:1px solid rgba(13,27,42,.07); display:flex; justify-content:space-between }
    .modal-k { font-size:7.5px; letter-spacing:3px; color:#c9a84c; margin-bottom:7px }
    .modal-name { font-family:'Cormorant Garamond',serif; font-size:26px; color:#0d1b2a }
    .modal-desc { font-size:11px; color:#64748b; margin-top:4px; max-width:360px; line-height:1.8 }
    .modal-x { background:none; border:1px solid rgba(13,27,42,.1); width:32px; height:32px; cursor:pointer; font-size:16px; color:#64748b; display:flex; align-items:center; justify-content:center; flex-shrink:0 }
    .modal-body { padding:26px 38px 34px }
    .modal-specs { display:grid; grid-template-columns:repeat(3,1fr); gap:2px; margin-bottom:18px }
    .modal-spec { background:#f8fafc; padding:13px 11px; border-left:2px solid #c9a84c }
    .modal-spec-l { font-size:7px; letter-spacing:2.5px; color:rgba(13,27,42,.4); margin-bottom:5px; text-transform:uppercase }
    .modal-spec-v { font-size:13px; color:#0d1b2a }
    .modal-price-box { background:linear-gradient(135deg,#0d1b2a,#162236); padding:22px; margin-bottom:14px; position:relative; overflow:hidden }
    .modal-price-box::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,#c9a84c,#f0d080,#a07830) }
    .mpb-inner { display:flex; justify-content:space-between; gap:20px; align-items:flex-start }
    .mpb-rows { flex:1 }
    .mpb-row { display:flex; justify-content:space-between; font-size:11px; border-bottom:1px solid rgba(255,255,255,.05); padding-bottom:7px; margin-bottom:7px }
    .mpb-row-l { color:rgba(255,255,255,.38) }
    .mpb-row-r { color:rgba(255,255,255,.72) }
    .mpb-right { flex-shrink:0; text-align:right }
    .mpb-lbl { font-size:7.5px; letter-spacing:3px; color:rgba(201,168,76,.6); margin-bottom:9px; text-transform:uppercase }
    .mpb-main { font-family:'Cormorant Garamond',serif; font-size:28px; color:#fff; line-height:1; margin-bottom:10px }
    .mpb-sep { height:1px; background:rgba(201,168,76,.15); margin-bottom:9px }
    .mpb-kdv-l { font-size:8.5px; color:rgba(255,255,255,.28); margin-bottom:2px }
    .mpb-kdv-v { font-size:15px; color:#c9a84c; margin-bottom:7px }
    .mpb-note { display:flex; align-items:center; gap:6px; margin-top:14px; padding-top:11px; border-top:1px solid rgba(255,255,255,.05) }
    .mpb-note-dot { width:5px; height:5px; border-radius:50%; background:#22c55e; flex-shrink:0 }
    .mpb-note-txt { font-size:8.5px; color:rgba(255,255,255,.22) }
    .modal-btns { display:flex; gap:2px }
    .m-btn-wa { flex:1; background:linear-gradient(135deg,#c9a84c,#f0d080,#a07830); border:none; color:#0d1b2a; padding:14px; font-size:8.5px; letter-spacing:2px; cursor:pointer; font-weight:700; font-family:'Jost',sans-serif; text-align:center; text-decoration:none; display:flex; align-items:center; justify-content:center }
    .m-btn-cl { padding:14px 20px; background:none; border:1px solid rgba(13,27,42,.12); color:#64748b; cursor:pointer; font-size:8.5px; letter-spacing:2px; font-family:'Jost',sans-serif }

    @media(max-width:900px){
      .nav-links { display:none }
      .burger { display:flex }
      .rate-card { display:none }
      .hero-content { max-width:100% }
      .cat-grid { grid-template-columns:1fr 1fr; grid-template-rows:auto; }
      .cat-card.big { grid-row:auto; grid-column:1/span 2 }
      .calc-wrap, .about-grid, .contact-grid, .footer-grid { grid-template-columns:1fr }
      .c-cta { flex-direction:column; gap:20px }
    }
  `

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <>
      <style>{css}</style>

      {/* ── NAV ── */}
      <nav className={`nav${navSolid ? ' solid' : ''}`}>
        <a href="#" className="nav-logo">
          <img src={LOGO} alt="FZA Gold" />
          <div>
            <span className="nav-logo-name">{S('store_name', 'FZA GOLD')}</span>
            <span className="nav-logo-sub">Est. 1980 · Fatih · İstanbul</span>
          </div>
        </a>
        <div className="nav-links">
          {[
            ['#categories', T('Koleksiyon', 'Collection')],
            ['#calculator', T('Altın Kuru', 'Gold Rate')],
            ['#about', T('Hakkımızda', 'About')],
            ['#contact', T('İletişim', 'Contact')],
          ].map(([href, label]) => (
            <a key={href as string} href={href as string} className="nav-a">{label}</a>
          ))}
        </div>
        <div className="nav-right">
          {(['tr', 'en'] as const).map(l => (
            <button key={l} className={`lang-btn${lang === l ? ' on' : ''}`} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
          ))}
          <button className="burger" onClick={() => setMenuOpen(o => !o)} aria-label="Menü">
            <span style={{ transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* ── MOBİL MENÜ ── */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''} ${navSolid ? 'mobile-menu-solid' : 'mobile-menu-dark'}`}>
        {[
          ['#categories', T('Koleksiyon', 'Collection')],
          ['#calculator', T('Altın Kuru', 'Gold Rate')],
          ['#about', T('Hakkımızda', 'About')],
          ['#contact', T('İletişim', 'Contact')],
        ].map(([href, label]) => (
          <a key={href as string} href={href as string}
            onClick={() => setMenuOpen(false)}
            style={{ color: navSolid ? '#0d1b2a' : 'rgba(255,255,255,.85)', borderBottom: '1px solid rgba(201,168,76,.08)' }}>
            {label}
          </a>
        ))}
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-img" style={{ backgroundImage: `url('${S('hero_image', 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=3840&auto=format&fit=crop')}')` }} />
        <div className="hero-grad" />
        <div className="hero-dots" />
        <div className="hero-content">
          <p className="hero-tag ai">{T('Toptan Kuyumcu · İstanbul · 1980', 'Wholesale Jeweller · Istanbul · 1980')}</p>
          <h1 className="hero-h1">
            <span className="hero-h1-1 au d1">{lang === 'tr' ? S('hero_title_tr', 'İnce Altın') : S('hero_title_en', 'Fine Gold')}</span>
            <span className="hero-h1-2 gold-text au d2">{lang === 'tr' ? S('hero_subtitle_tr', 'Sanatı') : S('hero_subtitle_en', 'Artistry')}</span>
          </h1>
          <p className="hero-p au d3">
            {lang === 'tr'
              ? S('hero_desc_tr', "1980'den bu yana İstanbul'un kalbinden kaliteli altın takı üretimi ve toptan satış.")
              : S('hero_desc_en', 'Quality gold jewellery production and wholesale from the heart of Istanbul since 1980.')}
          </p>
          <div className="hero-btns au d4">
            <a href="#categories" className="btn-gold">{T('Koleksiyonu Keşfet', 'Explore Collection')}</a>
            <a href="#calculator" className="btn-outline">{T('Fiyat Hesapla', 'Price Calculator')}</a>
          </div>
        </div>

        {/* Rate Card */}
        <div className="rate-card">
          <div className="rate-live">
            <div className="rate-dot" />
            <span className="rate-live-txt">{T('Canlı Altın', 'Live Gold')}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 4 }}>
            <div>
              <div style={{ fontSize: 7.5, letterSpacing: 2, color: 'rgba(255,255,255,.4)', marginBottom: 3 }}>{T('ALIŞ', 'BUY')}</div>
              <div className="rate-big">₺{fmt(rates.has_altin).split(',')[0]}<span style={{ fontSize: 22 }}>,{fmt(rates.has_altin).split(',')[1]}</span></div>
            </div>
            <div style={{ textAlign: 'right', paddingBottom: 5 }}>
              <div style={{ fontSize: 7.5, letterSpacing: 2, color: 'rgba(255,255,255,.4)', marginBottom: 3 }}>{T('SATIŞ', 'SELL')}</div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 28, fontWeight: 300, color: '#c9a84c', lineHeight: 1 }}>
                ₺{fmt(rates.has_altin_satis || rates.has_altin).split(',')[0]}<span style={{ fontSize: 17 }}>,{fmt(rates.has_altin_satis || rates.has_altin).split(',')[1]}</span>
              </div>
            </div>
          </div>
          <div className="rate-sub">HAS ALTIN / GR</div>
          <div className="rate-divider" />
          {([['22K', rates.altin_22k], ['18K', rates.altin_18k], ['14K', rates.altin_14k]] as [string, number][]).map(([k, v]) => (
            <div key={k} className="rate-row">
              <span className="rate-row-l">{k} / GR</span>
              <span className="rate-row-r">₺{fmt(v)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker-wrap">
        <div className="ticker">
          {[0, 1].map(x => (
            <div key={x} style={{ display: 'flex', gap: 60, flexShrink: 0 }}>
              {([
                ['HAS ALTIN', `₺${fmt(rates.has_altin)}`],
                ['22 AYAR', `₺${fmt(rates.altin_22k)}`],
                ['18 AYAR', `₺${fmt(rates.altin_18k)}`],
                ['14 AYAR', `₺${fmt(rates.altin_14k)}`],
                ['USD/TRY', '₺44,02'],
                ['ALTIN/ONS', '$2.910'],
              ] as [string, string][]).map(([l, v]) => (
                <span key={l} className="tk-item">
                  <span className="tk-l">{l}</span>
                  <span className="tk-v">{v}</span>
                  <span className="tk-sep">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section id="categories" className="sec sec-dark">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p className="eyebrow">{T('Ürün Kategorileri', 'Product Categories')}</p>
            <h2 className="sec-h2" style={{ color: '#fff' }}>
              <span>{T('Koleksiyon', 'Collection')}</span>
              <span className="gold-text">{T('Kategorileri', 'Categories')}</span>
            </h2>
          </div>
          <a href="#products" style={{ fontSize: 8.5, letterSpacing: 2, color: 'rgba(255,255,255,.35)', cursor: 'pointer', borderBottom: '1px solid rgba(201,168,76,.25)', paddingBottom: 2, textDecoration: 'none' }}>
            {T('Tüm Ürünler →', 'All Products →')}
          </a>
        </div>
        <div className="cat-grid">
          {[
            { name: T('Bilezik', 'Bracelet'), sub: '22K · 14K Ayar', badge: T('Çok Satan', 'Best Seller'), cat: 'bilezik', big: true, img: S('cat_bilezik', 'https://static.ticimax.cloud/42691/uploads/urunresimleri/22-ayar-altin-kaplama-orgu-bilezik-9e-a06.jpg') },
            { name: T('Zincir', 'Chain'), sub: '14K · 18K', cat: 'zincir', img: S('cat_zincir', 'https://cdn.dsmcdn.com/mnresize/420/620/ty1715/prod/QC_PREP/20250723/16/c20f09ad-b9eb-374e-947c-e5bd7b129e03/1_org_zoom.jpg') },
            { name: T('Kolye', 'Necklace'), sub: '14K', cat: 'kolye', img: S('cat_kolye', 'https://www.elizi.com.tr/resim/urun/elizi-mesh-altin-kolye-Ord190322-13-1647948802-1.jpg') },
            { name: T('Yüzük', 'Ring'), sub: '14K', cat: 'yuzuk', img: S('cat_yuzuk', 'https://www.altinplaza.com/images/urunler/14-ayar-yuvarlak-pullu-altin-yuzuk-yz03211-resim-24919.jpg') },
            { name: T('Küpe', 'Earring'), sub: '14K', cat: 'kupe', img: S('cat_kupe', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwhILl2SrfjKVgD5HdRYLrKKh52KW9CheIhg&s') },
          ].map(c => (
            <div key={c.cat} className={`cat-card${c.big ? ' big' : ''}`} onClick={() => { setFilter(c.cat); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }) }}>
              <img className="cat-img" src={c.img} alt={c.name} />
              <div className="cat-ov" />
              {c.badge && <div className="cat-badge">{c.badge}</div>}
              <div className="cat-info">
                <div className="cat-line" />
                <div className="cat-name">{c.name}</div>
                <div className="cat-sub">{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section id="calculator" className="sec sec-dark">
        <div style={{ textAlign: 'center' }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>{T('Gerçek Zamanlı Hesaplama', 'Real-Time Calculation')}</p>
          <h2 className="sec-h2" style={{ color: '#fff' }}>
            <span>{T('Altın Fiyat', 'Gold Price')}</span>
            <span className="gold-text">{T('Hesaplayıcı', 'Calculator')}</span>
          </h2>
        </div>
        <div className="calc-wrap">
          <div className="calc-left">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(201,168,76,.06)', border: '1px solid rgba(201,168,76,.1)', padding: '11px 14px', marginBottom: 28 }}>
              <div className="rate-dot" />
              <span style={{ fontSize: 7.5, letterSpacing: 3, color: 'rgba(201,168,76,.7)', textTransform: 'uppercase' }}>{T('Canlı Kur', 'Live Rate')}</span>
              <span style={{ fontSize: 13, color: '#c9a84c', marginLeft: 'auto' }}>₺{fmt(rates.has_altin)}/gr</span>
            </div>
            <label className="c-lbl">{T('ALTIN AYARI', 'GOLD KARAT')}</label>
            <select className="c-sel" value={calcKarat} onChange={e => setCalcKarat(parseFloat(e.target.value))}>
              <option value={0.9166} style={{ background: '#0d1b2a' }}>22 {T('Ayar', 'Karat')} — 916‰</option>
              <option value={0.75} style={{ background: '#0d1b2a' }}>18 {T('Ayar', 'Karat')} — 750‰</option>
              <option value={0.585} style={{ background: '#0d1b2a' }}>14 {T('Ayar', 'Karat')} — 585‰</option>
              <option value={0.375} style={{ background: '#0d1b2a' }}>9 {T('Ayar', 'Karat')} — 375‰</option>
            </select>
            <label className="c-lbl">{T('AĞIRLIK (GR)', 'WEIGHT (G)')}</label>
            <input className="c-inp" type="number" value={calcWeight} onChange={e => setCalcWeight(parseFloat(e.target.value) || 0)} />
            <label className="c-lbl">KDV</label>
            <select className="c-sel" value={calcKdv} onChange={e => setCalcKdv(parseFloat(e.target.value))}>
              <option value={0} style={{ background: '#0d1b2a' }}>{T('KDV Dahil Değil', 'Excl. VAT')}</option>
              <option value={0.18} style={{ background: '#0d1b2a' }}>%18 KDV</option>
              <option value={0.20} style={{ background: '#0d1b2a' }}>%20 KDV</option>
            </select>
          </div>
          <div className="calc-right">
            <div className="calc-result">
              <div className="calc-res-lbl">{T('TOPLAM FİYAT', 'TOTAL PRICE')}</div>
              <div className="calc-res-val">₺{fmt(calcTotal)}</div>
              <div className="calc-res-sub">{calcWeight}gr · {(calcKarat * 1000).toFixed(0)}‰</div>
            </div>
            <div className="calc-break">
              <div style={{ fontSize: 7.5, letterSpacing: 3, color: 'rgba(255,255,255,.3)', marginBottom: 14, textTransform: 'uppercase' }}>{T('DÖKÜM', 'BREAKDOWN')}</div>
              {([
                [T('Altın maliyeti', 'Gold cost'), goldCost],
                [`KDV (${(calcKdv * 100).toFixed(0)}%)`, calcTotal - goldCost - defaultIscilik],
              ] as [string, number][]).map(([l, v]) => (
                <div key={l as string} className="bd-row"><span className="bd-l">{l}</span><span className="bd-r">₺{fmt(v)}</span></div>
              ))}
              <div className="bd-total"><span>{T('TOPLAM', 'TOTAL')}</span><span>₺{fmt(calcTotal)}</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" className="sec sec-grey">
        <p className="eyebrow" style={{ color: '#c9a84c' }}>{T('Ürün Kataloğu', 'Product Catalogue')}</p>
        <h2 className="sec-h2" style={{ marginBottom: 38 }}>
          <span>{T('Özel', 'Bespoke')}</span>
          <span style={{ color: '#c9a84c' }}>{T('Koleksiyon', 'Collection')}</span>
        </h2>
        <div className="filter-bar">
          {CATS.map(c => (
            <button key={c} className={`f-btn${filter === c ? ' on' : ''}`} onClick={() => setFilter(c)}>{CAT_LABEL[c]}</button>
          ))}
        </div>
        {filtered.length === 0
          ? <div className="no-prod"><div style={{ fontSize: 40, color: '#ddd', marginBottom: 12 }}>◆</div><p style={{ fontSize: 13 }}>{T('Bu kategoride henüz ürün yok.', 'No products in this category yet.')}</p></div>
          : <div className="prod-grid">
            {filtered.map(p => (
              <div key={p.id} className="pcard" onClick={() => setModal(p)}>
                <div className="pcard-img">
                  {p.image_url ? <img src={p.image_url} alt={p.name} /> : <div className="pcard-ph"><span style={{ fontSize: 36, color: 'rgba(13,27,42,.07)' }}>◆</span></div>}
                  {p.badge && <div className="pcard-bdg">{p.badge}</div>}
                </div>
                <div className="pcard-body">
                  <div className="pcard-meta">
                    <span className="pcard-karat">{p.karat}K</span>
                    <span className="pcard-dot">·</span>
                    <span className="pcard-cat">{p.category}</span>
                  </div>
                  <div className="pcard-name">{lang === 'tr' ? p.name : (p.name_en || p.name)}</div>
                  <div className="pcard-weight">{p.weight} gr</div>
                  <span className="pcard-cta">{T('Fiyat için tıklayın →', 'Click for price →')}</span>
                </div>
              </div>
            ))}
          </div>
        }
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="sec sec-light">
        <div className="about-grid">
          <div>
            <p className="eyebrow">{T('FZA GOLD Hakkında', 'About FZA GOLD')}</p>
            <h2 className="sec-h2" style={{ marginBottom: 26 }}>
              <span>{T("1980'den Bu Yana", 'Since 1980')}</span>
              <span style={{ color: '#c9a84c' }}>{T('Güven ve Kalite', 'Trust & Quality')}</span>
            </h2>
            <p className="about-p">
              {lang === 'tr'
                ? S('about_text_tr', "FZA GOLD, 1980 yılından bu yana İstanbul Fatih'te toptan kuyumculuk sektöründe öncü konumdadır. 14 ayardan 22 ayara geniş ürün yelpazemizle yüksek kaliteli altın takılar üretmekteyiz.")
                : S('about_text_en', 'FZA GOLD has been a leader in wholesale jewellery in Istanbul since 1980. We produce high-quality gold jewellery across a wide range, from 14 to 22 karat.')}
            </p>
            <div className="about-items">
              {[
                { icon: '📍', title: T('Adres', 'Address'), text: S('store_address', 'Ağaoğlu Kuyumcular Çarşısı\nŞerefefendi Sok. No:17, Fatih/İstanbul') },
                { icon: '📞', title: T('Telefon', 'Phone'), text: S('phone_1', '0212 520 17 66') + '\n' + S('phone_2', '0507 605 31 10') },
                { icon: '⏰', title: T('Çalışma Saatleri', 'Working Hours'), text: S('working_hours', 'Pazartesi – Cumartesi  09:00 – 18:00') },
              ].map(item => (
                <div key={item.title} className="about-item">
                  <span className="about-item-icon">{item.icon}</span>
                  <div>
                    <div className="about-item-t">{item.title}</div>
                    <div className="about-item-v">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="stat-grid">
              {[
                [S('stat_1_num', '45+'), lang === 'tr' ? S('stat_1_label_tr', 'Yıl Tecrübesi') : S('stat_1_label_en', 'Years Exp.')],
                [S('stat_2_num', '14–22'), lang === 'tr' ? S('stat_2_label_tr', 'Ayar Seçeneği') : S('stat_2_label_en', 'Karat Options')],
                [S('stat_3_num', '5+'), lang === 'tr' ? S('stat_3_label_tr', 'Kategori') : S('stat_3_label_en', 'Categories')],
                ['★★★★★', T('Müşteri Memnuniyeti', 'Customer Satisfaction')],
              ].map(([num, lbl]) => (
                <div key={lbl as string} className="stat-box">
                  <div className="stat-n gold-text">{num}</div>
                  <div className="stat-l">{lbl}</div>
                </div>
              ))}
            </div>
            <div className="stat-brand">
              <img src={LOGO} alt="FZA" />
              <div>
                <div className="stat-brand-n">{S('store_name', 'FZA GOLD')}</div>
                <div className="stat-brand-s">EST. 1980 · FATİH, İSTANBUL</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="sec sec-dark">
        <p className="eyebrow">{T('Bize Ulaşın', 'Get In Touch')}</p>
        <h2 className="sec-h2" style={{ color: '#fff', marginBottom: 56 }}>
          <span>{T('Her Sorunuz İçin', 'For Every Question')}</span>
          <span className="gold-text">{T('Buradayız', 'We Are Here')}</span>
        </h2>
        <div className="contact-grid">
          {[
            { icon: '📍', title: T('Mağaza', 'Store'), text: S('store_address', 'Ağaoğlu Kuyumcular Çarşısı\nŞerefefendi Sok. No:17, Fatih/İstanbul'), link: S('maps_url', 'https://maps.app.goo.gl/3Eakc6Ft3jQZoyKv8'), linkText: T('Haritada Aç', 'Open in Maps') },
            { icon: '💬', title: 'WhatsApp', text: T('Sipariş ve fiyat için yazın.', 'Message for orders and pricing.'), link: `https://wa.me/${S('whatsapp_number', '905076053110')}`, linkText: '+90 507 605 31 10' },
            { icon: '📞', title: T('Telefon', 'Phone'), text: S('phone_1', '0212 520 17 66') + '\n' + S('phone_2', '0507 605 31 10'), link: `tel:+90${S('phone_1', '02125201766').replace(/\s/g, '')}`, linkText: S('phone_1', '0212 520 17 66') },
            { icon: '📷', title: 'Instagram', text: T('Yeni koleksiyonlar için takip edin.', 'Follow for new collections.'), link: `https://instagram.com/${S('instagram', 'fzagold').replace('@', '')}`, linkText: S('instagram', '@fzagold') },
          ].map(c => (
            <div key={c.title} className="c-card">
              <div className="c-icon">{c.icon}</div>
              <div>
                <div className="c-title">{c.title}</div>
                <div className="c-text">{c.text}</div>
                <a href={c.link} target="_blank" className="c-link">{c.linkText} →</a>
              </div>
            </div>
          ))}
        </div>
        <div className="c-cta" style={{ marginTop: 2 }}>
          <div>
            <div className="c-cta-h">{T('Bizi Ziyaret Edin', 'Visit Us')}</div>
            <div className="c-cta-p">{S('store_address', 'Ağaoğlu Kuyumcular Çarşısı, Şerefefendi Sok. No:17, Fatih/İstanbul')}</div>
          </div>
          <a href={S('maps_url', 'https://maps.app.goo.gl/3Eakc6Ft3jQZoyKv8')} target="_blank" className="btn-gold">Google Maps</a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <img src={LOGO} alt="FZA" style={{ width: 42, height: 42, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid rgba(201,168,76,.3)' }} />
              <div>
                <div style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 17, color: '#fff', letterSpacing: 5, fontWeight: 600 }}>{S('store_name', 'FZA GOLD')}</div>
                <div style={{ fontSize: 6.5, letterSpacing: 3, color: 'rgba(201,168,76,.45)' }}>EST. 1980 · FATİH · İSTANBUL</div>
              </div>
            </div>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,.18)', lineHeight: 2.1, maxWidth: 200 }}>
              {lang === 'tr' ? S('footer_desc_tr', "1980'den bu yana İstanbul'dan toptan kuyumculuk.") : S('footer_desc_en', 'Wholesale jewellery from Istanbul since 1980.')}
            </p>
          </div>
          <div>
            <div className="footer-col-t">{T('KATEGORİLER', 'CATEGORIES')}</div>
            {[T('Bilezikler', 'Bracelets'), T('Zincirler', 'Chains'), T('Kolyeler', 'Necklaces'), T('Yüzükler', 'Rings'), T('Küpeler', 'Earrings')].map(l => (
              <span key={l} className="footer-lnk">{l}</span>
            ))}
          </div>
          <div>
            <div className="footer-col-t">{T('İLETİŞİM', 'CONTACT')}</div>
            {[S('phone_1', '0212 520 17 66'), S('phone_2', '0507 605 31 10'), 'WhatsApp', S('instagram', '@fzagold')].map(l => (
              <span key={l} className="footer-lnk">{l}</span>
            ))}
          </div>
          <div>
            <div className="footer-col-t">{T('ADRES', 'ADDRESS')}</div>
            {['Ağaoğlu Kuyumcular', 'Şerefefendi Sok. No:17', 'Fatih / İstanbul', '34120'].map(l => (
              <span key={l} className="footer-lnk">{l}</span>
            ))}
          </div>
        </div>
        <div className="footer-bot">
          <span className="footer-copy">© 2025 {S('store_name', 'FZA GOLD')}. {T('Tüm hakları saklıdır.', 'All rights reserved.')}</span>
        </div>
      </footer>

      {/* ── WA FAB ── */}
      <a href={`https://wa.me/${S('whatsapp_number', '905076053110')}`} target="_blank" className="wa-fab">💬</a>

      {/* ── MODAL ── */}
      {modal && (() => {
        const factor = KARAT_FACTOR[modal.karat] || 0.585
        const mGoldCost = rates.has_altin * factor * modal.weight
        const iscilik = modal.iscilik || defaultIscilik
        const totalNoKdv = mGoldCost + iscilik
        const total18 = totalNoKdv * 1.18
        const total20 = totalNoKdv * 1.20
        const waMsg = encodeURIComponent(
          'Merhaba FZA GOLD, "' + modal.name + '" ürünü hakkında bilgi almak istiyorum.\n' +
          'Ağırlık: ' + modal.weight + 'gr · ' + modal.karat + 'K\n' +
          'Tahmini fiyat (KDVsiz): ₺' + fmtInt(totalNoKdv)
        )
        return (
          <div className="modal-ov" onClick={e => { if (e.target === e.currentTarget) setModal(null) }}>
            <div className="modal">
              <div className="modal-top" />
              <div className="modal-head">
                <div>
                  <div className="modal-k">{modal.karat}K · {modal.category}</div>
                  <div className="modal-name">{lang === 'tr' ? modal.name : (modal.name_en || modal.name)}</div>
                  {modal.description && <div className="modal-desc">{modal.description}</div>}
                </div>
                <button className="modal-x" onClick={() => setModal(null)}>×</button>
              </div>
              <div className="modal-body">
                <div className="modal-specs">
                  {[
                    [T('AĞIRLIK', 'WEIGHT'), `${modal.weight} gr`],
                    [T('AYAR', 'KARAT'), `${modal.karat}K — ${(factor * 1000).toFixed(0)}‰`],
                    [T('CANLI KUR', 'LIVE RATE'), `₺${fmt(rates.has_altin)}/gr`],
                  ].map(([l, v]) => (
                    <div key={l as string} className="modal-spec">
                      <div className="modal-spec-l">{l}</div>
                      <div className="modal-spec-v">{v}</div>
                    </div>
                  ))}
                </div>
                <div className="modal-price-box">
                  <div className="mpb-inner">
                    <div className="mpb-rows">
                      <div className="mpb-lbl">{T('Fiyat Dökümü', 'Price Breakdown')}</div>
                      {[
                        [T('Altın maliyeti', 'Gold cost'), mGoldCost],
                        ].map(([l, v]) => (
                        <div key={l as string} className="mpb-row">
                          <span className="mpb-row-l">{l as string}</span>
                          <span className="mpb-row-r">₺{fmt(v as number)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mpb-right">
                      <div className="mpb-lbl">{T('Tahmini Fiyat', 'Est. Price')}</div>
                      <div>
                        <div style={{ fontSize: 8.5, color: 'rgba(255,255,255,.28)', marginBottom: 2 }}>{T("KDV'siz", 'Excl. VAT')}</div>
                        <div className="mpb-main">₺{fmtInt(totalNoKdv)}</div>
                      </div>
                      <div className="mpb-sep" />
                      <div className="mpb-kdv-l">+%18 KDV</div>
                      <div className="mpb-kdv-v">₺{fmtInt(total18)}</div>
                      <div className="mpb-kdv-l">+%20 KDV</div>
                      <div className="mpb-kdv-v">₺{fmtInt(total20)}</div>
                    </div>
                  </div>
                  <div className="mpb-note">
                    <div className="mpb-note-dot" />
                    <span className="mpb-note-txt">
                      {T('Fiyat canlı altın kuruna göre hesaplanmıştır. Has altın:', 'Price calculated on live gold rate. Pure gold:')} ₺{fmt(rates.has_altin)}/gr
                    </span>
                  </div>
                </div>
                <div className="modal-btns">
                  <a href={`https://wa.me/${S('whatsapp_number', '905076053110')}?text=${waMsg}`} target="_blank" className="m-btn-wa">
                    {T('WhatsApp ile Sor', 'Ask on WhatsApp')}
                  </a>
                  <button className="m-btn-cl" onClick={() => setModal(null)}>{T('Kapat', 'Close')}</button>
                </div>
              </div>
            </div>
          </div>
        )
      })()}
    </>
  )
}