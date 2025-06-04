import React from "react";
import { Avatar, Link } from "@heroui/react";
import { images } from "@/constants/constantProvider";

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-zinc-700/50 py-6 mt-auto">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Avatar
              as="button"
              className="transition-transform w-20 h-20"
              name="logo1"
              src={images.header_logo}
            />
            <div className="text-center">
              <p className="text-sm text-zinc-400">Kırıkkale Üniversitesi</p>
              <p className="text-sm text-zinc-400">Mühendislik ve Doğa Bilimleri Fakültesi</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-zinc-400">
              © 2024 TÜBİTAK Projesi. Tüm hakları saklıdır.
            </p>
            <div className="flex gap-4">
              <Link href="mailto:contact@example.com" className="text-sm text-zinc-400 hover:text-black dark:hover:text-white">
                Email
              </Link>
              <Link href="tel:+901234567890" className="text-sm text-zinc-400 hover:text-black dark:hover:text-white">
                Telefon
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Avatar
              as="button"
              className="transition-transform w-20 h-20 bg-white"
              name="logo2"
              src={images.tubitak_logo}
            />
            <div className="text-center">
              <p className="text-sm text-zinc-400">Proje No: 123M640</p>
              <p className="text-sm text-zinc-400">Destekleyen: TÜBİTAK</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 