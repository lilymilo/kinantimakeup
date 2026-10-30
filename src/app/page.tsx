"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const whatsapp = "https://wa.me/6281388672263";
const videoSrc = "/videos/WhatsApp%20Video%202026-10-22%20at%2015.33.21.mp4";

type Shot = { src: string; label: string; alt: string; w: number; h: number };

const shots: Shot[] = [
  { src: "/images/portfolio/akad-1.webp", label: "Akad", alt: "Rias pengantin untuk momen akad", w: 710, h: 888 },
  { src: "/images/portfolio/siger-1.webp", label: "Siger Sunda", alt: "Rias pengantin dengan siger Sunda", w: 613, h: 766 },
  { src: "/images/portfolio/tunangan-2.webp", label: "Tunangan", alt: "Rias untuk momen tunangan", w: 668, h: 835 },
  { src: "/images/portfolio/akad-9.webp", label: "Akad", alt: "Portrait pengantin dengan rias akad", w: 1200, h: 1500 },
  { src: "/images/portfolio/wisuda-1.webp", label: "Wisuda", alt: "Rias untuk hari wisuda", w: 614, h: 767 },
  { src: "/images/portfolio/tunangan-6.webp", label: "Tunangan", alt: "Portrait rias tunangan", w: 1011, h: 1264 },
  { src: "/images/portfolio/akad-2.webp", label: "Akad", alt: "Rias akad dengan detail lembut", w: 854, h: 1068 },
  { src: "/images/portfolio/siger-2.webp", label: "Siger Sunda", alt: "Pengantin dengan siger Sunda", w: 467, h: 584 },
  { src: "/images/portfolio/tunangan-7.webp", label: "Tunangan", alt: "Rias tunangan dengan pencahayaan lembut", w: 948, h: 1185 },
  { src: "/images/portfolio/akad-3.webp", label: "Akad", alt: "Portrait akad dengan rias natural", w: 663, h: 829 },
  { src: "/images/portfolio/wisuda-2.webp", label: "Wisuda", alt: "Rias wisuda dengan gaya segar", w: 929, h: 1161 },
  { src: "/images/portfolio/siger-3.webp", label: "Siger Sunda", alt: "Detail siger pada rias pengantin", w: 444, h: 554 },
  { src: "/images/portfolio/tunangan-1.webp", label: "Tunangan", alt: "Rias tunangan minimalis", w: 513, h: 642 },
  { src: "/images/portfolio/akad-4.webp", label: "Akad", alt: "Rias akad dengan busana tradisional", w: 852, h: 1065 },
  { src: "/images/portfolio/tunangan-3.webp", label: "Tunangan", alt: "Portrait tunangan dengan rias lembut", w: 649, h: 811 },
  { src: "/images/portfolio/akad-8.webp", label: "Akad", alt: "Rias akad dengan sentuhan hangat", w: 744, h: 929 },
  { src: "/images/portfolio/tunangan-4.webp", label: "Tunangan", alt: "Rias tunangan dengan gaya modern", w: 576, h: 720 },
  { src: "/images/portfolio/akad-5.webp", label: "Akad", alt: "Portrait akad dengan rias klasik", w: 370, h: 462 },
  { src: "/images/portfolio/akad-7.webp", label: "Akad", alt: "Portrait pengantin dengan rias lembut", w: 576, h: 720 },
];

