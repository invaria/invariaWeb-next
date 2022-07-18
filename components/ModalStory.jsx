import React from 'react'
import { enableScroll } from '../src/utils/disableScroll'

const ModalStory = () => {
  return (
    <div>
      <input type="checkbox" id="my-modal-1" className="modal-toggle" />
      <div className="modal justify-center items-start bg-[#000000b6] text-2xl text-white">
        <div className="modal-box hidden md:flex flex-col relative w-[800px] max-w-5xl mt-[80px] mx-0 p-0 pb-[48px] rounded-[4px] bg-gradient-to-b from-primary to-[#1E1722]  scrollbar-hide">
          <label htmlFor="my-modal-1" onClick={() => enableScroll()} className="btn btn-sm p-0 absolute right-[32px] top-[35px] bg-transparent border-none hover:bg-transparent">
            <img className="h-[20px] w-[20px]" src='/icons/ic_close.svg' alt="" />
          </label>
          <h3 className="text-2xl font-semibold m-[36px] mb-5">Storyline</h3>
          <p className="py-4 text-sm font-normal mx-[36px] mb-[24px]">InVaria, the unexplored desert which full of noises and uncertainty…
            <br /> <br />
            Tribes of humanity are desperate to pursue freedom, creation and fulfillment of endless desire. Some of them aggressively explore the wealth behind the dark fog, some are the first try to find the safe harbor to survive…year in 2222…
            <br /> <br />
            One tribe discovered a mystic device that could mirror real-world assets from 200 years ago; by connecting with it, human beings will be able to obtain the resources and benefits…
          </p>
          {/* story 1 */}
          <div className="h-[188px] w-full flex p-[36px] bg-primary justify-start items-start">
            <img className="h-[86px] w-[154px] mr-[44px]" src='/story/img_story1.png' alt="" />
            <div className='flex flex-col items-center justify-center mr-6'>
              <span className="flex h-3 w-3 justify-center items-center">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <div className='h-[192px] w-[1px] border-l bg-white -mt-1 z-0'></div>
            </div>
            <div className=" w-[485px] font-noraml text-sm">「Year… 2222, Location… InVaria, Weather… Radiation Fog and Cold」Something is happening in this world…
              <br /> <br />
              Build up communication channel… Discord set up… Twitter launched… Now we can communicate, discuss with each others about InVaria and the ideas we have there!
            </div>
          </div>
          {/* story 1 */}
          {/* story 2 */}
          <div className="h-[188px] w-full flex px-[36px] pt-[54px] justify-start items-start">
            <img className="h-[86px] w-[154px] mr-[44px]" src='/story/img_story2.png' alt="" />
            <div className='flex flex-col items-center justify-center mr-6'>
              <span className="flex h-3 w-3 justify-center items-center">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <div className='h-[192px] w-[1px] border-l bg-white -mt-1 z-0'></div>
            </div>
            <div className=" w-[485px] font-noraml text-sm">
              A tribe of humans find out a device with &quot;CRYPTIC REFLECTOR&quot; words carved on it, there is an unclear description shows…「Connecting…Connecting…, Connect to Real World, the Reflector Indicate Power… Asset will…」
            </div>
          </div>
          {/* story 2 */}
          {/* story 3 */}
          {/* <div className="h-[188px] w-full flex px-[36px] pt-[34px] bg-primary justify-start items-start">
            <img className="h-[86px] w-[154px] mr-[44px]" src='/story/img_story3.png' alt="" />
            <div className='flex flex-col items-center justify-center mr-6'>
              <span className="flex h-3 w-3 justify-center items-center">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <div className='h-[192px] w-[1px] border-l bg-white -mt-1 z-0'></div>
            </div>
            <div className=" w-[485px] font-noraml text-sm">
              The researcher found that the building named Amwaj20, which was built in the Persian Gulf region in 2015... Electronic parts and documents are scattered at the entrance, especially, the texts on the documents are sorted out and translated... One of the paragraphs reads &quot;... First priority, enter your address codes in the device, also with desire of property resources... You may get an unexpected prizes…&quot;
            </div>
          </div> */}
          {/* story 3 */}
          {/* story 4 */}
          {/* <div className="h-[188px] w-full flex px-[36px] pt-[44px] justify-start items-start">
            <img className="h-[86px] w-[154px] mr-[44px]" src='/story/img_story4.png' alt="" />
            <div className='flex flex-col items-center justify-center mr-6'>
              <span className="flex h-3 w-3 justify-center items-center">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <div className='h-[192px] w-[1px] border-l bg-white -mt-1 z-0'></div>
            </div>
            <div className=" w-[485px] font-noraml text-sm">
              Hopely, through NFT technology, Amwaj20 property ownership is fractionalized and waiting to distribute. The lasting time of operating furnace is near closed... We should seize the time to mint Amwaj20 NFT to avoid losing the rights belonging to us. For details and mechanism of fractionalized NFT, please visit the FAQ or related information channels.
            </div>
          </div> */}
          {/* story 4 */}
          {/* story 5 */}
          {/* <div className="h-[188px] w-full flex px-[36px] pt-[24px] bg-primary justify-start items-start">
            <img className="h-[86px] w-[154px] mr-[44px]" src='/story/img_story5.png' alt="" />
            <div className='flex flex-col items-center justify-center mr-6'>
              <span className="flex h-3 w-3 justify-center items-center">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <div className='h-[192px] w-[1px] border-l bg-white -mt-1 z-0'></div>
            </div>
            <div className=" w-[485px] font-noraml text-sm">
            &quot;...Pioneer Advantages... Amwaj20 will Activate the Portal to... this Device Can be Used in Different Scenario... Like Derivative of Power…&quot;, an unknown message unexpectedly appeared on REFLECTOR. After translation by the researcher, it was found that the device has the function of collecting information; meanwhile, the device is processing sort of formulas from previous data and surrounding events... Possibly, something is going to be reflected…
            </div>
          </div> */}
          {/* story 5 */}
        </div>

        <div className="modal-box h-screen max-h-screen flex flex-col md:hidden relative w-full max-w-5xl mx-0 p-0 pb-[48px] rounded-[4px] bg-gradient-to-b from-primary to-[#1E1722]">
          <label htmlFor="my-modal-1" onClick={() => enableScroll()} className="btn btn-sm p-0 absolute right-[26px] top-[17px] bg-transparent border-none hover:bg-transparent">
            <img className="h-[20px] w-[20px]" src='/icons/ic_close.svg' alt="" />
          </label>
          <h3 className="text-2xl font-semibold m-[16px] mb-5">Storyline</h3>
          <p className="py-4 text-sm font-normal mx-[16px] mb-[13px]">InVaria, the unexplored desert which full of noises and uncertainty…
            <br /> <br />
            Tribes of humanity are desperate to pursue freedom, creation and fulfillment of endless desire. Some of them aggressively explore the wealth behind the dark fog, some are the first try to find the safe harbor to survive…year in 2222…
            <br /> <br />
            One tribe discovered a mystic device that could mirror real-world assets from 200 years ago; by connecting with it, human beings will be able to obtain the resources and benefits…
          </p>
          {/* story 1 */}
          <div className=" relative w-full flex px-[24px] py-[24px] bg-primary justify-start items-start">
            <div className='flex flex-col items-center justify-center mr-6'>
              <span className="flex h-3 w-3 justify-center items-center z-20">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <div className=' absolute top-[27px] h-[328px] w-[1px] border-l bg-white z-10'></div>
            </div>
            <div className="flex flex-col">
              <img className="h-[86px] w-[154px] mr-[44px] mb-[24px]" src='/story/img_story1.png' alt="" />
              <div className=" w-full font-noraml text-sm">「Year… 2222, Location… InVaria, Weather… Radiation Fog and Cold」Something is happening in this world…
              <br /> <br />
              Build up communication channel… Discord set up… Twitter launched… Now we can communicate, discuss with each others about InVaria and the ideas we have there!
            </div>
            </div>
          </div>
          {/* story 1 */}
          {/* story 2 */}
          <div className=" relative w-full flex px-[24px] py-[24px] justify-start items-start">
            <div className='flex flex-col items-center justify-center mr-6'>
              <span className="flex h-3 w-3 justify-center items-center z-20">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <div className=' absolute top-[27px] h-[318px] w-[1px] border-l bg-white  z-10'></div>
            </div>
            <div className="flex flex-col">
              <img className="h-[86px] w-[154px] mr-[44px] mb-[24px]" src='/story/img_story2.png' alt="" />
              <div className=" w-full font-noraml text-sm">
                A tribe of humans find out a device with “CRYPTIC REFLECTOR” words carved on it, there is an unclear description shows…「Connecting…Connecting…, Connect to Real World, the Reflector Indicate Power… Asset will…」
              </div>
            </div>
          </div>
          {/* story 2 */}
          {/* story 3 */}
          {/* <div className=" relative w-full flex px-[24px] py-[24px] bg-primary justify-start items-start">
            <div className='flex flex-col items-center justify-center mr-6'>
              <span className="flex h-3 w-3 justify-center items-center z-20">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <div className=' absolute top-[27px] h-[358px] w-[1px] border-l bg-white  z-10'></div>
            </div>
            <div className="flex flex-col">
              <img className="h-[86px] w-[154px] mr-[44px] mb-[24px]" src='/story/img_story3.png' alt="" />
              <div className=" w-full font-noraml text-sm">
                The researcher found that the building named Amwaj20, which was built in the Persian Gulf region in 2015... Electronic parts and documents are scattered at the entrance, especially, the texts on the documents are sorted out and translated... One of the paragraphs reads &quot;... First priority, enter your address codes in the device, also with desire of property resources... You may get an unexpected prizes…&quot;
              </div>
            </div>
          </div> */}
          {/* story 3 */}
          {/* story 4 */}
          {/* <div className=" relative w-full flex px-[24px] py-[24px] justify-start items-start">
            <div className='flex flex-col items-center justify-center mr-6'>
              <span className="flex h-3 w-3 justify-center items-center z-20">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <div className=' absolute top-[27px] h-[330px] w-[1px] border-l bg-white  z-10'></div>
            </div>
            <div className="flex flex-col">
              <img className="h-[86px] w-[154px] mr-[44px] mb-[24px]" src='/story/img_story4.png' alt="" />

              <div className=" w-full font-noraml text-sm">
                Hopely, through NFT technology, Amwaj20 property ownership is fractionalized and waiting to distribute. The lasting time of operating furnace is near closed... We should seize the time to mint Amwaj20 NFT to avoid losing the rights belonging to us. For details and mechanism of fractionalized NFT, please visit the FAQ or related information channels.
              </div>
            </div>
          </div> */}
          {/* story 4 */}
          {/* story 5 */}
          {/* <div className=" relative w-full flex px-[24px] py-[24px] bg-primary justify-start items-start">
            <div className='flex flex-col items-center justify-center mr-6'>
              <span className="flex h-3 w-3 justify-center items-center z-20">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <div className=' absolute top-[27px] h-[360px] w-[1px] border-l bg-white  z-10'></div>
            </div>
            <div className="flex flex-col">
              <img className="h-[86px] w-[154px] mr-[44px] mb-[24px]" src='/story/img_story5.png' alt="" />
              <div className=" w-full font-noraml text-sm">
                &quot;...Pioneer Advantages... Amwaj20 will Activate the Portal to... this Device Can be Used in Different Scenario... Like Derivative of Power…&quot;, an unknown message unexpectedly appeared on REFLECTOR. After translation by the researcher, it was found that the device has the function of collecting information; meanwhile, the device is processing sort of formulas from previous data and surrounding events... Possibly, something is going to be reflected…
              </div>
            </div>
          </div> */}
          {/* story 5 */}
        </div>
      </div>
    </div>
  )
}

export default ModalStory
