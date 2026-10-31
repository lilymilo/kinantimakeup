import Link from "next/link";
import { whatsapp } from "./site-data";

export function Header() {
  return <header className="site-header"><div className="shell header-inner"><Link className="wordmark" href="/"><span>Kinanti</span><small>Makeup</small></Link><nav aria-label="Navigasi utama"><a href="#karya">Portfolio</a><a href="#pricing">Pricing</a><a href="#kontak">Kontak</a></nav><a className="header-link" href={whatsapp} target="_blank" rel="noreferrer">Konsultasi <span aria-hidden="true">↗</span></a></div></header>;
}

export function Footer() {
  return <footer className="site-footer" id="kontak"><div className="shell footer-top"><h2 className="reveal">Siap untuk<br /><em>hari besarmu?</em></h2><a className="footer-cta reveal" href={whatsapp} target="_blank" rel="noreferrer"><span>WhatsApp · +62 813-8867-2263</span><strong>Mulai konsultasi <span aria-hidden="true">↗</span></strong></a></div><div className="shell footer-bottom"><p>© 2026 Kinanti Makeup</p><p>Bogor · Jawa Barat</p></div></footer>;
}
