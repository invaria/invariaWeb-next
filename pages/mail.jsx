import React from 'react'

const mail = () => {
  return (
    <div className=" w-full h-full bg-gradient-to-b from-[#44334C] to-[#1E1722]
     flex flex-col justify-start items-center pb-16 px-4">
      <img className="m-[68px] w-[168px] h-[60px]" src="https://i.imgur.com/3wl4wkZ.png" alt="" />
      <img className="w-[366px] h-[192px] absolute top-0 right-[0px]" src="https://i.imgur.com/6gBfpRA.png" alt="" />
      <img className="w-[286px] h-[146px] md:w-[386px] md:h-[246px] absolute bottom-[190px] left-[0px]" src="https://i.imgur.com/LFyW2bL.png" alt="" />
      <div>
        <p className="text-white font-normal text-base mb-6 text-start">Dear User,</p>
        <p className="text-white font-normal text-sm mb-6">We have received your identity verification application. The process may take up to 10 workdays. We will notify you when the KYC process is completed.
          <br /><br />
          If you have any questions, please contact us by <a className=' font-semibold text-invar-purple hover:underline' href='mailto:info@invar.finance' target="_blank" rel="noopener noreferrer">
            info@invar.finance
          </a>.
          <br /><br />
          Regards,
          <br /><br />
          InVaria 2222 Team</p>
        <p className="mt-6  text-invar-light-grey font-normal text-xs pb-[52px] border-b border-invar-main-purple">THIS IS AN AUTOMATICALLY GENERATED EMAIL, PLEASE DON'T REPLY.</p>
      </div>
      <p className="my-6 text-base font-semibold text-invar-light-purple ">Explore Crypto Desert on Next-Gen</p>
      <div className="flex mb-1">
        <button>
        <img className=" bg-transparent w-[40px] h-[40px] mr-1" src="https://i.imgur.com/PHGLpIT.png" alt="" />
        </button>
        <button>
        <img className="w-[40px] h-[40px] " src="https://i.imgur.com/6gBfpRA.png" alt="" />
        </button>
      </div>
      <p className=" text-invar-light-grey ">© 2022 InVaria 2222</p>
    </div>
  )
}

export default mail
