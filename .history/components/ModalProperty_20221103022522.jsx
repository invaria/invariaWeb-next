import React from 'react'
import Link from 'next/link'
import { enableScroll } from '../src/utils/disableScroll'
import { useTranslation } from 'next-i18next'

const ModalProperty = () => {
  const {t}=useTranslation("propertyInfo");
  return (
    <div>
      <input type="checkbox" id="property-modal" className="modal-toggle" />
      <div className="modal bg-[#000000b6] text-2xl text-white">
        <div className="modal-box relative px-[36px] pt-[56px] md:flex flex-col h-screen max-h-screen w-full max-w-5xl md:w-[375px] md:h-min md:absolute md:top-[24px] md:right-[24px] rounded-none md:rounded-[4px] bg-gradient-to-b from-primary to-[#1E1722] mx-0 md:p-6 md:pt-[56px] scrollbar-hide">
          <label htmlFor="property-modal" onClick={() => enableScroll()} className="btn btn-sm p-0 absolute right-[24px] top-[12px] bg-transparent border-none hover:bg-transparent">
            <img className="h-[20px] w-[20px]" src='/icons/ic_close.svg' alt="" />
          </label>
          <img className="w-full" src='/bg/amwaj20.png' alt="" />
          <h3 className="text-2xl font-semibold mt-5">{t("homepage_property_title")}</h3>
          <p className="pt-1 pb-3 text-sm font-normal border-b border-invar-main-purple">
           {t("homepage_property_desc")}
          </p>
          <p className="mt-3 mb-1 text-xs font-normal text-invar-light-grey">
           {t("homepage_property_info_value")}
          </p>
          <p className="mb-[10px] text-base font-normal text-white">
            $38,000,000 USD
          </p>
          <p className="mt-3 mb-1 text-xs font-normal text-invar-light-grey">
            {t("homepage_property_info_apr")}
          </p>
          <p className="mb-[10px] text-base font-normal text-white">
            12%
          </p>
          <p className="mt-3 mb-1 text-xs font-normal text-invar-light-grey">
            {t("homepage_property_info_developer")}
          </p>
          <p className="mb-[10px] text-base font-normal text-white">
           {t("homepage_property_info_developer_mannaigroup")}
          </p>
          <p className="mt-3 mb-1 text-xs font-normal text-invar-light-grey">
            {t("homepage_property_info_manager")}
          </p>
          <p className="mb-[22px] text-base font-normal text-white">
            {t("homepage_property_info_manager_flowbay")}
          </p>
          <Link href='/propertyinfo'>
            <button className=" btn w-full h-[48px] font-semibold text-base bg-invar-dark text-white rounded text-center normal-case border-none mb-6" 
             onClick={() => enableScroll()}>
             {t("homepage_property_info_researchmore")}
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ModalProperty
