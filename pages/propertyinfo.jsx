import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "../components/";
import Footer from "../components/Footer"
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "propertyInfo",
        "storyline",
        "sale",
        "dashboard",
      ])),
    },
  };
}

const PropertyInfo = () => {
  const router = useRouter();
  const headerBackground = true;
  const [tabState, setTabState] = useState("property");
  const { t } = useTranslation("propertyInfo");

  useEffect(() => {
    var float = document.querySelector("#float");
    var footer = document.querySelector("#footer");

    function checkOffset() {
      function getRectTop(el) {
        var rect = el.getBoundingClientRect();
        return rect.top;
      }
      if (
        getRectTop(float) +
          document.body.scrollTop +
          float.offsetHeight >=
        getRectTop(footer) + document.body.scrollTop - 10
      ) {
        float.style.position = "absolute";
        float.style.bottom = `${footer.scrollHeight + 70}px`;
      }
      if (
        document.body.scrollTop + window.innerHeight <
        getRectTop(footer) + document.body.scrollTop
      ) {
        float.style.position = "fixed";
        float.style.bottom = "unset";
      }
    }

    document.addEventListener("scroll", function () {
      checkOffset();
    });
    return () => {
      document.removeEventListener("scroll", function () {
        checkOffset();
      });
    };
  }, []);

  const fixedinfo = (
    <div className=" mb-9 ">
      <img className="w-full" src="/bg/amwaj20.png" alt="" />
      <div
        className="w-full h-[72px] mt-3 rounded py-4 px-6 bg-invar-main-purple hover:bg-[#37293E]
        flex justify-between items-center"
      >
        <div className=" text-white font-semibold text-base">
          {t("property_detail_link1_title")}
          <p className=" text-sm font-normal text-invar-light-grey">
            {t("property_detail_link1_title_desc")}
          </p>
        </div>
        <img src="/icons/upright.svg" alt="" />
      </div>
      <a
        className="w-full h-[72px] mt-3 rounded py-4 px-6 bg-invar-main-purple hover:bg-[#37293E]
        flex justify-between items-center"
        href={
          router.locale === "tw"
            ? "https://drive.google.com/file/d/1D_Xm5j1jomkQ5POY8qzyPNStZYvmUaQo/view?usp=sharing"
            : "https://drive.google.com/file/d/1Du_EQY_-EO56UPgc-4JXuRRHWZmsEQP_/view?usp=sharing"
        }
        rel="noreferrer"
        target="_blank"
      >
        <div className=" text-white font-semibold text-base">
          {t("property_detail_link2_title")}
        </div>
        <img src="/icons/upright.svg" alt="" />
      </a>
    </div>
  );

  return (
    <div>
      <Navbar headerBackground={headerBackground} />
      <div
        className=" min-w-full max-w-full relative overflow-hidden h-full bg-gradient-to-b from-[#44334C] to-[#1E1722]
        text-white"
      >
        <div
          id="float"
          className=" fixed mt-[135px] right-1/2 w-[466px] hidden md:block md:mx-3 z-20"
        >
          {fixedinfo}
        </div>
        <img
          className=" hidden lg:flex absolute top-[400px] right-[-158px] w-[685px] h-[359px] z-0 "
          src="/bg/bg_03.png"
          alt=""
        />
        <img
          className=" hidden lg:flex absolute bottom-0 -left-1/4 w-[800px] h-[400px] z-10 "
          src="/bg/bg_05.png"
          alt=""
        />
        <div className=" px-[30px] sm:px-8 md:px-16 lg:px-[231px] pt-[60px] md:pt-[80px] flex flex-col md:flex-row mt-[32px] md:mt-[45px] relative">
          <div className=" w-full md:w-1/2 md:max-w-1/2">
            <div className="block md:hidden md:mx-3">{fixedinfo}</div>
          </div>
          <div className=" w-full md:w-1/2 md:pl-3">
            <p className=" font-semibold text-2xl md:text-3xl">
              {" "}
              {t("property_detail_title")}
            </p>
            <p className=" mt-2 text-base md:text-xl mb-[38px]">
              {" "}
              {t("property_detail_title_desc")}
            </p>
            <div className="flex z-10 border-b-2 border-invar-main-purple">
              <button
                className={
                  "pb-2 mr-9 h-[36px] w-[110px] text-sm font-semibold text-center" +
                  (tabState == "property"
                    ? " text-white border-b-2 border-t-2 border-t-transparent"
                    : " text-invar-light-grey hover:text-white border-0  ")
                }
                onClick={() => setTabState("property")}
              >
                {t("property_details_title")}
              </button>
              <button
                className={
                  "pb-2 mr-9 h-[36px] w-[98px] text-sm font-semibold text-center" +
                  (tabState == "about"
                    ? " text-white border-b-2 border-t-2 border-t-transparent"
                    : " text-invar-light-grey hover:text-white border-0  ")
                }
                onClick={() => setTabState("about")}
              >
                {t("property_bahrain_title")}
              </button>
            </div>
            {tabState == "property" && (
              <>
                <div className=" py-6 border-b border-invar-main-purple z-30 relative">
                  {t("property_details_desc1")}
                  <br />
                  <br />
                  {t("property_details_desc2")}
                  {router.locale !== "tw" && (
                    <>
                      {" "}
                      <br />
                      <br />
                      {t("property_details_desc3")}
                      <br />
                      <br />
                      {t("property_details_desc4")}
                    </>
                  )}
                </div>
                <p className=" mt-6 text-xl font-semibold ">
                  {t("property_details_info_financial")}
                </p>
                <div className="grow my-[22px] grid grid-cols-1 md:grid-cols-2 gap-1 border-b border-invar-main-purple">
                  <div className=" font-normal mb-6">
                    <p className=" text-invar-light-grey text-xs mb-[2px]">
                      {t("property_details_info_mv")}
                    </p>
                    <p className=" text-white text-base">$38,000,000 USD</p>
                  </div>
                  <div className=" font-normal mb-6">
                    <p className=" text-invar-light-grey text-xs mb-[2px]">
                      {t("property_details_info_tv")}
                    </p>
                    <p className=" text-white text-base">$20,000,000 USD</p>
                  </div>
                  <div className=" font-normal mb-6">
                    <p className=" text-invar-light-grey text-xs mb-[2px]">
                      {t("property_details_info_ri")}
                    </p>
                    <p className=" text-white text-base">$2,500,000 USD</p>
                  </div>
                  <div className=" font-normal mb-6 w-[180px]">
                    <p className=" text-invar-light-grey text-xs mb-[2px]">
                      {t("property_details_info_ei")}
                    </p>
                    <p className=" text-white text-base">
                      {t("property_details_info_ei_desc")}
                    </p>
                  </div>
                </div>
                <p className=" mt-6 text-xl font-semibold ">
                  {t("property_details_info_specialfeatures")}
                </p>
                <div className="grow my-[22px] grid grid-cols-1 md:grid-cols-2 gap-1 border-b border-invar-main-purple">
                  <div className=" font-normal mb-6">
                    <p className=" text-invar-light-grey text-xs mb-[2px]">
                      {t("property_details_info_specialfeatures_prime")}
                    </p>
                    <p className=" text-white text-base">
                      {t("property_details_info_specialfeatures_primedesc")}
                    </p>
                  </div>
                  <div className=" font-normal mb-6">
                    <p className=" text-invar-light-grey text-xs mb-[2px]">
                      {t("property_details_info_specialfeatures_defensive")}
                    </p>
                    <p className=" text-white text-base">
                      {t("property_details_info_specialfeatures_defensivedesc")}
                    </p>
                  </div>
                  <div className=" font-normal mb-6 w-[180px]">
                    <p className=" text-invar-light-grey text-xs mb-[2px]">
                      {t("property_details_info_specialfeatures_solidmarket")}
                    </p>
                    <p className=" text-white text-base">
                      {t(
                        "property_details_info_specialfeatures_solidmarketdesc"
                      )}
                    </p>
                  </div>
                </div>
                <p className=" mt-6 text-xl font-semibold ">
                  {t("property_details_info_others")}
                </p>
                <div className="grow my-[22px] grid grid-cols-1 md:grid-cols-2 gap-1 border-b border-invar-main-purple">
                  <div className=" font-normal mb-6">
                    <p className=" text-invar-light-grey text-xs mb-[2px]">
                      {t("property_details_info_others_developer")}
                    </p>
                    <p className=" text-white text-base">
                      {t("property_details_info_others_developer_mannaigroup")}
                    </p>
                  </div>
                  <div className=" font-normal mb-6">
                    <p className=" text-invar-light-grey text-xs mb-[2px]">
                      {t("property_details_info_others_manager")}
                    </p>
                    <p className=" text-white text-base">
                      {t("property_details_info_others_manager_flowbay")}
                    </p>
                  </div>
                </div>
                <p className=" italic text-invar-light-grey text-xs mb-[96px]">
                  {t("property_details_info_notice1")} <br /> <br />
                  {t("property_details_info_notice2")}
                  <br /> <br />
                  {t("property_details_info_notice3")}
                </p>
              </>
            )}
            {tabState == "about" && (
              <>
                <div className=" py-6 border-b border-invar-main-purple font-semibold text-xl relative">
                  {t("property_bahrain_desc1")}
                  <img
                    className=" mt-6 w-full "
                    src="/bg/bahrain_map.png"
                    alt=""
                  />
                  <p className=" mt-6 text-white text-base font-normal">
                    {t("property_bahrain_desc2_1")}
                    <br /> <br />
                    {t("property_bahrain_desc2_2")}
                    <br />
                    <br />
                    {t("property_bahrain_desc2_3")}
                  </p>
                </div>
                <div className=" pb-6 border-b border-invar-main-purple font-semibold text-xl">
                  <img className=" mt-6 w-full" src="/bg/bahrain.png" alt="" />
                  <div className=" w-full py-6 flex justify-start items-center">
                    <img
                      className="w-[32px] h-[32px]"
                      src="/icons/ic_market.svg"
                      alt=""
                    />
                    <div className=" ml-9 text-base font-normal text-white">
                      <p className=" text-invar-light-grey font-normal text-xs">
                        {t("property_bahrain_info_market")}
                      </p>
                      <span className=" text-2xl font-semibold">
                        {t("property_bahrain_info_marketdesc1")}
                      </span>
                      {t("property_bahrain_info_marketdesc2")}
                      <span className=" text-2xl font-semibold">
                        {" "}
                        {t("property_bahrain_info_marketdesc3")}
                      </span>
                      {t("property_bahrain_info_marketdesc4")}
                    </div>
                  </div>
                  <div className=" w-full pb-6 flex justify-start items-center">
                    <img
                      className="w-[32px] h-[32px]"
                      src="/icons/ic_workforce.svg"
                      alt=""
                    />
                    <div className=" ml-9 text-base font-normal text-white">
                      <p className=" text-invar-light-grey font-normal text-xs">
                        {t("property_bahrain_info_workfoece")}
                      </p>
                      <span className=" text-2xl font-semibold">
                        {t("property_bahrain_info_workfoec_edesc1")}{" "}
                      </span>
                      {t("property_bahrain_info_workfoec_edesc2")}
                    </div>
                  </div>
                  <div className=" w-full pb-6 flex justify-start items-center">
                    <img
                      className="w-[32px] h-[32px]"
                      src="/icons/ic_tourist.svg"
                      alt=""
                    />
                    <div className=" ml-9 text-base font-normal text-white">
                      <p className=" text-invar-light-grey font-normal text-xs">
                        {t("property_bahrain_info_tourist")}
                      </p>
                      <span className=" text-2xl font-semibold">
                        {t("property_bahrain_info_touristdesc1")}
                      </span>
                      {t("property_bahrain_info_touristdesc2")}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div id="footer" className="relative z-50"> 
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;