const testimonials = [
  ["Lilis Prihatini", "Masyaallah makasih banyak ya teteh, aku puas banget, makeupnya bagus polll!"],
  ["Testimoni Resepsi", "Teteh makasih banyak yaa udh make up in aku lagi pas resepsi, suka bangettt hasil make upnya."],
  ["Febby (Cimulang)", "Teteh aku nuhun bangettt udah dibantuuu jadi inesss, puas bangettt pokonyaaa."],
  ["Putri Nanda Putri", "Mantap pol teh, pokokna te nyesel di rias ku teh ika mah. Sukses selalu yah teh, semakin lancar usahana, sampe neng ge jdi pangling di rias ku teteh mah."],
  ["Restu Ayu", "Maa syaa Allah teteh terimakasih, Kinanti Make Up dan tim sudah menjadi vendor terbaik.. Terimakasih banyak yahh teteh.. udah buat aku keluarga dan pager ayu cantik cantik di hari spesial aku dan suami. Maa syaa Allah teteh sudah menemani di setiap langkah perjalanan momen2 indah dari wisuda, engagement, sampai wedding. Selalu mengusahakan yang terbaik pokoknya sayang teteh, semoga teteh, keluarga dan tim sehat sehattt yahhh dan Kinanti Make Up makin besar dan jayaaa, Aamiin. Sukses yahh teteh..."],
  ["Testimoni Hari Spesial", "Teteh makasih yah udah bikin aku cantik banget Maa syaa Allah di hari special aku, pokoknya sehat selalu tetehku syng bgt lovvvvvv pokoknya."],
  ["Dita Ananda", "Teteh terimakasih banyakkk ya untuk makeup, decor, semuaaa semuanyaa, Masya Allah semuanya diluar ekspektasi akuu, hasilnyaa baguss semua, makeupnyaa bagusss pooll, tahan sampe selesai walaupun 1 baju, dekorasi bagusss bangettt, makasih pokoknya ya tehh."],
  ["Putri Yunita (Wisuda)", "Teteh makasiiii banyak yaaaaaaaa... Make up nya akuuu suka bangettttttt, banyak yg bilang cantik make up nya huhu. Alhamdulillah.. makasiiii banyakkkk ya tehhhh, sukses teruuus pokonyaaaaa ya tehhhh."],
] as const;

const socialLinks = [
  ["Instagram", "kinanti_makeupbogor", "https://instagram.com/kinanti_makeupbogor"],
  ["TikTok", "kinantimakeup", "https://tiktok.com/@kinantimakeup"],
  ["Threads", "kinanti_makeupbogor", "https://www.threads.net/@kinanti_makeupbogor"],
] as const;

const rupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);

const haptic = (pattern: number | number[] = 8) => {
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return;
  try {
    navigator.vibrate(pattern);
  } catch {
    /* getaran tidak didukung */
  }
};

function Stepper({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: number;
  onChange: (next: number) => void;
  disabled?: boolean;
}) {
  return (
    <div className={`stepper${disabled ? " is-disabled" : ""}`} aria-disabled={disabled}>
      <span className="stepper-label">{label}</span>
      <div className="stepper-controls">
        <button type="button" onClick={() => { if (disabled || value === 0) return; haptic(6); onChange(Math.max(0, value - 1)); }} disabled={disabled || value === 0} aria-label={`Kurangi jumlah ${label}`}>−</button>
        <output key={value} aria-live="polite">{value}</output>
        <button type="button" onClick={() => { if (disabled) return; haptic(9); onChange(value + 1); }} disabled={disabled} aria-label={`Tambah jumlah ${label}`}>+</button>
      </div>
    </div>
  );
}

