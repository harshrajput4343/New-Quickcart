import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-10">
      <div className="flex items-center gap-4">
        <Image
          className="hidden md:block h-auto"
          src={assets.logo}
          alt="logo"
          width={128}
          height={40}
        />
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          Designed and developed by Harsh Kumar.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <a href="#">
          <Image src={assets.facebook_icon} alt="facebook icon" width={24} height={24} />
        </a>
        <a href="#">
          <Image src={assets.twitter_icon} alt="twitter icon" width={24} height={24} />
        </a>
        <a href="#">
          <Image src={assets.instagram_icon} alt="instagram icon" width={24} height={24} />
        </a>
      </div>
    </div>
  );
};

export default Footer;