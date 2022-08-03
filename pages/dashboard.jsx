import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useAddress, useNetwork } from '@thirdweb-dev/react'
import { Navbar, TogActivity, Form, FormInfo, Footer } from '../components/'
import { getUser } from "../src/utils/storeFirebase";

const Dashboard = () => {
  const headerBackground = true
  const [tabState, setTabState] = useState("activity")
  const address = useAddress();
  const network = useNetwork();
  const [verify, setVerify] = useState("Unverified")
  // const [verifyState, setVerifyState] = useState()

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
      setTabState("activity")
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
          <TogActivity />
        }
        {(tabState == "profile") &&
          <div className="px-4 md:px-16 lg:px-[231px] pt-[36px] border-t border-invar-main-purple flex flex-col md:flex-row z-30">
            {verifySection}
            <div className="md:ml-[52px] w-full">
              <p className=" text-2xl font-semibold mb-[33px]">Identity Verification</p>
              {(verify == "Rejected" || verify == "Unverified") &&
                <Form />
              }
              {(verify == "Pending" || verify == "Verified") &&
                <FormInfo />
              }
                              {/* <FormInfo /> */}

            </div>
          </div>
        }
        <Footer />
      </div>
    </div>
  )
}

export default Dashboard
