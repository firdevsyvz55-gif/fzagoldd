'use client'
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'

const LOGO = "data:image/png;base64,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"

interface Product {
  id: string; name: string; name_en?: string; category: string
  karat: number; weight: number; iscilik: number
  description?: string; image_url?: string; badge?: string
  is_active: boolean; created_at: string
}
interface Log { id: string; user_email: string; action: string; detail: string; created_at: string }
interface AdminUser { id: string; email?: string; created_at: string; last_sign_in_at?: string; email_confirmed_at?: string }
type Settings = Record<string, string>
type Tab = 'dashboard' | 'products' | 'add' | 'hero' | 'gorseller' | 'hakkimizda' | 'iletisim' | 'ayarlar' | 'kullanicilar' | 'aktivite'

const GOLD = '#c9a84c', NAVY = '#071120'
const INP: React.CSSProperties = { width: '100%', border: 'none', borderBottom: '1px solid rgba(201,168,76,.2)', padding: '10px 2px', fontSize: 13, outline: 'none', marginBottom: 18, fontFamily: 'inherit', background: 'transparent', color: '#1a1a1a' }
const LBL: React.CSSProperties = { display: 'block', fontSize: 8, letterSpacing: 2.5, textTransform: 'uppercase', color: '#94a3b8', marginBottom: 6, fontWeight: 400 }

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&family=Cormorant+Garamond:wght@300;400&display=swap');
  *,*::before,*::after{box-sizing:border-box} body{margin:0;font-family:'Jost',sans-serif}
  .aw{display:flex;min-height:100vh;background:#f8f9fb}
  .sb{width:240px;background:#071120;position:fixed;top:0;bottom:0;left:0;display:flex;flex-direction:column;z-index:100;overflow-y:auto;transition:transform .3s cubic-bezier(.16,1,.3,1);scrollbar-width:none}
  .sb::-webkit-scrollbar{display:none}
  .ov{display:none;position:fixed;inset:0;background:rgba(7,17,32,.55);z-index:99;backdrop-filter:blur(3px)}
  .ov.open{display:block}
  .sb.open{transform:translateX(0)!important}
  .mn{margin-left:240px;flex:1;min-height:100vh}
  .tb{display:none}
  .ct{padding:26px 30px}
  .nb{width:100%;display:flex;align-items:center;gap:9px;padding:9px 18px;background:transparent;border:none;border-left:2px solid transparent;color:rgba(255,255,255,.35);font-size:11px;cursor:pointer;font-family:inherit;text-align:left;transition:all .2s}
  .nb:hover{background:rgba(255,255,255,.05);color:rgba(255,255,255,.65)}
  .nb.on{background:rgba(201,168,76,.08);border-left-color:#c9a84c;color:#c9a84c}
  .crd{background:white;border:1px solid #f1f5f9;margin-bottom:18px;position:relative;overflow:hidden;box-shadow:0 1px 6px rgba(0,0,0,.04)}
  .crd-top{position:absolute;top:0;left:0;right:0;height:1.5px;background:linear-gradient(90deg,#c9a84c,#e8c97a,#a07830)}
  .crd-hd{padding:13px 20px;border-bottom:1px solid #f8fafc;font-size:8px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;font-weight:500;margin-top:1.5px}
  .crd-bd{padding:20px}
  .tw{overflow-x:auto;-webkit-overflow-scrolling:touch}
  .tt{width:100%;border-collapse:collapse;min-width:540px}
  .th{padding:10px 13px;text-align:left;font-size:8px;letter-spacing:2px;color:rgba(255,255,255,.5);font-weight:400;white-space:nowrap}
  .td{padding:10px 13px;vertical-align:middle;font-size:11px}
  .tr:hover{background:#f9fafb}
  .fs{overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;margin-bottom:12px}
  .fs::-webkit-scrollbar{display:none}
  .fi{display:flex;border:1px solid #e2e8f0;width:max-content}
  .fb{padding:8px 13px;border:none;font-size:8px;letter-spacing:1.5px;cursor:pointer;font-family:inherit;border-right:1px solid #e2e8f0;background:white;color:#64748b;transition:all .2s;white-space:nowrap}
  .fb.on{background:#071120;color:white}
  .ig{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px}
  .pf{display:grid;grid-template-columns:1fr 1fr;gap:18px}
  .g2{display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .g4{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:18px}
  input:focus,select:focus,textarea:focus{border-bottom-color:#c9a84c!important;outline:none}
  @media(max-width:768px){
    .sb{transform:translateX(-100%)}
    .mn{margin-left:0}
    .tb{display:flex;align-items:center;justify-content:space-between;background:#071120;padding:12px 16px;position:sticky;top:0;z-index:90}
    .ct{padding:14px}
    .g4{grid-template-columns:1fr 1fr}
    .g2{grid-template-columns:1fr}
    .pf{grid-template-columns:1fr}
    .ig{grid-template-columns:1fr 1fr}
    .hm{display:none!important}
  }
  @media(max-width:480px){
    .g4{grid-template-columns:1fr}
    .ig{grid-template-columns:1fr}
    .ct{padding:10px}
  }
`

function Crd({ t, children }: { t: string; children: React.ReactNode }) {
  return (
    <div className="crd">
      <div className="crd-top" />
      <div className="crd-hd">{t}</div>
      <div className="crd-bd">{children}</div>
    </div>
  )
}

function Sbtn({ onClick, saving, label = 'KAYDET', gold }: { onClick: () => void; saving: boolean; label?: string; gold?: boolean }) {
  return (
    <button onClick={onClick} disabled={saving} style={{ background: gold ? GOLD : NAVY, border: 'none', color: 'white', padding: '11px 28px', fontSize: 8, letterSpacing: 2.5, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', fontWeight: 500, opacity: saving ? .7 : 1, textTransform: 'uppercase' }}>
      {saving ? 'KAYDEDİLİYOR...' : label}
    </button>
  )
}

function Bdg({ active }: { active: boolean }) {
  return <span style={{ fontSize: 7, padding: '3px 9px', fontWeight: 500, background: active ? '#f0fdf4' : '#fef9c3', color: active ? '#16a34a' : '#ca8a04', letterSpacing: 1.5, border: `1px solid ${active ? '#bbf7d0' : '#fde68a'}`, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{active ? 'AKTİF' : 'GİZLİ'}</span>
}

function ImgSlot({ slotKey, label, desc, currentUrl, onSaved, showToast }: { slotKey: string; label: string; desc: string; currentUrl: string; onSaved: (k: string, v: string) => void; showToast: (m: string) => void }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(currentUrl)
  const ref = useRef<HTMLInputElement>(null)
  useEffect(() => { setPreview(currentUrl) }, [currentUrl])

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setUploading(true)
    try {
      const ext = file.name.split('.').pop()
      const path = `site-images/${slotKey}.${ext}`
      await supabase.storage.from('product-images').remove([path])
      const { error: upErr } = await supabase.storage.from('product-images').upload(path, file, { upsert: true })
      if (upErr) throw new Error(upErr.message)
      const { data } = supabase.storage.from('product-images').getPublicUrl(path)
      const { error: dbErr } = await supabase.from('settings').upsert({ key: slotKey, value: data.publicUrl }, { onConflict: 'key' })
      if (dbErr) throw new Error(dbErr.message)
      setPreview(data.publicUrl); onSaved(slotKey, data.publicUrl); showToast(`${label} güncellendi ✓`)
    } catch (err: any) { showToast(`Hata: ${err.message}`) }
    setUploading(false)
    if (ref.current) ref.current.value = ''
  }

  return (
    <div className="crd" style={{ marginBottom: 0 }}>
      <div className="crd-top" />
      <div style={{ padding: '12px 16px 16px' }}>
        <div style={{ fontSize: 8, letterSpacing: 2, color: GOLD, fontWeight: 500, marginBottom: 3, textTransform: 'uppercase' }}>{label}</div>
        <div style={{ fontSize: 10, color: '#94a3b8', marginBottom: 10 }}>{desc}</div>
        <div style={{ width: '100%', height: 120, background: '#f8fafc', marginBottom: 10, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #e2e8f0' }}>
          {preview
            ? <img src={preview} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            : <div style={{ textAlign: 'center', color: '#cbd5e1' }}><div style={{ fontSize: 24, marginBottom: 4 }}>🖼</div><div style={{ fontSize: 7.5, letterSpacing: 1.5 }}>GÖRSEL YOK</div></div>
          }
        </div>
        <input ref={ref} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
        <button onClick={() => ref.current?.click()} disabled={uploading} style={{ width: '100%', padding: '8px 0', background: uploading ? '#f1f5f9' : GOLD, border: 'none', color: uploading ? '#94a3b8' : 'white', fontSize: 8, letterSpacing: 2, cursor: uploading ? 'not-allowed' : 'pointer', fontWeight: 500, fontFamily: 'inherit', textTransform: 'uppercase' }}>
          {uploading ? 'YÜKLENİYOR...' : preview ? 'DEĞİŞTİR' : 'YÜKLE'}
        </button>
      </div>
    </div>
  )
}

function PForm({ initial, iscilikDef, onSave, onCancel, saving }: { initial: any; iscilikDef: string; onSave: (d: any) => void; onCancel: () => void; saving: boolean }) {
  const [form, setForm] = useState(initial)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const set = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }))

  async function handleImg(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `products/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('product-images').upload(path, file, { upsert: true })
    if (error) { alert(error.message); setUploading(false); return }
    const { data } = supabase.storage.from('product-images').getPublicUrl(path)
    set('image_url', data.publicUrl); setUploading(false)
    if (e.target) e.target.value = ''
  }

  const Sel = (n: string, lbl: string, opts: { value: string; label: string }[]) => (
    <div>
      <label style={LBL}>{lbl}</label>
      <select value={form[n] || ''} onChange={e => set(n, e.target.value)} style={INP}>
        {opts.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )

  return (
    <div className="pf">
      <Crd t="TEMEL BİLGİLER">
        <label style={LBL}>ÜRÜN ADI (TÜRKÇE) *</label>
        <input value={form.name || ''} onChange={e => set('name', e.target.value)} style={INP} placeholder="Örn: Prenses Bilezik" />
        <label style={LBL}>ÜRÜN ADI (İNGİLİZCE)</label>
        <input value={form.name_en || ''} onChange={e => set('name_en', e.target.value)} style={INP} />
        {Sel('category', 'KATEGORİ', [
          { value: 'bilezik', label: 'Bilezik' }, { value: 'zincir', label: 'Zincir' },
          { value: 'kolye', label: 'Kolye' }, { value: 'yuzuk', label: 'Yüzük' }, { value: 'kupe', label: 'Küpe' }
        ])}
        {Sel('badge', 'ROZET', [
          { value: '', label: 'Yok' }, { value: 'Çok Satan', label: 'Çok Satan' },
          { value: 'Yeni', label: 'Yeni' }, { value: 'Popüler', label: 'Popüler' }
        ])}
        <label style={LBL}>AÇIKLAMA</label>
        <textarea value={form.description || ''} onChange={e => set('description', e.target.value)} rows={3} style={{ ...INP, resize: 'vertical' }} />
      </Crd>
      <div>
        <Crd t="FİYAT VE TEKNİK">
          {Sel('karat', 'ALTIN AYARI', [
            { value: '22', label: '22 Ayar — 916‰' }, { value: '18', label: '18 Ayar — 750‰' },
            { value: '14', label: '14 Ayar — 585‰' }, { value: '9', label: '9 Ayar — 375‰' }
          ])}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={LBL}>AĞIRLIK (GR) *</label>
              <input type="number" step="0.001" min="0" value={form.weight || ''} onChange={e => set('weight', e.target.value)} style={INP} placeholder="0.000" />
            </div>
            <div>
              <label style={LBL}>İŞÇİLİK (TL)</label>
              <input type="number" value={form.iscilik || ''} onChange={e => set('iscilik', e.target.value)} style={INP} placeholder={iscilikDef} />
            </div>
          </div>
        </Crd>
        <Crd t="FOTOĞRAF">
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            <input value={form.image_url || ''} onChange={e => set('image_url', e.target.value)} placeholder="URL veya dosya seç" style={{ ...INP, marginBottom: 0, flex: 1 }} />
            <button type="button" onClick={() => fileRef.current?.click()} disabled={uploading}
              style={{ background: GOLD, border: 'none', color: 'white', padding: '0 12px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>
              {uploading ? '...' : '📁'}
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImg} style={{ display: 'none' }} />
          {form.image_url && <img src={form.image_url} alt="preview" style={{ width: '100%', height: 140, objectFit: 'cover', border: '1px solid #f1f5f9', marginTop: 6 }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />}
        </Crd>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => onSave(form)} disabled={saving}
            style={{ flex: 1, background: form.id ? GOLD : NAVY, border: 'none', color: 'white', padding: 13, fontSize: 8, letterSpacing: 2, cursor: 'pointer', fontWeight: 500, fontFamily: 'inherit', opacity: saving ? .7 : 1, textTransform: 'uppercase' }}>
            {saving ? 'KAYDEDİLİYOR...' : form.id ? '✓ GÜNCELLE' : '+ ÜRÜN EKLE'}
          </button>
          <button onClick={onCancel} style={{ padding: '13px 16px', background: 'none', border: '1px solid #e2e8f0', color: '#64748b', cursor: 'pointer', fontSize: 9, fontFamily: 'inherit' }}>VAZGEÇ</button>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('dashboard')
  const [session, setSession] = useState<any>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [ss, setSs] = useState<Settings>({ iscilik_default: '500' })
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState('')
  const [editP, setEditP] = useState<Product | null>(null)
  const [logs, setLogs] = useState<Log[]>([])
  const [users, setUsers] = useState<AdminUser[]>([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [newPass, setNewPass] = useState('')
  const [catFilter, setCatFilter] = useState('all')
  const [searchQ, setSearchQ] = useState('')
  const [selLogs, setSelLogs] = useState<Set<string>>(new Set())
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const S = (k: string, fb = '') => ss[k] || fb
  const setS = (k: string, v: string) => setSs(p => ({ ...p, [k]: v }))
  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3500) }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      if (data.session) loadAll()
    })
  }, [])

  async function login() {
    setLoginErr('')
    const { error, data } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setLoginErr('E-posta veya şifre yanlış.'); return }
    setSession(data.session); loadAll()
    addLog(data.session?.user.email || '', 'GİRİŞ', 'Admin paneli')
  }

  async function logout() {
    if (session?.user?.email) addLog(session.user.email, 'ÇIKIŞ', 'Admin paneli')
    await supabase.auth.signOut(); setSession(null)
  }

  function loadAll() { loadProducts(); loadSS(); loadLogs() }

  async function loadProducts() {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (data) setProducts(data)
  }

  async function loadSS() {
    const { data } = await supabase.from('settings').select('key,value')
    if (data) { const o: Settings = {}; data.forEach((r: any) => (o[r.key] = r.value)); setSs(o) }
  }

  async function loadLogs() {
    const { data } = await supabase.from('audit_logs').select('*').order('created_at', { ascending: false }).limit(150)
    if (data) setLogs(data)
  }

  async function loadUsers() {
    setUsersLoading(true)
    try {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      if (res.ok) setUsers(data.users || [])
      else showToast('Kullanıcılar yüklenemedi: ' + data.error)
    } catch { showToast('Kullanıcılar yüklenemedi') }
    setUsersLoading(false)
  }

  async function deleteUser(u: AdminUser) {
    if (!confirm(`"${u.email}" silinecek. Emin misiniz?`)) return
    try {
      const res = await fetch('/api/admin/users', {
        method: 'DELETE', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: u.id }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      showToast(`${u.email} silindi ✓`)
      addLog(session?.user?.email || '', 'KULLANICI SİLİNDİ', u.email || '')
      loadUsers()
    } catch (err: any) { showToast('Hata: ' + err.message) }
  }

  async function addLog(userEmail: string, action: string, detail: string) {
    await supabase.from('audit_logs').insert({ user_email: userEmail, action, detail })
    loadLogs()
  }

  async function saveSS(keys: string[]) {
    setSaving(true)
    await supabase.from('settings').upsert(keys.map(k => ({ key: k, value: ss[k] || '' })), { onConflict: 'key' })
    setSaving(false); showToast('Kaydedildi ✓')
    if (session?.user?.email) addLog(session.user.email, 'AYAR', keys.join(', '))
  }

  async function toggleActive(p: Product) {
    await supabase.from('products').update({ is_active: !p.is_active }).eq('id', p.id)
    loadProducts(); addLog(session?.user?.email || '', p.is_active ? 'GİZLENDİ' : 'AKTİF EDİLDİ', p.name)
  }

  async function delProduct(p: Product) {
    if (!confirm(`"${p.name}" silinecek?`)) return
    await supabase.from('products').delete().eq('id', p.id)
    loadProducts(); addLog(session?.user?.email || '', 'SİLİNDİ', p.name)
  }

  async function saveProduct(data: any) {
    setSaving(true)
    const payload = {
      name: data.name, name_en: data.name_en || '', category: data.category || 'bilezik',
      karat: Number(data.karat) || 14, weight: parseFloat(data.weight) || 0,
      iscilik: parseFloat(data.iscilik || S('iscilik_default', '500')),
      description: data.description || '', badge: data.badge || '', image_url: data.image_url || '',
    }
    if (data.id) {
      await supabase.from('products').update(payload).eq('id', data.id)
      addLog(session?.user?.email || '', 'GÜNCELLENDİ', data.name)
      showToast('Güncellendi ✓'); setEditP(null); setTab('products')
    } else {
      if (!data.name || !data.weight) { alert('Ad ve ağırlık zorunlu'); setSaving(false); return }
      await supabase.from('products').insert({ ...payload, is_active: true })
      addLog(session?.user?.email || '', 'EKLENDİ', data.name)
      showToast('Ürün eklendi ✓'); setTab('products')
    }
    await loadProducts(); setSaving(false)
  }

  async function createUser() {
    if (!newEmail || !newPass) { alert('E-posta ve şifre zorunlu'); return }
    if (newPass.length < 6) { alert('Şifre en az 6 karakter'); return }
    setSaving(true)
    try {
      const res = await fetch('/api/admin/create-user', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail, password: newPass }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      showToast(`${newEmail} oluşturuldu ✓`); setNewEmail(''); setNewPass('')
      addLog(session?.user?.email || '', 'KULLANICI OLUŞTURULDU', newEmail)
      loadUsers()
    } catch (err: any) { alert('Hata: ' + err.message) }
    setSaving(false)
  }

  async function deleteLogs() {
    if (!selLogs.size || !confirm(`${selLogs.size} kayıt silinecek?`)) return
    await supabase.from('audit_logs').delete().in('id', Array.from(selLogs))
    setSelLogs(new Set()); showToast(`${selLogs.size} kayıt silindi ✓`); loadLogs()
  }

  function TF({ label, k, type = 'text', ph = '' }: { label: string; k: string; type?: string; ph?: string }) {
    const [local, setLocal] = useState(S(k))
    useEffect(() => { setLocal(S(k)) }, [ss[k]])
    return (
      <div>
        <label style={LBL}>{label}</label>
        {type === 'textarea'
          ? <textarea value={local} onChange={e => { setLocal(e.target.value); setS(k, e.target.value) }} placeholder={ph} rows={3} style={{ ...INP, resize: 'vertical' }} />
          : <input type={type} value={local} onChange={e => { setLocal(e.target.value); setS(k, e.target.value) }} placeholder={ph} style={INP} />
        }
      </div>
    )
  }

  const CATS = ['all','bilezik','zincir','kolye','yuzuk','kupe']
  const CLBL: Record<string,string> = { all:'Tümü', bilezik:'Bilezik', zincir:'Zincir', kolye:'Kolye', yuzuk:'Yüzük', kupe:'Küpe' }
  const filtered = products.filter(p => (catFilter === 'all' || p.category === catFilter) && (!searchQ || p.name.toLowerCase().includes(searchQ.toLowerCase())))

  const TABS: { id: Tab; label: string; icon: string; group: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '⊞', group: 'GENEL' },
    { id: 'products', label: 'Ürünler', icon: '◇', group: 'ÜRÜNLER' },
    { id: 'add', label: 'Ürün Ekle', icon: '+', group: 'ÜRÜNLER' },
    { id: 'hero', label: 'Hero Bölümü', icon: '▣', group: 'İÇERİK' },
    { id: 'gorseller', label: 'Site Görselleri', icon: '🖼', group: 'İÇERİK' },
    { id: 'hakkimizda', label: 'Hakkımızda', icon: '◉', group: 'İÇERİK' },
    { id: 'iletisim', label: 'İletişim', icon: '◎', group: 'İÇERİK' },
    { id: 'ayarlar', label: 'Ayarlar', icon: '⚙', group: 'SİSTEM' },
    { id: 'kullanicilar', label: 'Kullanıcılar', icon: '👤', group: 'SİSTEM' },
    { id: 'aktivite', label: 'Aktivite', icon: '📋', group: 'SİSTEM' },
  ]
  const GROUPS = ['GENEL','ÜRÜNLER','İÇERİK','SİSTEM']
  const stats = [
    { l: 'TOPLAM ÜRÜN', v: products.length, c: NAVY },
    { l: 'AKTİF', v: products.filter(p => p.is_active).length, c: '#16a34a' },
    { l: 'GİZLİ', v: products.filter(p => !p.is_active).length, c: '#d97706' },
    { l: 'KATEGORİ', v: new Set(products.map(p => p.category)).size, c: '#2563eb' },
  ]
  function lc(action: string): { bg: string; txt: string } {
    if (action === 'GİRİŞ') return { bg: '#dbeafe', txt: '#1d4ed8' }
    if (action === 'ÇIKIŞ') return { bg: '#f1f5f9', txt: '#64748b' }
    if (action.includes('SİL') || action.includes('SİLİNDİ')) return { bg: '#fef2f2', txt: '#dc2626' }
    if (action.includes('EKLE') || action.includes('EKLENDİ')) return { bg: '#dcfce7', txt: '#16a34a' }
    return { bg: '#fef9c3', txt: '#ca8a04' }
  }
  const TH: React.CSSProperties = { padding: '10px 13px', textAlign: 'left', fontSize: 8, letterSpacing: 2, color: 'rgba(255,255,255,.5)', fontWeight: 400, whiteSpace: 'nowrap' }
  const TD: React.CSSProperties = { padding: '9px 13px', verticalAlign: 'middle', fontSize: 11 }

  // ── LOGIN ──
  if (!session) return (
    <div style={{ minHeight: '100vh', background: NAVY, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Jost',sans-serif", padding: 20 }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&family=Cormorant+Garamond:wght@300;400&display=swap');`}</style>
      <div style={{ width: '100%', maxWidth: 380 }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <img src={LOGO} alt="FZA" style={{ width: 68, height: 68, borderRadius: '50%', border: '1.5px solid rgba(201,168,76,.35)', marginBottom: 12, objectFit: 'cover' }} />
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 19, color: 'white', letterSpacing: 5, fontWeight: 300 }}>FZAGOLD</div>
          <div style={{ fontSize: 7.5, letterSpacing: 3.5, color: 'rgba(201,168,76,.45)', marginTop: 3 }}>ADMİN PANELİ</div>
        </div>
        <div style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(201,168,76,.1)', padding: '32px 28px', position: 'relative' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1.5, background: `linear-gradient(90deg,${GOLD},#e8c97a,#a07830)` }} />
          {loginErr && <div style={{ background: 'rgba(220,50,50,.1)', border: '1px solid rgba(220,50,50,.2)', color: '#ff6b6b', fontSize: 11, padding: '9px 13px', marginBottom: 18 }}>⚠ {loginErr}</div>}
          <label style={{ ...LBL, color: 'rgba(255,255,255,.35)' }}>E-POSTA</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ ...INP, background: 'rgba(255,255,255,.05)', borderBottom: '1px solid rgba(255,255,255,.12)', color: 'white' }} />
          <label style={{ ...LBL, color: 'rgba(255,255,255,.35)' }}>ŞİFRE</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()} style={{ ...INP, background: 'rgba(255,255,255,.05)', borderBottom: '1px solid rgba(255,255,255,.12)', color: 'white' }} />
          <button onClick={login} style={{ width: '100%', background: GOLD, border: 'none', color: 'white', padding: 13, fontSize: 9, letterSpacing: 3, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>GİRİŞ YAP</button>
        </div>
      </div>
    </div>
  )

  // ── MAIN ──
  return (
    <>
      <style>{CSS}</style>
      <div className="aw">
        <div className={`ov${sidebarOpen ? ' open' : ''}`} onClick={() => setSidebarOpen(false)} />

        {/* Sidebar */}
        <div className={`sb${sidebarOpen ? ' open' : ''}`}>
          <div style={{ padding: '15px 16px', borderBottom: '1px solid rgba(201,168,76,.1)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={LOGO} alt="FZA" style={{ width: 30, height: 30, borderRadius: '50%', border: '1px solid rgba(201,168,76,.4)', objectFit: 'cover', flexShrink: 0 }} />
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, color: 'white', letterSpacing: 4, fontWeight: 300 }}>FZAGOLD</div>
              <div style={{ fontSize: 6, letterSpacing: 2, color: 'rgba(201,168,76,.4)', marginTop: 1 }}>ADMİN PANELİ</div>
            </div>
          </div>
          <div style={{ padding: '7px 14px 8px', borderBottom: '1px solid rgba(255,255,255,.04)', background: 'rgba(255,255,255,.02)' }}>
            <div style={{ fontSize: 6.5, color: 'rgba(255,255,255,.2)', marginBottom: 2 }}>Giriş yapan</div>
            <div style={{ fontSize: 9, color: 'rgba(201,168,76,.65)', wordBreak: 'break-all' }}>{session?.user?.email}</div>
          </div>
          <nav style={{ padding: '4px 0', flex: 1 }}>
            {GROUPS.map(g => (
              <div key={g}>
                <div style={{ fontSize: 6, letterSpacing: 2.5, color: 'rgba(255,255,255,.15)', padding: '9px 18px 2px', textTransform: 'uppercase' }}>{g}</div>
                {TABS.filter(t => t.group === g).map(t => (
                  <button key={t.id} onClick={() => { setTab(t.id); setEditP(null); setSidebarOpen(false); if (t.id === 'kullanicilar') loadUsers() }}
                    className={`nb${tab === t.id ? ' on' : ''}`}>
                    <span style={{ fontSize: 11, width: 15, textAlign: 'center', flexShrink: 0 }}>{t.icon}</span>
                    {t.label}
                  </button>
                ))}
              </div>
            ))}
          </nav>
          <div style={{ padding: '8px 12px 14px', borderTop: '1px solid rgba(255,255,255,.05)' }}>
            <a href="/" target="_blank" style={{ display: 'block', textAlign: 'center', padding: '7px 0', background: 'rgba(201,168,76,.07)', border: '1px solid rgba(201,168,76,.13)', color: GOLD, fontSize: 8, letterSpacing: 1.5, textDecoration: 'none', marginBottom: 7 }}>SİTEYİ GÖR ↗</a>
            <button onClick={logout} style={{ width: '100%', background: 'rgba(220,50,50,.07)', border: '1px solid rgba(220,50,50,.18)', color: '#f87171', padding: 7, fontSize: 8, letterSpacing: 1.5, cursor: 'pointer', fontFamily: 'inherit' }}>ÇIKIŞ YAP</button>
          </div>
        </div>

        {/* Main */}
        <div className="mn">
          {/* Mobil topbar */}
          <div className="tb">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src={LOGO} alt="FZA" style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover', border: '1px solid rgba(201,168,76,.4)' }} />
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 13, color: 'white', letterSpacing: 3 }}>FZAGOLD</span>
            </div>
            <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, display: 'flex', flexDirection: 'column', gap: 5 }}>
              {[20, 20, 14].map((w, i) => <div key={i} style={{ width: w, height: 1.5, background: 'white' }} />)}
            </button>
          </div>

          <div className="ct">
            {/* Toast */}
            {toast && <div style={{ position: 'fixed', top: 16, right: 16, background: NAVY, color: GOLD, padding: '10px 20px', fontSize: 11, letterSpacing: 1, zIndex: 9999, border: '1px solid rgba(201,168,76,.25)', boxShadow: '0 8px 32px rgba(0,0,0,.25)' }}>✓ {toast}</div>}

            {/* DASHBOARD */}
            {tab === 'dashboard' && (
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: NAVY, marginBottom: 3 }}>Dashboard</div>
                <div style={{ fontSize: 11.5, color: '#64748b', marginBottom: 18 }}>Hoş geldiniz, <b>{session?.user?.email}</b></div>
                <div className="g4">
                  {stats.map(s => (
                    <div key={s.l} style={{ background: 'white', border: '1px solid #f1f5f9', padding: '16px 15px', borderTop: `2px solid ${s.c}`, boxShadow: '0 1px 6px rgba(0,0,0,.04)' }}>
                      <div style={{ fontSize: 7, letterSpacing: 2, color: '#94a3b8', marginBottom: 7, textTransform: 'uppercase' }}>{s.l}</div>
                      <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 34, fontWeight: 300, color: NAVY, lineHeight: 1 }}>{s.v}</div>
                    </div>
                  ))}
                </div>
                <div className="g2">
                  <Crd t="SON EKLENEN ÜRÜNLER">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <tbody>
                        {products.slice(0, 6).map(p => (
                          <tr key={p.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                            <td style={{ padding: '8px 0', fontSize: 12, color: NAVY, fontWeight: 500 }}>{p.name}</td>
                            <td style={{ padding: '8px 0', fontSize: 11, color: GOLD, fontWeight: 600 }}>{p.karat}K</td>
                            <td style={{ padding: '8px 0', textAlign: 'right' }}><Bdg active={p.is_active} /></td>
                          </tr>
                        ))}
                        {!products.length && <tr><td colSpan={3} style={{ padding: '24px 0', textAlign: 'center', color: '#94a3b8', fontSize: 12 }}>Henüz ürün yok</td></tr>}
                      </tbody>
                    </table>
                  </Crd>
                  <Crd t="SON AKTİVİTE">
                    {logs.slice(0, 7).map(l => (
                      <div key={l.id} style={{ padding: '7px 0', borderBottom: '1px solid #f8fafc' }}>
                        <div style={{ fontSize: 11, color: NAVY }}>
                          <span style={{ ...lc(l.action), fontSize: 7.5, padding: '2px 7px', fontWeight: 600 }}>{l.action}</span>
                          {' '}<span style={{ color: '#64748b' }}>{l.detail}</span>
                        </div>
                        <div style={{ fontSize: 8.5, color: '#94a3b8', marginTop: 2 }}>{new Date(l.created_at).toLocaleString('tr-TR')}</div>
                      </div>
                    ))}
                    {!logs.length && <div style={{ padding: '20px 0', textAlign: 'center', color: '#94a3b8', fontSize: 12 }}>Henüz aktivite yok</div>}
                  </Crd>
                </div>
              </div>
            )}

            {/* ÜRÜNLER */}
            {tab === 'products' && !editP && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: NAVY, marginBottom: 2 }}>Ürün Listesi</div>
                    <div style={{ fontSize: 11.5, color: '#64748b' }}>{products.length} ürün · {filtered.length} gösteriliyor</div>
                  </div>
                  <button onClick={() => setTab('add')} style={{ background: NAVY, border: 'none', color: 'white', padding: '9px 18px', fontSize: 8, letterSpacing: 2, cursor: 'pointer', fontFamily: 'inherit' }}>+ YENİ ÜRÜN</button>
                </div>
                <div style={{ display: 'flex', gap: 10, marginBottom: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  <div className="fs" style={{ flex: 1, minWidth: 0 }}>
                    <div className="fi">
                      {CATS.map(c => <button key={c} onClick={() => setCatFilter(c)} className={`fb${catFilter === c ? ' on' : ''}`}>{CLBL[c]}</button>)}
                    </div>
                  </div>
                  <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Ara..." style={{ ...INP, marginBottom: 0, width: 140, fontSize: 12 }} />
                </div>
                <div style={{ background: 'white', border: '1px solid #f1f5f9', boxShadow: '0 1px 6px rgba(0,0,0,.04)' }}>
                  <div className="tw">
                    <table className="tt">
                      <thead>
                        <tr style={{ background: NAVY }}>
                          {['FOTO', 'ÜRÜN ADI', 'KATEGORİ', 'AYAR', 'AĞIRLIK', 'DURUM', 'İŞLEM'].map(h => <th key={h} style={TH}>{h}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((p, i) => (
                          <tr key={p.id} className="tr" style={{ borderTop: '1px solid #f8fafc', background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                            <td style={TD}>
                              {p.image_url
                                ? <img src={p.image_url} alt={p.name} style={{ width: 38, height: 38, objectFit: 'cover', border: '1px solid #f1f5f9' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                                : <div style={{ width: 38, height: 38, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', fontSize: 14 }}>◇</div>
                              }
                            </td>
                            <td style={TD}>
                              <div style={{ fontSize: 12, fontWeight: 600, color: NAVY }}>{p.name}</div>
                              {p.badge && <span style={{ fontSize: 7, background: '#fef3c7', color: '#92400e', padding: '2px 5px' }}>{p.badge}</span>}
                            </td>
                            <td style={{ ...TD, color: '#64748b', textTransform: 'capitalize' }}>{p.category}</td>
                            <td style={{ ...TD, color: GOLD, fontWeight: 700, fontSize: 12 }}>{p.karat}K</td>
                            <td style={{ ...TD, color: '#64748b' }}>{p.weight}gr</td>
                            <td style={TD}><button onClick={() => toggleActive(p)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}><Bdg active={p.is_active} /></button></td>
                            <td style={TD}>
                              <div style={{ display: 'flex', gap: 4 }}>
                                <button onClick={() => { setEditP(p); setTab('products') }} style={{ background: '#eff6ff', border: 'none', color: '#2563eb', padding: '4px 9px', fontSize: 8, cursor: 'pointer', fontFamily: 'inherit' }}>DÜZENLE</button>
                                <button onClick={() => delProduct(p)} style={{ background: '#fef2f2', border: 'none', color: '#dc2626', padding: '4px 9px', fontSize: 8, cursor: 'pointer', fontFamily: 'inherit' }}>SİL</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {!filtered.length && <tr><td colSpan={7} style={{ padding: 40, textAlign: 'center', color: '#94a3b8' }}>Ürün bulunamadı.</td></tr>}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ÜRÜN DÜZENLE */}
            {tab === 'products' && editP && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
                  <button onClick={() => setEditP(null)} style={{ background: '#f0f4f8', border: 'none', padding: '7px 13px', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>← Geri</button>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 300, color: NAVY }}>Düzenle — {editP.name}</div>
                </div>
                <PForm key={editP.id} initial={editP} iscilikDef={S('iscilik_default', '500')} onSave={saveProduct} onCancel={() => setEditP(null)} saving={saving} />
              </div>
            )}

            {/* ÜRÜN EKLE */}
            {tab === 'add' && (
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: NAVY, marginBottom: 4 }}>Yeni Ürün Ekle</div>
                <div style={{ fontSize: 11.5, color: '#64748b', marginBottom: 18 }}>Tüm alanları doldurun</div>
                <PForm key="new" initial={{ name:'', name_en:'', category:'bilezik', karat:14, weight:'', iscilik:'', description:'', badge:'', image_url:'' }}
                  iscilikDef={S('iscilik_default','500')} onSave={saveProduct} onCancel={() => setTab('products')} saving={saving} />
              </div>
            )}

            {/* HERO */}
            {tab === 'hero' && (
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: NAVY, marginBottom: 4 }}>Hero Bölümü</div>
                <div style={{ fontSize: 11.5, color: '#64748b', marginBottom: 18 }}>Ana sayfanın üstündeki büyük alan</div>
                <Crd t="BAŞLIKLAR VE AÇIKLAMA">
                  <div className="g2" style={{ marginBottom: 16 }}>
                    <div>
                      <TF label="ANA BAŞLIK (TÜRKÇE)" k="hero_title_tr" />
                      <TF label="VURGU BAŞLIK (TÜRKÇE)" k="hero_subtitle_tr" />
                      <TF label="AÇIKLAMA (TÜRKÇE)" k="hero_desc_tr" type="textarea" />
                    </div>
                    <div>
                      <TF label="ANA BAŞLIK (İNGİLİZCE)" k="hero_title_en" />
                      <TF label="VURGU BAŞLIK (İNGİLİZCE)" k="hero_subtitle_en" />
                      <TF label="AÇIKLAMA (İNGİLİZCE)" k="hero_desc_en" type="textarea" />
                    </div>
                  </div>
                  <Sbtn onClick={() => saveSS(['hero_title_tr','hero_title_en','hero_subtitle_tr','hero_subtitle_en','hero_desc_tr','hero_desc_en'])} saving={saving} gold />
                </Crd>
              </div>
            )}

            {/* SİTE GÖRSELLERİ */}
            {tab === 'gorseller' && (
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: NAVY, marginBottom: 4 }}>Site Görselleri</div>
                <div style={{ fontSize: 11.5, color: '#64748b', marginBottom: 18 }}>Hero ve kategori görsellerini yükleyin.</div>
                <div className="ig" style={{ marginBottom: 16 }}>
                  {[
                    { key:'hero_image', label:'HERO ARKA PLAN', desc:'Ana sayfa tam ekran (1920×1080)' },
                    { key:'cat_bilezik', label:'KATEGORİ: BİLEZİK', desc:'Önerilen: 800×800' },
                    { key:'cat_zincir', label:'KATEGORİ: ZİNCİR', desc:'Önerilen: 800×800' },
                    { key:'cat_kolye', label:'KATEGORİ: KOLYE', desc:'Önerilen: 800×800' },
                    { key:'cat_yuzuk', label:'KATEGORİ: YÜZÜK', desc:'Önerilen: 800×800' },
                    { key:'cat_kupe', label:'KATEGORİ: KÜPE', desc:'Önerilen: 800×800' },
                  ].map(slot => (
                    <ImgSlot key={slot.key} slotKey={slot.key} label={slot.label} desc={slot.desc} currentUrl={S(slot.key)} onSaved={(k,v) => setS(k,v)} showToast={showToast} />
                  ))}
                </div>
                <div style={{ background:'#fffbeb', border:'1px solid #f59e0b', padding:'11px 15px', fontSize:11, color:'#78350f' }}>
                  💡 Görsel seçince otomatik yüklenir. Bucket: <b>product-images</b> (Public olmalı)
                </div>
              </div>
            )}

            {/* HAKKIMIZDA */}
            {tab === 'hakkimizda' && (
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: NAVY, marginBottom: 4 }}>Hakkımızda</div>
                <div style={{ fontSize: 11.5, color: '#64748b', marginBottom: 18 }}>Hakkımızda bölümü metinleri</div>
                <Crd t="METİN">
                  <div className="g2" style={{ marginBottom: 16 }}>
                    <TF label="HAKKIMIZDA (TÜRKÇE)" k="about_text_tr" type="textarea" />
                    <TF label="ABOUT TEXT (İNGİLİZCE)" k="about_text_en" type="textarea" />
                  </div>
                  <Sbtn onClick={() => saveSS(['about_text_tr','about_text_en'])} saving={saving} />
                </Crd>
                <Crd t="İSTATİSTİKLER">
                  {[
                    { n:'stat_1_num', tr:'stat_1_label_tr', en:'stat_1_label_en', t:'1.' },
                    { n:'stat_2_num', tr:'stat_2_label_tr', en:'stat_2_label_en', t:'2.' },
                    { n:'stat_3_num', tr:'stat_3_label_tr', en:'stat_3_label_en', t:'3.' },
                  ].map(s => (
                    <div key={s.n} style={{ display:'grid', gridTemplateColumns:'80px 1fr 1fr', gap:10, marginBottom:8 }}>
                      <div><label style={LBL}>{s.t} RAKAM</label><input value={S(s.n)} onChange={e => setS(s.n, e.target.value)} style={INP} /></div>
                      <div><label style={LBL}>ETİKET TR</label><input value={S(s.tr)} onChange={e => setS(s.tr, e.target.value)} style={INP} /></div>
                      <div><label style={LBL}>ETİKET EN</label><input value={S(s.en)} onChange={e => setS(s.en, e.target.value)} style={INP} /></div>
                    </div>
                  ))}
                  <Sbtn onClick={() => saveSS(['stat_1_num','stat_1_label_tr','stat_1_label_en','stat_2_num','stat_2_label_tr','stat_2_label_en','stat_3_num','stat_3_label_tr','stat_3_label_en'])} saving={saving} />
                </Crd>
              </div>
            )}

            {/* İLETİŞİM */}
            {tab === 'iletisim' && (
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: NAVY, marginBottom: 4 }}>İletişim Bilgileri</div>
                <div style={{ fontSize: 11.5, color: '#64748b', marginBottom: 18 }}>Tüm iletişim bilgilerini güncelleyin</div>
                <div className="g2" style={{ marginBottom: 16 }}>
                  <Crd t="İLETİŞİM KANALLARI">
                    <TF label="WHATSAPP (ülke kodu dahil)" k="whatsapp_number" ph="905076053110" />
                    <TF label="TELEFON 1" k="phone_1" />
                    <TF label="TELEFON 2" k="phone_2" />
                    <TF label="INSTAGRAM (@'siz)" k="instagram" />
                  </Crd>
                  <Crd t="ADRES VE KONUM">
                    <TF label="ADRES" k="store_address" type="textarea" />
                    <TF label="ÇALIŞMA SAATLERİ" k="working_hours" />
                    <TF label="GOOGLE MAPS LİNKİ" k="maps_url" />
                  </Crd>
                </div>
                <Sbtn onClick={() => saveSS(['whatsapp_number','phone_1','phone_2','instagram','store_address','working_hours','maps_url'])} saving={saving} label="TÜM BİLGİLERİ KAYDET" gold />
              </div>
            )}

            {/* AYARLAR */}
            {tab === 'ayarlar' && (
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: NAVY, marginBottom: 4 }}>Sistem Ayarları</div>
                <div style={{ fontSize: 11.5, color: '#64748b', marginBottom: 18 }}>Genel site ayarları</div>
                <Crd t="MAĞAZA BİLGİLERİ">
                  <div className="g2" style={{ marginBottom: 16 }}>
                    <TF label="MAĞAZA ADI" k="store_name" />
                    <TF label="VARSAYILAN İŞÇİLİK (TL)" k="iscilik_default" type="number" />
                    <TF label="FOOTER AÇIKLAMA (TÜRKÇE)" k="footer_desc_tr" type="textarea" />
                    <TF label="FOOTER AÇIKLAMA (İNGİLİZCE)" k="footer_desc_en" type="textarea" />
                  </div>
                  <Sbtn onClick={() => saveSS(['store_name','iscilik_default','footer_desc_tr','footer_desc_en'])} saving={saving} />
                </Crd>
              </div>
            )}

            {/* KULLANICILAR */}
            {tab === 'kullanicilar' && (
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 22, fontWeight: 300, color: NAVY, marginBottom: 4 }}>Kullanıcılar</div>
                <div style={{ fontSize: 11.5, color: '#64748b', marginBottom: 18 }}>Admin paneline erişim hesapları</div>
                <div className="g2" style={{ marginBottom: 18 }}>
                  <Crd t="YENİ KULLANICI OLUŞTUR">
                    <label style={LBL}>E-POSTA</label>
                    <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} placeholder="yeni@email.com" style={INP} />
                    <label style={LBL}>ŞİFRE</label>
                    <input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="En az 6 karakter" style={INP} />
                    <div style={{ background:'#f0fdf4', border:'1px solid #bbf7d0', padding:'9px 12px', fontSize:11, color:'#166534', marginBottom:16 }}>
                      ✓ Kullanıcı direkt aktif olarak oluşturulur.
                    </div>
                    <Sbtn onClick={createUser} saving={saving} label="KULLANICI OLUŞTUR" />
                  </Crd>
                  <div>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                      <div style={{ fontSize:8, letterSpacing:2.5, color:'#94a3b8', textTransform:'uppercase' }}>MEVCUT KULLANICILAR ({users.length})</div>
                      <button onClick={loadUsers} disabled={usersLoading} style={{ background:'#f0f4f8', border:'1px solid #e2e8f0', padding:'5px 10px', fontSize:8, cursor:'pointer', fontFamily:'inherit', color:'#64748b' }}>
                        {usersLoading ? 'Yükleniyor...' : '↻ Yenile'}
                      </button>
                    </div>
                    {users.length === 0 && !usersLoading && (
                      <div style={{ background:'white', border:'1px solid #f1f5f9', padding:'24px', textAlign:'center', color:'#94a3b8', fontSize:12 }}>
                        Yüklemek için "Yenile"ye tıklayın
                      </div>
                    )}
                    {users.map(u => (
                      <div key={u.id} style={{ background:'white', border:'1px solid #f1f5f9', padding:'12px 14px', marginBottom:8, display:'flex', alignItems:'center', gap:12, boxShadow:'0 1px 4px rgba(0,0,0,.04)' }}>
                        <div style={{ width:34, height:34, borderRadius:'50%', background:NAVY, display:'flex', alignItems:'center', justifyContent:'center', color:GOLD, fontSize:13, fontWeight:700, flexShrink:0 }}>
                          {u.email?.[0]?.toUpperCase()}
                        </div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ fontSize:12, color:NAVY, fontWeight:500, wordBreak:'break-all' }}>{u.email}</div>
                          <div style={{ fontSize:9, color:'#94a3b8', marginTop:2 }}>
                            Oluşturuldu: {new Date(u.created_at).toLocaleDateString('tr-TR')}
                            {u.last_sign_in_at && ` · Son giriş: ${new Date(u.last_sign_in_at).toLocaleDateString('tr-TR')}`}
                          </div>
                          <div style={{ fontSize:8, marginTop:3 }}>
                            {u.email_confirmed_at
                              ? <span style={{ color:'#16a34a' }}>✓ E-posta onaylı</span>
                              : <span style={{ color:'#d97706' }}>⚠ E-posta onaysız</span>
                            }
                          </div>
                        </div>
                        {u.id !== session?.user?.id && (
                          <button onClick={() => deleteUser(u)} style={{ background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626', padding:'6px 10px', fontSize:8, cursor:'pointer', fontFamily:'inherit', flexShrink:0 }}>
                            SİL
                          </button>
                        )}
                        {u.id === session?.user?.id && (
                          <span style={{ fontSize:7.5, color:'#94a3b8', padding:'6px 10px', fontStyle:'italic' }}>Sen</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* AKTİVİTE */}
            {tab === 'aktivite' && (() => {
              const allSel = logs.length > 0 && selLogs.size === logs.length
              const someSel = selLogs.size > 0
              return (
                <div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16, flexWrap:'wrap', gap:10 }}>
                    <div>
                      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, fontWeight:300, color:NAVY, marginBottom:2 }}>Aktivite Günlüğü</div>
                      <div style={{ fontSize:11.5, color:'#64748b' }}>Son 150 işlem · {logs.length} kayıt</div>
                    </div>
                    <div style={{ display:'flex', gap:8 }}>
                      {someSel && <button onClick={deleteLogs} style={{ background:'#fef2f2', border:'1px solid #fecaca', color:'#dc2626', padding:'7px 14px', fontSize:8, letterSpacing:1.5, cursor:'pointer', fontFamily:'inherit', fontWeight:600 }}>🗑 {selLogs.size} SİL</button>}
                      <button onClick={loadLogs} style={{ background:'#f0f4f8', border:'1px solid #e2e8f0', padding:'7px 14px', fontSize:8, letterSpacing:1.5, cursor:'pointer', fontFamily:'inherit', color:'#64748b' }}>↻ YENİLE</button>
                    </div>
                  </div>
                  {someSel && (
                    <div style={{ padding:'9px 14px', background:'#eff6ff', borderBottom:'1px solid #bfdbfe', display:'flex', alignItems:'center', gap:10, marginBottom:2 }}>
                      <span style={{ fontSize:11, color:'#1d4ed8', fontWeight:500 }}>{selLogs.size} kayıt seçildi</span>
                      <button onClick={() => setSelLogs(new Set())} style={{ fontSize:9, color:'#64748b', background:'none', border:'none', cursor:'pointer' }}>SEÇİMİ KALDIR</button>
                    </div>
                  )}
                  <div style={{ background:'white', border:'1px solid #f1f5f9', boxShadow:'0 1px 6px rgba(0,0,0,.04)' }}>
                    <div className="tw">
                      <table className="tt">
                        <thead>
                          <tr style={{ background:NAVY }}>
                            <th style={{ ...TH, width:40 }}>
                              <input type="checkbox" checked={allSel} onChange={e => { if (e.target.checked) setSelLogs(new Set(logs.map(l => l.id))); else setSelLogs(new Set()) }} style={{ cursor:'pointer', accentColor:GOLD }} />
                            </th>
                            {['TARİH', 'KULLANICI', 'İŞLEM', 'DETAY'].map(h => <th key={h} style={TH}>{h}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {logs.map((l, i) => {
                            const { bg, txt } = lc(l.action)
                            const checked = selLogs.has(l.id)
                            return (
                              <tr key={l.id} className="tr" style={{ borderTop:'1px solid #f8fafc', background: checked ? '#eff6ff' : i % 2 === 0 ? 'white' : '#fafafa', cursor:'pointer' }}
                                onClick={() => { const s = new Set(selLogs); s.has(l.id) ? s.delete(l.id) : s.add(l.id); setSelLogs(s) }}>
                                <td style={TD} onClick={e => e.stopPropagation()}>
                                  <input type="checkbox" checked={checked} onChange={e => { const s = new Set(selLogs); e.target.checked ? s.add(l.id) : s.delete(l.id); setSelLogs(s) }} style={{ cursor:'pointer', accentColor:GOLD }} />
                                </td>
                                <td style={{ ...TD, color:'#64748b', whiteSpace:'nowrap' }}>{new Date(l.created_at).toLocaleString('tr-TR')}</td>
                                <td style={{ ...TD, color:NAVY, fontWeight:500 }}>{l.user_email}</td>
                                <td style={TD}><span style={{ fontSize:7.5, padding:'3px 8px', fontWeight:700, background:bg, color:txt }}>{l.action}</span></td>
                                <td style={{ ...TD, color:'#64748b' }}>{l.detail}</td>
                              </tr>
                            )
                          })}
                          {!logs.length && <tr><td colSpan={5} style={{ padding:40, textAlign:'center', color:'#94a3b8' }}>Henüz aktivite yok.</td></tr>}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )
            })()}

          </div>
        </div>
      </div>
    </>
  )
}