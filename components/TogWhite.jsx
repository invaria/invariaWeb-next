import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ethers } from 'ethers'
import { useNetwork, useAddress } from "@thirdweb-dev/react";
import erc20ABI from '../src/utils/erc20ABI.json'
import inVariaJSON from '../src/utils/InVaria.json'
import { nftAddress } from '../src/utils/web3utils'
import Image from 'next/image'
import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
import { shortenAddress } from '../src/utils/shortenAddress'
import { ItemActivity } from '.'
import { getWhite } from "../src/utils/storeFirebase";

let pervState = []
let etherScan
let openSea

const TogWhite = ({sethiswhiteapply}) => {
  const [collapse, setCollapse] = useState(true)
  const address = useAddress()
  const network = useNetwork()
  const [transactions, setTransactions] = useState()

  async function getActivity() {
    console.log("get activity")
    if (!address) return
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const nftContract = new ethers.Contract(nftAddress, inVariaJSON.abi, provider);
    const filter = (nftContract.filters.TransferSingle(null, "0x0000000000000000000000000000000000000000", address, null, null))
    // const query = await nftContract.queryFilter(filter)
    const items = await getWhite(address)
    setTransactions(items)
    sethiswhiteapply(items)
    console.log(items, etherScan, openSea)
    console.log("trans", transactions)
  }

  useEffect(() => {
    // if (typeof window == "undefined") return
    console.log("activity")
    // 當scroll時，不知為何network == undefined
    if (network[0].data.chain == undefined) {
      return
    } else {
      if (pervState[0] == network[0].data.chain.name) return
    }
    pervState[0] = network[0].data.chain.name
    pervState[1] = address
    if (pervState[0] == 'Rinkeby') {
      etherScan = 'https://rinkeby.etherscan.io/tx/'
      openSea = `https://testnets.opensea.io/assets/rinkeby/${process.env.NEXT_PUBLIC_NFT_ADDRESS}/1`
    } else if (pervState[0] == 'Ethereum Mainnet') {
      etherScan = 'https://etherscan.io/tx/'
      openSea = `https://opensea.io/assets/ethereum/${process.env.NEXT_PUBLIC_NFT_ADDRESS}/1`
    }
    getActivity()

    // }, [address, network])
  }, [address])

  useEffect(() => {
    getActivity()
  }, [])


  return (
      <div className="mx-[30px] sm:mx-[30px] md:mx-[130px] lg:mx-[230px] max-w-full z-10 ">
        {(address && transactions) ? (
          <div className={" bg-invar-main-purple px-6 rounded text-white " + (collapse ? "mb-[436px]" : "")} >
            <div className="py-6 flex justify-between z-30 cursor-pointer" onClick={() => setCollapse(!collapse)}>
              <p className=" text-xl font-semibold">
                Whitelist Application
              </p>
              <div>
                {!collapse ? (<MinusIcon className="w-6 ml-6" />) : (<PlusIcon className="w-6 ml-6" />)}
              </div>
            </div>
            {!collapse &&
              <div className="z-50 font-normal animate-fade-in-down">
                {transactions &&
                  <div className="py-6 min-h-max w-full flex flex-col md:flex-row border-t border-[#37293E] ">
                    <div className=" w-full grow md:mt-0 grid grid-cols-2 md:grid-cols-3 gap-0 font-[350] font tracking-wider">
                      <div className=" h-[45px] ">
                        <p className=" text-sm text-invar-light-grey mb-1 ">NFT</p>
                        <p className=" text-base text-white font-light " >Amwaj20</p>
                      </div>
                      <div className=" h-[45px] ">
                        <p className=" text-sm text-invar-light-grey mb-1 ">Address</p>
                        <p className=" text-base text-white font-light " >{transactions.address ? shortenAddress(transactions.address) : ""}</p>
                      </div>
                      <div className=" h-[45px] mt-[20px] md:mt-0">
                        <p className=" text-sm text-invar-light-grey mb-1 ">Result</p>
                        <p className=" text-base text-white font-light ">Completed</p>
                      </div>
                      <div className=" h-[45px] mt-[20px] ">
                        <p className=" text-sm text-invar-light-grey mb-1 ">Amount</p>
                        <p className=" text-base text-white font-light ">{transactions.amount}</p>
                      </div>
                      <div className=" md:h-[45px] mt-[20px] md:w-[280px] mb-6 ">
                        <p className=" text-sm text-invar-light-grey mb-1 ">Application Time</p>
                        <p className=" text-base text-white font-light ">{transactions.date.toString()}</p>
                      </div>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            {/* <div>
              <Image width={162} height={200} src='/icons/ic_light.png' alt="" />
              <p className=" text-lg font-normal text-center text-invar-light-grey">No Activity Found</p>
            </div> */}
          </div>
        )
        }
    </div>
  )
}

export default TogWhite