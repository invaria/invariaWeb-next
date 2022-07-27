import React, { useEffect, useState } from 'react'
import { Navbar,TogActivity, Form, Footer } from '../components/'

const Dashboard = () => {
  const headerBackground = true
  const [tabState, setTabState] = useState("activity")

  return (
    <div>
      <Navbar headerBackground={headerBackground} />
      <div className=" min-w-full max-w-full relative overscroll-none overflow-hidden h-full bg-gradient-to-b from-[#44334C] to-[#1E1722]
         text-white">
        <div className=" px-4 md:px-16 lg:px-[231px] pt-[60px] md:pt-[80px]">
          <div className=' mt-[32px] md:mt-[45px] font-semibold text-2xl'>Dashboard</div>
          <div className="flex">
            <button className={"pb-2 mr-9 mt-[29px] h-[36px] w-[58px] text-sm font-semibold text-center"
              + (tabState == "activity" ? ' text-white border-b-2 border-t-2 border-t-transparent' : ' text-invar-light-grey hover:text-white border-0  ')}
              onClick={() => setTabState("activity")}>
              Activity</button>
            <button className={"pb-2 mr-9 mt-[29px] h-[36px] w-[58px] text-sm font-semibold text-center"
              + (tabState == "profile" ? ' text-white border-b-2 border-t-2 border-t-transparent' : ' text-invar-light-grey hover:text-white border-0  ')}
              onClick={() => setTabState("profile")}>
              Profile</button>
          </div>
        </div>
        {(tabState == "activity") &&
          <TogActivity />
        }
        {(tabState == "profile") &&
          <div className="px-4 md:px-16 lg:px-[231px] pt-[36px] border-t border-invar-main-purple flex flex-col md:flex-row">
            <div className="mb-[32px] w-full md:w-[214px] md:min-w-[214px] h-[214px] flex flex-col justify-start items-center rounded">
              <div className="h-[168px] w-full flex flex-col justify-start items-center bg-invar-main-purple ">
                <img className=' mt-[40px] w-10 h-10' src="/icons/ic_unverified.png" alt="" />
                <p className="mt-[39px] text-center">My verification status</p>
              </div>
              <div className=" h-[46px] w-full bg-invar-dark bg-opacity-[0.13] flex justify-center items-center text-center font-semibold text-lg text-invar-error">
                Unverified</div>
            </div>
            <div className="md:ml-[52px] w-full">
              <p className=" text-2xl font-semibold mb-[33px]">Identity Verification</p>
              <Form />
            </div>
          </div>
        }
        <Footer />
      </div>
    </div>
  )
}

export default Dashboard
