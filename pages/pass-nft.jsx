import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar, ScrollToTop } from "../components/";
import Footer from "../components/Footer";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Checkbox } from "@mui/material";
import { useAddress, useMetamask, useWalletConnect } from "@thirdweb-dev/react";
import { getUser } from "../src/utils/storeFirebase";
import { ethers } from "ethers";
import { nftAddress } from "../src/utils/web3utils";
import inVariaJSON from "../src/utils/InVaria.json";
import { ButtonMailto } from "../components/icons/Link";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "storyline",
        "sale",
        "dashboard",
        "passnft",
      ])),
    },
  };
}

const PropertyInfo = () => {
  const [mintNum, setMintNum] = useState(0);
  const router = useRouter();
  const headerBackground = true;
  const [tabState, setTabState] = useState("property");
  const [verify, setVerify] = useState("Accepted");
  const { t } = useTranslation("passnft");
  const [checked, setChecked] = useState(false);
  const [notification, setNotification] = useState("");
  const [soldNft, setSoldNft] = useState(0);
  const [notiType, setNotiType] = useState("success");
  const [expanded, setExpanded] = useState(false);

  const address = useAddress();

  async function getdata() {
    const state = await getUser(address);
    console.log("state", state);
    setVerify(state);
  }
  // useEffect(() => {
  //   if (address) getdata();
  //   if (address) {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const nftContract = new ethers.Contract(
  //       nftAddress,
  //       inVariaJSON,
  //       provider
  //     );
  //    if(address)  nftContract.Sold().then((res) => {
  //       setSoldNft(Number(+res.toString()));
  //     });
  //   }
  // }, [address]);

  function handleMintNum(c) {
    if (c == "+") {
      if (mintNum < 1000) setMintNum(+mintNum + 1);
      return;
    } else if (c == "-") {
      if (mintNum > 0) setMintNum(+mintNum - 1);
      return;
    } else {
      if (c < 0) {
        setMintNum(0);
      } else if (c > 1000) {
        setMintNum(1000);
      } else {
        setMintNum(+c);
      }
    }
  }
  const fixedinfo = (
    <>
      <div className=" md:mb-9 mb-[34px] lg:w-[466px] w-full md:h-[335px]">
        <img
          className="w-full"
          src="/pass-nft/pass-nft-img.png"
          alt=""
          width={466}
          height={335}
        />
        <div className="md:hidden">
          <p className="font-semibold text-2xl leading-7 mt-3 mb-3 ">
            {t("pass_heading")}
          </p>
          <p className="font-normal text-base leading-5 ">
         {t("goals_deliveries")}
          </p>
        </div>
      </div>
      <div className="flex justify-between md:mt-6">
        <p className="font-normal md:text-base text-sm md:leading-6 leading-5">
          {t("type")}
        </p>
        <p className="font-semibold md:text-xl md:leading-6 text-lg leading-5">
          {t("utility")}
        </p>
      </div>
      <div className="flex justify-between mt-6">
        <p className="font-normal md:text-base text-sm md:leading-6 leading-5">
          {t("tiers")}
        </p>
        <p className="font-semibold md:text-xl md:leading-6 text-lg leading-5">
          {t("earth_ocean_sky")}
        </p>
      </div>
      <p className="font-normal md:text-base text-sm md:leading-6 leading-5 mt-6">
       {t("available_supply")}
      </p>
      <div className="border relative border-white bg-[#37293E] h-8 rounded flex justify-end">
        <div
          className="bg-invar-success h-[30px] w-[73px] rounded absolute top-0 left-0"
          style={{ width: `${100 - ((500 - soldNft) / 500) * 100}%` }}
        ></div>
        <p className="font-normal text-sm leading-5 text-white mt-[6px] mr-1.5 relative z-10">
          ${(500 - soldNft).toLocaleString()} / $500
        </p>
      </div>
    </>
  );

  return (
    <div>
      <Navbar headerBackground={headerBackground} />
      <div
        className=" min-w-full max-w-full relative overflow-hidden h-full bg-gradient-to-b from-[#44334C] to-[#1E1722]
        text-white"
      >
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
        <div className="md:pt-[152px] pt-[90px] px-4 max-w-[1010px] lg:mx-auto md:ml-12 relative">
          <div className="flex w-full md:justify-between md:flex-row flex-col mb-10">
            <div className="md:max-w-[466px]">{fixedinfo}</div>
            <div className="lg:min-w-[466px] max-w-[466px] md:max-h-[486px] md:h-[486px] bg-[#37293E] mt-6 md:mt-12 lg:ml-0 md:ml-2 md:min-w-[340px] lg:px-0 md:px-4">
              <p className="font-normal text-base leading-6 text-center mt-[172px] mb-[74px]">
                NFT Mint Coming Soon...
              </p>
              <div className="font-normal text-xs leading-4 text-invar-light-grey max-w-[327px] mx-auto">
                <p className="mb-1.5">{t("mint_notice")} </p>
                <div className="flex mb-[2px]">
                  <div>1.&nbsp;</div>
                  <div>
                    <p>{t("notice_1")}</p>
                  </div>
                </div>
                <div className="flex mb-[2px]">
                  <div>2.&nbsp;</div>
                  <div>
                    <p>{t("notice_2")}</p>
                  </div>
                </div>

                <div className="flex">
                  <div>3.&nbsp;</div>
                  <div>
                    <p>{t("notice_3")}</p>
                  </div>
                </div>
                {expanded && (
                  <>
                  <div className="flex">
                    <div>4.&nbsp;</div>
                    <div>
                      <p>{t("notice_4")}</p>
                    </div>
                  </div>
                      <div className="flex">
                      <div>5.&nbsp;</div>
                      <div>
                        <p>{t("notice_5")}</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div>6.&nbsp;</div>
                      <div>
                        <p>{t("notice_6")} <ButtonMailto />.</p>
                      </div>
                    </div>
                    </>
                )}
                {!expanded && (
                  <p
                    className="font-semibold mt-1.5"
                    onClick={() => setExpanded(true)}
                  >
                    Read More 
                  </p>
                )}
              </div>
            </div>
          </div>
          <h3 className="font-semibold text-[32px] leading-[38px] mb-2 md:block hidden">
            PASS: InVariant
          </h3>
          <p className="font-normal text-lg leading-6 max-w-[808px] mb-[38px] md:block hidden">
            {t("goals_deliveries")}
          </p>

          <div className="flex z-10 border-b-2 border-invar-main-purple">
            <button
              className={
                "pb-2 mr-9 h-[36px] w-[110px] text-sm font-semibold text-center text-white border-b-2 border-t-2 border-t-transparent"
              }
            >
              {t("about")}
            </button>
          </div>
          <div className="max-w-[938px] md:min-h-[630px] min-h-[555px] px-4 relative ml-auto min-w-[375px] ">
            <div className="absolute top-10 left-[-15px] max-w-[340px]">
              <div className="bg-black opacity-50 rounded-full md:w-[168px] w-[98px] md:h-[168px] h-[98px] absolute md:top-10 md:left-5 top-[52px] left-[-12px]"></div>
              <img
                src="/pass-nft/bg_07.png"
                className="w-full md:block hidden"
              />
              <img
                src="/pass-nft/left-circle-mobile.png"
                className="w-full md:hidden"
              />
              <p className="text-center font-semibold md:text-xl text-base md:leading-6 leading-5 absolute md:top-[43%] top-16 md:left-[-45px] left-8">
                {t("exclusive")} <br />
                {t("rwa_backed")}
              </p>
              <p className="font-normal md:text-sm text-xs leading-5 absolute md:top-28 md:right-[-25px] right-2 bottom-12">
                Access
              </p>
            </div>
            <div className="absolute top-0 md:right-0 max-w-[369px] right-[-20px]">
              <p className="font-semibold md:text-xl text-base md:leading-6 leading-5 absolute md:right-10 right-8 top-[115px] z-10">
                {t("hyfi_vaults")}
              </p>
              <div className="bg-black opacity-50 rounded-full md:w-[248px] md:h-[248px] w-[121px] h-[121px] absolute md:top-14 top-[72px] md:left-[98px] left-[76px]"></div>
              <img
                src="/pass-nft/bg_06.png"
                className="w-full md:block hidden"
              />
              <img
                src="/pass-nft/right-circle-mobile.png"
                className="w-full md:hidden"
              />

              <p className="font-normal text-sm leading-5 absolute md:top-44 top-[229px] left-12 md:left-[-30px]">
                Access
              </p>
            </div>
            <div className="md:w-[76%] mx-auto md:absolute bottom-[95px] left-32 md:mt-0 pt-60">
              <img
                src="/pass-nft/bg_10.png"
                className="ml-auto min-w-[355px] md:h-auto h-48"
              />

              <div className="md:top-[210px] md:left-[70px] top-48 left-[-58px] absolute max-w-[180px]">
                <p className="font-semibold md:text-xl md:leading-6 text-base leading-5 bottom-[6px] md:left-20 left-16 absolute">
                  TradFi
                </p>
                <img src="/pass-nft/bg_09.png" className="w-full" />
              </div>

              <div className="absolute md:right-[-45px] md:top-[310px] top-[18rem] right-[-40px] md:max-w-full max-w-[200px]">
                <p className="font-semibold md:text-xl text-base md:leading-6 leading-5 md:top-[70px] md:right-[-16px] right-0 left-2.5 top-7 absolute">
                  HyFi
                </p>
                <img src="/pass-nft/bg_11.png" className="w-full" />
              </div>
              <div className="absolute md:left-1/4 md:bottom-[-28px] left-[20px] bottom-[5rem]">
                <p className="font-semibold md:text-xl tex-base leading-5 md:leading-6 md:bottom-7 bottom-[5rem] md:right-10 right-[-0.7rem] absolute">
                  DeFi
                </p>
                <img
                  src="/pass-nft/bg_12.png"
                  className="w-full md:w-auto h-auto max-w-[150px]"
                />
              </div>
            </div>
            <div className="absolute md:bottom-0 bottom-[-2.3rem] right-[22px] md:left-[-54px] md:max-w-[275px] max-w-[225px]">
              <img
                src="/pass-nft/bg_05.png"
                className="w-full md:block hidden"
              />
              <img
                src="/pass-nft/mobile-partners.png"
                className="w-full md:hidden"
              />

              <p className="font-semibold md:text-xl text-base leading-5 md:leading-6 absolute md:top-[52%] md:left-10 top-[40%] left-[72px]">
                ESG / Partners
              </p>
              <p className="font-normal text-xs md:text-sm leading-5 absolute md:top-0 md:right-[-15px] right-[205px] top-[90px]">
                Connect
              </p>
            </div>
          </div>

          <h2 className="font-semibold md:text-[32px] md:leading-10 text-2xl leading-7 text-center md:mt-8 mt-8 md:mb-6 mb-9">
            {t("unique_pass")}
            <br className="md:hidden" /> {t("distinctive_alpha")}
          </h2>

          <div className="flex md:justify-between md:mb-14 max-w-[920px] mx-auto md:flex-row flex-col">
            <div className="md:w-60">
              <p className="font-semibold text-xl leading-6 md:text-center text-left md:w-5/6 w-44 md:ml-auto md:mr-auto ml-7">
                Earth InVariant (TradFi)
              </p>
              <div className="md:h-auto h-[140px] md:mb-0 relative md:bottom-0 bottom-[52px]">
                <img
                  src="/pass-nft/bg_01.png"
                  width={150}
                  height={200}
                  className="md:mx-auto md:mr-auto mr-7 ml-auto min-h-[200px]"
                />
              </div>
              <div className="font-normal md:text-base text-sm leading-5 md:leading-6 w-11/12">
                <div className="flex mb-[2px]">
                  <div className="md:text-2xl text-base">&#x2022;&nbsp;</div>
                  <div>
                    <p>{t("early_access")}</p>
                  </div>
                </div>
                <div className="flex mb-[2px]">
                  <div className="md:text-2xl text-base">&#x2022;&nbsp;</div>
                  <div>
                    <p>{t("yield_boosting")}</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="md:text-2xl text-base">&#x2022;&nbsp;</div>
                  <div>
                    <p>{t("airdrop")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-60">
              <p className="font-semibold text-xl leading-6 md:text-center md:w-5/6 md:mx-auto md:mt-0 mt-9 w-44 md:mr-auto ml-auto mr-7 text-right">
                {t("ocean_invariant")}
              </p>
              <div className="">
                <div className="flex md:h-[200px] h-[100px] items-center md:ml-auto md:mr-auto ml-7 md:mb-0 mb-12">
                  <img
                    src="/pass-nft/bg_02.png"
                    width={54}
                    height={72}
                    className="h-[72px] w-14 opacity-30 mt-auto md:mb-[45px] mb-0 rotate-[-2deg] relative left-3"
                  />
                  <img
                    src="/pass-nft/bg_02.png"
                    width={106}
                    height={141}
                    className="w-[106px] h-[141px]"
                  />
                  <img
                    src="/pass-nft/bg_02.png"
                    width={83}
                    height={111}
                    className="rotate-[-29deg] max-w-[83px] max-h-[111px] relative right-6 mt-10 opacity-80"
                  />
                </div>
                <div className="font-normal md:text-base md:leading-6 text-sm leading-5 w-11/12">
                  <div className="flex mb-[2px]">
                    <div className="md:text-2xl text-base">&#x2022;&nbsp;</div>
                    <div>
                      <p>{t("ocean_1")}</p>
                    </div>
                  </div>
                  <div className="flex mb-[2px]">
                    <div className="md:text-2xl text-base">&#x2022;&nbsp;</div>
                    <div>
                      <p>{t("ocean_2")}</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="md:text-2xl text-base">&#x2022;&nbsp;</div>
                    <div>
                      <p>{t("ocean_3")}</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="md:text-2xl text-base">&#x2022;&nbsp;</div>
                    <div>
                      <p>{t("ocean_4")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-60">
              <p className="font-semibold text-xl leading-6 md:text-center md:w-5/6 mx-auto text-left w-[170px] md:ml-auto ml-7 md:mt-0 mt-9">
                Skyline InVariant (HyFi)
              </p>
              <div className="relative md:h-[200px] h-40 flex items-center md:justify-start justify-end">
                <img
                  src="/pass-nft/bg_03.png"
                  width={203}
                  height={162}
                  className="relative z-10 md:mr-0 mr-8"
                />
                <img
                  src="/pass-nft/bg_03.png"
                  width={203}
                  height={162}
                  className="absolute md:left-8 right-0 opacity-30 md:top-5 top-0"
                />
              </div>
              <div className="font-normal md:text-base text-sm md:leading-6 leading-5 w-11/12 md:mt-0 mt-5">
                <div className="flex mb-[2px]">
                  <div className="md:text-2xl text-base">&#x2022;&nbsp;</div>
                  <div>
                    <p>{t("sky_1")}</p>
                  </div>
                </div>
                <div className="flex mb-[2px]">
                  <div className="md:text-2xl text-base">&#x2022;&nbsp;</div>
                  <div>
                    <p>{t("sky_2")}</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="md:text-2xl text-base">&#x2022;&nbsp;</div>
                  <div>
                    <p>{t("sky_3")}</p>
                  </div>
                </div>

                <div className="flex">
                  <div className="md:text-2xl text-base">&#x2022;&nbsp;</div>
                  <div>
                    <p>{t("sky_4")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="font-normal text-sm leading-[18px] max-w-[920px] italic text-accent md:mb-[219px] mb-16 md:mt-0 mt-12 md:mx-auto">
            <p className="mb-2">{t("notice")}</p>
            <p className="mb-2">{t("note_1")}</p>
            <p>{t("note_2")}</p>
          </div>
        </div>
        <ScrollToTop />
        <div id="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;
