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
  const [interest, setinterest] = useState()
  const [evestake, setevestake] = useState([{}])
  const [eveunstake, seteveunstake] = useState([{}])
  const [infos, setinfos] = useState()
  const [openinfo, setopeninfo] = useState(false)
  const [tabState, setTabState] = useState("staking")
  const [openact, setopenact] = useState()
  const [inputs, setInputs] = useState({});
  const [btnState, setBtnState] = useState()
  const [showtoast, setshowtoast] = useState(false)
  const [t, sett] = useState("sdc")
  const [stkinfo, setstkinfo] = useState()
  let numstake
  let numunstake

  useEffect(() => {
    getNfts()
  }, [])

  let toast =
    <div className=' w-[52px] bg-black fixed bottom-20 left-0 right-0'>
      <div className=" text-center">ji{t}</div>
    </div>

  // function successToast(s) {
  //   // return (
  //   console.log("asd activity")
  //   toast = <div className=''>
  //     {s && s}
  //   </div>
  //   sett("toast")
  //   // )
  // }

  async function getNfts() {
    // successToast("hoijoijh")
    console.log("get activity")
    if (!address) return
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const nftContract = new ethers.Contract(nftAddress, inVariaJSON.abi, provider);
    const query = await nftContract["balanceOf(address)"](address)
    console.log("query", query.toString())
    setnfts(query.toString())
    const stakeContract = new ethers.Contract(stakeAddress, stakeABI, signer);
    const stakebal = (await stakeContract.nftBalance(address))
    setstaked(stakebal.stakingAmount.toString())
    const burnbal = (await stakeContract.BurnNftInfo(address)).toString()
    setburnable(burnbal)
    const intersts = +((await stakeContract.CheckClaimValue(address)).toString()) / 1000000
    setinterest(intersts)
    console.log("trans", stakebal.stakingAmount.toString(), burnbal, intersts)
    // const stk = (await stakeContract.stakingInfo(address))
    // console.log(stk,"stk")
    // ///////
    const filter = (stakeContract.filters.stakeInfo(address, null, null, null))
    const qq = await stakeContract.queryFilter(filter)
    console.log("qq", qq, stakeAddress, nftAddress)
    let infosarr = []
    let stkarr = []

    const items = await Promise.all(qq?.map(async (i, index) => {
      const blockTime = new Date((i.args.stakeTime) * 1000)
      // numstake = numstake + (i.args.amount).toNumber()
      const item = {
        date: blockTime.toString(),
        year: blockTime.getFullYear(),
        month: blockTime.getMonth() + 1,
        day: blockTime.getDate(),
        amount: (i.args.amount).toNumber(),
        // staked: numstake,
        // unstaked: numunstake,
        txid: `${i.transactionHash}`,
      }
      try {
        // console.log(" burningInfo")

        const stakebal = await stakeContract.burningInfo(address, index)
        // console.log("stakebal",stakebal)

        const stk = (await stakeContract.stakingInfo(address, index))

        // console.log("stk",stk)

        infosarr.push(stakebal)
        stkarr.push(stk)
      } catch (error) {
        console.log("error burningInfo")
      }
      return item
    }))
    /////
    const unfilter = (stakeContract.filters.unStakeInfo(address, null, null))
    const unqq = await stakeContract.queryFilter(unfilter)
    console.log("unqq", unqq, stakeAddress, nftAddress)
    const unitems = await Promise.all(unqq?.map(async (i, index) => {
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
    console.log("in", stkarr)
    setinfos(infosarr)
    setstkinfo(stkarr)
    setevestake(items)
    seteveunstake(unitems)
  }

  const stake = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const stakeContract = new ethers.Contract(stakeAddress, stakeABI, signer);
    try {
      setBtnState("loading")
      // console.log(inputs.Balance, typeof inputs.Balance)
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

  const claim = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const stakeContract = new ethers.Contract(stakeAddress, stakeABI, signer);
    try {
      setBtnState("claiming")
      // console.log(inputs.Burnable, typeof inputs.Burnable)
      const stake = await stakeContract.withDraw()
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
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  return (
    <div className="relative flex min-h-[70vw] w-full border-t border-invar-main-purple">
      {/* {!showtoast && toast} */}
      <div className="px-4 md:px-16 lg:px-[231px] w-full z-10 mt-12 mb-10">
        {(nfts == 0 && staked == 0) ? (
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
                    <div className=" ml-4 mt-6 md:mt-0 w-full md:w-60 ">
                      <p className=" mb-2 text-center font-normal text-sm text-invar-light-grey">Est. Daily Interests (USDC)</p>
                      <p className=" text-center font-semibold text-3xl ">13.124</p>
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
                          <p className={` text-center font-semibold text-3xl` + (nfts == 0 ? "" : " text-invar-success")}>{nfts}</p>
                          <button className={`btn mt-3 w-full h-[40px] font-semibold text-base text-white border-none normal-case rounded`
                            + (nfts == 0 ? " btn-disabled bg-invar-disabled" : " bg-invar-dark ")}

                            onClick={() => setopenact("Balance")}>
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
                          <p className={` text-center font-semibold text-3xl ` + (staked == "0" ? " " : " text-invar-success")}>{staked}</p>
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
                            {nfts >= burnable &&
                              <a href="#burnModal" className={`btn mt-3 ml-3 bg-invar-dark w-[140px] md:w-[114px] h-[40px] font-semibold text-base text-white border-none normal-case rounded`
                                + ((+(inputs.Burnable) < 1 || +(inputs.Burnable) > burnable || inputs.Burnable == undefined) ? " btn-disabled" : " ")
                                + (btnState == "loading" ? " loading" : "")
                              }>
                                Burn</a>
                            }
                            {nfts < burnable &&
                              <a href="#notburnModal" className={`btn mt-3 ml-3 bg-invar-dark w-[140px] md:w-[114px] h-[40px] font-semibold text-base text-white border-none normal-case rounded`
                                + ((+(inputs.Burnable) < 1 || +(inputs.Burnable) > burnable || inputs.Burnable == undefined) ? " btn-disabled" : " ")
                                + (btnState == "loading" ? " loading" : "")
                              }>
                                Burn</a>
                            }
                            {/* <a href="#burnModal" className="btn">open modal</a> */}
                          </div>
                        </div>
                      ) : (
                        <div className=" w-full md:w-60 mr-6 mt-9">
                          <p className=" mb-2 text-center font-normal text-sm text-invar-light-grey">Burnable</p>
                          <p className={` text-center font-semibold text-3xl ` + (burnable == "0" ? " " : " text-invar-success")}>{burnable}</p>
                          <button className={`btn mt-3 w-full h-[40px] font-semibold text-base text-white border-none normal-case rounded`
                            + (burnable == 0 ? " bg-invar-disabled btn-disabled" : " bg-invar-dark")}
                            onClick={() => setopenact("Burnable")}>
                            Burn</button>
                        </div>
                      )}
                      {openact == "Interests" ? (
                        <div className=" w-full md:w-60 mt-9">
                        </div>
                      ) : (
                        <div className=" w-full md:w-60 md:ml-[18px] mt-9">
                          <p className=" mb-2 text-center font-normal text-sm text-invar-light-grey">Total Interests (USDC)</p>
                          <p className={` text-center font-semibold text-3xl ` + (interest == "0" ? " " : " text-invar-success")}>{interest}</p>
                          <button className={`btn mt-3 w-full h-[40px] font-semibold text-base text-white border-none normal-case rounded`
                            + (interest == 0 ? " btn-disabled bg-invar-disabled" : " bg-invar-dark ")
                            + (btnState == "claiming" ? " loading" : "")}
                            onClick={() => claim()}>
                            Claim</button>
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
                    Redemption</button>
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
                    {evestake?.length == 0 ? (
                      <div className=" my-16 w-full flex justify-center items-center">
                        <div>
                          <Image width={162} height={200} src='/icons/ic_light.png' alt="" />
                          <p className=" text-lg font-normal text-center text-invar-light-grey">No Activity Found</p>
                        </div>
                      </div>
                    ) : (
                      stkinfo?.map((eve, index) => (
                        <div key={index} className=" py-4 flex justify-between border-b border-invar-main-purple text-white font-normal text-base">
                          <div className=" text-invar-light-grey">{(new Date(eve?.staketime.toNumber() * 1000)).toString()}</div>
                          <div className=' flex '>
                            <p className=" text-invar-success font-normal ">
                              {eve?.stakeNFTamount.toNumber()}</p>
                            <p className=" ml-6 md:ml-48 mr-9 w-max text-white font-normal ">
                              {eve?.stakeNFTamount.toNumber() - eve?.leftToUnstakeNFTamount.toNumber()}</p>
                          </div>
                        </div>
                      ))
                    )}
                    {/* {eveunstake?.map((eve, index) => (
                        <div key={index} className=" py-4 flex justify-between border-b border-invar-main-purple text-white font-normal text-base">
                          <div className=" text-invar-light-grey">{eve?.date}</div>
                          <div className=' flex '>
                            <p className=" text-white  font-normal ">
                              0</p>
                            <p className=" ml-6 md:ml-48 mr-9 w-max text-invar-success font-normal ">
                              {eve?.amount}</p>
                          </div>
                        </div>
                      ))
                    } */}
                  </>
                }
                {tabState == "activity" &&
                  <>
                    <div className="flex justify-between border-b w-full border-invar-main-purple">
                      <p className=" pb-3 text-invar-light-grey text-sm font-normal ">
                        Unlock Time</p>
                      <div className=' flex '>
                        <p className=" pb-3 text-invar-light-grey text-sm font-normal ">
                          Locked</p>
                        <p className=" ml-6 md:ml-32 pb-3 text-invar-light-grey text-sm font-normal ">
                          Burnable</p>
                        <p className=" ml-6 md:ml-32 mr-9 w-max pb-3 text-invar-light-grey text-sm font-normal ">
                          Burned</p>
                      </div>
                    </div>
                    {infos?.length == 0 ? (
                      <div className=" my-16 w-full flex justify-center items-center">
                        <div>
                          <Image width={162} height={200} src='/icons/ic_light.png' alt="" />
                          <p className=" text-lg font-normal text-center text-invar-light-grey">No Activity Found</p>
                        </div>
                      </div>
                    ) : (
                      infos?.map((eve, index) =>
                      (
                        <>{eve?.isBurn == false &&
                          <div key={index} className=" py-4 flex justify-between border-b border-invar-main-purple text-white font-normal text-base">
                            <div className=" text-invar-light-grey">{(new Date((eve?.locktime.toNumber()) * 1000)).toString()}</div>
                            <div className=' flex '>
                              <p className=" text-invar-success font-normal ">
                                {eve?.burnableNFTamount.toString()}</p>
                              <p className=" ml-6 md:ml-44 text-invar-success font-normal ">
                                {eve?.leftToBurnNFTamount.toString()}</p>
                              <p className=" ml-6 md:ml-40 mr-9 w-max text-white font-normal ">
                                {eve?.burnableNFTamount.toNumber() - eve?.leftToBurnNFTamount.toNumber()}</p>
                            </div>
                          </div>
                        }
                        </>
                      )
                      )
                    )}
                  </>
                }
              </>
            )
            }
          </>
        )}
      </div>

      {/* modals */}

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
          <h3 className=" font-semibold text-xl text-center">Are you sure to burn {inputs.Burnable} NFT(s)?</h3>
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
      <div id="notburnModal" className="modal bg-[#000000b6] ">
        <div className="modal-box p-9 w-[423px] bg-invar-main-purple rounded">
          <h3 className=" font-semibold text-xl text-center">Please unstake NFT(s) to proceed
            redemption/burn.</h3>
          <div className="modal-action w-full flex justify-center">
            <a href="#" className="btn mt-3 bg-invar-dark w-[140px] md:w-[114px] h-[40px] font-semibold text-base border-invar-dark normal-case rounded text-white" onClick={() => setopenact("")} >
              OK</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Nfts