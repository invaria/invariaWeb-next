import { ButtonMailto } from '../components/icons/Link';
import Image from 'next/image'
import Link from 'next/link'
import { Navbar, Footer } from '../components/'

const PropertyInfo = () => {
  const headerBackground = true

  return (
    <div >
      <Navbar headerBackground={headerBackground} />
      <div className=" min-w-full max-w-full relative overscroll-none overflow-hidden h-full bg-gradient-to-b from-[#44334C] to-[#1E1722]
       text-white">
        <img className=' hidden lg:flex absolute top-14 right-[-158px] w-[685px] h-[359px] z-0 ' src="/bg/bg_03.png" alt="" />
        <img className=' hidden lg:flex absolute bottom-0 -left-1/4 w-[800px] h-[400px] z-0 ' src="/bg/bg_05.png" alt="" />
        <div className=" px-4 md:px-16 lg:px-[231px] pt-[60px] md:pt-[80px] flex ">
          <div className="w-1/2"></div>
          <div className=" absolute ">
            
          </div>
          <div className=' mt-[32px] md:mt-[45px] font-semibold text-2xl'>Dashboard</div>

        </div>
      </div>
    </div>
  )
}

export default PropertyInfo;