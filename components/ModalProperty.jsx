import React from 'react'
import { enableScroll } from '../src/utils/disableScroll'

const ModalProperty = () => {
  return (
    <div>
      <input type="checkbox" id="property-modal" className="modal-toggle" />
      <div className="modal bg-[#000000b6] text-2xl text-white">
        <div className="modal-box relative md:flex flex-col h-screen max-h-screen w-full max-w-5xl md:w-[375px] md:h-[230px] md:absolute md:top-[24px] md:right-[24px] rounded-none md:rounded-[4px] bg-gradient-to-b from-primary to-[#1E1722] mx-0 p-0  md:p-6  scrollbar-hide">
          <label htmlFor="property-modal" onClick={() => enableScroll()} className="btn btn-sm p-0 absolute right-[32px] top-[35px] bg-transparent border-none hover:bg-transparent">
            <img className="h-[20px] w-[20px]" src='/icons/ic_close.svg' alt="" />
          </label>
          <h3 className="text-2xl font-semibold m-[36px] mb-5">Storyline</h3>
          <p className="py-4 text-sm font-normal mx-[36px] mb-[24px]">InVaria, the unexplored desert which full of noises and uncertainty…
            <br /> <br />
            Tribes of humanity are desperate to pursue freedom, creation and fulfillment of endless desire. Some of them aggressively explore the wealth behind the dark fog, some are the first try to find the safe harbor to survive…year in 2222…
            <br /> <br />
            One tribe discovered a mystic device that could mirror real-world assets from 200 years ago; by connecting with it, human beings will be able to obtain the resources and benefits…
          </p>
        </div>
      </div>
    </div>
  )
}

export default ModalProperty
