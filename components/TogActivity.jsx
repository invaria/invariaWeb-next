import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { ethers } from 'ethers'
import { useNetwork, useAddress } from "@thirdweb-dev/react";
import erc20ABI from '../src/utils/erc20ABI.json'
import inVariaJSON from '../src/utils/InVaria.json'
import { nftAddress } from '../src/utils/web3utils'
import Image from 'next/image'
import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
import { shortenAddress } from '../src/utils/shortenAddress'
import desiredChainId from '../pages/_app'
import { ItemActivity } from '../components'

let pervState = []
let etherScan
let openSea

const TogActivity = () => {
  const [collapse, setCollapse] = useState(false)
  const address = useAddress()
  const network = useNetwork()
  const [transactions, setTransactions] = useState([{}])

  const getActivity = async () => {
    if (!address) return
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
        value: (i.args.value).toNumber(),
        txid: `${i.transactionHash}`,
        etherScanUrl: `${etherScan}${i.txid}`,
        openSeaUrl: `${openSea}${i.txid}`
      }
      return item
    }))
    setTransactions(items)
    console.log(items)
    console.log(query)
    console.log("trans", transactions,transactions.length)
  }

  useEffect(() => {
    if (typeof window !== "undefined" && network[0].data.chain !== undefined) {
      // 當scroll時，不知為何network == undefined
      if (network[0].data.chain == undefined) {
        return
      } else {
        if (pervState[0] == network[0].data.chain.name && pervState[1] == address) return
      }
      pervState[0] = network[0].data.chain.name
      pervState[1] = address
      getActivity()
      if (pervState[0] == 'Rinkeby') {
        etherScan = 'https://rinkeby.etherscan.io/tx/'
        openSea = 'https://testnets.opensea.io/assets/rinkeby/'
      } else if (pervState[0] == 'Ethereum Mainnet') {
        etherScan = 'https://etherscan.io/tx/'
        openSea = 'https://opensea.io/assets/ethereum/'
      }
    }
  }, [address, network])

  return (
    <div className="relative flex min-h-[400px] w-full border-t border-invar-main-purple">
      <div className="mx-[30px] sm:mx-[30px] md:mx-[130px] lg:mx-[230px] w-full z-10 mt-12 mb-10">
        {(address&&transactions.length>0) ?(
          <div className={" bg-invar-main-purple px-6 rounded text-white "} >
            <div className="py-6 flex justify-between z-30 cursor-pointer" onClick={() => setCollapse(!collapse)}>
              <p className=" text-xl font-semibold">
                Pre-Sale Minting Stage
              </p>
              <div>
                {collapse ? (<MinusIcon className="w-6 ml-6" />) : (<PlusIcon className="w-6 ml-6" />)}
              </div>
            </div>
            {!collapse &&
              <div className="z-50 font-normal animate-fade-in-down">
                {transactions && transactions.map((i, index) => (
                  <ItemActivity key={index} i={i} />
                ))}
              </div>
            }
          </div>
        ):(
          <div className="w-full h-full flex justify-center items-center">
            <div>
              <Image width={162} height={200} src='/icons/ic_light.png' />
              <p className=" text-lg font-normal text-center text-invar-light-grey">No Activity Found</p>
              </div>
          </div>
        )
        }
      </div>
    </div>
  )
}

export default TogActivity
