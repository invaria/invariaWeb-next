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
import { OpenLink } from '../components/icons/Link';

let pervState = []

const ModalPremint = () => {
  const [verified, setVerified] = useState(false)
  const connectWithMetamask = useMetamask();
  // const connectWithWalletConnect = useWalletConnect();
  // const disconnectWallet = useDisconnect();
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

  const checkAllowance = async () => {
    if (!address) return
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const usdcContract = new ethers.Contract(usdcAddress, erc20ABI, signer);
    getusdcAllowance = +(ethers.utils.formatUnits(await usdcContract.allowance(address, nftAddress), decimal))
    const nftContract = new ethers.Contract(nftAddress, inVariaJSON.abi, signer);
    const iswhite = await nftContract.WhiteList(address)
    console.log(iswhite)
    if (iswhite == false) {
      setBtnState("notwhite")
    } else {setBtnState("")}
    setUsdcAllowance(getusdcAllowance)
  }

  const approveUsdc = async () => {
    setBtnState("approving")
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const usdcContract = new ethers.Contract(usdcAddress, erc20ABI, signer);
    try {
      const approveAmount = 10000 * 1000 * Math.pow(10, decimal)
      const setApprovalForAll = await usdcContract.approve(nftAddress, approveAmount)
      await setApprovalForAll.wait()
      setBtnState("mint")
      checkAllowance()
    } catch (error) {
      setBtnState("approve")
      console.log(error)
    }
  }

  const mintNft = async () => {
    if (mintNum <= 0) return
    setBtnState("minting")
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const nftContract = new ethers.Contract(nftAddress, inVariaJSON.abi, signer);
    try {
      const mint = await nftContract.mintNFT(mintNum)
      await mint.wait()
      setBtnState("minted")
    } catch (error) {
      setBtnState("mint")
      console.log(error)
    }
    console.log("btnState", btnState)
  }

  function handleMintNum(c) {
    if (btnState == "minting") return
    if (c == "+" && mintNum < 1000) {
      setMintNum(mintNum + 1)
    } else if (c == "-" && mintNum > 0) {
      setMintNum(mintNum - 1)
    } else {
      if (c < 0) {
        setMintNum(0)
      } else if (c > 1000) {
        setMintNum(1000)
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
      } else {
        if (pervState[0] == network[0].data.chain.name && pervState[1] == address) return
      }
      pervState[0] = network[0].data.chain.name
      pervState[1] = address
      checkIfWalletIsConnected(address, setEthBalance, setUsdcBalance, setgetCoinPrice)
      checkAllowance()
    }
  }, [address, network])

  useEffect(() => {
    console.log(usdcAllowance)
    if (usdcAllowance == null) return
    if (btnState == "notwhite") return
    if (+usdcBalance < (mintNum * 10000)) {
      setBtnState("nofund")
    } else if (usdcAllowance < 10000) {
      setBtnState("approve")
    } else {
      setBtnState("mint")
    }
  }, [usdcAllowance, usdcBalance, mintNum])

  let btnAction
  if (!address) {
    btnAction =
      <div className="btn btn-disabled mt-6 bg-invar-disabled w-full h-[48px] font-semibold text-sm text-invar-light-grey border-none normal-case rounded" >
        Approve USDC</div>
  } else if (btnState == "approve") {
    btnAction =
      <button className="btn mt-6 bg-invar-dark w-full h-[48px] font-semibold text-sm text-white border-none normal-case rounded" onClick={() => approveUsdc()}>
        Approve USDC</button>
  } else if (btnState == "approving") {
    btnAction =
      <button className="btn loading mt-6 bg-invar-dark w-full h-[48px] font-semibold text-sm text-white border-none normal-case rounded">
        Approving</button>
  } else if (btnState == "mint") {
    btnAction =
      <button className="btn mt-6 bg-invar-dark w-full h-[48px] font-semibold text-sm text-white border-none normal-case rounded"
        onClick={() => mintNft()}>
        {`Mint (${mintNum})`}</button>
  } else if (btnState == "minting") {
    btnAction =
      <button className="btn loading mt-6 bg-invar-dark w-full h-[48px] font-semibold text-sm text-white border-none normal-case rounded">
        Minting</button>
  } else if (btnState == "minted") {
    btnAction =
      <div className="w-full h-[76px] mt-6 bg-invar-dark p-4 text-sm text-invar-success font-normal flex justify-between items-center rounded shadow animate-fade-in-left">
        <p>Transaction Successful! You can check NFT in Dashboard / Wallet.</p>
        <button className="ml-4 mr-2 h-[24px] w-[24px] min-w-max font-semibold text-sm text-white "
          onClick={() => { setBtnState("mint"), checkIfWalletIsConnected(address, setEthBalance, setUsdcBalance, setgetCoinPrice) }}>
          <img className="h-[24px] w-[24px]" src='/icons/ic_close.svg' alt="" />
        </button>
      </div>
  } else if (btnState == "nofund") {
    btnAction =
      <div className="btn btn-disabled mt-6 bg-invar-disabled w-full h-[48px] font-semibold text-sm text-invar-light-grey border-none normal-case rounded" >
        Insufficient Fund</div>
  } else if (btnState == "notwhite") {
    btnAction =
      <div className="w-full h-[76px] mt-6 bg-invar-dark p-4 text-sm text-invar-error font-normal flex justify-between items-center rounded shadow animate-fade-in-left">
        <p>You are not in the white list.</p>
      </div>
  }

  return (
    <div>
      <input type="checkbox" id="premint-modal" className="modal-toggle" />
      <div className="modal bg-[#000000b6] text-2xl text-white">
        <div className="modal-box relative md:flex flex-col h-screen max-h-screen md:h-fit w-full max-w-5xl md:w-[375px] 
          md:absolute md:top-[24px] md:right-[24px] rounded-none md:rounded bg-gradient-to-b from-primary to-[#1E1722] 
          mx-0 p-0 pb-[24px] scrollbar-hide">
          {!verified &&
            <>
              <div className="w-full h-[56px] bg-invar-dark flex justify-between items-center">
                <p className=" ml-6 text-invar-error font-normal text-sm">
                  Complete your verification
                </p>
                <button className=" w-[72px] h-[32px] btn btn-sm btn-outline bg-transparent text-white border-white mr-3 rounded normal-case my-3">
                  Verify
                </button>
              </div>
              <label htmlFor="premint-modal" onClick={() => enableScroll()} className="btn btn-sm p-0 absolute right-[32px] top-[79px] bg-transparent border-none hover:bg-transparent">
                <img className="h-[20px] w-[20px]" src='/icons/ic_close.svg' alt="" />
              </label>
            </>
          }
          {verified &&
            <label htmlFor="premint-modal" onClick={() => enableScroll()} className="btn btn-sm p-0 absolute right-[32px] top-[23px] bg-transparent border-none hover:bg-transparent">
              <img className="h-[20px] w-[20px]" src='/icons/ic_close.svg' alt="" />
            </label>
          }
          <div className="px-6">
            <h3 className="text-2xl font-semibold mt-[24px] mb-6">Pre-Sale Minting Stage</h3>
            <p className=" text-sm font-normal text-invar-light-grey mt-[24px] mb-1">My Wallet</p>
            {!address ? (
              <button className="btn btn-primary font-semibold text-sm text-invar-light-grey w-full h-[40px] rounded border-none normal-case" onClick={connectWithMetamask}>
                Connect Wallet
              </button>
            ) : (
              <button className="btn bg-primary btn-disabled font-semibold text-sm text-white w-full h-[40px] rounded border-none normal-case" onClick={connectWithMetamask}>
                {shortenAddress(address)}
              </button>
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
              <p className=" text-sm font-normal text-invar-light-grey ">Max Mint Limit</p>
              <p className=" text-base font-semibold text-white ">No limit</p>
            </div>
            <div className=" mt-4 flex justify-between items-baseline">
              <p className=" text-sm font-normal text-invar-light-grey ">Mint Price</p>
              <p className=" text-base font-semibold text-white ">10,000 USDC each</p>
            </div>
            <div className=" mt-4 flex justify-between items-baseline">
              <p className=" text-sm font-normal text-invar-light-grey ">Mint Time</p>
              <p className=" text-base font-semibold text-white ">July 24 ~ July 26, 2022 </p>
            </div>
            {(address && usdcAllowance >= 10000) &&
              <>
                <p className=" mt-3 text-sm font-normal text-invar-light-grey ">Fill in the number of NFTs you want to mint</p>
                <div className="relative " >
                  <input
                    type="number" onChange={(e) => handleMintNum(e.target.value)} value={mintNum} min="0"
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
                  <button className=" w-6 cursor-pointer absolute inset-y-0 right-[14px] flex items-center text-white" onClick={() => handleMintNum("+")} >
                    <img className=" w-6 " src="/icons/ic_plus.svg" alt="" />
                  </button>
                </div>
                <div className=" mt-4 flex justify-between items-baseline">
                  <p className=" text-sm font-normal text-invar-light-grey">Amount</p>
                  <p className=" font-semibold text-white text-base">{(mintNum * 10000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USDC</p>
                </div>
              </>
            }
            {btnAction}
            <div className="my-6 w-full h-[1px] border-b border-b-invar-main-purple"></div>
            <ul className="list-decimal pl-3 text-xs font-normal text-invar-light-grey mb-3">
              <li>Please make sure the wallet is connected to the Ethereum Mainnet.</li>
              <li>Minting NFT requires payment of gas fee (ETH, the amount determined by chain activities).</li>
              <li>Minting NFT requires an uncertain time of processing, please do not double-click during a short time, you can browse Etherscan to check transaction status.</li>
              {readmore &&
                <>
                  <li>After the transaction succeeds, you can view your NFT on the Dashboard Page, as well as your wallet.</li>
                  <li>Due to the amount of InVaria 2222 NFT is limited, there is no guarantee of successful minting or any amount, even though whitelist.</li>
                  <li>Whitelist is distributed through the campaign, partnership or official social media.</li>
                  <li>If you have any questions, please contact: <OpenLink link="info@invar.finance">
                    info@invar.finance</OpenLink>.</li>
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

export default ModalPremint
