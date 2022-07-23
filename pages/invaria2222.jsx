// FIXME: path alias
import { useEffect, useState } from "react";
import { Twitter, Discord } from '../components/icons/Link'
import { ScrollToTop, QA, Footer, Navbar, ModalStory } from '../components';
import { tutorialsList, faqList } from "../src/constants";
import Image from 'next/image'
import {disableScroll} from '../src/utils/disableScroll'

function App() {
  const [headerBackground, setHeaderBackground] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setHeaderBackground(window.pageYOffset > 10)
      );
    }
  }, []);

  return (
    <div className=" min-w-full max-w-full relative overscroll-none overflow-hidden h-full bg-gradient-radial from-[#55465D] to-black scrollbar-hide">
      <ScrollToTop />
      <Navbar headerBackground={headerBackground} />
      <ModalStory />
      <div className="w-full flex flex-col justify-center items-center h-0 ">
        <label htmlFor="my-modal-1" onClick={()=>disableScroll()} className="btn modal-button w-[183px] md:w-min btnShadow bg-white opacity-80 hover:bg-white px-6 py-3 text-sm text-info rounded absolute top-[272px] md:top-[408px] md:left-[245px] z-20 normal-case border-none">
          Storyline</label>
        <a href={`#faq`} className='btn w-[183px] md:w-max btnShadow bg-white opacity-80 hover:bg-white px-6 py-3 mt-4 md:mt-0 text-sm text-info rounded absolute top-[328px] md:top-[280px] md:right-1/4 normal-case border-none z-20 ' >
          FAQ & Tutorials</a>
      </div>
      <div className="relative">
        <img className='h-screen min-h-screen w-full object-cover ' draggable="false" src='/bg/bg_phase0.png' alt="bg_phase0" />
        {/* <div className="hidden md:flex flex-col max-w-0 "> */}
        <img className=" cloud1 absolute top-56 md:top-[161px] -left-16 md:left-8 right-0 w-[700px] md:w-[700px] object-contain z-10 " draggable="false" src='/cloud1.png' alt="cloud1" />
        <img className=" cloud2 absolute top-[430px] -right-20 md:right-0 w-[600px] md:w-[600px] object-contain z-10 " draggable="false" src='/cloud2.png' alt="cloud2" />
        {/* </div> */}
        {/* <div className=" flex md:hidden ">
          <img className=" absolute top-56 md:top-[161px] -left-16 md:left-8 right-0 w-[700px] md:w-[700px] object-contain z-10" src='/cloud1.png' alt="cloud1" />
          <img className=" absolute top-96 md:top-[430px] right-0 w-[350px] md:w-[600px] object-contain z-10" src='/cloud2.png' alt="cloud2" />
        </div> */}
        <div className='mt-[88px]  hidden absolute top-0 left-[24px] md:flex flex-row items-start justify-start h-[592px] w-[325px] text-white indent-0.5 font-normal text-sm z-10 animate-fade-in-down'>
          <div className='flex flex-col items-center justify-center mr-3 '>
            <span className="flex h-3 w-3 justify-center items-center">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <div className='h-[540px] w-[1px] border-l bg-white -mt-1 z-0'></div>
          </div>
            「Year… 2222, Location… InVaria, Weather…
            Radiation Fog and Cold」Something is
            happening in this world…
            <br /><br />
            Build up communication channel… Discord
            set up… Twitter launched… Now we can communicate, discuss with each others about InVaria and the ideas we have there!
        </div>
        <div className="m-6 flex justify-between absolute bottom-[0px] right-0 z-20">
          <Twitter />
          <Discord />
        </div>
      </div>
      <div className="relative bg-gradient-to-b from-invar-main-purple to-invar-dark text-white pb-12 md:pb-32">
        <div className="z-10">
          <div className="pt-10 md:pt-16 pb-6">
            <p className="text-2xl md:text-3xl font-semibold text-center mx-16 md:mx-0">
              Explore Crypto Desert on Next-Gen
            </p>
          </div>
          <div className="mx-[30px] sm:mx-[30px] md:mx-[130px] lg:mx-[230px] font-normal">
            <p>
              InVaria 2222 is a RWA-based, tokenization world with the goal of constructing connections between
              real-world and digital economies. In addition, InVaria 2222 is positioned as an experiment
              flagship of InVar Finance.
              Inside InVaria, a huge amount of opportunity and wealth are waiting for humanity to find out and enjoy;
              no one knows the whole picture of this world...
            </p>
            <br />
            <p>
              In phase one, a group of InVariants will build a tokenized real estate model first,
              <span id='faq'></span>
              then... the story and journey begin...
            </p>
          </div>

          <div className="pt-11 md:pt-16 pb-6">
            <p className="text-3xl font-semibold text-center">FAQ</p>
          </div>
          <div className="relative flex w-full">
            <div className="mx-[30px] sm:mx-[30px] md:mx-[130px] lg:mx-[230px]  w-full z-10 font-normal">
              {faqList.map((faq, index) => (
                <QA key={index} {...faq} />
              ))}
            </div>
          </div>

          <div className="pt-11 md:pt-16 pb-6">
            <p className="text-3xl font-semibold text-center">Tutorials</p>
          </div>
          {/* z-index需要有flex */}
          <div className="relative flex w-full">
            <div className="mx-[30px] sm:mx-[30px] md:mx-[130px] lg:mx-[230px] w-full z-10">
              {tutorialsList.map((tutorial, index) => (
                <QA key={index} {...tutorial} />
              ))}
            </div>
          </div>
        </div>
        <img className=" hidden md:flex absolute top-[1032px] -left-[136px] w-[600px] object-contain z-0" src='/bg/bg_02.png' alt="" />
        <img className=" hidden md:flex absolute top-[536px] -right-[60px] w-[450px] object-contain z-0" src='/bg/bg_03.png' alt="" />
        <img className=" hidden md:flex absolute bottom-[135.17px] left-[230px] w-[450px] object-contain z-0" src='/bg/bg_04.png' alt="" />
        <img className=" hidden md:flex absolute bottom-[0px] -left-[136px] w-[800px] object-contain z-0" src='/bg/bg_05.png' alt="" />
      </div>
      <Footer />
    </div>

  );
}

export default App;

