import React from "react";
import Link from "next/link";
import { enableScroll } from "../src/utils/disableScroll";
import { useTranslation } from "next-i18next";

const ModalPassNft = () => {
  const { t } = useTranslation("index");
  return (
    <div>
      <input type="checkbox" id="pass-modal" className="modal-toggle" />
      <div className="modal bg-[#000000b6] text-2xl text-white">
        <div className="modal-box relative px-[36px] pt-[56px] md:flex flex-col h-screen max-h-screen w-full max-w-5xl md:w-[375px] md:h-min md:absolute md:top-[24px] md:right-[24px] rounded-none md:rounded-[4px] bg-gradient-to-b from-primary to-[#1E1722] mx-0 md:p-6 md:pt-[56px] scrollbar-hide">
          <label
            htmlFor="pass-modal"
            onClick={() => enableScroll()}
            className="btn btn-sm p-0 absolute right-[24px] top-[12px] bg-transparent border-none hover:bg-transparent"
          >
            <img
              className="h-[20px] w-[20px]"
              src="/icons/ic_close.svg"
              alt=""
            />
          </label>
          <img className="w-full" src="/pass-modal-img.png" alt="" />
          <h3 className="text-2xl font-bold mt-6">PASS: InVariant</h3>
          <p className="pt-1 pb-3 text-base font-normal leading-6 border-b border-invar-main-purple">
            {t("pass_eco")}
          </p>
          <p className="mt-3 mb-1 text-xs font-normal text-invar-light-grey">
            {t("price_eth")}
          </p>
          <p className="mb-[10px] text-base font-normal text-white">
            0 ETH ~ 0.1 ETH
          </p>

          <p className=" mb-1 text-xs font-normal text-invar-light-grey">
            {t("type")}
          </p>
          <p className="mb-[10px] text-base font-normal text-white">
            {t("utility")}
          </p>

          <p className=" mb-1 text-xs font-normal text-invar-light-grey">
            {t("elements")}
          </p>
          <p className="mb-[52px] text-base font-normal text-white">
            {t("earth_ocean_sky")}
          </p>

          <Link href="/pass-nft">
            <button
              disabled
              className=" btn disabled:bg-invar-grey disabled:text-invar-light-grey w-full h-[48px] font-semibold text-base bg-invar-dark text-white rounded text-center normal-case border-none mb-6"
              onClick={() => enableScroll()}
            >
              {t("research_more")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModalPassNft;
