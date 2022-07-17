import React, { useEffect } from 'react'
import { Navbar, Form, Footer } from '../components/'

const dashboard = () => {
  const headerBackground = true

  return (
    <div>
      <Navbar headerBackground={headerBackground} />
      <div className=" min-w-full max-w-full relative overscroll-none overflow-hidden h-full bg-gradient-to-b from-[#44334C] to-[#1E1722]
         text-white">
        <div className=" px-4 md:px-16 lg:px-[231px] pt-[60px] md:pt-[80px]">
          <div className=' mt-[32px] md:mt-[45px] font-semibold text-2xl'>Dashboard</div>
          <div className=' relative mt-[29px] h-[36px] w-[50px] border-b-2 text-base font-semibold'>
            Profile
          </div>
        </div>
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
        <Footer />
      </div>
    </div>
  )
}

export default dashboard
