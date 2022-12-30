import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  useNetwork,
  useAddress,
  useMetamask,
  useWalletConnect,
  useDisconnect,
  ChainId,
} from "@thirdweb-dev/react";
import ModalStory from './ModalStory'
import ModalWallet from "./ModalWallet";
import ModalProperty from './ModalProperty'
import ModalPremint from './ModalPremint'
import Modalappplywhite from './Modalappplywhite'
import { shortenAddress } from "../src/utils/shortenAddress";
import { disableScroll, enableScroll } from "../src/utils/disableScroll";

import { getUser } from "../src/utils/storeFirebase";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ClickAwayListener,
  MenuItem,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { checkIfWalletIsConnected } from "../src/utils/web3utils";
import { useContext } from "react";
import { MusicContext } from "../context/music-context";
import MobileWalletConnect from "./MobileWalletConnect";

const menuStyles = {
  paddingY: "16px",
  fontFamily: "inherit",
  fontWeight: "600",
  fontSize: "16px",
  lineHeight: "20px",
  width: "100%",
};
let pervState = [];

const Navbar = ({ headerBackground, SFTDemo }) => {
  const router = useRouter();
  const address = useAddress();
  const network = useNetwork();
  const [, switchNetwork] = useNetwork();
  const isGoerli = network[0]?.data?.chain?.name == "Goerli";

  const disconnectWallet = useDisconnect();

  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleWallet, setToggleWallet] = useState(false);
  const [getCoinPrice, setgetCoinPrice] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);
  const [verify, setVerify] = useState(false);

  const musicCTX = useContext(MusicContext);
  async function getdata() {
    const state = await getUser(address);
    console.log("ver state", state);
    setVerify(state);
  }

  // useEffect(() => {
  //   // if (typeof window !== "undefined") {
  //   if (!address) return;
  //   setToggleWallet(false);
  //   // enableScroll();
  //   getdata();

  //   // }
  //   return () => enableScroll();
  // }, [address]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 當scroll時，不知為何network == undefined
      if (network[0].data.chain == undefined) {
        return;
      } else if (
        pervState[0] == network[0].data.chain.name &&
        pervState[1] == address
      ) {
        return;
      } else {
        pervState[0] = network[0].data.chain.name;
        pervState[1] = address;
        console.log(network[0].data.chain.name, pervState, ethBalance);
        checkIfWalletIsConnected(
          address,
          setEthBalance,
          setUsdcBalance,
          setgetCoinPrice
        );
      }
    }
  }, [address, network]);

  useEffect(() => {
    console.log("ethBalance", ethBalance, address);
    if (!address) return;
    checkIfWalletIsConnected(
      address,
      setEthBalance,
      setUsdcBalance,
      setgetCoinPrice
    );
  }, []);

  const [openLangMenu, setOpenLangMenu] = useState(false);

  const toggleDrawerHandler = () => {
    setToggleMenu((s) => !s);
    // enableScroll();
  };

  const { t } = useTranslation("common");

  useEffect(()  => {
    if(toggleMenu) document.body.style.position="fixed";

    return () => {
      document.body.style.position="relative";
    };
},[toggleMenu]);
  return (
    <>
      <nav
        className={`fixed flex items-center justify-between w-full h-[3.75rem] bg-invar-dark md:h-[5rem] z-50
        ${headerBackground ? "md:bg-invar-dark" : "md:bg-transparent"}`}
      >
        <ModalWallet SFTDemo={SFTDemo} />
        <ModalStory />
        <ModalProperty />
        <ModalPremint />
        <Modalappplywhite />

        <div className="navbar w-full sticky top-0 left-0 right-0 bg-[#fff0] md:justify-center items-center h-[60px] md:h-[88px] flex">
          <div className="navbar-start flex">
            <button
              onClick={() => musicCTX.setIsMusicOn((v) => !v)}
              className="absolute top-[24px] left-[16px] md:hidden"
            >
              <img
                className="h-[20px] w-[20px]"
                src={
                  musicCTX.isMusicOn ? "/icons/ic_music.svg" : "/icons/ic_music_off.svg"
                }
                alt=""
              />
            </button>
            <ul className="list-none md:flex hidden ml-10 text-[#B4B7C0]">
              <li>
                <label
                  htmlFor="my-modal-1"
                  className=" modal-button hover:underline font-semibold text-base cursor-pointer"
                >
                  Storyline
                </label>
              </li>
              {/* <ScrollLink
                activeClass="active"
                offset={-100}
                smooth
                spy
                to="mindmap"
              > */}
              <Link href="invaria2222#mindmapoutside">
                <li className="mx-8 hover:underline font-semibold text-base cursor-pointer">
                  Mindmap
                </li>
              </Link>
              {/* </ScrollLink> */}
              <Link href="/media">
                <li className="hover:underline font-semibold text-base cursor-pointer">
                  News
                </li>
              </Link>
            </ul>
          </div>
          <div className="navbar-center">
            <Link href="invaria2222">
              <img
                className="m-6 h-[2.5rem] w-24 xl:w-32 cursor-pointer"
                src="/logo_white.svg"
              />
            </Link>
          </div>
          <div className="navbar-end md:hidden">
            {!toggleMenu && (
              <button
                className=" absolute top-[24px] right-[16px]"
                onClick={() => {
                  setToggleMenu(true);
                  // disableScroll();
                }}
              >
                <img
                  className="h-[20px] w-[20px]"
                  src="/icons/ic_menu.svg"
                  alt=""
                />
              </button>
            )}
            {toggleMenu && (
              <button
                className=" absolute top-[24px] right-[16px]"
                onClick={() => {
                  setToggleMenu(false);
                  setToggleWallet(false);
                  // enableScroll();
                }}
              >
                <img
                  className="h-[20px] w-[20px]"
                  src="/icons/ic_close.svg"
                  alt=""
                />
              </button>
            )}
          </div>
          <div className="navbar-end hidden md:flex flex-row">
            {!address ? (
              <label
                htmlFor="my-modal-3"
                className="btn btn-sm modal-button btn-outline rounded h-[40px] w-[130px] px-[11px] py-[1px] m-[12px] font-semibold text-sm text-white border-[#44334C] normal-case hover:border-none hover:bg-primary "
              >
                {t("connect_wallet")}
              </label>
            ) : (
              <>
                <Link href="/dashboard">
                  <button className="btn btn-sm modal-button btn-outline rounded h-[40px] w-[130px] px-[11px] py-[1px] my-[12px] font-semibold text-sm text-white border-[#44334C] normal-case hover:border-none hover:bg-primary ">
                    Dashboard
                    {verify == "Unverified" && (
                      <img
                        src="/icons/ic_warning.svg"
                        className="ml-1"
                        alt=""
                      />
                    )}
                  </button>
                </Link>
                <label
                  htmlFor="my-modal-4"
                  className="btn btn-sm modal-button btn-outline rounded h-[40px] w-[130px] px-[11px] py-[1px] m-[12px] font-semibold text-sm text-white border-[#44334C] normal-case hover:border-none hover:bg-primary "
                >
                  {shortenAddress(address)}
                </label>
              </>
            )}
            <div className="relative">
              <button
                onClick={() => setOpenLangMenu((v) => !v)}
                className="btn btn-sm btn-outline rounded h-[40px] w-[40px] my-[24px] mr-[12px] px-[4px] py-[4px] font-semibold text-sm text-white border-[#44334C] normal-case hover:border-none hover:bg-primary "
              >
                <img
                  className="h-[20px] w-[20px]"
                  src="/icons/ic_language.svg"
                  alt=""
                />
              </button>

              {openLangMenu && (
                <ClickAwayListener onClickAway={() => setOpenLangMenu(false)}>
                  <div
                    style={{
                      background:
                        "linear-gradient(180deg, #44334C 0%, #1E1722 100%)",
                    }}
                    className="absolute w-36 h-[85px] right-[12px] top-[75px] flex flex-col justify-center rounded"
                  >
                    <MenuItem
                      onClick={() => {
                        setOpenLangMenu(false);
                      }}
                      sx={{
                        color: router.locale === "en" ? "white" : "#8F97A3",
                        fontWeight: router.locale === "en" ? "600" : "400",
                        "& a": {
                          width: "100%"
                        }
                      }}
                    >
                      <Link href={router.pathname} locale="en">
                        English
                      </Link>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setOpenLangMenu(false);
                      }}
                      sx={{
                        color: router.locale === "tw" ? "white" : "#8F97A3",
                        fontWeight: router.locale === "tw" ? "600" : "400",
                        "& a": {
                          width: "100%"
                        }
                      }}
                    >
                      <Link href={router.pathname} locale="tw">
                        繁體中文
                      </Link>
                    </MenuItem>
                  </div>
                </ClickAwayListener>
              )}
            </div>
            <button
              onClick={() => musicCTX.setIsMusicOn((v) => !v)}
              className="btn btn-sm btn-outline rounded h-[40px] w-[40px] my-[24px] mr-[24px] px-[4px] py-[4px] font-semibold text-sm text-white border-[#44334C] normal-case hover:border-none hover:bg-primary "
            >
              <img
                className="h-[20px] w-[20px]"
                src={
                  musicCTX.isMusicOn ? "/icons/ic_music.svg" : "/icons/ic_music_off.svg"
                }
                alt=""
              />
            </button>
          </div>
        </div>
      </nav>
      {toggleMenu && (
        <div
          style={{ zIndex: "25" }}
          className=" fixed top-[60px] w-full h-screen pt-[18px]  flex flex-col justify-start items-start md:hidden text-white bg-gradient-to-b from-primary to-[#1E1722] overflow-scroll pb-16"
        >
          <label htmlFor="my-modal-1" className="w-full">
            <MenuItem sx={menuStyles}>Storyline</MenuItem>
          </label>
          <Link href="invaria2222#mindmapoutside">
            <MenuItem sx={menuStyles} onClick={toggleDrawerHandler}>
              Mindmap
            </MenuItem>
          </Link>
          <Link href="/media">
            <MenuItem sx={menuStyles}>News</MenuItem>
          </Link>
          <label htmlFor="property-modal" className="w-full">
            <MenuItem sx={menuStyles}>{t("property_infos")}</MenuItem>
          </label>

          <label htmlFor="premint-modal" className="w-full">
            <MenuItem sx={{ ...menuStyles, color: "#00DEAE" }}>{t("public_sale")}</MenuItem>
          </label>
          <Link href={'/sftdemo'} className="w-full h-full text-[#FFC25F]">
            <MenuItem sx={{ ...menuStyles, color: "#FFC25F" }}> SFT Demo</MenuItem></Link>
          <Accordion
            sx={{
              backgroundColor: "transparent",
              color: "white",
              width: "100%",
            }}
            elevation={0}
          >
            <AccordionSummary>
              <Typography sx={{ fontWeight: "600" }}> {t("language")}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <MenuItem sx={menuStyles} onClick={toggleDrawerHandler}>
                  <Link href={router.pathname} locale="en">
                    English
                  </Link>
                </MenuItem>
                <MenuItem sx={menuStyles} onClick={toggleDrawerHandler}>
                  <Link href={router.pathname} locale="tw">
                    繁體中文
                  </Link>
                </MenuItem>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Link href="/dashboard">
            <MenuItem sx={menuStyles} onClick={toggleDrawerHandler}>
              Dashboard
            </MenuItem>
          </Link>
          <div className="px-4 w-full mt-4">
            {!address && (
              <button
                className="btn btn-primary w-full h-[48px] font-semibold text-base bg-invar-main-purple rounded text-center normal-case	text-white"
                onClick={() => setToggleWallet(true)}
              >
                {t("connect_wallet")}
              </button>
            )}
            {address && (
              <>
                <div className="w-full flex flex-row justify-between items-end">
                  <h3 className="text-base font-semibold text-white py-[16px]">
                    My Wallet
                  </h3>
                  <h3 className="text-sm font-semibold text-white text-end">
                    {shortenAddress(address)}
                  </h3>
                </div>
                <div className=" border-b border-primary mt-3 w-[324px]"></div>
                <div className=" w-full mt-[14px] flex justify-between items-center ">
                  <div className=" flex justify-center items-center text-white font-semibold">
                    <img
                      className="h-[32px] w-[32px] mr-[12px]"
                      src="/icons/ic_eth.png"
                      alt=""
                    />
                    <p>ETH</p>
                  </div>
                  {ethBalance && (
                    <div className=" flex flex-col justify-center items-end text-white font-semibold">
                      <p>{ethBalance}</p>
                      <p className=" text-sm font-normal text-neutral">
                        ${(ethBalance * getCoinPrice?.ethereum?.usd).toFixed(3)}{" "}
                        USD
                      </p>
                    </div>
                  )}
                </div>
                <div className=" w-full mt-[14px] flex justify-between items-center ">
                  <div className=" flex justify-center items-center text-white font-semibold">
                    <img
                      className="h-[32px] w-[32px] mr-[12px]"
                      src="/icons/ic_usdc.png"
                      alt=""
                    />
                    <p>USDC</p>
                  </div>
                  <div className=" flex flex-col justify-center items-end text-white font-semibold">
                    {usdcBalance && <p className=" text-base">{usdcBalance}</p>}
                    {getCoinPrice && (
                      <p className=" text-sm font-normal text-neutral">
                        $
                        {(usdcBalance * getCoinPrice["usd-coin"].usd).toFixed(
                          3
                        )}{" "}
                        USD
                      </p>
                    )}
                  </div>
                </div>

                {!isGoerli && address && < button
                  className="btn bg-invar-error relative w-full h-[56px] mt-5 rounded flex justify-center items-center border-none normal-case"
                  onClick={() => switchNetwork(ChainId.Goerli)}
                >
                  <p className=" font-semibold text-white">
                  {t("click_switch")}
                  </p>
                </button>}

                <button
                  className="btn btn-primary relative w-full h-[56px] mt-[14px] rounded flex justify-center items-center border-none normal-case"
                  onClick={disconnectWallet}
                >
                  <p className=" font-semibold text-white">
                    {" "}
                    {t("disconnect")}
                  </p>
                </button>
              </>
            )}
          </div>
        </div>
      )
      }
      {
        toggleMenu && toggleWallet && !address && (
          <>
            <MobileWalletConnect setToggleWallet={(e) => setToggleWallet(e)} />
          </>
        )
      }
    </>
  );
};

export default Navbar;
