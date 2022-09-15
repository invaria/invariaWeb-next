import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import { getCurrentLanguage } from 'src/utils/language'

function Homepage() {
  const intl = useIntl()
  const router = useRouter()
  const currentLang = getCurrentLanguage(router)

  return (
    <div className="relative overscroll-none allflame overflow-hidden h-full">
      <div className="absolute top-20 xl:top-20 left-0 right-0 ml-auto mr-auto w-[134px] md:w-[223.33px] ">
        {/* <Image width={223.33} height={80} src="/logo_white.svg" /> */}
      </div>
      <img
        className="w-full min-h-screen max-h-full h-screen object-cover object-left-top overflow-hidden "
        src="/bg/cover_new.jpeg"
        alt="cover"
      />
      <div className="absolute top-40 md:top-60 left-0 right-0 ml-auto mr-auto text-center">
        <p className="text-[#E3D5FA] text-3xl mx-6 xl:mx-0 md:text-5xl font-semibold">
          {intl.formatMessage({ id: 'image_title' })}
        </p>
        <Link href={`/${currentLang}/invaria2222`} target="_blank">
          <a target="_blank">
            <button className="z-50 btn w-max h-12 text-center bg-invar-dark hover:bg-invar-dark normal-case text-sm md:text-base text-white font-semibold mt-6 md:mt-4 px-7 rounded border-none">
              {intl.formatMessage({ id: 'image_launchapp' })}
            </button>
          </a>
        </Link>
      </div>

      <div className="absolute top-80 md:top-[440px] lg:top-[400px] left-6 right-6 md:right-16 ml-auto mr-auto text-center md:text-right">
        <p className="text-[#E3D5FA]">
          {intl.formatMessage({ id: 'image_desc' })}
        </p>
      </div>

      <footer className="absolute flex flex-col md:flex-row md:items-center md:justify-center left-6 right-0 mx-auto bottom-[35px] font-semibold text-white text-sm ">
        <p className="mx-1 select-none">© 2022 InVaria 2222</p>
        <p className="mx-1 hidden md:block font-normal">|</p>
        <div className="flex">
          <div>
            <Link href={`/${currentLang}/terms`}>
              <p className="mx-1 hover:underline cursor-pointer">
                {intl.formatMessage({ id: 'image_terms' })}
              </p>
            </Link>
          </div>
          <div>
            <Link href={`/${currentLang}/privacy`}>
              <p className="mx-1 hover:underline cursor-pointer">
                {intl.formatMessage({ id: 'image_privacy' })}
              </p>
            </Link>
          </div>
        </div>
      </footer>
      <div className="absolute flex justify-end right-6 mx-auto bottom-[25px]  ">
        <a
          className="mr-3"
          href="https://twitter.com/InVarFinance"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/icons/twitter.svg" width={40} height={40} alt="Logo" />
        </a>
        <a
          href="https://discord.gg/BrzPWYut4p"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/icons/discord.svg" width={40} height={40} alt="Logo" />
        </a>
      </div>
    </div>
  )
}

export default Homepage
