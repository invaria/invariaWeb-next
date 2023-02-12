import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar, ScrollToTop } from "../components/";
import Footer from "../components/Footer";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Checkbox } from "@mui/material";
import {
  useAddress,
  useMetamask,
  useNetwork,
  useWalletConnect,
} from "@thirdweb-dev/react";
import { getUser } from "../src/utils/storeFirebase";
import { ethers } from "ethers";
import {
  checkIfWalletIsConnected,
  nftAddress,
  usdcAddress,
} from "../src/utils/web3utils";
import inVariaJSON from "../src/utils/InVaria.json";
import { ButtonMailto } from "../components/icons/Link";
import axios from "axios";
import erc20ABI from "../src/utils/erc20ABI.json";

let allowedPromo =
  process.env.PRODUCTION === "true"
    ? ["djjy"]
    : ["lmg", "hello", "iblackyang", "joyce", "kenjisrealm"];

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
  const [mintNum, setMintNum] = useState(0);
  const router = useRouter();
  const headerBackground = true;
  const [tabState, setTabState] = useState("property");
  const [verify, setVerify] = useState("Accepted");
  const { t } = useTranslation("propertyInfo");
  const [checked, setChecked] = useState(false);
  const [notification, setNotification] = useState("");
  const [soldNft, setSoldNft] = useState(0);
  const [notiType, setNotiType] = useState("success");
  const [promo, setPromo] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [ethBalance, setEthBalance] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);
  const [getCoinPrice, setgetCoinPrice] = useState(0);
  const [btnState, setBtnState] = useState("Mint");
  const [usdcAllowance, setUsdcAllowance] = useState(0);

  const connectWithMetamask = useMetamask();

  const address = useAddress();
  const network = useNetwork();

  let isCorrectNetwork = true;
  let isGoerli = network[0]?.data?.chain?.name === "Goerli";
  let isMainnet = network[0]?.data?.chain?.name === "Ethereum Mainnet";
  let InsufficientFunds = +usdcBalance < +mintNum * 2000;
  let getusdcAllowance = 0;
  const decimal = 6;
  if (
    process.env.PRODUCTION === "true" &&
    network[0]?.data?.chain?.name !== "Ethereum Mainnet"
  ) {
    isCorrectNetwork = false;
  }
  if (
    process.env.PRODUCTION === "false" &&
    network[0]?.data?.chain?.name !== "Goerli"
  ) {
    isCorrectNetwork = false;
  }

  async function getdata() {
    const state = await getUser(address);
    console.log("state", state);
    setVerify(state);
  }
  useEffect(() => {
    if (address) getdata();
    let rpcUrl;
    if (process.env.PRODUCTION === "true")
      rpcUrl = `https://mainnet.infura.io/v3/${process.env.infura_key}`;
    else rpcUrl = `https://goerli.infura.io/v3/${process.env.infura_key}`;

    console.log("rpcurl", rpcUrl.slice(0, 14));

    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

    const nftContract = new ethers.Contract(nftAddress, inVariaJSON, provider);
    nftContract.Sold().then((res) => {
      setSoldNft(Number(+res.toString()));
      console.log("soldNft", res.toString());
    });
  }, [address]);

  function handleMintNum(c) {
    if (btnState == "minting") return;
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

  const updateExcel = async () => {
    let options = {
        timeZone: "Asia/Taipei",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      },
      formatter = new Intl.DateTimeFormat([], options);

    const cuurentDateTime = formatter.format(new Date());
    try {
      await axios.post("api/updateExcel", {
        address: address,
        promo: promo,
        mintNum: mintNum,
        cuurentDateTime: cuurentDateTime,
        production: process.env.PRODUCTION === "true" ? true : false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const mintNft = async () => {
    if (mintNum <= 0) return;
    if (verify !== "Accepted") return;
    if (promo?.length > 0 && !allowedPromo.includes(promo?.toLowerCase()))
      return;
    setBtnState("minting");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(nftAddress, inVariaJSON, signer);
    try {
      const mint = await nftContract.PublicMintNFT(mintNum);
      await mint.wait();
      setBtnState("minted");
      await updateExcel();
      setPromo("");
      setNotiType("success");
      setMintNum(0);
      setNotification(
        router.locale === "en"
          ? "Transaction Successful! You can check NFT in Dashboard / Wallet."
          : "交易成功！您可以到 Dashboard 或錢包查看。"
      );
    } catch (error) {
      console.log(error);
      setBtnState("mint");
      setNotification(
        router.locale === "en"
          ? "Transaction Failed! Please try again or check if any problems."
          : "交易失敗！請再試一次，或查看是否存在任何問題。"
      );
      setNotiType("fail");
    }
  };

  const checkAllowance = async () => {
    if (!address) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const usdcContract = new ethers.Contract(usdcAddress, erc20ABI, signer);
    getusdcAllowance = +ethers.utils.formatUnits(
      await usdcContract.allowance(address, nftAddress),
      decimal
    );
    setUsdcAllowance(getusdcAllowance);
  };
  const approveUsdc = async () => {
    setBtnState("approving");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const usdcContract = new ethers.Contract(usdcAddress, erc20ABI, signer);
    try {
      const approveAmount = 2000 * 1000 * Math.pow(10, decimal);
      const setApprovalForAll = await usdcContract.approve(
        nftAddress,
        approveAmount
      );
      await setApprovalForAll.wait();
      setBtnState("mint");
      checkAllowance();
    } catch (error) {
      setBtnState("approve");
      console.log(error);
    }
  };

  useEffect(() => {
    if (address == undefined) return;
    checkIfWalletIsConnected(
      address,
      setEthBalance,
      setUsdcBalance,
      setgetCoinPrice
    );
    checkAllowance();
    getdata();
  }, [address, network[0]?.data?.chain?.id]);

  console.log("usdcAllowance", usdcBalance);
  useEffect(() => {
    if (usdcAllowance == null) return;
    if (+usdcBalance < mintNum * 2000) {
      setBtnState("nofund");
    } else if (+usdcAllowance < 2000) {
      setBtnState("approve");
    } else {
      setBtnState("mint");
    }
  }, [usdcAllowance, usdcBalance, mintNum]);

  let btnAction;
  if (!address) {
    btnAction = (
      <div className="btn btn-disabled bg-invar-disabled w-full h-[48px] font-semibold text-sm text-invar-light-grey border-none normal-case rounded">
        Approve USDC
      </div>
    );
  } else if (btnState == "approve") {
    btnAction = (
      <button
        className="btn mt-0 bg-invar-dark w-full h-[48px] font-semibold text-sm text-white border-none normal-case rounded"
        onClick={() => approveUsdc()}
      >
        Approve USDC
      </button>
    );
  } else if (btnState == "approving") {
    btnAction = (
      <button className="btn loading bg-invar-dark w-full h-[48px] font-semibold text-sm text-white border-none normal-case rounded">
        Approving
      </button>
    );
  } else if (btnState == "mint") {
    btnAction = (
      <button
        className="disabled:bg-invar-grey disabled:text-invar-light-grey btn mt-0 bg-invar-dark w-full h-[48px] font-semibold text-sm text-white border-none normal-case rounded"
        onClick={() => mintNft()}
        disabled={mintNum == 0 || !checked||verify!=="Accepted"}
      >
        {`Mint (${mintNum})`}
      </button>
    );
  } else if (btnState == "minting") {
    btnAction = (
      <button className="btn loading bg-invar-dark w-full h-[48px] font-semibold text-sm text-white border-none normal-case rounded">
        Minting
      </button>
    );
  } else if (btnState == "minted") {
    btnAction = (
      <div className="w-full h-[76px] bg-invar-dark p-4 text-sm text-invar-success font-normal flex justify-between items-center rounded shadow animate-fade-in-left">
        <p>{t("homepage_pubilcsale_mintsuccess")}</p>
        <button
          className="ml-4 mr-2 h-[24px] w-[24px] min-w-max font-semibold text-sm text-white "
          onClick={() => {
            setBtnState("mint"),
              checkIfWalletIsConnected(
                address,
                setEthBalance,
                setUsdcBalance,
                setgetCoinPrice
              );
          }}
        >
          <img className="h-[24px] w-[24px]" src="/icons/ic_close.svg" alt="" />
        </button>
      </div>
    );
  } else if (btnState == "nofund") {
    btnAction = (
      <div className="btn btn-disabled bg-invar-disabled w-full h-[48px] font-semibold text-sm text-invar-light-grey border-none normal-case rounded">
        Insufficient Fund
      </div>
    );
  }
  const fixedinfo = (
    <>
      <div className=" md:mb-9 mb-[34px] lg:w-[466px] w-full md:h-[335px]">
        <img className="w-full" src="/bg/amwaj20.png" alt="" />
        <div className="md:hidden">
          <p className="font-semibold text-2xl leading-7 mt-2 mb-3">
            {t("property_detail_title")}
          </p>
          <p className="font-semibold text-base leading-5">
            {t("property_detail_title_desc")}
          </p>
        </div>
      </div>
      <div className="flex justify-between md:mt-6">
        <p className="font-normal md:text-base text-sm md:leading-6 leading-5">
          {t("asset_type")}
        </p>
        <p className="font-semibold md:text-xl md:leading-6 text-lg leading-5">
          {t("real_estate")}
        </p>
      </div>
      <div className="flex justify-between mt-6">
        <p className="font-normal md:text-base text-sm md:leading-6 leading-5">
          {t("est_apr")}
        </p>
        <p className="font-semibold md:text-xl md:leading-6 text-lg leading-5">
          12.00%
        </p>
      </div>
      <p className="font-normal md:text-base text-sm md:leading-6 leading-5 mt-6">
        {t("token_val")}
      </p>
      <div className="border relative border-white bg-[#37293E] h-8 rounded flex justify-end">
        <div
          className="bg-invar-success h-[30px] w-[73px] rounded absolute top-0 left-0"
          style={{
            width: `${100 - ((20000000 - soldNft * 2000) / 20000000) * 100}%`,
          }}
        ></div>
        <p className="font-normal text-sm leading-5 text-white mt-[6px] mr-1.5 relative z-10">
          ${(20000000 - soldNft * 2000).toLocaleString()} / $20,000,000
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
        <div className="md:pt-[152px] pt-[90px] px-4 max-w-[1010px] mx-auto relative">
          <div className="flex w-full md:justify-between md:flex-row flex-col">
            <div className="md:max-w-[466px]">{fixedinfo}</div>
            <div
              className={`lg:min-w-[466px] max-w-[466px] ${
                isCorrectNetwork
                  ? "md:max-h-[530px] md:h-[530px]"
                  : "md:max-h-[486px] md:h-[486px]"
              } bg-[#37293E] mt-6 md:mt-12 lg:ml-0 md:ml-2 md:min-w-[340px]`}
            >
              <div
                className={`${
                  verify !== "Accepted" ? "h-14" : "h-2"
                } md:h-14 w-full md:mb-2.5 mb-[14px]`}
              >
                {verify !== "Accepted" && address && (
                  <div className="w-full h-[56px] bg-invar-dark flex justify-between items-center">
                    <p className=" text-invar-error font-normal text-sm ml-6">
                      {t("complete_verify")}
                    </p>
                    <Link
                      href={{
                        pathname: "/dashboard",
                        query: { kyc: true },
                      }}
                    >
                      <button className=" w-[72px] h-[32px] btn btn-sm btn-outline bg-transparent text-white border-white mr-3 rounded normal-case my-3">
                        {t("Verify")}
                      </button>
                    </Link>
                  </div>
                )}
              </div>

              {process.env.PRODUCTION === "true" &&
                network[0]?.data?.chain?.name !== "Ethereum Mainnet" &&
                address && (
                  <>
                    <p className="font-normal text-base leading-6 text-center text-white mt-28 mb-12">
                      {t("network_error_title")}
                      <br /> {t("network_error_note")}
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
                              <p>
                                {t("notice_6")} <ButtonMailto />.
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                      {!expanded && (
                        <p
                          className="font-semibold mt-1.5 cursor-pointer"
                          onClick={() => setExpanded(true)}
                        >
                          Read More 
                        </p>
                      )}
                    </div>
                  </>
                )}

              {process.env.PRODUCTION === "false" &&
                network[0]?.data?.chain?.name !== "Goerli" &&
                address && (
                  <>
                    <p className="font-normal text-base leading-6 text-center text-white mt-28 mb-12">
                      Wrong Network!
                      <br /> Please Switch to Goerli Network
                    </p>
                    <div className="font-normal text-xs leading-4 text-invar-light-grey max-w-[327px] mx-auto">
                      <p className="mb-1.5">{t("mint_notice")} </p>
                      <div className="flex mb-[2px]">
                        <div>1.&nbsp;</div>
                        <div>
                          <p>{t("notice_1_goerli")}</p>
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
                              <p>
                                {t("notice_6")} <ButtonMailto />.
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                      {!expanded && (
                        <p
                          className="font-semibold mt-1.5 cursor-pointer"
                          onClick={() => setExpanded(true)}
                        >
                          Read More 
                        </p>
                      )}
                    </div>
                  </>
                )}
              <div className="lg:px-[70px] lg:pb-11 md:px-8 md:pb-8 px-[11px] pb-[36px]">
                {(isCorrectNetwork || !address) && (
                  <>
                    {" "}
                    <div className="flex justify-between mb-3">
                      <p className="font-normal text-sm leading-5 text-accent">
                        {t("mint_price")}
                      </p>
                      <p className="font-semibold text-base leading-5">
                        {t("usdc_each", { V: "2,000" })}
                      </p>
                    </div>
                    <div className="flex justify-between mb-3">
                      <p className="font-normal text-sm leading-5 text-accent">
                        {t("mint_time")}
                      </p>
                      <p className="font-semibold text-base leading-5">
                        October 17, 2022 ~
                      </p>
                    </div>
                  </>
                )}
                {address && isCorrectNetwork && (
                  <div>
                    <p className="font-normal text-sm leading-5 text-invar-light-grey mb-1 ">
                      {t("fill_number")}
                    </p>

                    <>
                      <div className="relative ">
                        <input
                          type="number"
                          onChange={(e) => handleMintNum(e.target.value)}
                          value={mintNum}
                          min="0"
                          required
                          className="appearance-none block mt-1 px-3 h-[48px] bg-invar-main-purple w-full font-semibold text-2xl text-white rounded focus:border border-white text-center"
                        />
                        {mintNum < 1 ? (
                          <button className=" w-6 absolute inset-y-0 left-[14px] flex items-center text-white">
                            <img
                              className=" w-6 "
                              src="/icons/ic_minus_disabled.svg"
                              alt=""
                            />
                          </button>
                        ) : (
                          <button
                            className=" w-6 cursor-pointer absolute inset-y-0 left-[14px] flex items-center text-white"
                            onClick={() => handleMintNum("-")}
                          >
                            <img
                              className=" w-6 "
                              src="/icons/ic_minus.svg"
                              alt=""
                            />
                          </button>
                        )}
                        <button
                          className=" w-6 cursor-pointer absolute inset-y-0 right-[14px] flex items-center text-white"
                          onClick={() => handleMintNum("+")}
                        >
                          <img
                            className=" w-6 "
                            src="/icons/ic_plus.svg"
                            alt=""
                          />
                        </button>
                      </div>
                      <div className="flex justify-between mb-3 mt-4">
                        <p className="font-normal text-sm leading-5  text-accent">
                          {t("amount")}
                        </p>
                        <p className="font-semibold text-base leading-5">
                          {(mintNum * 2000)
                            .toString()
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                          USDC
                        </p>
                      </div>
                      <div className="mb-3">
                        <p className=" mt-3 text-sm font-normal text-invar-light-grey ">
                          {t("homepage_promo_fillamount")}
                        </p>

                        <input
                          name="kolQRcode"
                          type="text"
                          value={promo}
                          onChange={(e) => {
                            if (e.target.value.slice(-1) === " ") return;
                            setPromo(e.target.value);
                          }}
                          required
                          className="appearance-none block mt-1 px-3 h-[48px] bg-invar-main-purple w-full font-semibold text-base text-white rounded focus:border border-white text-center"
                        />
                        {!allowedPromo.includes(promo?.toLowerCase()) &&
                          promo.length > 2 && (
                            <p className=" mt-1 text-sm font-normal text-invar-error ">
                              {t("promo_invalid")}
                            </p>
                          )}
                      </div>
                      <div className="flex mb-3 items-center">
                        <Checkbox
                          size="small"
                          value={checked}
                          onChange={(e) => setChecked((v) => !v)}
                          disableFocusRipple
                          sx={{
                            color: checked ? "#00deae" : "#B4B7C0",
                            "&.Mui-checked": {
                              color: checked ? "#00deae" : "#B4B7C0",
                            },
                            "&.MuiCheckbox-root": {
                              paddingLeft: "0px",
                            },
                          }}
                        />
                        <p className="text-accent font-normal text-xs leading-[18px]">
                          {t("have_read")}
                          <Link href={"/terms"}>
                            <span className="underline cursor-pointer">
                              {t("terms")}
                            </span>
                          </Link>
                          {router.locale==="tw"&&"、"}
                          <Link href="/privacy">
                            <span className="underline cursor-pointer">
                              {t("privacy")}
                            </span>
                          </Link>
                          {router.locale==="tw"?"。":"."}
                        </p>
                      </div>

                      {!notification && <>{btnAction}</>}

                      {notification && (
                        <div className="w-full h-[74px] bg-invar-dark rounded relative p-4">
                          <p
                            className={`w-5/6 ${
                              notiType === "success"
                                ? "text-invar-success"
                                : "text-invar-error"
                            } text-normal text-sm leading-5`}
                          >
                            {notification}
                          </p>
                          <img
                            src="/icons/ic_close.svg"
                            width={20}
                            height={20}
                            className="absolute top-7 right-6"
                            onClick={() => setNotification("")}
                          />
                        </div>
                      )}

                      <p
                        className={`font-normal text-sm leading-5 text-accent mb-3 mt-1 ${
                          notification && "mt-3"
                        }`}
                      >
                        {t("buy_tokens")}
                      </p>

                      <div className="flex justify-between">
                        <a
                          href="https://app.uniswap.org/#/swap"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <div className="flex items-center">
                            <img
                              src="/icons/ic_uniswap.png"
                              width={24}
                              height={24}
                            />
                            <p className="font-semibold text-xs leading-4 ml-2">
                              Uniswap
                            </p>
                          </div>
                        </a>
                        <a
                          href="https://app.1inch.io/#/1/unified/swap/ETH/DAI"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <div className="flex items-center">
                            <img
                              src="/icons/ic_1inch.png"
                              width={24}
                              height={24}
                            />
                            <p className="font-semibold text-xs leading-4 ml-2">
                              1inch
                            </p>
                          </div>
                        </a>
                        <a
                          href="https://app.thevoyager.io/swap"
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <div className="flex items-center">
                            <img
                              src="/icons/ic_voyager.png"
                              width={24}
                              height={24}
                            />
                            <p className="font-semibold text-xs leading-4 ml-2">
                              Voyager
                            </p>
                          </div>
                        </a>
                      </div>
                    </>
                  </div>
                )}
                {!address && (
                  <button
                    onClick={connectWithMetamask}
                    className="mt-[195px] btn mb-[18px] bg-invar-dark w-full h-[52px] font-semibold text-sm text-white border-none normal-case rounded"
                  >
                    {t("connect_wallet")}
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className=" w-full md:w-1/2 md:max-w-1/2">
            {/* <div className="block md:hidden md:mx-3">{fixedinfo}</div> */}
          </div>
          <div className=" w-full mt-9">
            <p className=" font-semibold text-[32px] leading-[38px] md:block hidden">
              {" "}
              {t("property_detail_title")}
            </p>
            <p className=" mt-3 font-semibold text-xl leading-6 mb-[38px] md:block hidden">
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
                <div className="flex md:flex-row flex-col">
                  <div className=" py-6 z-20 relative md:w-1/2 font-normal md:text-base text-sm md:leading-6 leading-5 md:pr-[23px]">
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
                  <div className="md:w-1/2 md:pl-[23px] md:border-none border-t border-invar-main-purple">
                    <p className=" mt-6 text-xl font-semibold leading-6 mb-[22px]">
                      {t("property_details_info_financial")}
                    </p>
                    <div className="border-b border-invar-main-purple">
                      <div className="flex md:flex-row flex-col">
                        <div className=" font-normal mb-6 md:w-1/2">
                          <p className=" text-invar-light-grey text-xs mb-[2px]">
                            {t("property_details_info_mv")}
                          </p>
                          <p className=" text-white text-base">
                            $38,000,000 USD
                          </p>
                        </div>
                        <div className=" font-normal mb-6">
                          <p className=" text-invar-light-grey text-xs mb-[2px]">
                            {t("property_details_info_tv")}
                          </p>
                          <p className=" text-white text-base">
                            $20,000,000 USD
                          </p>
                        </div>
                      </div>

                      <div className="flex md:flex-row flex-col">
                        <div className=" font-normal mb-6 md:w-1/2">
                          <p className=" text-invar-light-grey text-xs mb-[2px]">
                            {t("property_details_info_ri")}
                          </p>
                          <p className=" text-white text-base">
                            $2,500,000 USD
                          </p>
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
                    </div>
                    <p className=" mt-6 text-xl font-semibold ">
                      {t("property_details_info_specialfeatures")}
                    </p>
                    <div className="grow my-[22px] border-b border-invar-main-purple">
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
                          {t(
                            "property_details_info_specialfeatures_defensivedesc"
                          )}
                        </p>
                      </div>
                      <div className=" font-normal mb-6 ">
                        <p className=" text-invar-light-grey text-xs mb-[2px]">
                          {t(
                            "property_details_info_specialfeatures_solidmarket"
                          )}
                        </p>
                        <p className=" text-white text-base">
                          {t(
                            "property_details_info_specialfeatures_solidmarketdesc"
                          )}
                        </p>
                      </div>
                    </div>
                    <p className=" mt-6 text-xl font-semibold mb-[22px]">
                      {t("property_details_info_others")}
                    </p>
                    <div className=" md:border-b border-invar-main-purple">
                      <div className=" font-normal mb-6">
                        <p className=" text-invar-light-grey text-xs mb-[2px]">
                          {t("property_details_info_others_developer")}
                        </p>
                        <p className=" text-white text-base">
                          {t(
                            "property_details_info_others_developer_mannaigroup"
                          )}
                        </p>
                      </div>
                      <div className=" font-normal md:mb-6">
                        <p className=" text-invar-light-grey text-xs mb-[2px]">
                          {t("property_details_info_others_manager")}
                        </p>
                        <p className=" text-white text-base">
                          {t("property_details_info_others_manager_flowbay")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
            {tabState == "about" && (
              <>
                <div className="mt-6 flex justify-between ">
                  <div className="md:mr-2 md:max-w-[466px] md:w-[466px]">
                    <h2 className="font-semibold text-xl leading-6 mb-6">
                      {t("best_market")}
                    </h2>
                    <img
                      className=" mt-6 w-full mb-[22px]"
                      src="/bg/bahrain_map.png"
                      alt=""
                      width={468}
                      height={448}
                    />
                    <div className="md:ml-2 font-normal  md:text-base text-sm leading-6 md:max-w-[466px] md:hidden">
                      <p className="mb-5">{t("name_means")}</p>
                      <p className="mb-5">{t("established")}</p>
                      <p className="mb-5">{t("home_to")}</p>
                      <p className="mb-12">{t("attractive_reg")}</p>
                    </div>
                    <img
                      className="w-full"
                      src="/bg/bahrain.png"
                      alt=""
                      width={468}
                      height={197}
                    />
                  </div>
                  <div className="md:ml-2 font-normal text-base leading-6 md:max-w-[466px] md:block hidden">
                    <p className="mb-8">{t("name_means")}</p>
                    <p className="mb-8">{t("established")}</p>
                    <p className="mb-8">{t("home_to")}</p>
                    <p className="mb-8">{t("attractive_reg")}</p>
                  </div>
                </div>
                <div className="flex mt-6 md:flex-row flex-col">
                  <div className=" w-full flex justify-start items-center">
                    <img
                      className="md:w-[32px] w-6 md:h-[32px] h-6"
                      src="/icons/ic_market.svg"
                      alt=""
                    />
                    <div className=" md:ml-9 ml-6 text-base font-normal text-white">
                      <p className=" text-invar-light-grey font-normal text-xs">
                        {t("property_bahrain_info_market")}
                      </p>
                      <span className=" md:text-2xl text-lg leading-6 md:font-semibold font-normal">
                        {t("property_bahrain_info_marketdesc1")}
                      </span>
                      {t("property_bahrain_info_marketdesc2")}
                      <span className="md:text-2xl text-lg leading-6 md:font-semibold font-normal">
                        {" "}
                        {t("property_bahrain_info_marketdesc3")}
                      </span>
                      {t("property_bahrain_info_marketdesc4")}
                    </div>
                  </div>
                  <div className=" w-full flex md:justify-center justify-start md:my-0 my-6 items-center">
                    <img
                      className="md:w-[32px] w-6 md:h-[32px] h-6"
                      src="/icons/ic_workforce.svg"
                      alt=""
                    />
                    <div className=" md:ml-9 ml-6 text-base font-normal text-white">
                      <p className=" text-invar-light-grey font-normal text-xs">
                        {t("property_bahrain_info_workfoece")}
                      </p>
                      <span className=" md:text-2xl font-normal text-lg leading-6  md:font-semibold">
                        {t("property_bahrain_info_workfoec_edesc1")}{" "}
                      </span>
                      {t("property_bahrain_info_workfoec_edesc2")}
                    </div>
                  </div>
                  <div className=" w-full flex justify-start items-center">
                    <img
                      className="md:w-[32px] w-6 md:h-[32px] h-6"
                      src="/icons/ic_tourist.svg"
                      alt=""
                    />
                    <div className=" md:ml-9 ml-6 text-base font-normal text-white">
                      <p className=" text-invar-light-grey font-normal text-xs">
                        {t("property_bahrain_info_tourist")}
                      </p>
                      <span className=" md:text-2xl md:font-semibold font-normal text-lg leading-6">
                        {t("property_bahrain_info_touristdesc1")}
                      </span>
                      {t("property_bahrain_info_touristdesc2")}
                    </div>
                  </div>
                </div>
              </>
            )}
            <p className=" italic text-invar-light-grey md:mb-11 mb-6 md:mt-9 mt-6 md:border-none border-t border-primary md:pt-0 pt-6 font-normal text-sm leading-[18px]">
              {t("property_details_info_notice1")} <br /> <br />
              {t("property_details_info_notice2")}
              <br /> <br />
              {t("property_details_info_notice3")}
            </p>

            <div className="flex md:justify-between mb-[252px] md:flex-row flex-col ">
              <div
                className="relative w-full md:mr-2 md:max-w-[466px] md:h-[72px] h-16 rounded py-4 md:px-6 px-4 bg-invar-main-purple hover:bg-[#37293E]
        flex justify-between items-cente md:mb-0 mb-3"
              >
                <div className=" text-white font-semibold md:text-base text-sm leading-4 md:mb-0 mb-0.5">
                  {t("property_detail_link1_title")}
                  <p className=" md:text-sm text-xs font-normal text-invar-light-grey md:whitespace-normal whitespace-nowrap">
                    {t("property_detail_link1_title_desc")}
                  </p>
                </div>
                <img
                  src="/icons/upright.svg"
                  alt=""
                  className="md:flex absolute top-5 right-6"
                />
              </div>
              <a
                className="w-full md:ml-2  md:max-w-[466px] md:h-[72px] h-12 rounded py-4 px-6 bg-invar-main-purple hover:bg-[#37293E]
        flex justify-between items-center"
                href={
                  router.locale === "tw"
                    ? "https://drive.google.com/file/d/1D_Xm5j1jomkQ5POY8qzyPNStZYvmUaQo/view?usp=sharing"
                    : "https://drive.google.com/file/d/1Du_EQY_-EO56UPgc-4JXuRRHWZmsEQP_/view?usp=sharing"
                }
                rel="noreferrer"
                target="_blank"
              >
                <div className=" text-white font-semibold md:text-base text-sm ">
                  {t("property_detail_link2_title")}
                </div>
                <img src="/icons/upright.svg" alt="" />
              </a>
            </div>
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
