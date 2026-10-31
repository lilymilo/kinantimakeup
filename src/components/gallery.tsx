"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { shots, Shot } from "./site-data";
import { useMotion } from "./motion";

export function Gallery() {
  useMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active: Shot | null = activeIndex === null ? null : shots[activeIndex];
  const move = useCallback((direction: number) => {
    setActiveIndex((current) => (current === null ? null : (current + direction + shots.length) % shots.length));
  }, []);
  useEffect(() => {
    if (activeIndex === null) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [activeIndex, move]);
  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.querySelectorAll("video").forEach((video) => video.pause());
  }, []);
  return <>
    <div className="portfolio-masonry">{shots.map((shot, index) => (
      <button type="button" className="portfolio-card reveal" key={shot.src} onClick={() => setActiveIndex(index)} aria-label={shot.kind === "video" ? `Putar video: ${shot.alt}` : `Perbesar foto: ${shot.alt}`}>
        <span className="portfolio-image">
          {shot.kind === "video"
            ? <video src={shot.src} autoPlay muted loop playsInline preload="metadata" poster="/images/hero/hero-1.webp" aria-label={shot.alt} />
            : <Image src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} sizes="(max-width: 860px) 46vw, 34vw" />}
        </span>
      </button>
    ))}</div>
    {active && (
      <div className="lightbox" role="dialog" aria-modal="true" aria-label={active.alt} onClick={() => setActiveIndex(null)}>
        <figure onClick={(event) => event.stopPropagation()}>
          {active.kind === "video"
            ? <video src={active.src} controls autoPlay loop playsInline aria-label={active.alt} />
            : <Image src={active.src} alt={active.alt} width={active.w} height={active.h} sizes="90vw" priority />}
        </figure>
        <button className="lightbox-close" type="button" onClick={() => setActiveIndex(null)} aria-label="Tutup galeri">✕</button>
        <button className="lightbox-prev" type="button" onClick={() => move(-1)} aria-label="Sebelumnya">←</button>
        <button className="lightbox-next" type="button" onClick={() => move(1)} aria-label="Berikutnya">→</button>
        <p className="lightbox-count">{activeIndex! + 1} / {shots.length}</p>
      </div>
    )}
  </>;
}
