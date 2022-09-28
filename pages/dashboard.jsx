import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useAddress, useNetwork } from '@thirdweb-dev/react'
import { Navbar, TogActivity, TogWhite, TogUnstake, TogClaim, TogRedeem, Form, FormInfo, Footer, Nfts } from '../components/'
import { getUser } from "../src/utils/storeFirebase";
import Image from 'next/image'

const Dashboard = () => {
  const headerBackground = true
  const [tabState, setTabState] = useState("nfts")
  const address = useAddress();
  const network = useNetwork();
  const [verify, setVerify] = useState("Unverified")
  // const [verifyState, setVerifyState] = useState()
  const [hispresale, sethispresale] = useState()
  const [hiswhiteapply, sethiswhiteapply] = useState()
  const [inputs, setInputs] = useState({ ["address"]: address, ["time"]: new Date(Date.now()), selectType: "All" });
  const [showtog, setshowtog] = useState("All")
  const [starttime, setstarttime] = useState()
  const [endtime, setendtime] = useState()
  const [fmenu, setfmenu] = useState(false)

  async function getdata() {
    const state = await getUser(address)
    // if (verifyState !== state) {  //useState 會重跑整個程式，觸發useEffect，所以getdata不能放在useEffect，(不對，是useeffect的hook不能放network)
    console.log("state", state)
    setVerify(state)
    // setVerifyState(state)
    // }
  }

  useEffect(() => {
    if (!address) {
      setTabState("nfts")
      return
    }
    // domain = window.location.origin;
    // if (inputs.address !== address) {
    //   setInputs((values) => ({ ...values, ["address"]: address, ["domain"]: window.location.href }))
    // }
    // provider = new ethers.providers.Web3Provider(window.ethereum);
    // signer = provider.getSigner()  
    getdata()
  }, [address]);

  // useEffect(() => {
  //   if (!address) {
  //     setTabState("nfts")
  //     return
  //   }
  //   getdata()
  // }, []);

  let verifySection =
    <div className="mb-[32px] w-full md:w-[214px] md:min-w-[214px] h-[214px] flex flex-col justify-start items-center rounded overflow-hidden">
      <div className="h-[168px] w-full flex flex-col justify-start items-center bg-invar-main-purple ">
        <img className=' mt-[36px] w-16 h-16' src="/icons/ic_unverified.png" alt="" />
        <p className="mt-[35px] text-center">My verification status</p>
      </div>
      <div className=" h-[46px] w-full bg-invar-dark bg-opacity-[0.13] flex justify-center items-center text-center font-semibold text-lg text-invar-error">
        Unverified
      </div>
    </div>

  if (verify == "Rejected") {
    verifySection =
      <div className="mb-[32px] w-full md:w-[214px] md:min-w-[214px] h-[214px] flex flex-col justify-start items-center rounded">
        <div className="h-[168px] w-full flex flex-col justify-start items-center bg-invar-main-purple ">
          <img className=' mt-[36px] w-16 h-16' src="/icons/ic_unverified.svg" alt="" />
          <p className="mt-[35px] text-center">My verification status</p>
        </div>
        <div className=" h-[46px] w-full bg-invar-dark bg-opacity-[0.13] flex justify-center items-center text-center font-semibold text-lg text-invar-error">
          Rejected
        </div>
      </div>
  } else if (verify == "Pending") {
    verifySection =
      <div className="mb-[32px] w-full md:w-[214px] md:min-w-[214px] h-[214px] flex flex-col justify-start items-center rounded">
        <div className="h-[168px] w-full flex flex-col justify-start items-center bg-invar-main-purple ">
          <img className=' mt-[36px] w-16 h-16' src="/icons/ic_time.svg" alt="" />
          <p className="mt-[35px] text-center">My verification status</p>
        </div>
        <div className=" h-[46px] w-full bg-invar-dark bg-opacity-[0.13] flex justify-center items-center text-center font-semibold text-lg text-invar-validation">
          In Process
        </div>
      </div>
  } else if (verify == "Accepted") {
    verifySection =
      <div className="mb-[32px] w-full md:w-[214px] md:min-w-[214px] h-[214px] flex flex-col justify-start items-center rounded">
        <div className="h-[168px] w-full flex flex-col justify-start items-center bg-invar-main-purple ">
          <img className=' mt-[36px] w-16 h-16' src="/icons/ic_verified.svg" alt="" />
          <p className="mt-[35px] text-center">My verification status</p>
        </div>
        <div className=" h-[46px] w-full bg-invar-dark bg-opacity-[0.13] flex justify-center items-center text-center font-semibold text-lg text-invar-success">
          Verified
        </div>
      </div>
  }

  const handleChange = (event) => {
    // if (submitState != "") return
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
    console.log(inputs)
  }

  const handleSubmit = async (event) => { //資料符合才會跑以下
    event.preventDefault()
    setshowtog(inputs.selectType)
    let start = inputs.selectStartDate
    let startday = start.slice(8, 10)
    let startmonth = start.slice(5, 7)
    let startyear = start.slice(0, 4)
    let startDate = (new Date(startyear, startmonth - 1, startday)).getTime()
    setstarttime(startDate)
    let end = inputs.selectEndDate
    let endday = +(end.slice(8, 10)) + 1
    let endmonth = end.slice(5, 7)
    let endyear = end.slice(0, 4)
    let endDate = (new Date(endyear, endmonth - 1, endday)).getTime()
    setendtime(endDate)
    // console.log(typeof inputs.selectStartDate, startday, startmonth, startyear, startDate)
    setfmenu(false)

  }

  function reset() {
    setInputs({ ["address"]: address, ["time"]: new Date(Date.now()), selectType: "All" })
  }

  return (
    <div >
      <Navbar headerBackground={headerBackground} />
      <div className=" min-w-full max-w-full relative overscroll-none overflow-hidden h-full bg-gradient-to-b from-[#44334C] to-[#1E1722]
         text-white">
        <img className=' hidden lg:flex absolute top-14 right-[-158px] w-[685px] h-[359px] z-0 ' src="/bg/bg_03.png" alt="" />
        <img className=' hidden lg:flex absolute bottom-0 -left-1/4 w-[800px] h-[400px] z-0 ' src="/bg/bg_05.png" alt="" />
        <div className=" px-4 md:px-16 lg:px-[231px] pt-[60px] md:pt-[80px]">
          <p className=' mt-[32px] md:mt-[45px] font-semibold text-2xl'>Dashboard</p>
          {/* <div className=' mt-[32px] md:mt-[45px] font-semibold text-2xl'>Dashboard{verifyState}</div> */}
          <div className="flex z-10">
            <button className={"pb-2 mr-9 mt-[29px] h-[36px] w-[58px] text-sm font-semibold text-center"
              + (tabState == "nfts" ? ' text-white border-b-2 border-t-2 border-t-transparent' : ' text-invar-light-grey hover:text-white border-0  ')}
              onClick={() => { setTabState("nfts") }}>
              NFTs</button>
            <button className={"pb-2 mr-9 mt-[29px] h-[36px] w-[58px] text-sm font-semibold text-center"
              + (tabState == "activity" ? ' text-white border-b-2 border-t-2 border-t-transparent' : ' text-invar-light-grey hover:text-white border-0  ')}
              onClick={() => { setTabState("activity") }}>
              Activity</button>
            {address &&
              <button className={"pb-2 mr-9 mt-[29px] h-[36px] w-[58px] text-sm font-semibold text-center"
                + (tabState == "profile" ? ' text-white border-b-2 border-t-2 border-t-transparent' : ' text-invar-light-grey hover:text-white border-0  ')}
                onClick={() => setTabState("profile")}>
                Profile</button>
            }
          </div>
        </div>
        {(tabState == "activity") &&
          <div className="relative min-h-[70vw] w-full border-t border-invar-main-purple">
            <div className=" md:hidden max-w-full mt-4 h-10 bg-invar-main-purple rounded flex justify-center items-center text-sm font mx-[30px] sm:mx-[30px] md:mx-[130px] lg:mx-[230px] "
              onClick={() => setfmenu(!fmenu)}>
              <img src="/icons/filt.png" alt="" className=" w-4 h-4 mr-2" />
              Filter
            </div>
            <form className=" hidden md:flex justify-between my-9 mx-[30px] sm:mx-[30px] md:mx-[130px] lg:mx-[230px] max-w-full z-10 " onSubmit={handleSubmit} name="form">
              <div className=' flex'>
                <label className="w-[238px] mb-6 block mr-4">
                  <div className="relative flex bg-invar-main-purple rounded items-center">
                    <p className=" ml-3 text-invar-light-grey font-normal text-sm">Item</p>
                    <select name="selectIDtype" onChange={handleChange} value={inputs.selectIDtype || ""}
                      required className="appearance-none block bg-invar-main-purple w-full h-10 rounded 
                     cursor-pointer focus:outline-none text-white font-normal pl-[15px] pr-[40px] text-end">
                      <option value="All">All</option>
                      <option value="Amwaj20">Amwaj20</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                  </div>
                </label>
                <label className="w-[216px] mb-6 block mr-4">
                  <div className="relative flex bg-invar-main-purple rounded items-center">
                    <p className=" ml-3 text-invar-light-grey font-normal text-sm">Type</p>
                    <select name="selectType" onChange={handleChange} value={inputs.selectType || ""}
                      required className="appearance-none block bg-invar-main-purple w-full h-10 rounded 
                     cursor-pointer focus:outline-none text-white font-normal pl-[15px] pr-[40px] text-end">
                      <option value="All">All</option>
                      <option value="Pre-Sale">Minting</option>
                      <option value="Whitelist">Whitelist</option>
                      {/* <option value="Public Sale">Public Sale</option> */}
                      <option value="Unstake">Unstake</option>
                      <option value="Claim">Claim</option>
                      <option value="Redemption">Redemption</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                    </div>
                  </div>
                </label>
                <label className=" mb-6 mr-4 flex">
                  <div className="relative flex bg-invar-main-purple rounded items-center">
                    <input
                      name="selectStartDate" type="date" onChange={handleChange} value={inputs.selectStartDate || ""}
                      required className="block bg-invar-main-purple w-full h-10 rounded  outline-none text-white font-normal pl-[15px] appearance-none"
                    />
                    <div className=" pointer-events-none absolute inset-y-0 right-[5px] flex items-center  text-white">
                      <img className=" w-4 h-4 cursor-pointer" src="/icons/ic_calendar.png" alt="" />
                    </div>
                  </div>
                  <div className="relative flex bg-invar-main-purple rounded items-center">
                    <img className=" mx-2 w-4 h-4 " src="/icons/ic_right.svg" alt="" />
                    <input
                      name="selectEndDate" type="date" onChange={handleChange} value={inputs.selectEndDate || ""}
                      required className="block bg-invar-main-purple w-full h-10 rounded  outline-none text-white font-normal pl-[15px] appearance-none"
                    />
                    <div className=" pointer-events-none absolute inset-y-0 right-[5px] flex items-center  text-white">
                      <img className=" w-4 h-4 cursor-pointer mr-2" src="/icons/ic_calendar.png" alt="" />
                    </div>
                  </div>
                </label>
              </div>
              <div className="flex">
                <input
                  type="submit" value="Search"
                  className="btn btn-sm inline-block bg-invar-dark hover:bg-invar-main-purple rounded text-white px-6 py-2 h-10 normal-case text-sm font-semibold cursor-pointer border-none"
                />
                <div className=' btn btn-sm inline-block bg-transparent hover:bg-invar-main-purple rounded text-invar-light-grey ml-2 px-6 py-2 h-10 normal-case text-sm font-semibold cursor-pointer border-invar-dark ' onClick={() => reset()}>Reset</div>
              </div>
            </form>
            <div className=" mt-3"></div>
            {(address && (inputs.selectType == "All" || inputs.selectType == "Unstake")) &&
              <TogUnstake start={starttime} end={endtime} />
            }
            {(address && (inputs.selectType == "All" || inputs.selectType == "Claim")) &&
              <TogClaim start={starttime} end={endtime} />
            }
            {(address && (inputs.selectType == "All" || inputs.selectType == "Pre-Sale")) &&
              <TogActivity hispresale={hispresale} sethispresale={sethispresale} start={starttime} end={endtime} />
            }
            {(address && (inputs.selectType == "All" || inputs.selectType == "Redemption")) &&
              <TogRedeem hispresale={hispresale} sethispresale={sethispresale} start={starttime} end={endtime} />
            }
            {(address && (inputs.selectType == "All" || inputs.selectType == "Whitelist")) &&
              <TogWhite sethiswhiteapply={sethiswhiteapply} start={starttime} end={endtime} />
            }
            {(address && (hispresale?.length == 0) && (hiswhiteapply == undefined)) &&
              <div className="w-full h-full flex justify-center items-center">
                <div>
                  <Image width={162} height={200} src='/icons/ic_light.png' alt="" />
                  <p className=" text-lg font-normal text-center text-invar-light-grey">No Activity Found</p>
                </div>
              </div>
            }
          </div>
        }
        {(tabState == "nfts") &&
          <Nfts />
        }
        {(tabState == "profile") &&
          <div className="px-4 md:px-16 lg:px-[231px] pt-[36px] border-t border-invar-main-purple flex flex-col md:flex-row z-30">
            {verifySection}
            <div className="md:ml-[52px] w-full">
              <p className=" text-2xl font-semibold mb-[33px]">Identity Verification</p>
              {(verify == "Rejected" || verify == "Unverified") &&
                <Form />
              }
              {(verify == "Pending" || verify == "Accepted") &&
                <FormInfo />
              }
              {/* <FormInfo /> */}

            </div>
          </div>
        }

        {fmenu &&
          <form
            onSubmit={handleSubmit} name="form"
            className=" fixed top-[60px] z-30 w-full h-screen py-[24px] px-[16px] flex flex-col justify-start items-start md:hidden text-white bg-gradient-to-b from-primary to-[#1E1722]"
          >
            <div className="flex justify-between w-full">
              <h1 className="font-semibold text-xl mb-7 cursor-pointer">Filters</h1>
              <div
                onClick={() => setfmenu(!fmenu)}
                className="btn btn-sm p-0 bg-transparent border-none hover:bg-transparent">
                <img className="h-[20px] w-[20px]" src='/icons/ic_close.svg' alt="" />
              </div>
            </div>
            <label className="w-full mb-6 block mr-4">
              <p className=" text-invar-light-grey font-normal text-sm">Item</p>
              <div className=" relative flex bg-invar-main-purple rounded items-center">
                <select name="selectIDtype" onChange={handleChange} value={inputs.selectIDtype || ""}
                  required className="appearance-none block bg-invar-main-purple w-full h-10 rounded 
                     cursor-pointer focus:outline-none text-white font-normal pl-[15px] pr-[40px] text-start">
                  <option value="All">All</option>
                  <option value="Amwaj20">Amwaj20</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </label>
            <label className="w-full mb-6 block mr-4">
              <p className=" mb-1 text-invar-light-grey font-normal text-sm">Type</p>
              <div className="relative flex bg-invar-main-purple rounded items-center">
                <select name="selectType" onChange={handleChange} value={inputs.selectType || ""}
                  required className="appearance-none block bg-invar-main-purple w-full h-10 rounded 
                     cursor-pointer focus:outline-none text-white font-normal pl-[15px] pr-[40px] text-start">
                  <option value="All">All</option>
                  <option value="Pre-Sale">Minting</option>
                  <option value="Whitelist">Whitelist</option>
                  {/* <option value="Public Sale">Public Sale</option> */}
                  <option value="Unstake">Unstake</option>
                  <option value="Claim">Claim</option>
                  <option value="Redemption">Redemption</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
              </div>
            </label>
            <p className=" mb-1 text-invar-light-grey font-normal text-sm">Date</p>
            <label className=" w-full mb-6 flex bg-invar-main-purple">
              <div className="relative flex bg-invar-main-purple rounded items-center">
                <input
                  name="selectStartDate" type="date" onChange={handleChange} value={inputs.selectStartDate || ""}
                  required className="block bg-invar-main-purple w-full h-10 rounded  outline-none text-white font-normal pl-[15px] appearance-none"
                />
                <div className=" pointer-events-none absolute inset-y-0 right-[5px] flex items-center  text-white">
                  <img className=" w-4 h-4 cursor-pointer" src="/icons/ic_calendar.png" alt="" />
                </div>
              </div>
              <div className="relative flex bg-invar-main-purple rounded items-center">
                <img className=" mx-2 w-4 h-4 " src="/icons/ic_right.svg" alt="" />
                <input
                  name="selectEndDate" type="date" onChange={handleChange} value={inputs.selectEndDate || ""}
                  required className="block bg-invar-main-purple w-full h-10 rounded  outline-none text-white font-normal pl-[15px] appearance-none"
                />
                <div className=" pointer-events-none absolute inset-y-0 right-[5px] flex items-center  text-white">
                  <img className=" w-4 h-4 cursor-pointer mr-2" src="/icons/ic_calendar.png" alt="" />
                </div>
              </div>
            </label>
            <div className="flex absolute bottom-20">
              <input
                type="submit" value="Search"
                className=" w-full btn btn-sm inline-block bg-invar-dark hover:bg-invar-main-purple rounded text-white px-6 py-2 h-10 normal-case text-sm font-semibold cursor-pointer border-none"
              />
              <div className=' flex-grow w-full btn btn-sm inline-block bg-transparent hover:bg-invar-main-purple rounded text-invar-light-grey ml-2 -mr-2 px-6 py-2 h-10 normal-case text-sm font-semibold cursor-pointer border-invar-dark ' onClick={() => reset()}>Reset</div>
            </div>
          </form>
        }
        <div className=" h-96 md:hidden"></div>
        <Footer />
      </div>
    </div>
  )
}

export default Dashboard
