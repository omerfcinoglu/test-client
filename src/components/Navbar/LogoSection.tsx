import { NavbarBrand, NavbarContent } from "@heroui/navbar"
import {  Image } from "@heroui/react"
import { Link } from "@heroui/link";
import images from '@/constants/images';

export const LogoSection = () => {
  return (
    <NavbarContent className="basis-1/5 sm:basis-full flex flex-col items-center">
      <NavbarBrand className="  max-w-fit">
        <Link
          className="flex justify-start items-center gap-1"
          color="foreground"
          href="/"
        >
          <Image
            height={100}
            width={250}
            src={images.project_logo}
          />
        </Link>
      </NavbarBrand>

      {/* <div className="flex gap-4 "> */}
        {/* <NavbarBrand className="max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Avatar
              as="button"
              className="transition-transform"
              name="logo1"
              size="lg"
              src={images.header_logo}
            />
          </Link>
        </NavbarBrand> */}
{/* 
        <NavbarBrand className="max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Avatar
              as="button"
              className="transition-transform bg-white"
              name="logo2"
              size="lg"
              src={images.tubitak_logo}
            />
          </Link>
        </NavbarBrand> */}
      {/* </div> */}
    </NavbarContent>
  );
};
