"use client";
import { useMemo, useState } from "react";
import { packages, rupiah, whatsapp } from "./site-data";
import { useMotion } from "./motion";

function Stepper({ label, value, onChange, disabled = false }: { label: string; value: number; onChange: (value: number) => void; disabled?: boolean }) {
  return <div className={`stepper${disabled ? " is-disabled" : ""}`}><span className="stepper-label">{label}</span><div className="stepper-controls"><button type="button" disabled={disabled || value === 0} onClick={() => onChange(Math.max(0, value - 1))} aria-label={`Kurangi jumlah ${label}`}>−</button><output aria-live="polite">{value}</output><button type="button" disabled={disabled} onClick={() => onChange(value + 1)} aria-label={`Tambah jumlah ${label}`}>+</button></div></div>;
}

const standaloneServices: [string, string][] = [["Makeup Akad Tanpa Melati", "Rp1.200.000"], ["Makeup Wisuda", "Rp250.000"], ["Makeup Tunangan", "Rp300.000"], ["Bridesmaid", "Rp200.000 per orang"]];

export function PricingSection() {
  useMotion();
  const [packageId, setPackageId] = useState<keyof typeof packages | "">("");
  const [wisudaOn, setWisudaOn] = useState(false);
  const [wisuda, setWisuda] = useState(0); const [bridesmaid, setBridesmaid] = useState(0); const [tunangan, setTunangan] = useState(false); const [date, setDate] = useState(""); const [location, setLocation] = useState("");
  const selectPackage = (id: keyof typeof packages) => {
    if (packageId === id) { setPackageId(""); setBridesmaid(0); return; }
    setPackageId(id); setWisudaOn(false); setWisuda(0); setTunangan(false); setBridesmaid(0);
  };
  const toggleWisuda = () => {
    if (wisudaOn) { setWisudaOn(false); setWisuda(0); return; }
    setWisudaOn(true); setWisuda(1); setPackageId(""); setBridesmaid(0);
  };
  const toggleTunangan = () => {
    if (tunangan) { setTunangan(false); return; }
    setTunangan(true); setPackageId(""); setBridesmaid(0); setWisudaOn(false); setWisuda(0);
  };
  const lines = useMemo<{ name: string; meta?: string; amount: number }[]>(() => {
    const result: { name: string; meta?: string; amount: number }[] = [];
    if (packageId) result.push({ name: packages[packageId].name, amount: packages[packageId].price });
    if (wisudaOn && wisuda > 0) result.push({ name: "Makeup Wisuda", meta: `${wisuda} orang`, amount: wisuda * 250000 });
    if (tunangan) result.push({ name: "Makeup Tunangan", amount: 300000 });
    if (packageId && bridesmaid) result.push({ name: "Bridesmaid", meta: `${bridesmaid} orang`, amount: bridesmaid * 200000 });
    return result;
  }, [packageId, wisudaOn, wisuda, tunangan, bridesmaid]);
  const total: number = lines.reduce((sum: number, line: { amount: number }) => sum + line.amount, 0);
  const message = `Halo Kinanti Makeup, saya ingin konsultasi pemesanan.\n\n${lines.map((line) => `${line.name}${line.meta ? ` (${line.meta})` : ""}: ${rupiah(line.amount)}`).join("\n")}\n\nSubtotal estimasi makeup: ${rupiah(total)}\nTanggal acara: ${date || "Belum ditentukan"}\nLokasi acara: ${location || "Belum ditentukan"}\n\nEstimasi awal — mohon konfirmasi ketersediaan, kombinasi layanan, dan biaya perjalanan. Terima kasih.`;
  return (
    <section id="pricing" aria-label="Pricing dan pemesanan">
      <div className="pricing-list shell">
        <div className="section-heading"><h2 className="reveal">Harga yang<br /><em>jelas dari awal.</em></h2><p className="heading-aside reveal">Pilih paket, lihat detail layanan, lalu susun kebutuhanmu di kalkulator.</p></div>
        <div className="package-grid">
          <article className="package-card package-card-large reveal"><h3>Paket Makeup Pernikahan</h3><strong>Rp4.000.000</strong><ul><li>Makeup dan 2 kali retouch</li><li>1 baju akad, 2 baju resepsi</li><li>Adat Siger Sunda, melati, selop</li><li>Henna, kuku, dan softlens</li><li>Makeup dan baju untuk 4 pager ayu</li><li>Orang tua kandung dan orang tua besan</li></ul></article>
          <article className="package-card package-card-promo reveal"><h3>Paket Akad Nikah Promo</h3><del>Rp2.700.000</del><strong>Rp2.500.000</strong><ul><li>Busana 1 pasang CPP dan CPW beserta selop</li><li>Riasan adat Siger Sunda</li><li>Ronce melati premium dan henna art</li><li>Softlens</li><li>Bonus gratis makeup untuk 1 ibu</li></ul></article>
        </div>
        <div className="service-list pricing-services">{standaloneServices.map(([name, price]) => <div className="service-row reveal" key={name}><h3>{name}</h3><p>{price}</p></div>)}</div>
      </div>
      <div className="calculator-section calculator-page">
        <div className="shell calculator-layout">
          <div className="calculator-intro"><p className="eyebrow">Booking calculator</p><h2 className="reveal">Mulai dari<br /><em>kebutuhanmu.</em></h2><p>Estimasi awal, bukan penawaran final. Biaya transportasi tidak termasuk.</p></div>
          <form className="booking reveal" onSubmit={(event) => event.preventDefault()}>
            <div className="booking-group">
              <p className="booking-label">Paket utama — pilih satu</p>
              {(Object.keys(packages) as (keyof typeof packages)[]).map((id) => <button type="button" className={`package-option${packageId === id ? " is-selected" : ""}`} aria-pressed={packageId === id} onClick={() => selectPackage(id)} key={id}><span className="package-option-name">{packages[id].name}{id === "akad" ? <s>{rupiah(2700000)}</s> : null}</span><strong>{rupiah(packages[id].price)}</strong></button>)}
            </div>
            <div className="booking-group">
              <p className="booking-label">Layanan mandiri — tanpa paket utama</p>
              <button type="button" className={`package-option${wisudaOn ? " is-selected" : ""}`} aria-pressed={wisudaOn} onClick={toggleWisuda}><span className="package-option-name">Makeup Wisuda <i>layanan mandiri</i></span><strong>{rupiah(250000)}<em>/ orang</em></strong></button>
              {wisudaOn && <Stepper label="Jumlah orang makeup wisuda" value={wisuda} onChange={setWisuda} />}
              <button type="button" className={`package-option${tunangan ? " is-selected" : ""}`} aria-pressed={tunangan} onClick={toggleTunangan}><span className="package-option-name">Makeup Tunangan <i>layanan mandiri</i></span><strong>{rupiah(300000)}</strong></button>
            </div>
            <div className="booking-group booking-steps"><Stepper label="Bridesmaid (tambahan paket utama)" value={bridesmaid} onChange={setBridesmaid} disabled={!packageId} /></div>
            <p className="booking-hint">Pilih satu paket utama atau layanan mandiri — keduanya tidak bisa digabung. Bridesmaid hanya sebagai tambahan paket utama. Makeup wisuda dihitung Rp250.000 per orang.</p>
            <div className="booking-group booking-meta">
              <label>Tanggal acara<input type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
              <label>Lokasi acara<input type="text" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Contoh: Bogor" /></label>
            </div>
            <div className="order-summary">
              <p className="booking-label">Ringkasan pesanan</p>
              {lines.length ? lines.map((line) => <p className="order-line" key={line.name}>{line.name}{line.meta ? <i> · {line.meta}</i> : null}<b>{rupiah(line.amount)}</b></p>) : <p className="order-line order-empty">Belum ada layanan dipilih.</p>}
              <p className="order-total"><span>Subtotal estimasi</span><b>{rupiah(total)}</b></p>
              <small>Estimasi awal — konfirmasi ketersediaan dan kombinasi layanan melalui WhatsApp. Biaya transportasi tidak termasuk.</small>
            </div>
            <a className={`button button-dark booking-cta${lines.length ? "" : " is-disabled"}`} href={lines.length ? `${whatsapp}?text=${encodeURIComponent(message)}` : undefined} target={lines.length ? "_blank" : undefined} rel="noreferrer" aria-disabled={!lines.length}>Kirim rincian via WhatsApp <span aria-hidden="true">↗</span></a>
          </form>
        </div>
      </div>
    </section>
  );
}
