import { ILayout } from "@/interfaces/ILayout";

export type SiteConfig = typeof siteConfig;

export const siteConfig: ILayout = {
  name: "Proaktif Yaklaşım Tabanlı Kavşak Risk Değerlendirme Sisteminin Geliştirilmesi",
  description:
    "Proaktif Yaklaşım Tabanlı Kavşak Risk Değerlendirme Sisteminin Geliştirilmesi",
  navItems: [
    {
      label: "Anasayfa",
      href: "/",
    },
    {
      label: "Proje Detayları",
      href: "/project",
    },
    {
      label: "Ekibimiz",
      // href: "/brb",
      href: "/team",
    },
    {
      label: "Video Gönderim",
      href: "/videoRequest",
    },
  ],
  navMenuItems: [],
  links: {
    github: "/",
    twitter: "/",
    docs: "/",
    discord: "/",
    sponsor: "/",
  },
};
