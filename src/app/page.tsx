import Image from "next/image";
import { Footer, Header } from "@/components/site-chrome";
import { Gallery } from "@/components/gallery";
import { PricingSection } from "@/components/pricing-section";
import { StickyCta } from "@/components/sticky-cta";
import { whatsapp } from "@/components/site-data";

export default function Home() {
  return (
    <main>
      <Header />
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-fade">Makeup artist · Bogor &amp; Jabodetabek</p>
            <h1 id="hero-title">
              <span className="hero-line">Your day.</span>
              <span className="hero-line">Your glow.</span>
              <span className="hero-line hero-line-accent">Your story.</span>
            </h1>
            <p className="hero-sub hero-fade">Rias pengantin dan momen istimewa — personal, tenang, dan penuh perhatian pada detail.</p>
            <div className="hero-actions hero-fade">
              <a className="button button-dark" href={whatsapp} target="_blank" rel="noreferrer">Mulai konsultasi <span>↗</span></a>
              <a className="button button-ghost" href="#karya">Lihat portfolio</a>
            </div>
          </div>
          <div className="hero-visual" data-parallax=".055">
            <div className="hero-image-frame">
              <div className="hero-image-reveal">
                <Image src="/images/hero/hero-1.webp" alt="Portrait pengantin dengan rias Kinanti Makeup" fill priority sizes="(max-width: 860px) 92vw, 52vw" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="intro-band" aria-label="Tentang Kinanti Makeup">
        <div className="shell intro-statement">
          <p className="reveal">Untuk hari-hari yang ingin kamu ingat dengan perasaan yang sama indahnya.</p>
          <span className="hairline reveal" />
          <p className="intro-detail reveal">Setiap wajah punya cerita. Kami hadir untuk membantu kamu menemukan versi terbaiknya—tanpa menghilangkan siapa dirimu.</p>
        </div>
      </section>
      <section className="portfolio-section portfolio-full" id="karya" aria-labelledby="gallery-title">
        <div className="shell">
          <div className="section-heading">
            <h2 className="reveal" id="gallery-title">Karya yang<br /><em>menetap.</em></h2>
            <p className="heading-aside reveal">Akad, Siger Sunda, tunangan, wisuda, dan video di balik layar. Ketuk untuk melihat lebih dekat.</p>
          </div>
          <Gallery />
        </div>
      </section>
      <PricingSection />
      <section className="profile-section shell" id="cerita" aria-labelledby="profile-title">
        <div className="profile-portrait" data-parallax=".04">
          <Image src="/images/profile/biika.webp" alt="Riska Harlita dari Kinanti Makeup" fill sizes="(max-width: 860px) 82vw, 32vw" />
        </div>
        <div className="profile-copy">
          <h2 className="reveal" id="profile-title">Delapan tahun<br /><em>menjadi lebih ahli.</em></h2>
          <p className="reveal">Setiap momen spesial memiliki cerita tersendiri. Bersama Riska Harlita, Kinanti Makeup tumbuh melalui perjalanan panjang dalam dunia makeup artist.</p>
          <p className="reveal">Setelah 4 tahun belajar dan berkarier bersama orang lain, Riska melanjutkan perjalanannya dengan membangun Kinanti Makeup selama 4 tahun terakhir—didukung tim 2–3 orang sesuai kebutuhan paket.</p>
          <a className="button button-ghost reveal" href="#pricing">Lihat harga &amp; layanan</a>
        </div>
      </section>
      <Footer />
      <StickyCta />
    </main>
  );
}