function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add("anim-ready");
    const items = Array.from(document.querySelectorAll(".reveal"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in-view"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useParallax() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const driftTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const zoomTargets = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-zoom]"));
    if (!driftTargets.length && !zoomTargets.length) return;
    const mobile = window.matchMedia("(max-width: 860px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const damp = mobile.matches ? 0.55 : 1;
      driftTargets.forEach((el) => {
        const speed = Number(el.dataset.parallax) || 0.08;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > vh + 120) return;
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        el.style.transform = `translate3d(0, ${(progress * speed * 100 * damp).toFixed(2)}px, 0)`;
      });
      zoomTargets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > vh + 80) return;
        const progress = Math.min(1, Math.max(0, (vh - rect.top) / (vh + rect.height)));
        const scale = 1.045 - progress * 0.045;
        el.style.setProperty("--zoom", scale.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const onMotionChange = () => {
      if (media.matches) {
        driftTargets.forEach((el) => { el.style.transform = ""; });
        zoomTargets.forEach((el) => el.style.removeProperty("--zoom"));
        window.removeEventListener("scroll", onScroll);
      } else {
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    media.addEventListener("change", onMotionChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      media.removeEventListener("change", onMotionChange);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}

function usePointerDepth() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-depth]"));
    if (!targets.length) return;
    let frame = 0;
    let px = 0;
    let py = 0;
    const reset = () => targets.forEach((el) => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    });
    const update = () => {
      frame = 0;
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const near = px > rect.left - 140 && px < rect.right + 140 && py > rect.top - 140 && py < rect.bottom + 140;
        if (!near) {
          el.style.setProperty("--rx", "0deg");
          el.style.setProperty("--ry", "0deg");
          return;
        }
        const x = (px - (rect.left + rect.width / 2)) / rect.width;
        const y = (py - (rect.top + rect.height / 2)) / rect.height;
        el.style.setProperty("--rx", `${(-y * 2.2).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(x * 2.6).toFixed(2)}deg`);
      });
    };
    const onMove = (event: PointerEvent) => {
      px = event.clientX;
      py = event.clientY;
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", reset);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}

function useStickyCta() {
  useEffect(() => {
    const cta = document.querySelector<HTMLElement>(".sticky-cta");
    if (!cta) return;
    const booking = document.querySelector<HTMLElement>(".calculator-section");
    const footer = document.querySelector<HTMLElement>(".site-footer");
    let bookingVisible = false;
    let footerVisible = false;
    let goingDown = false;
    let lastY = window.scrollY;
    let frame = 0;
    const apply = () => {
      const nearTop = window.scrollY < 520;
      cta.classList.toggle("is-hidden", nearTop || bookingVisible || footerVisible || goingDown);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        if (Math.abs(y - lastY) > 4) {
          goingDown = y > lastY;
          lastY = y;
          apply();
        }
      });
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === booking) bookingVisible = entry.isIntersecting;
          if (entry.target === footer) footerVisible = entry.isIntersecting;
        });
        apply();
      },
      { threshold: 0.06 },
    );
    if (booking) observer.observe(booking);
    if (footer) observer.observe(footer);
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}

