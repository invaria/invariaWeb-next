import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ethers } from 'ethers'
import { useNetwork, useAddress } from "@thirdweb-dev/react";
import erc20ABI from '../src/utils/erc20ABI.json'
import inVariaJSON from '../src/utils/InVaria.json'
import stakeABI from '../src/utils/invarstaking.json'
import { nftAddress, stakeAddress } from '../src/utils/web3utils'
import Image from 'next/image'
import { MinusIcon, PlusIcon } from '@heroicons/react/outline'
import { ItemActivity, His } from '.'

let pervState = []
let etherScan
let openSea

const TogUnstake = ({ start, end }) => {
  const [collapse, setCollapse] = useState(true)
  const address = useAddress()
  const network = useNetwork()
  const [transactions, setTransactions] = useState([])

  async function getActivity() {
    // console.log("get activity")
    if (!address) return
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    // const nftContract = new ethers.Contract(nftAddress, inVariaJSON.abi, provider);
    // const filter = (nftContract.filters.TransferSingle(null, "0x0000000000000000000000000000000000000000", address, null, null))

    const stakeContract = new ethers.Contract(stakeAddress, stakeABI, signer);
    const filter = (stakeContract.filters.unStakeInfo(address, null, null))
    const unstake = await stakeContract.queryFilter(filter)
    const unitems = await Promise.all(unstake?.map(async (i, index) => {
      const blockTime = new Date((i.args.unstakeTime) * 1000)
      const item = {
        date: blockTime.toString(),
        year: blockTime.getFullYear(),
        month: blockTime.getMonth() + 1,
        day: blockTime.getDate(),
        amount: (i.args.amount).toNumber(),
        txid: `${i.transactionHash}`,
      }
      return item
    }))
    // console.log("in", infosarr)
    // setinfos(infosarr)
    // setevestake(items)
    // seteveunstake(unitems)
    setTransactions(unitems)
    // sethispresale(unitems)
    // console.log(unitems, etherScan, openSea)
    // console.log(query)
    // console.log("trans", transactions, transactions.length)
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
  useEffect(() => {
    // getActivity()
    let arr = []
    async function getAct() {
      if (!address) return
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner()
      const stakeContract = new ethers.Contract(stakeAddress, stakeABI, signer);
      const filter = (stakeContract.filters.unStakeInfo(address, null, null))
      const unstake = await stakeContract.queryFilter(filter)
      const unitems = await Promise.all(unstake?.map(async (i, index) => {
        const blockTime = new Date((i.args.unstakeTime) * 1000)
        const item = {
          date: blockTime.toString(),
          year: blockTime.getFullYear(),
          month: blockTime.getMonth() + 1,
          day: blockTime.getDate(),
          amount: (i.args.amount).toNumber(),
          txid: `${i.transactionHash}`,
          time: (i.args.unstakeTime).toNumber() * 1000
        }
        return item
      }))
      // setTransactions(unitems)
      arr = unitems
      // console.log(arr, start)

      if (start != undefined) {
        console.log(arr)
        let obj = arr.filter(person => (person.time > start && person.time < end))
        // console.log("obj", obj, start, arr[0]?.time, arr, Array.isArray(transactions), transactions.length)

        setTransactions(obj)
      }
      // console.log("start", start, transactions, Array.isArray(transactions), transactions.length)
    }
    getAct()

  }, [start, end])



  return (
    <div className="mx-[30px] sm:mx-[30px] md:mx-[130px] lg:mx-[230px] max-w-full z-10 ">
      {(address && transactions.length > 0) ? (
        <div className={"mt-3 bg-invar-main-purple px-6 rounded text-white " + (collapse ? "" : "")} >
          <div className="py-6 flex justify-between z-30 cursor-pointer" onClick={() => setCollapse(!collapse)}>
            <p className=" text-xl font-semibold">
              Unstake
            </p>
            <div>
              {!collapse ? (<MinusIcon className="w-6 ml-6" />) : (<PlusIcon className="w-6 ml-6" />)}
            </div>
          </div>
          {!collapse &&
            <div className="z-50 font-normal animate-fade-in-down">
              {transactions && transactions.map((i, index) => (
                <His key={index} i={i} />
              ))}
            </div>
          }
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
        </div>
      )
      }
    </div>
  )
}

export default TogUnstake