import { useEffect, useState } from "react";

import { Twitter, Discord } from "../components/icons/Link";
import { ScrollToTop, Footer, Navbar } from "../components";

import Image from "next/image";
import { disableScroll } from "../src/utils/disableScroll";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Link as ScrollLink } from "react-scroll";

import explore from "../assets/images/explore.png";
import exploreTW from "../assets/images/explore_tw.png";
import styles from "../styles/Home.module.css";

import CollapseMenu from "../components/CollapseMenu";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";

export const endtimestamp = 1664582400000;

const typewriterTW =
  "資產碎片化 NFT 如何運用、與資產價值連結變成後續的問題，部落正在研擬解決方案…財務工程師多雷米拉提出將 Amwaj20 資產統一由專業領袖管理，並將產出的價值分配給 NFT 持有者；而持有者可以通過協議質押 NFT 獲取對應的價值。";
const typewriterEN =
  "How to utilize the NFT, which is a fractionalization of the property, and the correlated values attribute to it have become follow-up concerns. The tribe is working on a solution... Dyoremira, a financial engineer, proposed to unify the management of Amwaj20 to professional leaders for creating stable returns, and distribute the consecutive values to NFT holders; holders are allowed to stake NFT through the protocol to obtain the corresponding values.";

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

function App() {
  const [headerBackground, setHeaderBackground] = useState(false);
  const [currentTVL, setCurrentTVL] = useState("");

  const [toggleWallet, setToggleWallet] = useState(false);
  const { t } = useTranslation(["index", "storyline", "common"]);
  const [origin, setorigin] = useState();
  const router = useRouter();
  const address = useAddress();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setorigin(window.location.origin);
      window.addEventListener("scroll", () =>
        setHeaderBackground(window.pageYOffset > 20)
      );
    }
  }, []);

  // useEffect(() => {
  //   const node = document.getElementById("typeWriter");
  //   if (!node) return;
  //   let timer;
  //   let text;
  //   let i = 0;
  //   node.textContent = "";
  //   if (router.locale === "tw") text = typewriterTW;
  //   else text = typewriterEN;
  //   function typeWriter() {
  //     if (i < text.length) {
  //       node.innerHTML += text.charAt(i);
  //       i++;
  //       timer = setTimeout(typeWriter, 20);
  //     }
  //   }
  //   typeWriter();
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [router.locale]);
  useEffect(() => {
    if (!address && toggleWallet) setToggleWallet(false);
    if (!currentTVL) {
      axios
        .get("https://api.llama.fi/tvl/invar-finance")
        .then((response) =>
          console.log("response", setCurrentTVL(response.data))
        )
        .catch((e) => console.log(e));
    }
  }, [address]);

  return (
    <div className=" min-w-full max-w-full relative overscroll-none overflow-hidden h-full scrollbar-hide">
      <Navbar headerBackground={headerBackground} />

      {/* {!address && (
        <button
          className="btn btn-primary w-full h-[48px] font-semibold text-base bg-invar-main-purple text-center normal-case	text-white absolute top-[60px] z-10 rounded-none md:hidden"
          onClick={() => setToggleWallet(true)}
        >
          {t('connect_wallet', { ns: 'common' })}
        </button>
      )}
      {!address && toggleWallet && <MobileWalletConnect setToggleWallet={(e) => setToggleWallet(e)} />} */}
      <div className="w-full flex flex-col justify-center items-center h-0 ">
        {/* <label
          htmlFor="my-modal-1"
          onClick={() => disableScroll()}
          className="btn modal-button w-[183px] md:w-min btnShadow bg-white 
      opacity-80 hover:bg-white hover:opacity-100 px-6  text-sm text-info rounded absolute 
      top-[188px] md:top-[408px] md:left-[245px] z-[21] normal-case border-none md:hidden"
        >
          Storyline
        </label> */}
        {/* <ScrollLink
          activeClass="active"
          offset={-100}
          smooth
          spy
          to="mindmap"
          className="btn w-[183px] md:w-max btnShadow bg-white 
    opacity-80 hover:bg-white hover:opacity-100 px-6 py-3 mt-4 md:mt-0 text-sm text-info rounded 
    absolute top-[236px] md:top-[232px] md:right-1/2 normal-case border-none z-20 md:hidden"
        >
          <p>Mindmap</p>
        </ScrollLink> */}

        <Link href="/media">
          <p
            className="btn w-[183px] md:w-max btnShadow bg-white 
    opacity-80 hover:bg-white hover:opacity-100 px-6 py-3 mt-4 md:mt-0 text-sm text-info 
    rounded absolute top-[184px] md:top-[280px] md:right-1/4 normal-case border-none z-20 md:hidden"
          >
            News
          </p>
        </Link>

        <label
          htmlFor="property-modal"
          onClick={() => disableScroll()}
          className=" md:hidden btn modal-button w-[183px] md:w-max btnShadow bg-white 
    opacity-80 hover:bg-white hover:opacity-100 px-6 py-3 mt-4 md:mt-0 text-sm text-info 
    rounded absolute top-[248px] md:top-[280px] md:right-1/4 normal-case border-none z-20 "
        >
          {t("property_infos")}
        </label>
        {Date.now() >= 1665936000000 && (
          <label
            htmlFor="premint-modal"
            onClick={() => disableScroll()}
            className="btn modal-button w-[183px] md:w-max btnShadow bg-invar-success 
    opacity-80 hover:bg-invar-success hover:opacity-100 px-6 py-3 mt-4 md:mt-0 text-sm text-info 
    rounded absolute top-[312px] md:top-[449px] md:hidden  md:left-[450px] normal-case border-none z-20 "
          >
            {t("public_sale")}
          </label>
        )}

        <div
          onClick={() => router.push("/sftdemo")}
          className="mt-4 z-20 absolute top-[376px] md:top-[375px] md:left-[738px] w-[183px] h-[48px] md:w-max btnShadow btn bg-[#FFC25F] opacity-80 hover:bg-[#FFC25F] hover:opacity-100
      rounded normal-case border-none text-base font-semibold px-[21px] flex flex-col text-[#31135E] md:hidden"
        >
          <div className=" text-sm ">SFT Demo</div>
        </div>
        <label    htmlFor="pass-modal"
          onClick={() => disableScroll()}

          className="mt-4 z-20 absolute top-[440px] md:top-[375px] md:left-[738px] w-[183px] h-[48px] md:w-max btnShadow btn bg-white hover:bg-white opacity-80  hover:opacity-100
      rounded normal-case border-none text-base font-semibold px-[21px] flex flex-col text-[#31135E] md:hidden"
        >
          <div className=" text-sm ">PASS: InVariant</div>
        </label>
      </div>

      <div className=" w-full min-w-full max-w-full relative bg-gradient-radial from-[#55465D] to-black ">
        {/* <img className=' z-0 h-screen min-h-screen w-full object-cover overflow-hidden' draggable="false" src='/bg/bg.png' alt="bg" /> */}
        <img
          className=" cloud1 absolute top-56 md:top-[161px] -left-16 md:left-0 right-0 w-[500px] md:w-[600px] object-contain z-10 "
          draggable="false"
          src="/cloud1.png"
          alt="cloud1"
        />
        <img
          className=" cloud2 absolute top-[430px] -right-20 md:right-0 w-[600px] md:w-[600px] object-contain z-10 "
          draggable="false"
          src="/cloud2.png"
          alt="cloud2"
        />
        <div className=" relative z-0 h-screen min-h-screen w-full object-cover overflow-hidden">
          <Image
            layout="fill"
            objectFit="cover"
            draggable="false"
            src="/bg/bg.png"
          />
        </div>
        {/* <img
    className=" w-[23%] hidden absolute bottom-0 left-14 z-20 md:block overflow-hidden animate-fade-in-left"
    draggable="false"
    src="/bg/bg_1.png"
    alt="bg"
  /> */}
        <label
          htmlFor="property-modal"
          onClick={() => disableScroll()}
          className=" hidden z-10 pr-8 w-48 h-32 hover:cursor-pointer absolute top-[62%] right-[51%] md:flex justify-end items-start"
        >
          <div className=" hidden md:flex justify-center items-center z-10">
            <span className="animate-ping absolute inline-flex h-[14px] w-[14px] rounded-full bg-invar-error opacity-75"></span>
            <span className="relative inline-flex rounded-full h-[10px] w-[10px] bg-invar-error"></span>
          </div>
        </label>

        <Link href={"/sftdemo"}>
          <div className="z-30 hover:cursor-pointer absolute top-[46%] right-[53.5%] hidden md:flex">
            <span className="animate-ping z-[1] absolute inline-flex h-[16px] bottom-1 left-0.5 w-[16px] rounded-full bg-[#ffc25f] opacity-75"></span>
            <img
              src="/icons/ic_arrow.svg"
              className="z-[2]"
              width={21}
              height={19}
              alt="arrow icon"
            />
          </div>
        </Link>

        {/* <div className=" hidden md:flex justify-center items-center z-10">
            <span className="animate-ping absolute inline-flex h-[14px] w-[14px] rounded-full bg-invar-error opacity-75"></span>
            <span className="relative inline-flex rounded-full h-[10px] w-[10px] bg-invar-error"></span>
          </div> */}

        <div>
          <Link href={"/sftdemo"}>
            <div className="z-10 hover:cursor-pointer absolute top-[47%] lg:right-[55%] right-[57%] hidden md:flex w-14 h-24"></div>
          </Link>
        </div>
        {Date.now() >= 1665936000000 && (
          <div className="absolute top-[57%] right-[53%] hidden md:flex">
            <label
              htmlFor="premint-modal"
              onClick={() => disableScroll()}
              className="btn modal-button w-[183px] md:w-max btnShadow bg-invar-success 
    opacity-80 hover:bg-invar-success hover:opacity-100 px-6 py-3 mt-4 md:mt-0 text-sm text-info 
    rounded  normal-case border-none z-20 relative left-[9rem] top-7"
            >
              {t("public_sale")}
            </label>
          </div>
        )}
        <div className="mt-[88px]  hidden absolute top-0 left-[24px] md:flex flex-row items-start justify-start h-[592px] w-[300px] text-white indent-0.5 font-normal text-sm z-10 animate-fade-in-down">
          <div className="flex flex-col items-center justify-center mr-3 ">
            <span className="flex h-3 w-3 justify-center items-center">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <div className="h-[540px] w-[1px] border-l bg-white -mt-1 z-0"></div>
          </div>
          {t("storyline_popup_story7", { ns: "storyline" })}
        </div>
        {/* 
        <div className=" hidden absolute bottom-0 left-0 right-0 z-10 md:flex justify-center items-center">
    <div
      style={{ height: router.locale === 'en' ? "145px" : "99px" }}
      className=" flex justify-start items-start text-start w-[826px] m-6 p-6 px-[87px] bg-invar-main-purple 
      bg-opacity-60 text-white text-sm font-normal leading-[19.6px] rounded-lg animate-fade-in-up"
    >
      <div className="text-start flex justify-start" id="typeWriter">
   
      </div>
    </div>
  </div> */}
        {router.locale === "en" && (
          <h3 className="font-semibold md:text-[56px] md:leading-[61px] text-[26px] leading-7 text-invar-dark absolute bottom-[86px] right-6 z-10 text-right">
            {t("bring")}
            <br />
            {t("real_world_asset")}
            <br />
            {t("generate")}
            <br />
            {t("real_value")}
          </h3>
        )}
        {router.locale === "tw" && (
          <h3 className="font-semibold md:text-[56px] md:leading-[61px] text-2xl leading-7 text-invar-dark absolute bottom-[86px] right-6 z-10 text-right">
            通過 現實世界資產，
            <br />
            創造 真實價值
          </h3>
        )}

        <label
          htmlFor="pass-modal"
          onClick={() => disableScroll()}
          className=" hidden z-10 pr-8 w-48 h-32 hover:cursor-pointer absolute top-[81%] right-[55%] lg:right-[56%] md:right-[58%] md:flex justify-end items-start"
        >
          <div className=" hidden md:flex justify-center items-center z-10">
            <span className="animate-ping absolute inline-flex h-[14px] w-[14px] rounded-full bg-invar-error opacity-75"></span>
            <span className="relative inline-flex rounded-full h-[10px] w-[10px] bg-invar-error"></span>
          </div>
        </label>

        <div className="m-6 flex justify-between absolute bottom-[0px] right-0 z-20">
          <Twitter />
          <Discord />
        </div>
      </div>

      {/* <div className={`w-full md:h-[108px] z-20 relative pt-11 md:pt-0 ${styles.stripBG}`}>
        <div className={`${styles.sidesSpacing} flex justify-between h-full md:flex-row flex-col md:items-end items-center`} >
          <div className="my-auto md:flex-col flex-row flex">
            <p className={`${styles.stripHeadingInfo} md:mr-0 sm:mr-5 mr-4`}>Current TVL</p>
            <p className={styles.stripHeading}>$224,000</p>
          </div>


          <div className="my-auto md:flex-col flex-row flex">
            <p className={`${styles.stripHeadingInfo} md:mr-0 sm:mr-5 mr-4`}>Interest Accrued</p>
            <p className={styles.stripHeading}>$x,xxx</p>
          </div>

          <div className="flex items-end relative">
            <Image src="/bg/lama.png" width={96} height={101} alt="lama-img" />
            <span className="xl:absolute left-24 bottom-4 xl:mb-0 mb-4 text-[#E3D5FA] text-base font-normal rotate-[7.6deg]">We’re in<br />DefiLlama</span>
          </div>
        </div>
      </div> */}
      <div className="tvl-bg ">
      <div className="relative mx-auto max-w-[1112px] lg:h-[265px] h-[380px] w-full px-4 lg:pt-6 pt-4 lg:pb-7 pb-4 ">
        <div className="hidden lg:flex">
          <div className="flex items-center border border-[#413148] flex-1 relative">
            <label
              htmlFor="property-modal"
              onClick={()=>disableScroll()}
              className="w-full h-full top-0 right-0 absolute cursor-pointer z-[1]"
            ></label>
            <div className="w-6 h-[109px] bg-invar-success roounded mr-6 hidden lg:block"></div>
            <div className="w-[89px] h-[91px] mr-4 ">
              <Image width={89} height={91} src="/amwaj-sm.png" />
            </div>
            <div className="flex justify-between items-center lg:mr-12 flex-1 lg:flex-row flex-col">
              <div>
                <h6 className="font-normal text-sm leading-5 text-white mb-0.5">
                  {t("b_real_estate")}
                </h6>
                <p className="font-semibold text-2xl leading-7">Amwaj20</p>
              </div>
              <div>
                <h6 className="font-normal text-sm leading-5 text-white mb-0.5">
                  {t("est_apr")}
                </h6>
                <p className="font-semibold text-2xl leading-7">12%</p>
              </div>
              <div>
                <h6 className="font-normal text-sm leading-5 text-white mb-0.5">
                  {t("token_val")}
                </h6>
                <p className="font-semibold text-2xl leading-7">$20,000,000</p>
              </div>
            </div>
          </div>
          <div className="border border-[#413148] rounded ml-6 lg:flex items-center hidden">
            <div className="w-6 h-[109px] bg-[#646A79] roounded mr-6 relative"></div>
            <div className="w-[89px] h-[91px]  border border-[#646A79] mr-4 relative">
              <span className="w-[23px] h-[1px] absolute top-1/2 right-1/2 bg-[#646A79] translate-y-1/2 translate-x-1/2"></span>
              <span className="w-[1px] h-[23px] absolute top-[26%] right-1/2 bg-[#646A79] translate-y-1/2 translate-x-1/2"></span>
            </div>
            <div className="mr-4">
              <p className="font-normal text-sm leading-5 text-invar-grey">
                {t("developing")}
              </p>
              <p className="font-semibold text-2xl leading-7 text-invar-grey">
                ...
              </p>
            </div>
          </div>
        </div>

        <div className="lg:flex justify-between mt-1 hidden ml-[50px] mr-10 lg:mt-7">
          <div className="my-auto md:flex-col flex-row flex">
            <p
              className={`font-semibold text-2xl leading-7 md:mr-0 sm:mr-5 mr-4`}
            >
              {t("curr_tvl")}
            </p>
            <p className="font-semibold text-[44px] leading-[52px]">
              {currentTVL
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
                .slice(0, -3)}
            </p>
          </div>

          <div className="my-auto md:flex-col flex-row flex">
            <p
              className={`font-semibold text-2xl leading-7 md:mr-0 sm:mr-5 mr-4`}
            >
              {t("interest_accured")}
            </p>
            <p className="font-semibold text-[44px] leading-[52px]">$5,265.84</p>
          </div>

          <div className="flex items-end relative top-2">
          <a
              href="https://defillama.com/protocol/invar-finance"
              rel="noopener noreferrer"
              target="_blank"
            >
            <img src="/bg/lama.png" width={130} height={101} alt="lama-img" />
            </a>
            <span className="mb-5 text-[#E3D5FA] text-base font-normal rotate-[7.6deg]">
              We’re in
              <br />
              DefiLlama
            </span>
          </div>
        </div>

        <div className="lg:hidden border border-[#413148] rounded mb-[18px]">
          <div className="h-3 w-full rounded bg-invar-success"></div>
          <div className="flex px-4 relative">
            <label
              htmlFor="property-modal"
              className="w-full h-full top-0 right-0 absolute cursor-pointer z-[1]"
              onClick={()=>disableScroll()}
            ></label>

            <div className="w-[122px] h-[125px] mr-4 mt-2.5 mb-6">
              <Image width={122} height={125} src="/amwaj-sm.png" />
            </div>
            <div>
              <h6 className="font-normal text-xs leading-4 mt-1">
                {t("b_real_estate")}
              </h6>
              <p className="font-semibold text-xl leading-6 mb-1">Amwaj20</p>
              <h6 className="font-normal text-xs leading-4">{t("est_apr")}</h6>
              <p className="font-semibold text-xl leading-6 mb-1">12%</p>

              <h6 className="font-normal text-xs leading-4">
                {t("token_val")}
              </h6>
              <p className="font-semibold text-xl leading-6 mb-1">
                $20,000,000
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-l border-r border-[#413148] rounded h-9 flex items-center justify-center text-invar-grey font-normal text-sm leading-5 lg:hidden">
          <span>...</span>
        </div>
        <div className="px-4 relative bottom-4 lg:hidden">
          <div className="flex justify-between">
            <p className="font-semibold text-[19px] leading-10">
              {t("curr_tvl")}
            </p>
            <p className="font-semibold text-[30px] leading-[38px]">
            {currentTVL
                .toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })
                .slice(0, -3)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-[19px] leading-10">
              {t("interest_accured")}
            </p>
            <p className="font-semibold text-[30px] leading-[38px]">$5,265.84</p>
          </div>
          <div className="relative bottom-2">
            <div className="flex items-start justify-center ">
            <a
              href="https://defillama.com/protocol/invar-finance"
              rel="noopener noreferrer"
              target="_blank"
            >
            <img src="/bg/lama.png" width={116} height={75} alt="lama-img" className="relative bottom-1"/>
            </a>
              <span className="mt-5 text-[#E3D5FA] text-base font-normal rotate-[7.6deg]">
                We’re in
                <br />
                DefiLlama
              </span>
            </div>
          </div>
        </div>
      </div>
      </div>

      <div className={styles.firstHalfbg}>
        <section className={`${styles.introSection} ${styles.sidesSpacing}`}>
          <div className={styles.exploreContWrapper}>
            <div className={styles.exploreLeft}>
              <h3 className={styles.h3}>{t("homepage_intro_title")}</h3>
              <p className={styles.p}>
                {t("homepage_intro_desc1")}
                <br />
                <br />
                {t("homepage_intro_desc2")}
              </p>
            </div>
            <div className={styles.exploreRight}>
              <div className="relative">
                <Image
                  src={router.locale === "tw" ? exploreTW : explore}
                  width={558}
                  height={448}
                />
                <div className="absolute w-20 h-[75px] flex items-center flex-col sm:left-[40%] sm:bottom-[25%] left-[35%] bottom-[18%]">
                  <span className="wm:text-base sm:text-base text-xs">
                    Youtube
                  </span>
                  <a
                    href="https://www.youtube.com/watch?v=JYqibpdg-Yk"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <div className="sm:w-16 sm:h-11 w-10 h-7 bg-[#646A79] hover:bg-[#FF0000] sm:rounded-2xl rounded-[10px] flex items-center">
                      <img
                        src="/icons/ic_play.svg"
                        width={23}
                        height={23}
                        className="sm:w-[23px] sm:h-[23px] w-4 h-4 ml-auto sm:mr-[18px] mr-[11px]"
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className=" hidden md:flex mini-modal-section max-w-[1270px] m-auto px-5 w-full mt-10 mb-20">
          <div className="w-[63.7%] relative flex items-center">
            <Image src="/mini-modal.png" width={785} height={413} />
          </div>
          <div
            className={`flex-1  ${
              router.locale == "tw"
                ? "max-w-[364px] min-w-[364px] mt-12"
                : "min-w-[350px] mt-8"
            }`}
          >
            <h3
              className={`font-semibold text-[32px] leading-[38px] ${
                router.locale === "tw" && "ml-[52px]"
              }`}
            >
              {t("trust_minimized")}
            </h3>
            <div className="mt-9 ml-[52px] font-normal text-base leading-6">
              <p className="mb-10">{t("invaria_open_platform")}</p>
              <p>{t("trust_min")}</p>
            </div>
          </div>
        </section>
        <section className="mini-modal-mob mb-10 md:hidden">
          <h3
            className={`font-semibold text-2xl leading-7 text-center mb-6 px-4 ${
              router.locale === "tw" && "w-3/4 m-auto sm:block hidden"
            }`}
          >
            {t("trust_minimized")}
          </h3>
          {router.locale === "tw" && (
            <h3
              className={`font-semibold text-2xl leading-7 text-center mb-6 px-4 sm:hidden text-center`}
            >
              信任最小化模型
              <br />
              促進更美好的加密世界
            </h3>
          )}
          <p className="font-normal text-base leading-6 mb-6 px-4">
            {t("invaria_open_platform")}
          </p>
          <div className="flex flex-col relative sm:h-auto h-[630px]">
            <div className="w-[327px] h-[312px]">
              <Image src="/modal-img-3.png" width={327} height={312} />
            </div>
            <div className="absolute w-[261px] h-[386px] left-32 top-28">
              <Image src="/modal-img-2.png" width={261} height={386} />
            </div>
            <div className="w-[152px] h-[384px] relative bottom-16">
              <Image src="/modal-img-1.png" width={152} height={384} />
            </div>
          </div>
          <p className="font-normal text-base leading-6 mt-2 px-4">
            {t("trust_min")}{" "}
          </p>
        </section>

        <span id="mindmapoutside" className="relative bottom-28"></span>
        <section
          id="mindmap"
          className={`${styles.mindmapSection} ${styles.sidesSpacing}`}
        >
          <h3 className={styles.h3}>{t("homepage_mindmap_title")}</h3>
          <p className={styles.p}>{t("homepage_mindmap_desc")}</p>
        </section>

        <section id="storyline" className={styles.phase1}>
          <div className={`${styles.phase1Content} ${styles.sidesSpacing}`}>
            <div className={styles.phase1Left}></div>

            <div className={styles.phase1Right}>
              <h5 className={styles.h5}>{t("homepage_mindmap_phaseone")}</h5>
              <h3 className={styles.h3}>
                {t("homepage_mindmap_phaseone_title")}
              </h3>
              <p className={styles.p}>{t("homepage_mindmap_phaseone_desc")}</p>
              <ul className={styles.ul}>
                <li>{t("homepage_mindmap_phaseone_point1")}</li>
                <li>{t("homepage_mindmap_phaseone_point2")}</li>
                <li>{t("homepage_mindmap_phaseone_point3")}</li>
                <li>{t("homepage_mindmap_phaseone_point4")}</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      <div className={styles.secondHalfbg}>
        <section className={styles.phase2}>
          <div className={`${styles.phase2Content} ${styles.sidesSpacing}`}>
            <div className={styles.phase2Left}>
              <h5 className={styles.h5}>{t("homepage_mindmap_phasetwo")}</h5>
              <h3 className={styles.h3}>
                {t("homepage_mindmap_phasetwo_title")}
              </h3>
              <p className={styles.p}>{t("homepage_mindmap_phasetwo_desc")}</p>
              <ul className={styles.ul}>
                <li>{t("homepage_mindmap_phasetwo_point1")}</li>
                <li>{t("homepage_mindmap_phasetwo_point2")}</li>
                <li>{t("homepage_mindmap_phasetwo_point3")}</li>
              </ul>
            </div>
            <div className={styles.phase2Right}></div>
          </div>
        </section>

        <section className={styles.phase3}>
          <div className={`${styles.phase1Content} ${styles.sidesSpacing}`}>
            <div className={styles.phase3Left}></div>
            <div className={`${styles.phase1Right} ${styles.phase3Right}`}>
              <h5 className={styles.h5}>{t("homepage_mindmap_phasethree")}</h5>
              <h3 className={styles.h3}>
                {t("homepage_mindmap_phasethree_title")}
              </h3>
              <p className={styles.p}>
                {t("homepage_mindmap_phasethree_desc")}
              </p>
              <ul className={styles.ul}>
                <li>{t("homepage_mindmap_phasethree_point1")}</li>
              </ul>
            </div>
          </div>
        </section>
        <span id="faqoutside" className="relative bottom-28"></span>
        <section
          id="faq"
          className={`${styles.faqSection} ${styles.sidesSpacing}`}
        >
          <h3 className={`${styles.h3} text-center`}>FAQ</h3>

          <CollapseMenu
            heading={t("faq_1_title")}
            para={<p className={styles.p}>{t("faq_1_desc")}</p>}
          />
          <CollapseMenu
            heading={t("faq_2_title")}
            para={<p className={styles.p}>{t("faq_2_desc")}</p>}
          />
          <CollapseMenu
            heading={t("faq_3_title")}
            para={
              <>
                <p className={styles.p}>
                  <span className="purpleGrey">{t("faq_3_desc_1")}</span>
                  {t("faq_3_desc_2")}
                </p>
                <br />
                <Link href="/terms">
                  <p className={`${styles.p} m-0`}>
                    {t("faq_3_desc_3")}
                    <span className="purple">{t("faq_3_desc_4")}</span>
                    {t("faq_3_desc_5")}
                  </p>
                </Link>
              </>
            }
          />
          <CollapseMenu
            heading={t("faq_4_title")}
            para={<p className={styles.p}>{t("faq_4_desc")}</p>}
          />
          <CollapseMenu
            heading={t("faq_5_title")}
            para={
              <p className={styles.p}>
                {t("faq_5_desc_1")}
                <span className="purpleGrey">{t("faq_5_desc_2")}</span>
                {t("faq_5_desc_3")} (
                <a
                  className="linksColor"
                  href="https://twitter.com/InVarFinance"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
                ,
                <a
                  className="linksColor"
                  href="https://discord.com/invite/BrzPWYut4p"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Discord
                </a>
                ){t("faq_5_desc_4")}.
              </p>
            }
          />

          <CollapseMenu
            heading={t("faq_6_title")}
            para={
              <p className={styles.p}>
                {t("faq_6_desc_1")}
                <span className="purpleGrey">{t("faq_6_desc_2")}</span>
                <span className="linksColor text-semibold">
                  <a
                    className="linksColor"
                    href="https://coinmarketcap.com/currencies/usd-coin/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("faq_6_desc_3")}
                  </a>
                </span>
                <span className="purpleGrey">{t("faq_6_desc_4")}</span>
                {t("faq_6_desc_5")}
                <a
                  className="linksColor"
                  href="https://ethereum.org/en/developers/docs/gas/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("faq_6_desc_6")}
                </a>
                {t("faq_6_desc_7")}
              </p>
            }
          />
          <CollapseMenu
            heading={t("faq_7_title")}
            para={
              <p className={styles.p}>
                <span className="purpleGrey">{t("faq_7_desc_1")}</span>
                {t("faq_7_desc_2")}
              </p>
            }
          />
          <CollapseMenu
            heading={t("faq_8_title")}
            para={
              <p className={styles.p}>
                {t("faq_8_desc_1")}
                <span className="purpleGrey">{t("faq_8_desc_2")}</span>
              </p>
            }
          />
          <CollapseMenu
            heading={t("faq_9_title")}
            para={<p className={styles.p}>{t("faq_9_desc")}</p>}
          />
          <CollapseMenu
            heading={t("faq_10_title")}
            para={
              <p className={styles.p}>
                <span className="purpleGrey">{t("faq_10_desc_1")}</span>
                {t("faq_10_desc_2")}
              </p>
            }
          />
          <CollapseMenu
            heading={t("faq_11_title")}
            para={
              <>
                <p className={styles.p}>
                  <span className="purpleGrey">{t("faq_11_desc_1")}</span>
                  {t("faq_11_desc_2")}
                </p>
                <br />
                <p className={`${styles.p} m-0`}>
                  <span className="purpleGrey">{t("faq_11_desc_3")}</span>
                  {t("faq_11_desc_4")}
                </p>
              </>
            }
          />
          <CollapseMenu
            heading={t("faq_12_title")}
            para={
              <>
                <ul
                  style={{ marginTop: "12px", marginLeft: "20px" }}
                  className={styles.ul}
                >
                  <li>
                    {t("faq_12_desc_1")}
                    <br />{" "}
                    <p className={`${styles.p} m-0`}>
                      {t("faq_12_desc_2")}
                      <span className=" text-invar-grey font-semibold break-all">
                        {t("faq_12_desc_3")}
                      </span>{" "}
                    </p>{" "}
                    <p className={`${styles.p} m-0`}>
                      {t("faq_12_desc_4")}
                      <span className=" text-invar-grey font-semibold break-all">
                        {t("faq_12_desc_5")}
                      </span>
                    </p>
                  </li>
                  <li>
                    {t("faq_12_desc_6")}
                    <br />{" "}
                    <p className={`${styles.p} m-0`}>
                      <span className=" text-invar-grey font-semibold break-all">
                        {t("faq_12_desc_7")}
                      </span>{" "}
                    </p>
                  </li>
                </ul>
              </>
            }
          />
          <CollapseMenu
            heading={t("faq_13_title")}
            para={
              <p className={styles.p}>
                {t("faq_13_desc_1")} (
                <a
                  className="linksColor"
                  href="https://twitter.com/InVarFinance"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
                ,
                <a
                  className="linksColor"
                  href="https://discord.com/invite/BrzPWYut4p"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Discord
                </a>
                ) {t("faq_13_desc_2")}{" "}
                <a
                  href="mailto:info@invar.finance"
                  className="linksColor"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  info@invar.finance
                </a>
                {t("faq_13_desc_3")}
              </p>
            }
          />
        </section>
        <section className={`${styles.tutorialSection} ${styles.sidesSpacing}`}>
          <h3 className={`${styles.h3} text-center`}>Tutorials</h3>
          <CollapseMenu
            heading={t("tutorials_1_title")}
            para={
              <>
                <p className={styles.p}>{t("tutorials_1_desc_1")}</p>
                <br />
                <p className={`m-0 ${styles.p}`}>
                  {t("tutorials_1_desc_2")}
                  <span className="text-invar-error font-semibold">
                    {t("tutorials_1_desc_3")}
                  </span>
                </p>
              </>
            }
          />
          <CollapseMenu
            heading={t("tutorials_2_title")}
            para={<p className={styles.p}>{t("tutorials_2_desc_1")}</p>}
          />
          <CollapseMenu
            heading={t("tutorials_3_title")}
            para={<p className={styles.p}>{t("tutorials_3_desc_1")}</p>}
          />
          <CollapseMenu
            heading={t("tutorials_4_title")}
            para={<p className={styles.p}>{t("tutorials_4_desc_1")}</p>}
          />
          <CollapseMenu
            heading={t("tutorials_5_title")}
            para={<p className={styles.p}>{t("tutorials_5_desc_1")}</p>}
          />
        </section>

        <section className={`${styles.partnersSection} ${styles.sidesSpacing}`}>
          <h3 className={`${styles.h3} text-center`}>Partners</h3>
          <div className={styles.partnerSectionWrapper}>
            <a
              href="https://www.circle.com/en/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`${styles.logoCont}`}>
                <div className={styles.logo1}></div>
              </div>
            </a>
            <a
              href="https://www.catchonlabs.xyz/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`${styles.logoCont}`}>
                <div className={styles.logo2}></div>
              </div>
            </a>
            <a
              href="https://cerestoken.io/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`${styles.logoCont}`}>
                <div className={styles.logo6}></div>
              </div>
            </a>
            <a
              href="https://flowbay.co/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`${styles.logoCont}`}>
                <div className={styles.logo3}></div>
              </div>
            </a>
            <a
              href="https://headdao.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`${styles.logoCont}`}>
                <div className={styles.logo4}></div>
              </div>
            </a>
            <a
              href="https://hashex.org/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`${styles.logoCont}`}>
                <div className={styles.logo5}></div>
              </div>
            </a>
            <a
              href="https://www.kryptogo.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`${styles.logoCont}`}>
                <div className={styles.logo7}></div>
              </div>
            </a>
            <a
              href="https://www.xpacebbs.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`${styles.logoCont} `}>
                <div className="flex items-center">
                  <div className="sm:w-[150px] sm:h-[76px] w-[88px] h-[67px] bg-[url('/linkalive-black.png')] sm:hover:bg-[url('/linkalive.png')]  bg-cover" />
                </div>
              </div>
            </a>
            <a
              href="https://twitter.com/_ORCTrade"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`${styles.logoCont} `}>
                <div className="flex items-center">
                  <div className="sm:w-[150px] sm:h-[76px] w-[88px] h-[67px] bg-[url('/orc-black.png')] sm:hover:bg-[url('/orc.png')]  bg-cover" />
                </div>
              </div>
            </a>

            <a
              href="https://twitter.com/PlayEstates"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`${styles.logoCont} `}>
                <div className="flex items-center">
                  <div className="sm:w-[150px] sm:h-[110px] w-[120px] h-[74px] bg-[url('/playEstate-black.png')] sm:hover:bg-[url('/playEstate.png')]  bg-cover" />
                </div>
              </div>
            </a>

            <a
              href="https://www.routerprotocol.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`${styles.logoCont}`}>
                <div className={styles.logo8}></div>
              </div>
            </a>
            <a
              href="https://sftlabs.io/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`${styles.logoCont} `}>
                <div className="flex items-center">
                  <div className="sm:w-[150px] sm:h-[30px] w-[120px] h-[74px] bg-[url('/sftlabs-black.png')] sm:hover:bg-[url('/sftlabs.png')]  bg-cover" />
                </div>
              </div>
            </a>
          </div>
        </section>
        <ScrollToTop />
        <Footer />
      </div>
    </div>
  );
}

export default App;