export default function Home() {
  useReveal();
  useParallax();
  usePointerDepth();
  useStickyCta();
  const [packageId, setPackageId] = useState("");
  const [wisudaCount, setWisudaCount] = useState(0);
  const [bridesmaidCount, setBridesmaidCount] = useState(0);
  const [withTunangan, setWithTunangan] = useState(false);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const touchStartX = useRef<number | null>(null);

  const packages = {
    wedding: { name: "Paket Makeup Pernikahan", price: 4000000 },
    akad: { name: "Paket Akad Nikah Promo", price: 2500000, normal: 2700000 },
    simple: { name: "Makeup Akad Tanpa Melati", price: 1200000 },
  } as const;
  const orderLines: { name: string; meta?: string; amount: number }[] = [];
  {
    const selected = packageId ? packages[packageId as keyof typeof packages] : null;
    if (selected) orderLines.push({ name: selected.name, amount: selected.price });
    if (wisudaCount > 0) orderLines.push({ name: "Makeup Wisuda", meta: `${wisudaCount} orang`, amount: wisudaCount * 250000 });
    if (withTunangan) orderLines.push({ name: "Makeup Tunangan", amount: 300000 });
    if (packageId && bridesmaidCount > 0) orderLines.push({ name: "Bridesmaid", meta: `${bridesmaidCount} orang`, amount: bridesmaidCount * 200000 });
  }
  const subtotal = orderLines.reduce((sum, line) => sum + line.amount, 0);
  const quoteMessage = orderLines.length
    ? `Halo Kinanti Makeup, saya ingin konsultasi pemesanan.\n\n${orderLines
        .map((line) => `${line.name}${line.meta ? ` (${line.meta})` : ""}: ${rupiah(line.amount)}`)
        .join("\n")}\n\nSubtotal estimasi makeup: ${rupiah(subtotal)}\nTanggal acara: ${date || "Belum ditentukan"}\nLokasi acara: ${location || "Belum ditentukan"}\n\nEstimasi awal — mohon konfirmasi ketersediaan, kombinasi layanan, dan biaya perjalanan. Terima kasih.`
    : null;

  const openLightbox = useCallback((index: number) => {
    haptic(8);
    setLightbox(index);
  }, []);
  const closeLightbox = useCallback(() => {
    haptic(6);
    setLightbox(null);
  }, []);
  const stepLightbox = useCallback((delta: number) => {
    haptic(5);
    setLightbox((current) => (current === null ? null : (current + delta + shots.length) % shots.length));
  }, []);
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") stepLightbox(1);
      if (event.key === "ArrowLeft") stepLightbox(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const dialog = document.querySelector<HTMLElement>(".lightbox");
    if (dialog && !dialog.contains(document.activeElement)) {
      dialog.querySelector<HTMLButtonElement>(".lightbox-close")?.focus();
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox, stepLightbox]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (media.matches) video.pause();
      else video.play().catch(() => undefined);
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  const current = lightbox === null ? null : shots[lightbox];

  return (
    <main>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="wordmark" href="#top" aria-label="Kinanti Makeup, kembali ke atas"><span>Kinanti</span><small>Makeup</small></a>
          <nav aria-label="Navigasi utama"><a href="#layanan">Layanan</a><a href="#karya">Karya</a><a href="#cerita">Cerita</a><a href="#kontak">Kontak</a></nav>
          <a className="header-link" href={whatsapp} target="_blank" rel="noreferrer">Konsultasi <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow hero-fade" style={{ animationDelay: ".1s" }}>Makeup artist · Bogor &amp; Jabodetabek</p>
            <h1 id="hero-title">
              <span className="hero-line" style={{ animationDelay: ".2s" }}>Your day.</span>
              <span className="hero-line" style={{ animationDelay: ".32s" }}>Your glow.</span>
              <span className="hero-line hero-line-accent" style={{ animationDelay: ".44s" }}>Your story.</span>
            </h1>
            <p className="hero-sub hero-fade" style={{ animationDelay: ".6s" }}>
              Rias pengantin dan momen istimewa — personal, tenang, dan penuh perhatian pada detail.
            </p>
            <div className="hero-actions hero-fade" style={{ animationDelay: ".72s" }}>
              <a className="button button-dark" href={whatsapp} target="_blank" rel="noreferrer">Mulai konsultasi <span aria-hidden="true">↗</span></a>
              <a className="button button-ghost" href="#karya">Lihat karya</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-frame" data-depth>
              <div className="hero-image-reveal" data-parallax="0.06">
                <Image src="/images/hero/hero-1.webp" alt="Portrait pengantin dengan rias Kinanti Makeup" fill priority sizes="(max-width: 860px) 92vw, 52vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="intro-band shell" aria-label="Tentang Kinanti Makeup">
        <div className="intro-statement">
          <p className="reveal">Untuk hari-hari yang ingin kamu ingat dengan perasaan yang sama indahnya.</p>
          <span className="hairline reveal" />
          <p className="intro-detail reveal">Setiap wajah punya cerita. Kami hadir untuk membantu kamu menemukan versi terbaiknya—tanpa menghilangkan siapa dirimu.</p>
        </div>
      </section>

      <section className="portfolio-section" id="karya" aria-labelledby="portfolio-title">
        <div className="shell section-heading">
          <h2 className="reveal" id="portfolio-title">Karya yang<br /><em>menetap</em> dalam ingatan.</h2>
          <p className="heading-aside reveal">Akad, Siger Sunda, tunangan, dan wisuda.<br />Ketuk untuk memperbesar; geser untuk melihat semua.</p>
        </div>
        <div className="shell portfolio-masonry">
          {shots.map((shot, index) => (
            <button type="button" className="portfolio-card reveal" key={shot.src + index} onClick={() => openLightbox(index)} aria-label={`Perbesar foto: ${shot.alt}`} aria-haspopup="dialog">
              <span className="portfolio-image" data-scroll-zoom>
                <Image src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} sizes="(max-width: 860px) 46vw, 34vw" loading="lazy" />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="film-section" aria-labelledby="film-title">
        <div className="shell film-layout">
          <div className="film-copy reveal">
            <h2 id="film-title">Ada hari yang<br /><em>hanya sekali.</em></h2>
            <p>Momen di balik layar dari Kinanti Makeup — diputar tanpa suara, dibuat untuk dilihat sekilas dan diingat lama.</p>
          </div>
          <div className="phone reveal" data-parallax="0.05">
            <div className="phone-body" data-depth>
              <div className="phone-top" aria-hidden="true"><i className="phone-speaker" /><i className="phone-camera" /></div>
              <div className="phone-screen">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster="/images/hero/hero-1.webp"
                  aria-label="Video momen rias Kinanti Makeup tanpa suara"
                >
                  <source src={videoSrc} type="video/mp4" />
                  Browser kamu tidak mendukung pemutaran video.
                </video>
                <span className="phone-glare" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" id="layanan" aria-labelledby="services-title">
        <div className="shell services-layout">
          <div className="services-intro">
            <h2 className="reveal" id="services-title">Untuk momen<br /><em>yang berarti.</em></h2>
            <p className="services-copy reveal">Rias pengantin, acara istimewa, dan momen yang ingin kamu rayakan.</p>
          </div>
          <div className="service-list">
            {[
              ["Makeup Pernikahan", "Rp4.000.000"],
              ["Akad Nikah Promo", "Rp2.500.000"],
              ["Engagement / Tunangan", "Rp300.000"],
              ["Makeup Wisuda", "Rp250.000 / orang"],
              ["Bridesmaid", "Rp200.000 / orang"],
              ["Akad Tanpa Melati", "Rp1.200.000"],
            ].map(([name, price]) => (
              <div className="service-row reveal" key={name}>
                <h3>{name}</h3><p>{price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="packages-section shell" aria-labelledby="packages-title">
        <div className="section-heading">
          <h2 className="reveal" id="packages-title">Detail untuk<br /><em>hari utama.</em></h2>
          <p className="heading-aside reveal">Pilih paket yang paling dekat dengan kebutuhanmu. Detail lengkap dapat dikonsultasikan langsung.</p>
        </div>
        <div className="package-grid">
          <article className="package-card package-card-large reveal">
            <h3>Paket Makeup Pernikahan</h3>
            <strong>Rp4.000.000</strong>
            <ul>
              <li>Makeup dan 2 kali retouch</li>
              <li>1 baju akad, 2 baju resepsi</li>
              <li>Adat Siger Sunda, melati, selop</li>
              <li>Henna, kuku, dan softlens</li>
              <li>Makeup dan baju untuk 4 pager ayu</li>
              <li>Orang tua kandung dan orang tua besan</li>
            </ul>
          </article>
          <article className="package-card package-card-promo reveal">
            <h3>Paket Akad Nikah</h3>
            <del>Rp2.700.000</del>
            <strong>Rp2.500.000</strong>
            <ul>
              <li>Busana 1 pasang CPP dan CPW beserta selop</li>
              <li>Riasan adat Siger Sunda</li>
              <li>Ronce melati premium dan henna art</li>
              <li>Softlens</li>
              <li>Bonus gratis makeup untuk 1 ibu</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="calculator-section" aria-labelledby="calculator-title">
        <div className="shell calculator-layout">
          <div className="calculator-intro">
            <h2 className="reveal" id="calculator-title">Mulai dari<br /><em>kebutuhanmu.</em></h2>
            <p className="reveal">Estimasi awal, bukan penawaran final. Konfirmasi kombinasi layanan dan biaya perjalanan lewat WhatsApp.</p>
          </div>
          <form className="booking reveal" onSubmit={(event) => event.preventDefault()}>
            <div className="booking-group">
              <p className="booking-label">Paket utama — pilih satu</p>
              {(["wedding", "akad", "simple"] as const).map((id) => {
                const pkg = packages[id];
                return (
                  <button
                    type="button"
                    key={id}
                    className={`package-option${packageId === id ? " is-selected" : ""}`}
                    aria-pressed={packageId === id}
                    onClick={() => {
                      haptic(10);
                      if (packageId === id) {
                        setPackageId("");
                        setBridesmaidCount(0);
                      } else {
                        setPackageId(id);
                      }
                    }}
                  >
                    <span className="package-option-name">
                      {pkg.name}
                      {"normal" in pkg ? <s>{rupiah(pkg.normal)}</s> : null}
                    </span>
                    <strong>{rupiah(pkg.price)}</strong>
                  </button>
                );
              })}
              <button
                type="button"
                className={`package-option${withTunangan ? " is-selected" : ""}`}
                aria-pressed={withTunangan}
                onClick={() => {
                  haptic(8);
                  setWithTunangan((current) => !current);
                }}
              >
                <span className="package-option-name">Makeup Tunangan<i>layanan mandiri</i></span>
                <strong>{rupiah(300000)}</strong>
              </button>
            </div>
            <div className="booking-group booking-steps">
              <Stepper label="Makeup wisuda" value={wisudaCount} onChange={setWisudaCount} />
              <Stepper label="Bridesmaid" value={bridesmaidCount} onChange={setBridesmaidCount} disabled={!packageId} />
            </div>
            <p className="booking-hint">Bridesmaid adalah layanan ekstra untuk paket utama. Makeup wisuda dan tunangan bisa dipesan sendiri tanpa paket.</p>
            <div className="booking-group booking-meta">
              <label>Tanggal acara
                <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
              </label>
              <label>Lokasi acara
                <input type="text" value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Contoh: Bogor" />
              </label>
            </div>
            <div className="order-summary">
              <p className="booking-label">Ringkasan pesanan</p>
              {orderLines.length ? (
                orderLines.map((line) => (
                  <p className="order-line" key={line.name}>
                    {line.name}{line.meta ? <i> · {line.meta}</i> : null}<b>{rupiah(line.amount)}</b>
                  </p>
                ))
              ) : (
                <p className="order-line order-empty">Belum ada layanan dipilih.</p>
              )}
              <p className="order-total"><span>Subtotal estimasi</span><b>{rupiah(subtotal)}</b></p>
              <small>Estimasi awal — konfirmasi ketersediaan dan kombinasi layanan melalui WhatsApp. Biaya transportasi tidak termasuk.</small>
            </div>
            <a
              className={`button button-dark booking-cta${orderLines.length ? "" : " is-disabled"}`}
              href={orderLines.length ? `${whatsapp}?text=${encodeURIComponent(quoteMessage ?? "")}` : undefined}
              aria-disabled={!orderLines.length}
              target={orderLines.length ? "_blank" : undefined}
              rel="noreferrer"
            >
              Kirim rincian via WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </form>
        </div>
      </section>

      <section className="testimonial-section" aria-labelledby="testimonial-title">
        <div className="shell">
          <div className="section-heading">
            <h2 className="reveal" id="testimonial-title">Yang tertinggal<br /><em>setelah hari itu.</em></h2>
            <div className="testimonial-nav reveal">
              <button type="button" onClick={() => document.getElementById("testimonial-track")?.scrollBy({ left: -340, behavior: "smooth" })} aria-label="Testimoni sebelumnya">←</button>
              <button type="button" onClick={() => document.getElementById("testimonial-track")?.scrollBy({ left: 340, behavior: "smooth" })} aria-label="Testimoni berikutnya">→</button>
            </div>
          </div>
          <div className="testimonial-track" id="testimonial-track">
            {testimonials.map(([name, quote]) => (
              <figure className="testimonial-card reveal" key={name}>
                <blockquote>“{quote}”</blockquote>
                <figcaption>{name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="profile-section shell" id="cerita" aria-labelledby="profile-title">
        <div className="profile-portrait reveal" data-parallax="0.07">
          <Image src="/images/profile/biika.webp" alt="Riska Harlita dari Kinanti Makeup" fill sizes="(max-width: 860px) 82vw, 32vw" />
        </div>
        <div className="profile-copy">
          <h2 className="reveal" id="profile-title">Delapan tahun<br /><em>menjadi lebih ahli.</em></h2>
          <p className="reveal">Setiap momen spesial memiliki cerita tersendiri. Bersama Riska Harlita, Kinanti Makeup tumbuh melalui perjalanan panjang dalam dunia makeup artist.</p>
          <p className="reveal">Setelah 4 tahun belajar dan berkarier bersama orang lain, Riska melanjutkan perjalanannya dengan membangun Kinanti Makeup selama 4 tahun terakhir.</p>
          <p className="reveal">Dengan pengalaman menangani beragam pesanan dan acara, didukung tim 2–3 orang sesuai kebutuhan paket, Kinanti Makeup hadir untuk membantu mempersiapkan penampilan di momen-momen yang berarti.</p>        </div>
      </section>

      <section className="area-section shell" aria-labelledby="area-title">
        <div>
          <h2 className="reveal" id="area-title">Dari Bogor,<br /><em>untuk momenmu.</em></h2>
        </div>
        <div className="area-copy">
          <p className="reveal">Kinanti Makeup melayani kebutuhan makeup di Bogor dan Jabodetabek. Biaya perjalanan menyesuaikan lokasi acara dan kebutuhan transportasi, dan tidak termasuk dalam harga paket.</p>
          <p className="reveal">Untuk permintaan di luar area layanan utama, termasuk luar kota atau luar pulau, silakan hubungi MUA secara langsung untuk konsultasi ketersediaan dan biaya perjalanan.</p>
          <a className="text-link reveal" href={whatsapp} target="_blank" rel="noreferrer">Konsultasi area acara <span aria-hidden="true">↗</span></a>
        </div>
      </section>

      <footer className="site-footer" id="kontak">
        <div className="shell footer-top">
          <div>
            <h2 className="reveal">Siap untuk<br /><em>hari besarmu?</em></h2>
          </div>
          <a className="footer-cta reveal" href={whatsapp} target="_blank" rel="noreferrer">
            <span>WhatsApp · +62 813-8867-2263</span>
            <strong>Mulai konsultasi <span aria-hidden="true">↗</span></strong>
          </a>
        </div>
        <div className="shell footer-bottom">
          <p>© 2026 Kinanti Makeup</p>
          <div className="social-links">
            {socialLinks.map(([label, handle, href]) => <a key={label} href={href} target="_blank" rel="noreferrer">{label} <span>{handle}</span> ↗</a>)}
          </div>
          <p>Bogor · Jawa Barat</p>
        </div>
      </footer>

      {current && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Galeri foto: ${lightbox! + 1} dari ${shots.length}`}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
          onTouchEnd={(event) => {
            const start = touchStartX.current;
            touchStartX.current = null;
            if (start === null) return;
            const delta = event.changedTouches[0].clientX - start;
            if (Math.abs(delta) > 48) stepLightbox(delta < 0 ? 1 : -1);
          }}
        >
          <figure onClick={(event) => event.stopPropagation()}>
            <Image src={current.src} alt={current.alt} width={current.w} height={current.h} sizes="90vw" priority />
          </figure>
          <button type="button" className="lightbox-close" onClick={(event) => { event.stopPropagation(); closeLightbox(); }} aria-label="Tutup galeri">✕</button>
          <button type="button" className="lightbox-prev" onClick={(event) => { event.stopPropagation(); stepLightbox(-1); }} aria-label="Foto sebelumnya">←</button>
          <button type="button" className="lightbox-next" onClick={(event) => { event.stopPropagation(); stepLightbox(1); }} aria-label="Foto berikutnya">→</button>
        </div>
      )}
      <a className="sticky-cta is-hidden" href={whatsapp} target="_blank" rel="noreferrer">Konsultasi via WhatsApp</a>
    </main>
  );
}
