import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar, Footer } from '../components/'

const PropertyInfo = () => {
  const headerBackground = true
  const [tabState, setTabState] = useState("property")

  const fixedinfo =
    <div className=' mb-9'>
      <img className="w-full" src='/bg/amwaj20.png' alt="" />
      <div className="w-full h-[72px] mt-3 rounded py-4 px-6 bg-invar-main-purple hover:bg-[#37293E]
        flex justify-between items-center"
        >
        <div className=" text-white font-semibold text-base">
          Letter of Authorization
          <p className=" text-sm font-normal text-invar-light-grey">(The Property is Own and Manage by FlowBay)</p>
        </div>
        <img src="/icons/upright.svg" alt="" />
      </div>
      <a className="w-full h-[72px] mt-3 rounded py-4 px-6 bg-invar-main-purple hover:bg-[#37293E]
        flex justify-between items-center"
        href="https://drive.google.com/file/d/1mhizTtoZxGI_4YEJxXKRTz4A61DthVsy/view"
        rel="noreferrer"
        target="_blank">
        <div className=" text-white font-semibold text-base">
          Property Brochure
        </div>
        <img src="/icons/upright.svg" alt="" />
      </a>
    </div>

  return (
    <div >
      <Navbar headerBackground={headerBackground} />
      <div className=" min-w-full max-w-full relative overflow-hidden h-full bg-gradient-to-b from-[#44334C] to-[#1E1722]
       text-white">
        <div className=" fixed mt-[135px] right-1/2 w-[466px] hidden md:block md:mx-3">
          {fixedinfo}
        </div>
        <img className=' hidden lg:flex absolute top-[400px] right-[-158px] w-[685px] h-[359px] z-0 ' src="/bg/bg_03.png" alt="" />
        <img className=' hidden lg:flex absolute bottom-0 -left-1/4 w-[800px] h-[400px] z-0 ' src="/bg/bg_05.png" alt="" />
        <div className=" px-[30px] sm:px-8 md:px-16 lg:px-[231px] pt-[60px] md:pt-[80px] flex flex-col md:flex-row mt-[32px] md:mt-[45px]">
          <div className=" w-full md:w-1/2 md:max-w-1/2">
            <div className="block md:hidden md:mx-3">
              {fixedinfo}
            </div>
          </div>
          <div className=' w-full md:w-1/2 md:pl-3'>
            <p className=" font-semibold text-2xl md:text-3xl"> The First Luxury Property from 2015</p>
            <p className=" mt-2 text-base md:text-xl mb-[38px]"> Amwaj20 · Amwaj Islands, Bahrain</p>
            <div className="flex z-10 border-b-2 border-invar-main-purple">
              <button className={"pb-2 mr-9 h-[36px] w-[110px] text-sm font-semibold text-center"
                + (tabState == "property" ? ' text-white border-b-2 border-t-2 border-t-transparent' : ' text-invar-light-grey hover:text-white border-0  ')}
                onClick={() => setTabState("property")}>
                Property Details</button>
              <button className={"pb-2 mr-9 h-[36px] w-[98px] text-sm font-semibold text-start"
                + (tabState == "about" ? ' text-white border-b-2 border-t-2 border-t-transparent' : ' text-invar-light-grey hover:text-white border-0  ')}
                onClick={() => setTabState("about")}>
                About Bahrain</button>
            </div>
            {(tabState == "property") &&
              <>
                <div className=" py-6 border-b border-invar-main-purple">
                  Amwaj20 is a deluxe type of service apartment which built in Amwaj Island in 2015. Amwaj Islands are a group of man-made
                  islands, located in the Persian Gulf to the northeast of Bahrain, near the coast of Muharraq island.
                  They lie 10.5 km (6.5 mi) northeast of the capital, Manama.
                  <br /><br />
                  The islands have a unique character, dominated by the clear azure waters and the active life that it encourages its residents to have.
                  The balance of residential, commercial, and leisure living has succeeded in making Amwaj Islands properties
                  a favorite option among professional expatriate residents of Bahrain.
                  <br /><br />
                  The height of sophisticated style and modern elegance, Amwaj20 oﬀers state of the art new accommodation,
                  services and facilities. Located in the heart of Amwaj Islands, the property is within walking distance
                  from the famous Amwaj Marina and the Amwaj Lagoon.
                  It is only a few minutes drive from Bahrain International Airport and is conveniently accessible to both leisure and business districts of Manama.
                  <br /><br />
                  Amwaj20&apos;s 94 apartments are designed with an eye for detail and equipped with deluxe amenities for ultimate comfort and convenience.
                  The property comprises 20 floors and is leased in its entirety to Gulf Air BSC (c) for its staff till now (2022).
                </div>
                <p className=" mt-6 text-xl font-semibold ">Financial Information</p>
                <div className="grow my-[22px] grid grid-cols-1 md:grid-cols-2 gap-1 border-b border-invar-main-purple">
                  <div className=" font-normal mb-6">
                    <p className=" text-invar-light-grey text-xs mb-[2px]">Market Value ($)</p>
                    <p className=" text-white text-base">$38,000,000 USD</p>
                  </div>
                  <div className=" font-normal mb-6">
                    <p className=" text-invar-light-grey text-xs mb-[2px]">Tokenized Value ($)</p>
                    <p className=" text-white text-base">$2,500,000 USD</p>
                  </div>
                  <div className=" font-normal mb-6">
                    <p className=" text-invar-light-grey text-xs mb-[2px]">Rental Income / Year ($)</p>
                    <p className=" text-white text-base">$20,000,000 USD</p>
                  </div>
                  <div className=" font-normal mb-6 w-[180px]">
                    <p className=" text-invar-light-grey text-xs mb-[2px]">Expected Income (%)</p>
                    <p className=" text-white text-base">12%  *≈ (Rental Income - Costs) / Tokenized Value</p>
                  </div>
                </div>
                <p className=" mt-6 text-xl font-semibold ">Special Features</p>
                <div className="grow my-[22px] grid grid-cols-1 md:grid-cols-2 gap-1 border-b border-invar-main-purple">
                  <div className=" font-normal mb-6">
                    <p className=" text-invar-light-grey text-xs mb-[2px]">Prime Location</p>
                    <p className=" text-white text-base">Strategically located near new island with high proximity to hospital and airport</p>
                  </div>
                  <div className=" font-normal mb-6">
                    <p className=" text-invar-light-grey text-xs mb-[2px]">Defensive Sector</p>
                    <p className=" text-white text-base">Positioned for steady growth with increasing popularity and social activities</p>
                  </div>
                  <div className=" font-normal mb-6 w-[180px]">
                    <p className=" text-invar-light-grey text-xs mb-[2px]">Solid Market</p>
                    <p className=" text-white text-base">Leased to state-owned enterprise and favorable market conditions</p>
                  </div>
                </div>
                <p className=" mt-6 text-xl font-semibold ">Others</p>
                <div className="grow my-[22px] grid grid-cols-1 md:grid-cols-2 gap-1 border-b border-invar-main-purple">
                  <div className=" font-normal mb-6">
                    <p className=" text-invar-light-grey text-xs mb-[2px]">Developer</p>
                    <p className=" text-white text-base">Mannai Group</p>
                  </div>
                  <div className=" font-normal mb-6">
                    <p className=" text-invar-light-grey text-xs mb-[2px]">Manager</p>
                    <p className=" text-white text-base">FlowBay Property Management</p>
                  </div>
                </div>
                <p className=" italic text-invar-light-grey text-xs mb-[96px]">
                  Notice <br /> <br />
                  All financial statements of property yield are best estimates based on current conditions, and may change at any time.
                  <br /> <br />
                  The information above is provided from FlowBay Property Management; some of the information contained herein has been derived from sources that we believe to be reliable but which do not mean any guarantee and is subject to change; however, no assurance can be given you will obtain any return on investment, and there is a risk that you may lose your entire investment.
                </p>
              </>
            }
            {(tabState == "about") &&
              <>
                <div className=" py-6 border-b border-invar-main-purple font-semibold text-xl">
                  The best market access to growing Gulf economies, and emerging opportunities to bring real estate revolution to the world.
                  <img className=" mt-6 w-full" src='/bg/bahrain_map.png' alt="" />
                  <p className=" mt-6 text-white text-base font-normal">
                    Bahrain, which name means “two seas”, was an archipelago made up of 33 islands in the Arabian Gulf, Bahrain offers valuable opportunities for businesses and the best market access to growing Gulf economies and beyond.
                    <br /> <br />
                    Bahrain has established itself as a regional pioneer, also became the region&apos;s most diversified economy and leading financial centre. As Bahrain is repositioning itself to be a Financial Technology (FinTech) hub in the region combining conventional and Shariah compliant FinTech solutions, the Central Bank of Bahrain continues its FinTech initiatives as part of its digital transformation strategy to further facilitate a more efficient provision of financial services to end users. Also, the government seeks to make the Kingdom of Bahrain a key player in FinTech through the availability of innovative financial solutions with AI and Blockchain Technology, highly qualified national talent in finance and banking, and access to supportive policies. Presently, Bahrain is home to 367 financial institutions and a workforce of over 13,700 individuals highlighting the strength of the country&apos;s position in this regard.
                    <br /><br />
                    In addition, Bahrain offers an attractive regulatory environment with governance standards that deliver exceptional stability. With the support of its business-empowering regulations, the Kingdom of Bahrain has developed an ideal environment for financial and technology sectors to operate seamlessly.
                  </p>
                </div>
                <div className=" pb-6 border-b border-invar-main-purple font-semibold text-xl">
                  <img className=" mt-6 w-full" src='/bg/bahrain.png' alt="" />
                  <div className=" w-full py-6 flex justify-start items-center">
                    <img className='w-[32px] h-[32px]' src="/icons/ic_market.svg" alt="" />
                    <div className=" ml-9 text-base font-normal text-white">
                      <p className=" text-invar-light-grey font-normal text-xs">Market</p>
                      <span className=" text-2xl font-semibold">$1.67</span>
                      tn,
                      <span className=" text-2xl font-semibold"> 54</span>
                      mn consumers
                    </div>
                  </div>
                  <div className=" w-full pb-6 flex justify-start items-center">
                    <img className='w-[32px] h-[32px]' src="/icons/ic_workforce.svg" alt="" />
                    <div className=" ml-9 text-base font-normal text-white">
                      <p className=" text-invar-light-grey font-normal text-xs">Workforce</p>
                      <span className=" text-2xl font-semibold">1 </span>
                      million+
                    </div>
                  </div>
                  <div className=" w-full pb-6 flex justify-start items-center">
                    <img className='w-[32px] h-[32px]' src="/icons/ic_tourist.svg" alt="" />
                    <div className=" ml-9 text-base font-normal text-white">
                      <p className=" text-invar-light-grey font-normal text-xs">Tourist</p>
                      <span className=" text-2xl font-semibold">4.2</span>
                      mn visitors / 2021
                    </div>
                  </div>
                </div>
              </>
            }
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default PropertyInfo;