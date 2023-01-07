import React, { useEffect, useState } from "react";
import {
  useMetamask,
  useWalletConnect,
  useNetwork,
  useAddress,
  useDisconnect,
  ChainId,
} from "@thirdweb-dev/react";
import { shortenAddress } from "../src/utils/shortenAddress";
import {
  checkIfWalletIsConnected,
  addTokenFunction,
} from "../src/utils/web3utils";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const ModalWallet = ({ SFTDemo }) => {
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const disconnectWallet = useDisconnect();
  const [ethBalance, setEthBalance] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);
  const address = useAddress();
  const network = useNetwork();
  const isGoerli = network[0]?.data?.chain?.name == "Goerli";
  const [, switchNetwork] = useNetwork();
  const [getCoinPrice, setgetCoinPrice] = useState();
  const { t } = useTranslation("common");
  const router=useRouter();
const path=router.pathname;
  useEffect(() => {
    if (typeof window !== "undefined" && network[0].data.chain !== undefined) {
      // // 當scroll時，不知為何network == undefined
      // if (network[0].data.chain == undefined) {
      //   return
      // } else {
      //   if (pervState[0] == network[0].data.chain.name && pervState[1] == address) return
      // }
      // pervState[0] = network[0].data.chain.name
      // pervState[1] = address
      checkIfWalletIsConnected(
        address,
        setEthBalance,
        setUsdcBalance,
        setgetCoinPrice
      );
    }
  }, [address, network]);

  return (
    <div>
      {!address ? (
        <>
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal bg-[#000000b6]">
            <div className="modal-box w-[375px] h-[230px] absolute top-[73px] right-[85px] rounded-[4px] bg-gradient-to-b from-primary to-[#1E1722] p-6">
              {/* <label htmlFor="my-modal-3" className="btn btn-sm absolute top-3 right-3 rounded-[4px] bg-opacity-0 hover:bg-opacity-0 text-[#fff] border-none">
                <img className="h-[20px] w-[20px]" src='/icons/ic_close.svg' alt="" />
              </label> */}
              <div className="flex justify-between">
                <h3 className="text-2xl font-semibold text-white mb-[22px]">
                  {t("connect_wallet")}
                </h3>
                <label
                  htmlFor="my-modal-3"
                  className="btn btn-sm pr-0 rounded-[4px] bg-opacity-0 hover:bg-opacity-0 text-[#fff] border-none"
                >
                  <img
                    className="h-[20px] w-[20px]"
                    src="/icons/ic_close.svg"
                    alt=""
                  />
                </label>
              </div>
              <button
                className="btn btn-primary relative w-[327px] h-[56px] rounded flex justify-center items-center border-none normal-case"
                onClick={connectWithMetamask}
              >
                <img
                  className="absolute top-[13px] left-4 h-[30px] w-[30px]"
                  src="/icons/ic_metamask.png"
                  alt=""
                />
                <p className=" font-semibold text-accent">MetaMask</p>
              </button>
              <button
                className="btn btn-primary mt-3 relative w-[327px] h-[56px] rounded flex justify-center items-center border-none normal-case"
                onClick={connectWithWalletConnect}
              >
                <img
                  className="absolute top-[13px] left-4 h-[30px] w-[30px]"
                  src="/icons/ic_walletconnect.png"
                  alt=""
                />
                <p className=" font-semibold text-accent">WalletConnect</p>
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <input type="checkbox" id="my-modal-4" className="modal-toggle" />
          <label
            htmlFor="my-modal-4"
            className="modal cursor-pointer bg-transparent"
          >
            <label
              className="modal-box w-[375px] absolute top-[73px] right-[85px] rounded-[4px] bg-gradient-to-b from-primary to-[#1E1722] p-6"
              htmlFor=""
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-white">My Wallet</h3>
                <h3 className="font-semibold text-white">
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
                <span className=" flex flex-col justify-center items-end text-white font-semibold">
                  <p>{ethBalance}</p>
                  <p className=" text-sm font-normal text-neutral">
                    ${(ethBalance * getCoinPrice?.ethereum?.usd).toFixed(3)} USD
                  </p>
                </span>
              </div>
              <div className=" relative w-full mt-[14px] flex justify-between items-center group">
                <div className=" flex justify-center items-center text-white font-semibold">
                  <img
                    className="h-[32px] w-[32px] mr-[12px]"
                    src="/icons/ic_usdc.png"
                    alt=""
                  />
                  <p>USDC</p>
                </div>
                <span className=" flex flex-col justify-center items-end text-white font-semibold transition-opacity group-hover:opacity-0">
                  <p className=" text-base">{usdcBalance}</p>
                  {getCoinPrice ? (
                    <p className=" text-sm font-normal text-neutral">
                      ${(usdcBalance * getCoinPrice["usd-coin"].usd).toFixed(3)}{" "}
                      USD
                    </p>
                  ) : (
                    <p className=" text-sm font-normal text-neutral">$0 USD</p>
                  )}
                </span>
                <button
                  className="btn btn-sm btn-outline border-[#E6E7EA] absolute w-[90px] h-[28px] bottom-[6px] right-0 
                  ransition-opacity opacity-0 group-hover:opacity-100 text-xs font-semibold px-3 py-[6px] rounded normal-case 
                  hover:border-[#E6E7EA] text-white hover:text-white"
                  onClick={() => addTokenFunction()}
                >
                  Add Token
                </button>
              </div>
              {!isGoerli &&path=="/sftdemo"&& address && <button
                className="btn relative w-[327px] h-[56px] mt-4 rounded flex justify-center items-center border-none normal-case bg-invar-error"
                onClick={() => switchNetwork(ChainId.Goerli)}
              >
                <p className=" font-semibold text-white">{t("click_switch")}</p>
              </button>}
              {!network[0]?.data?.chain?.name?.includes("Mainnet") &&path!=="/sftdemo"&& address && <button
                className="btn relative w-[327px] h-[56px] mt-4 rounded flex justify-center items-center border-none normal-case bg-invar-error"
                onClick={() => switchNetwork(ChainId.Mainnet)}
              >
                <p className=" font-semibold text-white">{t("click_eth")}</p>
              </button>}
              <button
                className="btn btn-primary relative w-[327px] h-[56px] mt-4 rounded flex justify-center items-center border-none normal-case"
                onClick={disconnectWallet}
              >
                <p className=" font-semibold text-white">{t("disconnect")}</p>
              </button>
            </label>
          </label>
        </>
      )}
    </div>
  );
};

export default ModalWallet;
