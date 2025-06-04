import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@heroui/navbar";
import { useState, useEffect } from "react";
import { ThemeSwitch } from "@/components/theme-switch";
import { LogoSection } from "@/components/Navbar/LogoSection";


export const AdminNavbar = () => {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowLogo(scrollPosition < 50); // 50px scroll'dan sonra logo gizlenecek
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <NextUINavbar maxWidth="xl" className="mt-4">
      {/* Logo - Sol Taraf */}
      <NavbarContent justify="start" className={`transition-opacity duration-300 ${showLogo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <LogoSection />
      </NavbarContent>

      {/* Menü İtemleri - Orta */}
      <NavbarContent className="hidden lg:flex" justify="center">

      </NavbarContent>

      {/* Dark Mode - Sağ Taraf */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden sm:flex">
          <ThemeSwitch />
        </NavbarItem>
        {/* Mobil Menü Butonu */}
        <NavbarItem className="lg:hidden">
          <NavbarMenuToggle />
        </NavbarItem>
      </NavbarContent>

      {/* Mobil Menü */}
      {/* <NavbarMenu>
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className="text-lg"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarMenu> */}
    </NextUINavbar>
  );
};
