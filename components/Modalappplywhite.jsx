import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { ethers } from 'ethers'
import {
  useMetamask, useWalletConnect, useCoinbaseWallet,
  useNetwork, useAddress, useDisconnect,
} from "@thirdweb-dev/react";
import erc20ABI from '../src/utils/erc20ABI.json'
import inVariaJSON from '../src/utils/InVaria.json'
import { shortenAddress } from '../src/utils/shortenAddress'
import { enableScroll } from '../src/utils/disableScroll'
import { checkIfWalletIsConnected, addTokenFunction, usdcAddress, nftAddress } from '../src/utils/web3utils'
import { OpenLink, ButtonMailto } from './icons/Link';
import { getUser, applyWhite } from "../src/utils/storeFirebase";
import { endtimestamp } from '../pages/invaria2222'

let pervState = []

const Modalappplywhite = () => {
  const [verify, setVerify] = useState("Unverified")
  const connectWithMetamask = useMetamask();
  const [ethBalance, setEthBalance] = useState(0)
  const [usdcBalance, setUsdcBalance] = useState(0)
  const [getCoinPrice, setgetCoinPrice] = useState(0)
  const [mintNum, setMintNum] = useState(1)
  const [usdcAllowance, setUsdcAllowance] = useState(null)
  const [btnState, setBtnState] = useState()
  const [readmore, setReadmore] = useState(false)
  const address = useAddress()
  const network = useNetwork()
  const decimal = 6
  let getusdcAllowance = 0

  async function getdata() {
    const state = await getUser(address)
    console.log("state", state)
    setVerify(state)
  }
  async function handleApply() {
    setBtnState("applying")
    try {
      applyWhite(address, { address: address, amount: mintNum, date: new Date(Date.now()) })
      setBtnState("applied")
    } catch (error) {
      setBtnState("apply")
    }
  }


  function handleMintNum(c) {
    if (btnState == "minting") return
    if (c == "+" && mintNum < 10) {
      setMintNum(mintNum + 1)
    } else if (c == "-" && mintNum > 0) {
      setMintNum(mintNum - 1)
    } else {
      if (c < 0) {
        setMintNum(0)
      } else if (c > 10) {
        setMintNum(10)
      } else {
        setMintNum(+(c))
      }
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 當scroll時，不知為何network == undefined
      if (network[0].data.chain == undefined) {
        return
      } else if (pervState[0] == network[0].data.chain.name && pervState[1] == address) {
        return
      }
      pervState[0] = network[0].data.chain.name
      pervState[1] = address
      checkIfWalletIsConnected(address, setEthBalance, setUsdcBalance, setgetCoinPrice)
      // checkAllowance()
    }
  }, [address, network])

  useEffect(() => {
    if (address == undefined) return
    console.log("btnState", btnState)

    checkIfWalletIsConnected(address, setEthBalance, setUsdcBalance, setgetCoinPrice)
    // checkAllowance()
    getdata()
    setBtnState("apply")
  }, [address])


  let btnAction
  if (endtimestamp < Date.now()) {
    btnAction =
      <div className="btn btn-disabled mt-6 bg-invar-disabled w-full h-[48px] font-semibold text-sm text-invar-light-grey border-none normal-case rounded" >
        Apply</div>
  } else if (!address || mintNum < 1) {
    btnAction =
      <div className="btn btn-disabled mt-6 bg-invar-disabled w-full h-[48px] font-semibold text-sm text-invar-light-grey border-none normal-case rounded" >
        Apply</div>
  } else if (btnState == "apply") {
    btnAction =
      <button className="btn mt-6 bg-invar-dark w-full h-[48px] font-semibold text-sm text-white border-none normal-case rounded"
        onClick={() => handleApply()}>
        {`Apply (${mintNum})`}</button>
  } else if (btnState == "applying") {
    btnAction =
      <button className="btn loading mt-6 bg-invar-dark w-full h-[48px] font-semibold text-sm text-white border-none normal-case rounded">
        Applying</button>
  } else if (btnState == "applied") {
    btnAction =
      <div className="w-full h-[76px] mt-6 bg-invar-dark p-4 text-sm text-invar-success font-normal flex justify-between items-center rounded shadow animate-fade-in-left">
        <p>Application Completed! You can check latest news in Dashboard and our community.</p>
        <button className="ml-4 mr-2 h-[24px] w-[24px] min-w-max font-semibold text-sm text-white "
          onClick={() => { setBtnState("apply"), checkIfWalletIsConnected(address, setEthBalance, setUsdcBalance, setgetCoinPrice) }}>
          <img className="h-[24px] w-[24px]" src='/icons/ic_close.svg' alt="" />
        </button>
      </div>
  }

  return (
    <div>
      <input type="checkbox" id="applywhite-modal" className="modal-toggle" />
      <div className="modal bg-[#000000b6] text-2xl text-white">
        <div className="modal-box relative md:flex flex-col h-screen max-h-screen md:h-fit w-full max-w-5xl md:w-[375px] 
          md:absolute md:top-[24px] md:right-[24px] rounded-none md:rounded bg-gradient-to-b from-primary to-[#1E1722] 
          mx-0 p-0 pb-[24px] scrollbar-hide">
          {verify == "Unverified" &&
            <>
              <div className="w-full h-[56px] bg-invar-dark flex justify-between items-center">
                <p className=" ml-6 text-invar-error font-normal text-sm">
                  Complete your verification
                </p>
                <Link href='/dashboard'>
                  <button className=" w-[72px] h-[32px] btn btn-sm btn-outline bg-transparent text-white border-white mr-3 rounded normal-case my-3"
                    onClick={() => enableScroll()}>
                    Verify
                  </button>
                </Link>
              </div>
              <label htmlFor="applywhite-modal" onClick={() => enableScroll()} className="btn btn-sm p-0 absolute right-[32px] top-[79px] bg-transparent border-none hover:bg-transparent">
                <img className="h-[20px] w-[20px]" src='/icons/ic_close.svg' alt="" />
              </label>
            </>
          }
          {verify !== "Unverified" &&
            <label htmlFor="applywhite-modal" onClick={() => enableScroll()} className="btn btn-sm p-0 absolute right-[32px] top-[23px] bg-transparent border-none hover:bg-transparent">
              <img className="h-[20px] w-[20px]" src='/icons/ic_close.svg' alt="" />
            </label>
          }
          <div className="px-6">
            <h3 className="text-2xl font-semibold mt-[24px] mb-6">Whitelist Application</h3>
            <p className=" text-sm font-normal text-invar-light-grey mt-[24px] mb-1">My Wallet</p>
            {!address ? (
              <button className="btn btn-primary font-semibold text-sm text-invar-light-grey w-full h-[40px] rounded border-none normal-case" onClick={connectWithMetamask}>
                Connect Wallet
              </button>
            ) : (
              <>
                {/* {btnState == "notwhite" ? (
                  <div className="btn btn-disabled flex w-full min-h-max bg-primary h-[68px] normal-case rounded border-none">
                    <button className=" mt-[10px] font-semibold text-sm text-white w-full " onClick={connectWithMetamask}>
                      {shortenAddress(address)}
                    </button>
                    <p className=" mb-[10px] text-invar-validation text-sm font-normal">You are not in the Pre-Sale list.</p>
                  </div>
                ) : ( */}
                <div className="btn btn-disabled w-full min-h-max bg-primary h-[40px] normal-case rounded border-none">
                  <button className=" font-semibold text-sm text-white w-full " onClick={connectWithMetamask}>
                    {shortenAddress(address)}
                  </button>
                </div>
                {/* )
                } */}
              </>
            )}
            <div className="mt-1 w-full p-4 bg-invar-main-purple rounded">
              <div className=" w-full flex justify-between items-center ">
                <div className=" flex justify-center items-center text-white font-normal text-sm">
                  <img className="h-[24px] w-[24px] mr-[12px]" src='/icons/ic_eth.png' alt="" />
                  <p>ETH</p>
                </div>
                <span className=" flex flex-col justify-center items-end text-white font-semibold text-base">
                  <p>{ethBalance}</p>
                </span>
              </div>
              <div className=" relative w-full mt-3 flex justify-between items-center group">
                <div className=" flex justify-center items-center text-white font-normal text-sm">
                  <img className="h-[24px] w-[24px] mr-[12px]" src='/icons/ic_usdc.png' alt="" />
                  <p>USDC</p>
                </div>
                <span className=" flex flex-col justify-center items-end text-white font-semibold text-base transition-opacity group-hover:opacity-0">
                  <p>{usdcBalance}</p>
                </span>
                <button className="btn btn-sm btn-outline border-[#E6E7EA] absolute w-[90px] h-[28px] bottom-[-2px] right-0 
                  transition-opacity opacity-0 group-hover:opacity-100 text-xs font-semibold px-3 py-[6px] rounded normal-case 
                  hover:border-[#E6E7EA] text-white hover:text-white" onClick={() => addTokenFunction()}>
                  Add Token</button>
              </div>
            </div>
            <div className=" mt-4 flex justify-between items-baseline">
              <p className=" text-sm font-normal text-invar-light-grey ">Application Time</p>
              <p className=" text-base font-semibold text-white ">July 24, 00:00 ~ July 26, 00:00 (UTC+0)</p>
            </div>
            <div className=" mt-4 flex justify-between items-baseline">
              <p className=" text-sm font-normal text-invar-light-grey ">Expected Amount</p>
              <p className=" text-base font-semibold text-white ">Up to 10 per wallet</p>
            </div>
            {/* <div className=" mt-4 flex justify-between items-baseline">
              <p className=" text-sm font-normal text-invar-light-grey ">Mint Time</p>
              <p className=" text-base font-semibold text-white ">August 5 ~ , 2022 </p>
            </div> */}
            {(address) &&
              <>
                <p className=" mt-3 text-sm font-normal text-invar-light-grey ">Fill in the number of NFTs you want to mint</p>
                <div className="relative " >
                  <input
                    type="number" onChange={(e) => handleMintNum(e.target.value)} value={mintNum} min="0" max="10"
                    required className="appearance-none block mt-1 px-3 h-[48px] bg-invar-main-purple w-full font-semibold text-2xl text-white rounded focus:border border-white text-center"
                  />
                  {mintNum < 1 ? (
                    <button className=" w-6 absolute inset-y-0 left-[14px] flex items-center text-white" >
                      <img className=" w-6 " src="/icons/ic_minus_disabled.svg" alt="" />
                    </button>
                  ) : (
                    <button className=" w-6 cursor-pointer absolute inset-y-0 left-[14px] flex items-center text-white" onClick={() => handleMintNum("-")} >
                      <img className=" w-6 " src="/icons/ic_minus.svg" alt="" />
                    </button>
                  )
                  }
                  {mintNum >= 10 ? (
                    <button className=" w-6 absolute inset-y-0 right-[14px] flex items-center text-white" >
                      <img className=" w-6 " src="/icons/ic_plus_disabled.svg" alt="" />
                    </button>
                  ) : (
                    <button className=" w-6 cursor-pointer absolute inset-y-0 right-[14px] flex items-center text-white" onClick={() => handleMintNum("+")} >
                      <img className=" w-6 " src="/icons/ic_plus.svg" alt="" />
                    </button>
                  )
                  }
                </div>
                {/* <div className=" mt-4 flex justify-between items-baseline">
                  <p className=" text-sm font-normal text-invar-light-grey">Amount</p>
                  <p className=" font-semibold text-white text-base">{(mintNum * 10000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USDC</p>
                </div> */}
              </>
            }
            {btnAction}
            <div className="my-6 w-full h-[1px] border-b border-b-invar-main-purple"></div>
            <ul className="list-decimal pl-3 text-xs font-normal text-invar-light-grey mb-3">
              <li>During the whitelist application period, feel free to fill in how many NFT(s) you expect to mint. Note: maximum amount is 10.</li>
              <li>The number you filled is not the actual number you can mint during whitelist minting stage. Whitelist application is purposed for whitelist giveaway campaign and market research.</li>
              <li>The winner of whitelist application will be chosen according to the rules we announced, and the result will be published in official social media.</li>
              {readmore &&
                <>
                  <li>For more informations, please check our <span>
                    <OpenLink link="https://twitter.com/InVarFinance">
                      Twitter
                    </OpenLink>
                  </span> & <span>
                      <OpenLink link="https://discord.gg/BrzPWYut4p">
                        Discord
                      </OpenLink>
                    </span> channel.</li>
                  <li>If you have any questions, please contact: <ButtonMailto />.</li>
                </>
              }
            </ul>
            {!readmore &&
              <>
                <p className="my-3 text-invar-light-grey text-xs font-semibold cursor-pointer hover:underline" onClick={() => setReadmore(true)}>Read More</p>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modalappplywhite