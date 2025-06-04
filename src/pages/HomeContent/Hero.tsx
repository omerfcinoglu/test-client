import React from "react";
import { Spacer } from "@heroui/react";
import Video from "./Video";

interface HeroProps {
  title: string;
  subtitle: string;
  subtitle2: string;
}

const Hero: React.FC<HeroProps> = ({ title }) => {
  return (
    <div className="relative m-0 p-0 flex flex-col mb-10 overflow-hidden">
      <div className="relative w-full px-4 text-center text-white max-w-full">
        <h1 className="w-full dark:text-white text-black font-bold leading-tight text-center break-words
          text-2xl     /* Mobil için varsayılan */
          sm:text-3xl  /* 640px ve üzeri */
          md:text-4xl  /* 768px ve üzeri */
          lg:text-4xl  /* 1024px ve üzeri */
          xl:text-4xl  /* 1280px ve üzeri */
          mb-4"
        >
          {title}
        </h1>
        <Spacer y={0.5} />
      </div>
      <Video/>
    </div>
  );
};

export default Hero;