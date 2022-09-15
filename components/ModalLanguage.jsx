import React from 'react'
import { useRouter } from 'next/router'
import { handleChangeLanguage } from 'src/utils/language'

const ModalLanguage = () => {
  const router = useRouter()

  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <div className="modal bg-[#000000b6]">
        <div className="modal-box w-[375px] h-[230px] absolute top-[73px] right-[85px] rounded-[4px] bg-gradient-to-b from-primary to-[#1E1722] p-6">
          <div className="flex justify-between">
            <h3 className="text-2xl font-semibold text-white mb-[22px] invisible">
              {' '}
              hidden
            </h3>
            <label
              htmlFor="my-modal-4"
              className="btn btn-sm pr-0 rounded-[4px] bg-opacity-0 hover:bg-opacity-0 text-[#fff] border-none"
            >
              <img
                className="h-[20px] w-[20px]"
                src="/icons/ic_close.svg"
                alt=""
              />
            </label>
          </div>
          <label
            htmlFor="my-modal-4"
            className="btn btn-primary relative w-[327px] h-[56px] rounded flex justify-center items-center border-none normal-case"
            onClick={() => handleChangeLanguage(router, 'en')}
          >
            <p className=" font-semibold text-accent">English</p>
          </label>
          <label
            htmlFor="my-modal-4"
            className="btn btn-primary mt-3 relative w-[327px] h-[56px] rounded flex justify-center items-center border-none normal-case"
            onClick={() => handleChangeLanguage(router, 'zh-TW')}
          >
            <p className=" font-semibold text-accent">繁體中文</p>
          </label>
        </div>
      </div>
    </>
  )
}

export default ModalLanguage
