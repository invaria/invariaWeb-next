import React, { useEffect, useState } from 'react'
import { useNetwork, useAddress } from "@thirdweb-dev/react";
import { shortenAddress } from '../src/utils/shortenAddress'

const His = ({ i }) => {
  const address = useAddress()
  const [copy, setCopy] = useState(false)

  function handleCopy() {
    setCopy(true)
    setTimeout(() => {
      setCopy(false)
    }, 2000);
  }

  return (
    <div className="py-6 min-h-max w-full flex flex-col md:flex-row border-t border-[#37293E] ">
      <div className=" m-0 w-full md:w-[214px] md:h-[187px]">
        {/* <Image className=" rounded" layout='fixed' width={214} height={187} src='/bg/bg_building.jpeg' /> */}
        <img className="w-full md:w-[214px] md:h-[187px] rounded" src='/bg/bg_building.jpeg' />
      </div>
      <div className=" grow mt-6 md:mt-0 md:ml-12 grid grid-cols-2  gap-0 font-[350] font tracking-wider">
        <div className=" h-[45px] ">
          <p className=" text-sm text-invar-light-grey mb-1 ">NFT</p>
          <p className=" text-base text-white font-light " >Amwaj20</p>
        </div>
        <div className=" h-[45px] ">
          <p className=" text-sm text-invar-light-grey mb-1 ">Address</p>
          <p className=" text-base text-white font-light " >{address ? shortenAddress(address) : ""}</p>
        </div>
        <div className=" h-[45px] mt-[20px]">
          <p className=" text-sm text-invar-light-grey mb-1 ">Result</p>
          <p className=" text-base text-white font-light ">Completed</p>
        </div>
        <div className=" h-[45px] mt-[20px] ">
          <p className=" text-sm text-invar-light-grey mb-1 ">Interests</p>
          <p className=" text-base text-white font-light ">{i.amount/1000000}</p>
        </div>
        {/* <div className=" h-[45px] mt-[20px] ">
          <p className=" text-sm text-invar-light-grey mb-1 ">Value</p>
          <p className=" text-base text-white font-light ">{(2000 * i.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} USDC</p>
        </div> */}
        <div className=" md:h-[45px] mt-[20px] md:w-[180px] ">
          <p className=" text-sm text-invar-light-grey mb-1 ">Claim Time</p>
          <p className=" text-base text-white font-light ">{i.date}</p>
        </div>
        <div className=" h-[45px] mt-[20px] ">
          <p className=" text-sm text-invar-light-grey mb-1 ">TXID</p>
          {i.txid ? (
            <div className=" relative flex justify-start items-center">
              <a href={i.etherScanUrl} target="_blank" rel="noreferrer" className=" text-base text-white font-light ">
                {i.txid ? shortenAddress(i.txid) : ""}
              </a>
              {copy ? (
                <>
                  <img className="ml-2 h-4 cursor-pointer" src='/icons/ic_copied.svg' />
                  <div className=" absolute left-[95px] bottom-7 text-xs font-normal rounded bg-black bg-opacity-70 px-[6px] py-1 shadow">
                    Copied</div>
                </>
              ) : (
                <img className="ml-2 h-4 cursor-pointer" src='/icons/ic_copy.svg' onClick={(e) => { navigator.clipboard.writeText(i.txid); handleCopy(e) }} />
              )}
            </div>
          ) : ("")
          }
        </div>
        <div className=" h-[45px] mt-[20px] ">
          {/* <p className=" text-sm text-invar-light-grey mb-1 ">View on</p> */}
          {/* <a href={i.openSeaUrl} target="_blank" rel="noreferrer" className="flex">
  <div className=" h-6 w-6 mr-2 ">
    <img src="/icons/opensea.svg" alt="" />
  </div>
  <p className=" text-base text-white font-light ">OpenSea</p>
</a> */}
        </div>
      </div>
    </div>
  )
}

export default His