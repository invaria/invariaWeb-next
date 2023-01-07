import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Footer, Navbar, ScrollToTop } from "../components";

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          "index",
          "common",
          "storyline",
          "propertyInfo",
          "sale",
          "dashboard",
        ])),
      },
    };
  }

const PassNFT = () => {
  const [headerBackground, setHeaderBackground] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setHeaderBackground(window.pageYOffset > 20)
      );
    }
  }, []);
  return (
    <div className="page-bg min-h-screen">
      <Navbar headerBackground={headerBackground} />
      <div className="flex gap-11 max-w-[978px] m-auto md:pt-[152px] pt-[90px]">
        <div className="flex-1">
          <Image src="/pass-nft.png" width={466} height={335} />
          <div className="my-6 flex justify-between">
            <p className="font-normal text-base leading-6">Type</p>
            <p className="font-semibold text-xl leading-6">Utility</p>
          </div>
          <div className="mb-6 flex justify-between">
            <p className="font-normal text-base leading-6">Tiers</p>
            <p className="font-semibold text-xl leading-6">
              Earth, Ocean and Skyline
            </p>
          </div>
          <p className="font-normal text-base leading-6">
            Available / Total Supply (NFT)
          </p>
          <div className="bg-[#37293E] border border-white rounded h-8 relative">
            <div className="h-full w-[25%] bg-invar-success rounded"></div>
            <p className="absolute right-1.5 top-1.5 font-normal text-sm leading-5">
              100 / 500
            </p>
          </div>
        </div>
        <div className="flex-1 flex items-end">
          <div className="bg-[#37293E] max-h-[486px] flex-1 h-full"></div>
        </div>
      </div>
      <div className="mt-24"></div>

      <ScrollToTop />
      <Footer />

    </div>
  );
};

export default PassNFT;
