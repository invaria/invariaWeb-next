import React, { useEffect, useState } from 'react'
import dynamic from "next/dynamic";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useNetwork, useAddress, useMetamask, useWalletConnect, useDisconnect } from '@thirdweb-dev/react'
const ModalStory = dynamic(import("./ModalStory"));
const ModalWallet = dynamic(import("./ModalWallet"));
const Modalapplywhite = dynamic(import("./Modalappplywhite"));
import { shortenAddress } from '../src/utils/shortenAddress'
import { disableScroll, enableScroll } from '../src/utils/disableScroll'
import { checkIfWalletIsConnected } from '../src/utils/web3utils'
import { getUser } from "../src/utils/storeFirebase";
import Countdown from 'react-countdown';
import { endtimestamp } from '../pages/invaria2222'

let pervState = []

const Navbar = ({ headerBackground }) => {
  const router = useRouter()
  const address = useAddress();
  const network = useNetwork();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const disconnectWallet = useDisconnect();
  const [getCoinPrice, setgetCoinPrice] = useState()
  const [ethBalance, setEthBalance] = useState()
  const [usdcBalance, setUsdcBalance] = useState()
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleWallet, setToggleWallet] = useState(false);
  const [language, setLanguage] = useState(false);
  const [verify, setVerify] = useState("")


  async function getdata() {
    const state = await getUser(address)
    console.log("ver state", state)
    setVerify(state)
  }

  useEffect(() => {
    // if (typeof window !== "undefined") {
    if (!address) return
    setToggleWallet(false)
    enableScroll()
    getdata()

    // }
  }, [address]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 當scroll時，不知為何network == undefined
      if (network[0].data.chain == undefined) {
        return
      } else if (pervState[0] == network[0].data.chain.name && pervState[1] == address) {
        return
      } else {
        pervState[0] = network[0].data.chain.name
        pervState[1] = address
        console.log(network[0].data.chain.name, pervState, ethBalance)
        checkIfWalletIsConnected(address, setEthBalance, setUsdcBalance, setgetCoinPrice)
      }
    }
  }, [address, network])

  useEffect(() => {
    console.log("ethBalance", ethBalance, address)
    if (!address) return
    checkIfWalletIsConnected(address, setEthBalance, setUsdcBalance, setgetCoinPrice)
  }, [])

  const handleClick = (e) => {
    e.preventDefault()
    router.push('/invaria2222')
  }

  return (
    <>
      <nav className={`fixed flex items-center justify-between w-full h-[3.75rem] bg-invar-dark md:h-[5rem] z-50
        ${headerBackground ? "md:bg-invar-dark" : "md:bg-transparent"}`}>
        <ModalWallet />
        <ModalStory />
        <Modalapplywhite />
        <div className="navbar w-full sticky top-0 left-0 right-0 bg-[#fff0] md:justify-center items-center h-[60px] md:h-[80px] flex">
          <div className="navbar-start h-[80px] flex justify-start items-center mt-6">
            {(router.pathname == "/dashboard" || router.pathname == "/propertyinfo" || router.pathname == "/terms" || router.pathname == "/privacy") &&
              <>
                <label htmlFor="my-modal-1" href='invaria2222/' className="hidden lg:block btn bg-transparent hover:bg-transparent border-0 h-[40px] w-[130px] px-[11px] py-[1px] my-[12px] ml-4 font-semibold text-sm text-invar-light-grey normal-case"
                >
                  {/* onClick={(e)=>handleClick(e)}> */}
                  {/* <Link href='invaria2222/' htmlFor="my-modal-1"> */}
                  Storyline
                  {/* </Link> */}
                </label>
                <Link href='invaria2222/#mindmap'>
                  <p className="hidden lg:block btn bg-transparent hover:bg-transparent border-0 h-[40px] w-[110px] pl-[6px] py-[1px] my-[12px] font-semibold text-sm text-invar-light-grey normal-case" >Mindmap</p>
                </Link>
                <Link href='invaria2222/#faq'>
                  <p className="hidden lg:block btn bg-transparent hover:bg-transparent border-0 h-[40px] w-[130px] px-[11px] py-[1px] my-[12px] font-semibold text-sm text-invar-light-grey normal-case" >FAQ & Tutorials</p>
                </Link>
              </>
            }
          </div>
          <div className="navbar-center">
            <Link href='invaria2222'>
              <img className="m-6 h-[2.5rem] w-24 xl:w-32 cursor-pointer" src='/logo_white.svg' />
            </Link>
          </div>
          <div className="navbar-end md:hidden">
            {!toggleMenu &&
              <button className=" absolute top-[24px] right-[27px]"
                onClick={() => { setToggleMenu(true); disableScroll(); }}>
                <img className="h-[20px] w-[20px]" src="/icons/ic_menu.svg" alt="" />
              </button>}
            {toggleMenu &&
              <button className=" absolute top-[24px] right-[27px]"
                onClick={() => { setToggleMenu(false); setToggleWallet(false); enableScroll(); }}>
                <img className="h-[20px] w-[20px]" src='/icons/ic_close.svg' alt="" />
              </button>}
          </div>
          <div className="navbar-end hidden md:flex flex-row">
            {!address ? (
              <label htmlFor="my-modal-3"
                className="btn btn-sm modal-button btn-outline rounded h-[40px] w-[130px] px-[11px] py-[1px] m-[12px] font-semibold text-sm text-white border-[#44334C] normal-case hover:border-none hover:bg-primary ">
                Connect Wallet</label>
            ) : (
              <>
                <Link href="/dashboard">
                  <div className="btn btn-sm btn-outline rounded h-[40px] w-[130px] px-[11px] py-[1px] my-[12px] font-semibold text-sm text-white text-end border-[#44334C] normal-case hover:border-none hover:bg-primary flex justify-center items-center ">
                    <p className='mr-[6px]'>Dashboard</p>
                    {verify == "Unverified" &&
                      <img src="/icons/ic_warning.svg" alt="" />
                    }
                  </div>
                </Link>
                <label htmlFor="my-modal-4" className="btn btn-sm modal-button btn-outline rounded h-[40px] w-[130px] px-[11px] py-[1px] m-[12px] font-semibold text-sm text-white border-[#44334C] normal-case hover:border-none hover:bg-primary ">
                  {shortenAddress(address)}
                </label>
              </>
            )
            }
            <button className=" hidden btn btn-sm btn-outline rounded h-[40px] w-[40px] my-[24px] mr-[24px] px-[4px] py-[4px] font-semibold text-sm text-white border-[#44334C] normal-case hover:border-none hover:bg-primary ">
              <img className="h-[20px] w-[20px]" src='/icons/ic_language.svg' alt="" />
            </button>
          </div>
        </div>
      </nav>
      {(toggleMenu) &&
        <div className=" fixed top-[60px] z-30 w-full h-screen py-[34px] px-[16px] flex flex-col justify-start items-start md:hidden text-white bg-gradient-to-b from-primary to-[#1E1722]">
          <label htmlFor="my-modal-1" className=" modal-button hover:underline font-semibold text-base mb-9">
            Storyline</label>
          <a href={`/invaria2222#mindmap`} className="font-semibold text-base mb-9" onClick={() => { setToggleMenu(false); enableScroll(); }}>Mindmap</a>
          <a href={`/invaria2222#faq`} className="font-semibold text-base mb-9" onClick={() => { setToggleMenu(false); enableScroll(); }}>FAQ & Tutorials</a>
          <a href={`/propertyinfo`} className="font-semibold text-base mb-9" onClick={() => { setToggleMenu(false); enableScroll(); }}>Property Infos</a>
          {/* <h1 className="font-semibold text-base mb-8 cursor-pointer" onClick={() => setLanguage(!language)}>Language</h1>
          {language && <h1 className="font-semibold text-base mb-[27px] mx-2">English</h1>}
          {language && <h1 className="font-semibold text-base mb-[37px] mx-2 text-invar-grey">繁體中文</h1>} */}
          <label htmlFor='applywhite-modal' className=" modal-button h-16 w-full font-semibold text-sm text-invar-success flex justify-between " >
            <div className=" text-white  text-base">Whitelist Application</div>
            <Countdown date={endtimestamp} daysInHours={true} />
          </label>
          <Link href="/dashboard">
            <div className=' w-full flex justify-between items-start'>
              <button className="font-semibold text-base mb-8" onClick={() => { setToggleMenu(false); enableScroll(); }}>
                Dashboard</button>
              {verify == "Unverified" &&
                <img className=' mt-1' src="/icons/ic_warning.svg" alt="" />
              }
            </div>
          </Link>
          {!address && <button className="w-full h-[48px] font-semibold text-base bg-invar-dark rounded text-center" onClick={() => setToggleWallet(true)}>Connect Wallet</button>}
          {address &&
            <>
              <div className="w-full flex flex-row justify-between items-end">
                <h3 className="text-lg font-semibold text-white">My Wallet</h3>
                <h3 className="text-sm font-semibold text-white text-end">{shortenAddress(address)}</h3>
              </div>
              <div className=" border-b border-primary mt-3 w-[324px]"></div>
              <div className=" w-full mt-[14px] flex justify-between items-center ">
                <div className=" flex justify-center items-center text-white font-semibold">
                  <img className="h-[32px] w-[32px] mr-[12px]" src='/icons/ic_eth.png' alt="" />
                  <p>ETH</p>
                </div>
                {ethBalance && <div className=" flex flex-col justify-center items-end text-white font-semibold">
                  <p>{ethBalance}</p>
                  <p className=" text-sm font-normal text-neutral">
                    ${(ethBalance * (getCoinPrice?.ethereum.usd)).toFixed(3)} USD</p>
                </div>}
              </div>
              <div className=" w-full mt-[14px] flex justify-between items-center ">
                <div className=" flex justify-center items-center text-white font-semibold">
                  <img className="h-[32px] w-[32px] mr-[12px]" src='/icons/ic_usdc.png' alt="" />
                  <p>USDC</p>
                </div>
                <div className=" flex flex-col justify-center items-end text-white font-semibold">
                  {usdcBalance && <p className=" text-base">{usdcBalance}</p>}
                  {getCoinPrice && <p className=" text-sm font-normal text-neutral">
                    ${(usdcBalance * (getCoinPrice["usd-coin"].usd)).toFixed(3)} USD</p>}
                </div>
              </div>
              <button className="btn btn-primary relative w-full h-[56px] mt-[14px] rounded flex justify-center items-center border-none normal-case" onClick={disconnectWallet}>
                <p className=" font-semibold text-white">Disconnect</p>
              </button>
            </>
          }
        </div>
      }
      {(toggleMenu && toggleWallet && !address) &&
        <>
          <div className=" fixed top-[60px] z-40 w-full h-screen py-[34px] px-[16px] flex flex-col justify-start items-start md:hidden text-white bg-gradient-to-b from-primary to-[#1E1722]">
            <div className="flex justify-start items-center mb-[32px] cursor-pointer" onClick={() => setToggleWallet(false)}>
              <img className="w-[24px] h-[24px]" src='/icons/ic_back.svg' alt="" />
              <h3 className="text-base font-semibold text-white ml-[15px]">Back</h3>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-[22px]">Connect Wallet</h3>
            <button className="btn btn-primary relative w-full h-[56px] rounded flex justify-center items-center border-none normal-case" onClick={connectWithMetamask}>
              <img className="absolute top-[13px] left-4 h-[30px] w-[30px]" src='/icons/ic_metamask.png' alt="" />
              <p className=" font-semibold text-accent">MetaMask</p>
            </button>
            <button className="btn btn-primary mt-3 relative w-full h-[56px] rounded flex justify-center items-center border-none normal-case" onClick={connectWithWalletConnect}>
              <img className="absolute top-[13px] left-4 h-[30px] w-[30px]" src='/icons/ic_walletconnect.png' alt="" />
              <p className=" font-semibold text-accent">WalletConnect</p>
            </button>
          </div>
        </>
      }
    </>
  )
}


export default Navbar