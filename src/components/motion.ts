"use client";
import { useEffect } from "react";

export function useMotion() {
  useEffect(() => {
    document.documentElement.classList.add("anim-ready");
    const items = Array.from(document.querySelectorAll(".reveal"));
    if (!("IntersectionObserver" in window)) { items.forEach((item) => item.classList.add("in-view")); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("in-view"); observer.unobserve(entry.target); } }), { threshold: .12, rootMargin: "0px 0px -8%" });
    items.forEach((item) => observer.observe(item));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let frame = 0;
    const update = () => {
      frame = 0;
      if (reduced.matches) return;
      const mobileFactor = window.innerWidth < 861 ? .42 : 1;
      parallax.forEach((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -120 || rect.top > window.innerHeight + 120) return;
        const amount = Number(element.dataset.parallax) || .04;
        const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
        element.style.setProperty("--parallax-y", `${(progress * amount * 100 * mobileFactor).toFixed(2)}px`);
      });
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, []);
}
