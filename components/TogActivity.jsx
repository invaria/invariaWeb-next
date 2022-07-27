import React, { useEffect, useState, useCallback } from 'react'
import { ethers } from 'ethers'
import {
  useMetamask, useWalletConnect, useCoinbaseWallet,
  useNetwork, useAddress, useDisconnect,
} from "@thirdweb-dev/react";
import erc20ABI from '../src/utils/erc20ABI.json'
import inVariaJSON from '../src/utils/InVaria.json'
import { checkIfWalletIsConnected, addTokenFunction, usdcAddress, nftAddress } from '../src/utils/web3utils'
import Image from 'next/image'
import useCollapse from 'react-collapsed';
import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
import { shortenAddress } from '../src/utils/shortenAddress'

let pervState = []

const TogActivity = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });
  const address = useAddress()
  const network = useNetwork()
  const [transactions, setTransactions] = useState([{}])

  const toggleCollapse = () => {
    setIsExpanded((prev) => !prev)
  }

  const getActivity = async () => {
    console.log("from, value.toNumber()")

    if (!address) return
    console.log("from, value.toNumber()")

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const nftContract = new ethers.Contract(nftAddress, inVariaJSON.abi, provider);
    const filter = (nftContract.filters.TransferSingle(null, "0x0000000000000000000000000000000000000000", address, null, null))
    const query = await nftContract.queryFilter(filter)
    const items = await Promise.all(query?.map(async i => {
      const block = (await provider.getBlock(i.blockHash))
      const blockTime = new Date((block.timestamp) * 1000).toString()
      const item = {
        date: blockTime,
        from: i.args.from,
        to: i.args.to,
        operator: i.args.operator,
        id: i.args.id.toNumber(),
        value: (i.args.value).toNumber()
      }
      return item
    }))
    setTransactions(items)

    // const block = (await provider.getBlock("0x3d1fc8dca4e1c50187f418583b9c4111c00de33b76f24f585361bdcc17ee58cf"))
    // const blockTime = new Date((block.timestamp) * 1000)
    console.log(items)
    console.log(query)
    console.log("trans",transactions)

    // nftContract.on("TransferSingle", (operator, from, to, id, value) => {
    //   console.log("from, value.toNumber()")

    //   console.log(from)
    //   console.log(nftContract.filters.TransferSingle())
    //   console.log(from, value.toNumber())
    //   // alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
    // });
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
      getActivity()
    }
  }, [address, network])

  return (
    <div className="relative flex mb-20 w-full border-t border-invar-main-purple">
      <div className="mx-[30px] sm:mx-[30px] md:mx-[130px] lg:mx-[230px] w-full z-10 mt-12 ">
        <div className={" bg-invar-main-purple px-6 rounded text-white cursor-pointer"} {...getToggleProps({ onClick: toggleCollapse })}>
          <div className="py-6 flex justify-between z-30 border-b border-[#37293E]">
            <p className=" text-xl font-semibold">
              Pre-Sale Minting Stage
            </p>
            <div>
              {isExpanded ? (<MinusIcon className="w-6 ml-6" />) : (<PlusIcon className="w-6 ml-6" />)}
            </div>
          </div>
          {/* <div {...getCollapseProps()} className="py-6 z-50 font-normal "> */}
          <div  className="py-6 z-50 font-normal ">
            {/* <div className="flex"></div> */}
            {transactions && transactions.map((i, index) => (
              <div key={index} className=" min-h-max w-full flex flex-row mb-10">
                <div className=" m-0 w-[214px] h-[187px]">
                  <Image className=" rounded" layout='fixed' width={241} height={187} src='/bg/bg_building.jpeg' />
                </div>
                <div className=" grow ml-12 grid grid-cols-2 md:grid-cols-3 gap-0 font-[350] font tracking-wider">
                  <div className=" h-[45px] ">
                    <p className=" text-sm text-invar-light-grey mb-1 ">NFT</p>
                    <p className=" text-base text-white font-light " >Amwaj20</p>
                  </div>
                  <div className=" h-[45px] ">
                    <p className=" text-sm text-invar-light-grey mb-1 ">Address</p>
                    <p className=" text-base text-white font-light " >{address?(shortenAddress(address)):""}</p>
                  </div>
                  <div className=" h-[45px] ">
                    <p className=" text-sm text-invar-light-grey mb-1 ">Result</p>
                    <p className=" text-base text-white font-light ">Complete</p>
                  </div>
                  <div className=" h-[45px] mt-[20px] ">
                    <p className=" text-sm text-invar-light-grey mb-1 ">Amount</p>
                    <p className=" text-base text-white font-light ">{i.value}</p>
                  </div>
                  <div className=" h-[45px] mt-[20px] ">
                    <p className=" text-sm text-invar-light-grey mb-1 ">Value</p>
                    <p className=" text-base text-white font-light ">{(10000*i.value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USDC</p>
                  </div>
                  <div className=" h-[45px] mt-[20px] ">
                    <p className=" text-sm text-invar-light-grey mb-1 ">Date & Time</p>
                    <p className=" text-base text-white font-light ">{i.date}</p>
                  </div>
                  <div className=" h-[45px] mt-[20px] ">
                    <p className=" text-sm text-invar-light-grey mb-1 ">TXID</p>
                    <p className=" text-base text-white font-light ">d86ebfcedf46...3da91</p>
                  </div>
                  <div className=" h-[45px] mt-[20px] ">
                    <p className=" text-sm text-invar-light-grey mb-1 ">View on</p>
                    <p className=" text-base text-white font-light " onClick={() => { navigator.clipboard.writeText("gyufyu") }}>Amwaj20</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TogActivity
