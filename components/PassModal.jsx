import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { ethers } from "ethers";
import {
  useMetamask,
  useNetwork,
  useAddress,
  ChainId,
} from "@thirdweb-dev/react";
import { shortenAddress } from "../src/utils/shortenAddress";
import passJSON from "../src/utils/passABI.json";
import { passAddress } from "../src/utils/web3utils";
import {
  checkIfWalletIsConnected,
  addTokenFunction,
} from "../src/utils/web3utils";
import { ButtonMailto } from "../components/icons/Link";
import { useTranslation } from "next-i18next";
import axios from "axios";
import { ModalContext } from "../context/Modals-context";
import { Checkbox, Dialog } from "@mui/material";
import Image from "next/image";
import passWalletsList from "../src/utils/passWalletsList";
import { useRouter } from "next/router";

const PassModal = () => {
  const connectWithMetamask = useMetamask();
  const [ethBalance, setEthBalance] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);
  const [getCoinPrice, setgetCoinPrice] = useState(0);
  const [mintNum, setMintNum] = useState(1);
  const [readmore, setReadmore] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isFreeMintClaimed, setIsFreeMintClaimed] = useState(true);
  const [tokensAlreadyMinted, setTokensAlreadyMinted] = useState(0);
  const [notification, setNotification] = useState("");
  const [notiType, setNotiType] = useState("success");
  const [btnState, setBtnState] = useState();

  const address = useAddress();
  const network = useNetwork();
  const [, switchNetwork] = useNetwork();

  const { t } = useTranslation("sale");
  const router = useRouter();

  const modalOpen = useContext(ModalContext);

  const getProof = async () => {
    const apiResult = await axios.post("api/freemint-proof", { address:ethers.utils.getAddress(address)  });
    const treeResult = apiResult.data;
    const proof = treeResult.proof;
    const root = treeResult.root;
    console.log("root\n", root);
    console.log("proof", proof);
    return proof;
  };

  const freeminthandler = async () => {
    setBtnState("minting");
    const proof = await getProof();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    try {
      const nftContract = new ethers.Contract(
        passAddress,
        passJSON.abi,
        signer
      );
      let tx = await nftContract.freeMint(proof, { gasLimit: 700000 });
      await tx.wait();
      setBtnState("mint");
      setNotiType("success");
      setNotification(
        router.locale === "en"
          ? "Transaction Successful! You can check NFT in Dashboard / Wallet."
          : "交易成功！您可以到 Dashboard 或錢包查看。"
      );
      setIsFreeMintClaimed(true);
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

  function handleMintNum(c) {
    if (c == "+" && mintNum < 1000) {
      setMintNum(mintNum + 1);
    } else if (c == "-" && mintNum > 0) {
      setMintNum(mintNum - 1);
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

  let formatted=passWalletsList.map((item)=>ethers.utils.getAddress(item));
  let inFreeMint =address? formatted.includes(ethers.utils.getAddress(address)):false;

  let isMainnet;
  if (process.env.PRODUCTION === "true") {
    isMainnet = network[0]?.data?.chain?.id === 1;
  } else {
    isMainnet = true;
  }

  const fetchInitialData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const nftContract = new ethers.Contract(
      passAddress,
      passJSON.abi,
      provider
    );
    const tokens = await nftContract.mintRecords(address);
    console.log("tokens", tokens.freemintClaimed);
    setIsFreeMintClaimed(tokens.freemintClaimed);
    const currentTokenId = await nftContract.currentTokenId();
    console.log("tokens minted", currentTokenId.toString());
    setTokensAlreadyMinted(+currentTokenId.toString());
  };

  useEffect(() => {
    if (address) fetchInitialData();
    if (address)
      checkIfWalletIsConnected(
        address,
        setEthBalance,
        setUsdcBalance,
        setgetCoinPrice
      );
  }, [address, network[0]?.data?.chain?.id]);

  let mintClosed = new Date().getTime() > 1676851200000;
  let mintNotStarted=new Date().getTime() < 1676246400000;
  let soldOut = tokensAlreadyMinted >= 100;
  return (
    <Dialog
      sx={{
        "& .MuiDialog-container": {
          justifyContent: "right",
        },
        "& .MuiDialog-paper": {
          marginRight: { xs: "0px", sm: "24px" },
          marginTop: { xs: "0px", sm: "20px" },
          marginBottom: "auto",
          marginLeft: "0px",
          maxHeight: "100vh",
          height: {
            sm: "unset",
            xs: "100%",
          },
          background: "linear-gradient(180deg, #44334C 0%, #1E1722 100%)",
          maxWidth: {
            xs: "100%",
            sm: "375px",
          },
          width: {
            xs: "100%",
          },
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0,0,0,0.7)",
        },
      }}
      open={modalOpen.passBuyModal}
    >
      <div className="relative">
        <div className="bg-[#000000b6] text-2xl text-white bg-gradient-to-b from-primary to-[#1E1722] ">
          <div className="sm:h-full h-screen">
            <div className="px-6 pb-4">
              <div className="flex justify-between mt-[24px] mb-6">
                <h3 className="text-2xl font-semibold ">PASS: InVariant NFT</h3>
                <div
                  onClick={() => modalOpen.setPassBuyModal(false)}
                  className="bg-transparent border-none hover:bg-transparent flex items-center"
                >
                  <img
                    className="h-[20px] w-[20px]"
                    src="/icons/ic_close.svg"
                    alt=""
                  />
                </div>
              </div>
              <div className="w-full h-24 relative">
                <Image
                  src={"/bg/pass-mint-bcg.png"}
                  width={327}
                  height={96}
                  layout="fill"
                />
              </div>
              <p className=" text-sm font-normal text-invar-light-grey mt-[16px] mb-1">
                {t("homepage_pubilcsale_mywallet")}
              </p>
              {!address ? (
                <button
                  className="btn btn-primary font-semibold text-sm text-invar-light-grey w-full h-[40px] rounded border-none normal-case"
                  onClick={connectWithMetamask}
                >
                  {t("connect_wallet")}
                </button>
              ) : (
                <>
                  <div className="w-full min-h-max bg-primary h-[64px] normal-case rounded border-none mb-6">
                    <div className="text-white w-full text-center">
                      <span className="font-semibold text-base leading-5 ">
                        {shortenAddress(address)}
                      </span>

                      {inFreeMint ? (
                        <span className="font-normal text-sm leading-5 block text-invar-success">
                          {t("early_list")}
                        </span>
                      ) : (
                        <span className="font-normal text-sm leading-5 block text-invar-validation">
                          {t("not_in_list")}
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}
              <div className="mt-1 w-full p-4 bg-invar-main-purple rounded">
                <div className=" w-full flex justify-between items-center ">
                  <div className=" flex justify-center items-center text-white font-normal text-sm">
                    <img
                      className="h-[24px] w-[24px] mr-[12px]"
                      src="/icons/ic_eth.png"
                      alt=""
                    />
                    <p>ETH</p>
                  </div>
                  <span className=" flex flex-col justify-center items-end text-white font-semibold text-base">
                    <p>{ethBalance}</p>
                  </span>
                </div>
                <div className=" relative w-full mt-3 flex justify-between items-center group">
                  <div className=" flex justify-center items-center text-white font-normal text-sm">
                    <img
                      className="h-[24px] w-[24px] mr-[12px]"
                      src="/icons/ic_usdc.png"
                      alt=""
                    />
                    <p>USDC</p>
                  </div>
                  <span className=" flex flex-col justify-center items-end text-white font-semibold text-base transition-opacity group-hover:opacity-0">
                    <p>{usdcBalance}</p>
                  </span>
                  <button
                    className="btn btn-sm btn-outline border-[#E6E7EA] absolute w-[90px] h-[28px] bottom-[-2px] right-0 
                  transition-opacity opacity-0 group-hover:opacity-100 text-xs font-semibold px-3 py-[6px] rounded normal-case 
                  hover:border-[#E6E7EA] text-white hover:text-white"
                    onClick={() => addTokenFunction()}
                  >
                    {t("homepage_pubilcsale_addtoken")}
                  </button>
                </div>
              </div>
              <div className=" mt-4 mb-1 flex justify-between items-baseline">
                <p className=" text-sm font-normal text-invar-light-grey ">
                  {t("mint_stage")}
                </p>
                <p className=" text-base font-semibold text-white ">
                  {t("early_stage")}
                </p>
              </div>
              <div className=" mt-4 flex justify-between items-baseline">
                <p className=" text-sm font-normal text-invar-light-grey ">
                  {t("homepage_pubilcsale_mintprice")}
                </p>
                <p className=" text-base font-semibold text-white ">
                  {t("eth_each")}
                </p>
              </div>
              <div className=" mt-4 flex justify-between items-baseline">
                <p className=" text-sm font-normal text-invar-light-grey ">
                  {t("homepage_pubilcsale_minttime")}
                </p>
                <p className=" text-base font-semibold text-white max-w-[260px] text-end ">
                  Feb 13, 00:00 ~ 20, 00:00 UTC
                </p>
              </div>
              {address && inFreeMint && (
                <>
                  <p className=" mt-3 text-sm font-normal text-invar-light-grey ">
                    {t("mint_amount")}
                  </p>
                  <div className="relative ">
                    <input
                      type="number"
                      onChange={(e) => handleMintNum(e.target.value)}
                      value={mintNum}
                      min="0"
                      required
                      className="appearance-none block mt-1 px-3 h-[48px] bg-invar-main-purple w-full font-semibold text-2xl text-white rounded focus:border border-white text-center"
                    />
                    {
                      //mintNum < 1 ?
                      <button className=" w-6 absolute inset-y-0 left-[14px] flex items-center text-white">
                        <img
                          className=" w-6 "
                          src="/icons/ic_minus_disabled.svg"
                          alt=""
                        />
                      </button>
                      //  : (
                      //   <button
                      //     className=" w-6 cursor-pointer absolute inset-y-0 left-[14px] flex items-center text-white"
                      //     onClick={() => handleMintNum("-")}
                      //   >
                      //     <img
                      //       className=" w-6 "
                      //       src="/icons/ic_minus.svg"
                      //       alt=""
                      //     />
                      //   </button>
                      // )
                    }
                    <button
                      className=" w-6 cursor-pointer absolute inset-y-0 right-[14px] flex items-center text-white"
                      //   onClick={() => handleMintNum("+")}
                    >
                      <img
                        className=" w-6 "
                        src="/icons/ic_plus_disabled.svg"
                        alt=""
                      />
                    </button>
                  </div>
                  <div className=" mt-4 flex justify-between items-baseline">
                    <p className=" text-sm font-normal text-invar-light-grey">
                      {t("eth_amount")}
                    </p>
                    <p className=" font-semibold text-white text-base">0 ETH</p>
                  </div>
                  <div className="flex mb-3 items-center">
                    <Checkbox
                      size="small"
                      value={checked}
                      onChange={(e) => setChecked((v) => !v)}
                      disableFocusRipple
                      sx={{
                        color: checked ? "#00deae" : "#B4B7C0",
                        //backgroundColor:checked ? "#00deae" : "#B4B7C0",
                        "&.Mui-checked": {
                          color: checked ? "#00deae" : "#B4B7C0",
                          //backgroundColor:checked ? "#00deae" : "#B4B7C0"
                        },
                        "&.MuiCheckbox-root": {
                          paddingLeft: "0px",
                        },
                      }}
                    />
                    <p className="text-accent font-normal text-xs leading-[18px]">
                      {t("have_read")}
                      <Link href={"/terms"}>
                        <span
                          className="underline cursor-pointer"
                          onClick={() => modalOpen.setPassBuyModal(false)}
                        >
                          {t("terms")}
                        </span>
                      </Link>
                      {router.locale === "tw" ? "、" : " "}
                      <Link href="/privacy">
                        <span
                          className="underline cursor-pointer"
                          onClick={() => modalOpen.setPassBuyModal(false)}
                        >
                          {t("privacy")}
                        </span>
                      </Link>
                      {router.locale === "tw" ? "。" : "."}
                    </p>
                  </div>
                </>
              )}

              {!notification && (
                <>
                  {address && inFreeMint && isMainnet && (
                    <>
                      {btnState === "minting" ? (
                        <button className="btn loading bg-invar-dark w-full h-[48px] font-semibold text-sm text-white border-none normal-case rounded">
                          Minting
                        </button>
                      ) : (
                        <button
                          className="btn bg-invar-dark w-full h-[48px] font-semibold text-sm text-white disabled:bg-invar-grey disabled:text-invar-light-grey border-none normal-case rounded"
                          onClick={freeminthandler}
                          disabled={
                            !checked ||
                            isFreeMintClaimed ||
                            soldOut ||
                            mintClosed||
                            mintNotStarted
                          }
                        >
                          {`${t("mint")} (${mintNum})`}
                        </button>
                      )}
                    </>
                  )}
                  {address && inFreeMint && !isMainnet && (
                    <button
                      className="btn bg-invar-error w-full h-[48px] font-semibold text-sm text-white disabled:bg-invar-grey disabled:text-invar-light-grey border-none normal-case rounded"
                      onClick={() => switchNetwork(ChainId.Mainnet)}
                    >
                      {t("switch_eth")}
                    </button>
                  )}
                </>
              )}

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

              {address && inFreeMint && (
                <>
                  <p
                    className={`font-normal text-sm leading-5 text-accent mb-3 mt-[18px] `}
                    //${notification && "mt-3"}
                  >
                    {t("buy_tokens")}
                  </p>

                  <div className="flex justify-between mb-[66px]">
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
                        <img src="/icons/ic_1inch.png" width={24} height={24} />
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
              )}
              {!inFreeMint && (
                <div className="my-6 w-full h-[1px] border-b border-b-invar-main-purple"></div>
              )}
              {((address && !inFreeMint) || !address) && (
                <div className="md:max-w-[327px] mx-auto">
                  <ul className="list-decimal pl-3 text-xs font-normal text-invar-light-grey mb-3 mx-auto">
                    <li>{t("adopter_note_1")}</li>
                    <li>{t("adopter_note_2")}</li>
                    <li>{t("adopter_note_3")}</li>
                    {readmore && (
                      <>
                        <li>{t("adopter_note_4")}</li>
                        <li>{t("adopter_note_5")}</li>

                        <li>
                          {t("adopter_note_6")} <ButtonMailto />.
                        </li>
                      </>
                    )}
                  </ul>
                  {!readmore && (
                    <>
                      <p
                        className="my-3 text-invar-light-grey text-xs font-semibold cursor-pointer hover:underline"
                        onClick={() => setReadmore(true)}
                      >
                        Read More
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default PassModal;