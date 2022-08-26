import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ethers } from 'ethers'
import { useNetwork, useAddress } from "@thirdweb-dev/react";
import erc20ABI from '../src/utils/erc20ABI.json'
import inVariaJSON from '../src/utils/InVaria.json'
import stakeABI from '../src/utils/invarstaking.json'
import { nftAddress } from '../src/utils/web3utils'
import Image from 'next/image'
import { shortenAddress } from '../src/utils/shortenAddress'

const Nfts = () => {
  const address = useAddress()
  const network = useNetwork()
  const [nfts, setnfts] = useState([])
  const [openinfo, setopeninfo] = useState(false)
  const [tabState, setTabState] = useState("staking")
  const [openact, setopenact] = useState()
  const [inputs, setInputs] = useState({});


  useEffect(() => {
    getNfts()
  }, [])

  async function getNfts() {
    console.log("get activity")
    if (!address) return
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const nftContract = new ethers.Contract(nftAddress, inVariaJSON.abi, provider);
    // const filter = (nftContract.filters.TransferSingle(null, "0x0000000000000000000000000000000000000000", address, null, null))
    const query = await nftContract["balanceOf(address)"]("0xA450cC0A298d99C2794b2F26b9f8e4302a8fE5e1")

    // const query = await nftContract.WithDrawAddress()
    // const items = await Promise.all(query?.map(async i => {
    //   const block = (await provider.getBlock(i.blockHash))
    //   const blockTime = new Date((block.timestamp) * 1000)
    //   // let utcDate = new Date(blockTime.toL
    console.log("query", query.toString())
    setnfts(query.toString())
    // console.log("trans", transactions, transactions.length)
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  return (
    <div className="relative flex min-h-[70vw] w-full border-t border-invar-main-purple">
      <div className="px-4 md:px-16 lg:px-[231px] w-full z-10 mt-12 mb-10">
        {nfts == 0 ? (
          <div className="w-full h-full flex justify-center items-center">
            <div>
              <Image width={162} height={200} src='/icons/ic_light.png' alt="" />
              <p className=" text-lg font-normal text-center text-invar-light-grey">No NFT Found</p>
            </div>
          </div>
        ) : (
          <>
            {!openinfo ? (
              <div onClick={() => setopeninfo(true)} className=" relative w-[310px] h-[382px] bg-black rounded overflow-hidden shadow cursor-pointer">
                <img className=" w-[310px] h-[310px]" src="https://dev2988.dkotaim8jhfxo.amplifyapp.com/Renft.gif" alt="" />
                <p className=" px-[109px] py-6 font-semibold text-xl">Amwaj20 </p>
                <div className=" absolute top-0 left-0 m-3 p-2 bg-invar-dark bg-opacity-70 text-invar-success font-semibold text-sm rounded">{nfts} NFTs</div>
              </div>
            ) : (
              <>
                <div className=" rounded overflow-hidden shadow-md">
                  <div className=" relative w-full md:flex justify-end p-9 bg-invar-main-purple">
                    <div className=" md:absolute top-9 left-9">
                      <img className=" w-[347px] h-[354px] rounded shadow" src="https://dev2988.dkotaim8jhfxo.amplifyapp.com/Renft.gif" alt="" />
                      <p className=" mb-6 md:mb-0 mt-6 font-semibold text-3xl text-center">Amwaj20 </p>
                    </div>
                    <div className=" w-full md:w-60 md:mr-6">
                      <p className=" mb-2 text-center font-normal text-sm text-invar-light-grey">Est. Staking Return (APR)</p>
                      <p className=" text-center font-semibold text-3xl ">12%</p>
                    </div>
                    <div className=" mt-6 md:mt-0 w-full md:w-60 ">
                      <p className=" mb-2 text-center font-normal text-sm text-invar-light-grey">Est. Daily Interests (USDC)</p>
                      <p className=" text-center font-semibold text-3xl ">0</p>
                    </div>
                  </div>
                  <div className=" w-full flex justify-end p-9 bg-[#37293E]">
                    <div className=" md:grid grid-cols-2 w-[516px]">
                      {openact == "Balance" ? (
                        <div className=" w-full md:w-60">
                          <div className=" flex justify-between">
                            <p className=" mb-[2px] text-center font-normal text-sm text-invar-light-grey">Balance</p>
                            <p className=" text-center font-normal text-sm text-invar-success ">{nfts}</p>
                          </div>
                          <input
                            name="Balance" type="number" onChange={handleChange} value={inputs.Balance || ""} min="1"
                            required className="block bg-invar-main-purple w-full h-[42px] rounded focus:border border-white text-white font-normal px-[15px]"
                          />
                          <div className="flex justify-between max-w-full">
                            <button className="btn mt-3 bg-transparent w-[140px] md:w-[114px] h-[40px] font-semibold text-base border-invar-dark normal-case rounded text-invar-light-grey" onClick={() => setopenact("")} >
                              Cancel</button>
                            <button className="btn mt-3 ml-3 bg-invar-dark w-[140px] md:w-[114px] h-[40px] font-semibold text-base text-white border-none normal-case rounded" >
                              Stake</button>
                          </div>
                        </div>
                      ) : (
                        <div className=" w-full md:w-60">
                          <p className=" mb-2 text-center font-normal text-sm text-invar-light-grey">Balance</p>
                          <p className=" text-center font-semibold text-3xl text-invar-success ">{nfts}</p>
                          <button className="btn mt-3 bg-invar-dark w-full h-[40px] font-semibold text-base text-white border-none normal-case rounded" onClick={() => setopenact("Balance")}>
                            Stake</button>
                        </div>
                      )}
                      {openact == "staking" ? (
                        <div className=" mt-6 md:mt-0 w-full md:w-60 md:ml-[18px]">
                          <p className=" mb-[2px] text-center font-normal text-sm text-invar-light-grey">Staking</p>
                          <p className=" text-center font-semibold text-3xl ">{nfts}</p>
                          <button className="btn mt-3 bg-invar-dark w-full h-[40px] font-semibold text-base text-white border-none normal-case rounded" onClick={() => setopenact()}>
                            Stake</button>
                        </div>
                      ) : (
                        <div className=" mt-6 md:mt-0 w-full md:w-60 md:ml-[18px]">
                          <p className=" mb-2 text-center font-normal text-sm text-invar-light-grey">Staking</p>
                          <p className=" text-center font-semibold text-3xl ">{nfts}</p>
                          <button className="btn mt-3 bg-invar-dark w-full h-[40px] font-semibold text-base text-white border-none normal-case rounded" onClick={() => setopenact()}>
                            Stake</button>
                        </div>
                      )}
                      {openact == "Burnable" ? (
                        <div className=" w-full md:w-60 mr-6 mt-9">
                          <p className=" mb-[2px] text-center font-normal text-sm text-invar-light-grey">Burnable</p>
                          <p className=" text-center font-semibold text-3xl ">{nfts}</p>
                          <button className="btn mt-3 bg-invar-dark w-full h-[40px] font-semibold text-base text-white border-none normal-case rounded" onClick={() => setopenact()}>
                            Stake</button>
                        </div>
                      ) : (
                        <div className=" w-full md:w-60 mr-6 mt-9">
                          <p className=" mb-2 text-center font-normal text-sm text-invar-light-grey">Burnable</p>
                          <p className=" text-center font-semibold text-3xl ">{nfts}</p>
                          <button className="btn mt-3 bg-invar-dark w-full h-[40px] font-semibold text-base text-white border-none normal-case rounded" onClick={() => setopenact()}>
                            Stake</button>
                        </div>
                      )}
                      {openact == "Interests" ? (
                        <div className=" w-full md:w-60 md:ml-[18px] mt-9">
                          <p className=" mb-[2px] text-center font-normal text-sm text-invar-light-grey">Total Interests (USDC)</p>
                          <p className=" text-center font-semibold text-3xl ">{nfts}</p>
                          <button className="btn mt-3 bg-invar-dark w-full h-[40px] font-semibold text-base text-white border-none normal-case rounded" onClick={() => setopenact()}>
                            Stake</button>
                        </div>
                      ) : (
                        <div className=" w-full md:w-60 md:ml-[18px] mt-9">
                          <p className=" mb-2 text-center font-normal text-sm text-invar-light-grey">Total Interests (USDC)</p>
                          <p className=" text-center font-semibold text-3xl ">{nfts}</p>
                          <button className="btn mt-3 bg-invar-dark w-full h-[40px] font-semibold text-base text-white border-none normal-case rounded" onClick={() => setopenact()}>
                            Stake</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" mt-12 mb-6 flex z-10">
                  <button className={" mr-9 h-[40px] w-[130px] rounded border border-invar-main-purple text-sm font-semibold text-center"
                    + (tabState == "staking" ? ' text-white bg-invar-main-purple ' : ' text-invar-light-grey hover:text-white ')}
                    onClick={() => { setTabState("staking") }}>
                    Staking</button>
                  <button className={" mr-9 h-[40px] w-[130px] rounded border border-invar-main-purple text-sm font-semibold text-center"
                    + (tabState == "activity" ? ' text-white bg-invar-main-purple' : ' text-invar-light-grey hover:text-white ')}
                    onClick={() => { setTabState("activity") }}>
                    Activity</button>
                </div>
                {tabState == "staking" &&
                  <>
                    <div className="flex justify-between border-b w-full border-invar-main-purple">
                      <p className=" pb-3 text-invar-light-grey text-sm font-normal ">
                        Staking  Time</p>
                      <div className=' flex '>
                        <p className=" pb-3 text-invar-light-grey text-sm font-normal ">
                          Staking</p>
                        <p className=" ml-6 md:ml-32 mr-9 w-max pb-3 text-invar-light-grey text-sm font-normal ">
                          Unstaked</p>
                      </div>
                    </div>
                    <div className=" my-16 w-full flex justify-center items-center">
                      <div>
                        <Image width={162} height={200} src='/icons/ic_light.png' alt="" />
                        <p className=" text-lg font-normal text-center text-invar-light-grey">No Activity Found</p>
                      </div>
                    </div>
                  </>
                }
              </>
            )
            }
          </>
        )}
      </div>
    </div>
  )
}

export default Nfts