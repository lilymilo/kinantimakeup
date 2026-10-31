export const whatsapp = "https://wa.me/6281388672263";
export const videoSrc = "/videos/WhatsApp%20Video%202026-10-22%20at%2015.33.21.mp4";

export type Shot = { src: string; label: string; alt: string; w: number; h: number; kind?: "video" };

export const shots: Shot[] = [
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
  { src: videoSrc, label: "Video", alt: "Video momen rias Kinanti Makeup", w: 720, h: 1280, kind: "video" },
];

export const packages = {
  wedding: { name: "Paket Makeup Pernikahan", price: 4000000 },
  akad: { name: "Paket Akad Nikah Promo", price: 2500000, normal: 2700000 },
  simple: { name: "Makeup Akad Tanpa Melati", price: 1200000 },
} as const;

export const socialLinks = [
  ["Instagram", "kinanti_makeupbogor", "https://instagram.com/kinanti_makeupbogor"],
  ["TikTok", "kinantimakeup", "https://tiktok.com/@kinantimakeup"],
  ["Threads", "kinanti_makeupbogor", "https://www.threads.net/@kinanti_makeupbogor"],
] as const;

export const rupiah = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
