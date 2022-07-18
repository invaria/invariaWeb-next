// FIXME: path alias
import { useEffect, useState } from "react";
import { Twitter, Discord } from '../components/icons/Link'
import { ScrollToTop, QA, Footer, Navbar, ModalStory } from '../components';
import { tutorialsList, faqList } from "../src/constants";
import Image from 'next/image'
import { disableScroll } from '../src/utils/disableScroll'
import Typewriter from 'typewriter-effect';

function App() {
  const [headerBackground, setHeaderBackground] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setHeaderBackground(window.pageYOffset > 10)
      );
    }
  }, []);

  return (
    <div className=" min-w-full max-w-full relative overscroll-none overflow-hidden h-full scrollbar-hide">
      <ScrollToTop />
      <Navbar headerBackground={headerBackground} />
      <ModalStory />
      <div className="w-full flex flex-col justify-center items-center h-0 ">
        <label htmlFor="my-modal-1" onClick={() => disableScroll()}
          className="btn modal-button w-[183px] md:w-min btnShadow bg-white 
            opacity-80 hover:bg-white px-6 py-3 text-sm text-info rounded absolute 
            top-[272px] md:top-[408px] md:left-[245px] z-20 normal-case border-none">
          Storyline</label>
        <a href={`#faq`} className='btn w-[183px] md:w-max btnShadow bg-white 
          opacity-80 hover:bg-white px-6 py-3 mt-4 md:mt-0 text-sm text-info 
          rounded absolute top-[328px] md:top-[280px] md:right-1/4 normal-case border-none z-20 '>
          FAQ & Tutorials</a>
        <a href={`#mindmap`} className='btn w-[112px] md:w-max btnShadow bg-white 
          opacity-80 hover:bg-white px-6 py-3 mt-4 md:mt-0 text-sm text-info rounded 
          absolute top-[328px] md:top-[232px] md:right-1/2 normal-case border-none z-20 ' >
          Mindmap</a>
        <a href={`#faq`} className='btn w-[161px] md:w-max btnShadow bg-invar-success 
          opacity-80 hover:bg-invar-success px-6 py-3 mt-4 md:mt-0 text-sm text-info 
          rounded absolute top-[328px] md:top-[449px] md:left-[716px] normal-case border-none z-20 ' >
          Pre-Sale Minting</a>
      </div>
      <div className=" w-full min-w-full max-w-full relative bg-gradient-radial from-[#55465D] to-black ">
        <img className=' z-0 h-screen min-h-screen w-full object-cover' draggable="false" src='/bg/bg.png' alt="bg" />
        <div className=" absolute bottom-0 left-0 right-0 z-20 flex justify-center items-center">
          <div className="flex justify-start items-start text-start w-[826px] h-[108px] m-6 p-6 bg-invar-main-purple 
            bg-opacity-60 text-white text-sm font-normal leading-[19.6px] rounded-lg border-4 border-invar-light-purple 
            border-opacity-60 animate-fade-in-up">
            <div className="text-start flex justify-start">
              <Typewriter
                options={{
                  delay: 10,
                }}
                onInit={(typewriter) => {
                  typewriter.pauseFor(1000)
                    .typeString('”CRYPTIC REFLECTOR is Connected!! The Building…“ yelling by Hodlemir…After persistently efforts, Hodlemir repaired the damaged components and wires, then try to conduct the connection… Suddenly, the ancient building shows up, just like reflection. Hodlemir shouts out to others for further investigation and research... ')
                    .start();
                }}
              />
            </div>
          </div>
        </div>
        <div className="m-6 flex justify-between absolute bottom-[0px] right-0 z-20">
          <Twitter />
          <Discord />
        </div>
      </div>
      <div className="relative bg-gradient-to-b from-invar-main-purple to-black text-white pb-12 md:pb-32">
        {/* <img className="absolute top-[px] left-0" src="/bg/mindmap_02.png" draggable="false" alt=""/>
        <img className="absolute top-[px] left-0" src="/bg/mindmap_03.png" draggable="false" alt=""/> */}
        <p className="pt-10 md:pt-16 pb-6 text-2xl md:text-3xl font-semibold text-center mx-16 md:mx-0">
          Explore Crypto Desert on Next-Gen
          </p>
        <div className="mx-[30px] sm:mx-[30px] md:mx-[130px] lg:mx-[230px] font-normal">
          <p>
            InVaria 2222 is a RWA-based, tokenization world with the goal of constructing connections between
            real-world and digital economies. In addition, InVaria 2222 is positioned as an experiment
            flagship of InVar Finance.
            Inside InVaria, a huge amount of opportunity and wealth are waiting for humanity to find out and enjoy;
            no one knows the whole picture of this world...
            </p>
          <br /> <span id='mindmap'></span>
          <p>
            In phase one, a group of InVariants will build a tokenized real estate model first,
            then... the story and journey begin...
            </p>
        </div>
        <p className=" pt-11 md:pt-16 pb-6 text-2xl md:text-3xl font-semibold text-center mx-16 md:mx-0">
          Mindmap
          </p>
        <div className=" mx-[30px] sm:mx-[30px] md:mx-[130px] lg:mx-[230px] font-normal">
          <p>
            As the tempo of iteration in crypto market characteristics, technology and industry framework as well, InVar team dislike to
            overpromise and fail to deliver our plans. However, we truly have pre-organized milestones to achieve, the mindmap, and we don’t
            want to keep it secret but are willing to share with sincerity.
            </p>
        </div>
        <img className=" h-[500px] absolute top-[488px] left-0 z-0" src="/bg/mindmap_02.png" draggable="false" alt="" />
        <div className=" relative h-[625px] w-full pt-[115px] pb-[228px] flex ">
          <div className=" w-1/2 h-full"></div>
          <div className=" text-base font-normal text-white">
            <p className=" text-xl font-semibold text-invar-grey ">Phase One - APR. ~ DEC. 2022</p>
            <p className=" text-[32px] leading-[38.4px] font-semibold text-white mt-[10px] ">Experiment / Exploration</p>
            <p className=" break-all ">
              <br/>
              Crypto is all about experiment and exploration. InVar aim to
                <br />build first feasible project through tokenization of RWAs.
            </p>
            <br/>
            <ul className="list-disc pl-6">
              <li>Launch InVaria 2222 - The Worldview and Storyline of InVar</li>
              <li>Release First Real Estate Fractionalization NFT</li>
              <li>Develop NFT Staking Mechanism</li>
              <li>Develop Utilities Type of NFT</li>
              <br />
            </ul>
          </div>
        </div>
        <div className="relative  text-white ">
          <p className="pt-10 md:pt-16 pb-6 text-3xl font-semibold text-center">
            FAQ
            </p>
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
      </div>
      <Footer />
    </div>

  );
}

export default App;

