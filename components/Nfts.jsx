import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ethers } from 'ethers'
import { useNetwork, useAddress } from "@thirdweb-dev/react";
import erc20ABI from '../src/utils/erc20ABI.json'
import inVariaJSON from '../src/utils/InVaria.json'
import stakeABI from '../src/utils/invarstaking.json'
import { nftAddress, stakeAddress } from '../src/utils/web3utils'
import Image from 'next/image'
import { shortenAddress } from '../src/utils/shortenAddress'

const Nfts = () => {
  const address = useAddress()
  const network = useNetwork()
  const [nfts, setnfts] = useState()
  const [staked, setstaked] = useState()
  const [burnable, setburnable] = useState()
  const [openinfo, setopeninfo] = useState(false)
  const [tabState, setTabState] = useState("staking")
  const [openact, setopenact] = useState()
  const [inputs, setInputs] = useState({});
  const [btnState, setBtnState] = useState()

  useEffect(() => {
    getNfts()
  }, [])

  async function getNfts() {
    console.log("get activity")
    if (!address) return
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const nftContract = new ethers.Contract(nftAddress, inVariaJSON.abi, provider);
    const query = await nftContract["balanceOf(address)"](address)
    console.log("query", query.toString())
    setnfts(query.toString())
    const stakeContract = new ethers.Contract(stakeAddress, stakeABI, provider);
    const bal = (await stakeContract.nftBalance(address))
    setstaked(bal.stakingAmount.toString())
    setburnable(bal.burnableAmount.toString())
    // console.log("trans", bal.stakingAmount.toString())
  }

  const stake = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const stakeContract = new ethers.Contract(stakeAddress, stakeABI, signer);
    try {
      setBtnState("loading")
      console.log(inputs.Balance, typeof inputs.Balance)
      const stake = await stakeContract.stakeNFT(inputs.Balance)
      await stake.wait()
      console.log("stake", stake)
      setBtnState("")
      getNfts()
    } catch (error) {
      setBtnState("")
      console.log(error)
    }
  }

  const unstake = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const stakeContract = new ethers.Contract(stakeAddress, stakeABI, signer);
    try {
      setBtnState("loading")
      console.log(inputs.unstake, typeof inputs.unstake)
      const stake = await stakeContract.unStake(inputs.unstake)
      await stake.wait()
      console.log("stake", stake)
      setBtnState("")
      getNfts()
    } catch (error) {
      setBtnState("")
      console.log(error)
    }
  }

  const burn = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const stakeContract = new ethers.Contract(stakeAddress, stakeABI, signer);
    try {
      setBtnState("loading")
      console.log(inputs.Burnable, typeof inputs.Burnable)
      const stake = await stakeContract.BurnNFT(inputs.Burnable)
      await stake.wait()
      console.log("stake", stake)
      setBtnState("")
      getNfts()
      // location.reload()
    } catch (error) {
      setBtnState("")
      console.log(error)
    }
  }


  const handleChange = (event) => {
    console.log("nfts", (typeof nfts), typeof inputs.Balance)

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
                            name="Balance" type="number" onChange={handleChange} value={inputs.Balance || ""} min="1" max={nfts}
                            required className="block bg-invar-main-purple w-full h-[42px] rounded focus:border border-white text-white font-normal px-[15px]"
                          />
                          <div className="flex justify-between max-w-full">
                            <button className="btn mt-3 bg-transparent w-[140px] md:w-[114px] h-[40px] font-semibold text-base border-invar-dark normal-case rounded text-invar-light-grey" onClick={() => setopenact("")} >
                              Cancel</button>
                            <a href='#stakeModal' className={`btn mt-3 ml-3 bg-invar-dark w-[140px] md:w-[114px] h-[40px] font-semibold text-base text-white border-none normal-case rounded`
                              + ((+(inputs.Balance) < 1 || +(inputs.Balance) > nfts || inputs.Balance == undefined) ? " btn-disabled" : "")
                              + (btnState == "loading" ? " loading" : "")}
                              // onClick={() => stake()}
                              >
                              Stake</a>
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
                        <div className=" w-full md:w-60">
                          <div className=" flex justify-between">
                            <p className=" mb-[2px] text-center font-normal text-sm text-invar-light-grey">Staking</p>
                            <p className=" text-center font-normal text-sm text-invar-success ">{staked}</p>
                          </div>
                          <input
                            name="unstake" type="number" onChange={handleChange} value={inputs.unstake || ""} min="1" max={staked}
                            required className="block bg-invar-main-purple w-full h-[42px] rounded focus:border border-white text-white font-normal px-[15px]"
                          />
                          <div className="flex justify-between max-w-full">
                            <button className="btn mt-3 bg-transparent w-[140px] md:w-[114px] h-[40px] font-semibold text-base border-invar-dark normal-case rounded text-invar-light-grey" onClick={() => setopenact("")} >
                              Cancel</button>
                            <a href='#unstakeModal' className={`btn mt-3 ml-3 bg-invar-dark w-[140px] md:w-[114px] h-[40px] font-semibold text-base text-white border-none normal-case rounded`
                              + ((+(inputs.unstake) < 1 || +(inputs.unstake) > staked || inputs.unstake == undefined) ? " btn-disabled" : "")
                              + (btnState == "loading" ? " loading" : "")}
                              // onClick={() => unstake()}
                              >
                              Unstake</a>
                          </div>
                        </div>
                      ) : (
                        <div className=" mt-6 md:mt-0 w-full md:w-60 md:ml-[18px]">
                          <p className=" mb-2 text-center font-normal text-sm text-invar-light-grey">Staking</p>
                          <p className=" text-center font-semibold text-3xl text-invar-success">{staked}</p>
                          <button className={`btn mt-3 w-full h-[40px] font-semibold text-base text-white border-none normal-case rounded`
                            + (staked == 0 ? " btn-disabled bg-invar-disabled" : " bg-invar-dark")}
                            onClick={() => setopenact("staking")}>
                            Unstake</button>
                        </div>
                      )}
                      {openact == "Burnable" ? (
                        <div className=" w-full md:w-60 mt-9">
                          <div className=" flex justify-between">
                            <p className=" mb-[2px] text-center font-normal text-sm text-invar-light-grey">Burnable</p>
                            <p className=" text-center font-normal text-sm text-invar-success ">{burnable}</p>
                          </div>
                          <input
                            name="Burnable" type="number" onChange={handleChange} value={inputs.Burnable || ""} min="1" max={burnable}
                            required className="block bg-invar-main-purple w-full h-[42px] rounded focus:border border-white text-white font-normal px-[15px]"
                          />
                          <div className="flex justify-between max-w-full">
                            <button className="btn mt-3 bg-transparent w-[140px] md:w-[114px] h-[40px] font-semibold text-base border-invar-dark normal-case rounded text-invar-light-grey" onClick={() => setopenact("")} >
                              Cancel</button>
                            <a href="#burnModal" className={`btn mt-3 ml-3 bg-invar-dark w-[140px] md:w-[114px] h-[40px] font-semibold text-base text-white border-none normal-case rounded`
                              + ((+(inputs.Burnable) < 1 || +(inputs.Burnable) > burnable || inputs.Burnable == undefined) ? " btn-disabled" : " ")
                              + (btnState == "loading" ? " loading" : "")}>
                              Burn</a>
                            {/* <a href="#burnModal" className="btn">open modal</a> */}
                          </div>
                        </div>
                      ) : (
                        <div className=" w-full md:w-60 mr-6 mt-9">
                          <p className=" mb-2 text-center font-normal text-sm text-invar-light-grey">Burnable</p>
                          <p className=" text-center font-semibold text-3xl ">{burnable}</p>
                          <button className={`btn mt-3 w-full h-[40px] font-semibold text-base text-white border-none normal-case rounded`
                            + (burnable == 0 ? " bg-invar-disabled btn-disabled" : " bg-invar-dark")}
                            onClick={() => setopenact("Burnable")}>
                            Burn</button>
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
      <div id="stakeModal" className="modal bg-[#000000b6] ">
        <div className="modal-box p-9 w-[432px] bg-invar-main-purple rounded">
          <h3 className=" font-semibold text-xl text-center">Are you sure to stake {inputs.Balance} NFT(s)?</h3>
          <div className="modal-action">
            <a href="#" className="btn mt-3 bg-transparent w-[140px] md:w-[114px] h-[40px] font-semibold text-base border-invar-dark normal-case rounded text-invar-light-grey" onClick={() => setopenact("")} >
              Cancel</a>
            <a href="#" className={`btn mt-3 ml-3 bg-invar-dark w-[140px] md:w-[114px] h-[40px] font-semibold text-base text-white border-none normal-case rounded`
              + (btnState == "loading" ? " loading" : "")}
              onClick={() => stake()}>
              Confirm</a>
          </div>
        </div>
      </div>
      <div id="unstakeModal" className="modal bg-[#000000b6] ">
        <div className="modal-box p-9 w-[432px] bg-invar-main-purple rounded">
          <h3 className=" font-semibold text-xl text-center">Are you sure to unstake {inputs.unstake} NFT(s)?</h3>
          <div className="modal-action">
            <a href="#" className="btn mt-3 bg-transparent w-[140px] md:w-[114px] h-[40px] font-semibold text-base border-invar-dark normal-case rounded text-invar-light-grey" onClick={() => setopenact("")} >
              Cancel</a>
            <a href='#' className={`btn mt-3 ml-3 bg-invar-dark w-[140px] md:w-[114px] h-[40px] font-semibold text-base text-white border-none normal-case rounded`
              + (btnState == "loading" ? " loading" : "")}
              onClick={() => unstake()}>
              Confirm</a>
          </div>
        </div>
      </div>
      <div id="burnModal" className="modal bg-[#000000b6] ">
        <div className="modal-box p-9 w-[432px] bg-invar-main-purple rounded">
          <h3 className=" font-semibold text-xl text-center">Are you sure to unstake X NFT(s)?</h3>
          <div className="modal-action">
            <a href="#" className="btn mt-3 bg-transparent w-[140px] md:w-[114px] h-[40px] font-semibold text-base border-invar-dark normal-case rounded text-invar-light-grey" onClick={() => setopenact("")} >
              Cancel</a>
            <button className={`btn mt-3 ml-3 bg-invar-dark w-[140px] md:w-[114px] h-[40px] font-semibold text-base text-white border-none normal-case rounded`
              + (btnState == "loading" ? " loading" : "")}
              onClick={() => burn()}>
              Confirm</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nfts