import { ILayout } from "@/interfaces/ILayout";
export type AdminPageConfig = typeof adminPageConfig;

export const adminPageConfig : ILayout = {
  name: "",
  description: "Proaktif Yaklaşım Tabanlı Kavşak Risk Değerlendirme Sisteminin Geliştirilmesi",
  navItems: [
    {
      label: "A",
      href: "/a",
    },
    {
      label: "B",
      href: "/b",
    },
    {
      label: "C",
      href: "/c",
    },
  ],
  navMenuItems: [

  ],
};
