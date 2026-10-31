"use client";
import { useEffect, useState } from "react";
import { whatsapp } from "./site-data";

export function StickyCta() {
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    const booking = document.querySelector(".calculator-page");
    const footer = document.querySelector(".site-footer");
    let bookingVisible = false;
    let footerVisible = false;
    let goingDown = false;
    let lastY = window.scrollY;
    let frame = 0;
    const apply = () => setHidden(window.scrollY < 560 || bookingVisible || footerVisible || goingDown);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === booking) bookingVisible = entry.isIntersecting;
        if (entry.target === footer) footerVisible = entry.isIntersecting;
      });
      apply();
    }, { threshold: .06 });
    if (booking) observer.observe(booking);
    if (footer) observer.observe(footer);
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        if (Math.abs(y - lastY) > 4) { goingDown = y > lastY; lastY = y; }
        apply();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, []);
  return <a className={`sticky-cta${hidden ? " is-hidden" : ""}`} href={whatsapp} target="_blank" rel="noreferrer">Konsultasi via WhatsApp</a>;
}
