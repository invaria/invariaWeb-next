// FIXME: path alias
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Twitter, Discord } from '../components/icons/Link'
import { ScrollToTop, QA, Footer, Navbar } from '../components';
import { tutorialsList, faqList } from "../src/constants";
import Image from 'next/image'
import { disableScroll } from '../src/utils/disableScroll'
import Typewriter from 'typewriter-effect';
const ModalPremint = dynamic(import("../components/ModalPremint"));
const ModalStory = dynamic(import("../components/ModalStory"));
const ModalProperty = dynamic(import("../components/ModalProperty"));

function App() {
  const [headerBackground, setHeaderBackground] = useState(false);
  const [origin, setorigin] = useState()
  useEffect(() => {
    if (typeof window !== "undefined") {
      setorigin( window.location.origin)
      window.addEventListener("scroll", () =>
        setHeaderBackground(window.pageYOffset > 20)
      );
    }
  }, []);

  return (
    <div className=" min-w-full max-w-full relative overscroll-none overflow-hidden h-full scrollbar-hide">
      <ScrollToTop />
      <Navbar headerBackground={headerBackground} />
      <ModalStory />
      <ModalProperty />
      <ModalPremint />
      <div className="w-full flex flex-col justify-center items-center h-0 ">
        <label htmlFor="my-modal-1" onClick={() => disableScroll()}
          className="btn modal-button w-[183px] md:w-min btnShadow bg-white 
            opacity-80 hover:bg-white px-6  text-sm text-info rounded absolute 
            top-[188px] md:top-[408px] md:left-[245px] z-30 normal-case border-none">
          Storyline</label>
        <a href={`#mindmap`} className='btn w-[183px] md:w-max btnShadow bg-white 
          opacity-80 hover:bg-white px-6 py-3 mt-4 md:mt-0 text-sm text-info rounded 
          absolute top-[236px] md:top-[232px] md:right-1/2 normal-case border-none z-20 ' >
          Mindmap</a>
        <a href={`#faq`} className='btn w-[183px] md:w-max btnShadow bg-white 
          opacity-80 hover:bg-white px-6 py-3 mt-4 md:mt-0 text-sm text-info 
          rounded absolute top-[300px] md:top-[280px] md:right-1/4 normal-case border-none z-20 '>
          FAQ & Tutorials</a>
        <label htmlFor="property-modal" onClick={() => disableScroll()} className=' md:hidden btn modal-button w-[183px] md:w-max btnShadow bg-white 
          opacity-80 hover:bg-white px-6 py-3 mt-4 md:mt-0 text-sm text-info 
          rounded absolute top-[364px] md:top-[280px] md:right-1/4 normal-case border-none z-20 '>
          Property Infos</label>
        <label htmlFor="premint-modal" onClick={() => disableScroll()} className='btn modal-button w-[183px] md:w-max btnShadow bg-invar-success 
          opacity-80 hover:bg-invar-success px-6 py-3 mt-4 md:mt-0 text-sm text-info 
          rounded absolute top-[428px] md:top-[449px] md:left-[716px] normal-case border-none z-30 ' >
          Pre-Sale Minting</label>
      </div>
      <div className=" w-full min-w-full max-w-full relative bg-gradient-radial from-[#55465D] to-black ">
        {/* <img className=' z-0 h-screen min-h-screen w-full object-cover overflow-hidden' draggable="false" src='/bg/bg.png' alt="bg" /> */}
        <div className=" relative z-0 h-screen min-h-screen w-full object-cover overflow-hidden">
          <Image layout="fill" objectFit="cover" draggable="false" src='/bg/bg.png' />
        </div>
        <img className=' w-[23%] hidden absolute bottom-0 left-14 z-20 md:block overflow-hidden animate-fade-in-left' draggable="false" src='/bg/bg_01.png' alt="bg_1" />
        <label htmlFor="property-modal" onClick={() => disableScroll()} className=" hidden z-30 pr-8 w-48 h-32 hover:cursor-pointer absolute top-[57%] right-[53%] md:flex justify-end items-start">
          <div className=" hidden md:flex justify-center items-center">
            <span className="animate-ping absolute inline-flex h-[14px] w-[14px] rounded-full bg-invar-error opacity-75"></span>
            <span className="relative inline-flex rounded-full h-[10px] w-[10px] bg-invar-error"></span>
          </div>
        </label>
        <div className=" hidden absolute bottom-0 left-0 right-0 z-0 md:flex justify-center items-center">
          <div className=" flex justify-start items-start text-start w-[826px] h-[108px] m-6 p-6 bg-invar-main-purple 
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
      <div className="relative w-screen min-w-full bg-gradient-to-b from-invar-main-purple to-black text-white pb-12 md:pb-32">
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
        <img className=" h-[300px] md:h-[500px] mt-[44px] md:mt-0 md:absolute top-[488px] left-0 z-0 object-cover object-left-top " src="/bg/mindmap_02.png" draggable="false" alt="" />
        <div className=" relative md:h-[625px] w-full md:pt-[115px] pb-[53px] md:pb-[228px] flex ">
          <div className=" hidden md:block w-1/2 h-full"></div>
          <div className=" ml-8 text-base font-normal text-white mr-[55px] md:mr-0">
            <p className=" md:font-semibold md:text-invar-grey ">Phase One - APR. ~ DEC. 2022</p>
            <p className=" text-2xl md:text-[32px] md:leading-[38.4px] font-semibold text-white mt-[4px] md:mt-[10px] mb-6 md:mb-0">Experiment / Exploration</p>
            <p>
              <br className="hidden md:block" />
              Crypto is all about experiment and exploration. InVar aim to
              <br className="hidden md:block" />
              build first feasible project through tokenization of RWAs.
            </p>
            <br />
            <ul className="list-disc pl-6">
              <li>Launch InVaria 2222 - The Worldview and Storyline of InVar</li>
              <li>Release First Real Estate Fractionalization NFT</li>
              <li>Develop NFT Staking Mechanism</li>
              <li>Develop Utilities Type of NFT</li>
            </ul>
          </div>
        </div>
        <img className=" h-[300px] md:h-[500px] md:absolute top-[988px] right-[-256.48px] z-0 object-cover object-left-top " src="/bg/mindmap_01.png" draggable="false" alt="" />
        <div className=" relative w-full md:pb-[326px] md:mr-[47px] flex justify-end ">
          <div className=" md:h-[272px] md:w-[478px] ml-8 text-base font-normal text-white mr-[55px] md:mr-0">
            <p className=" md:font-semibold md:text-invar-grey ">Phase Two - NOV. 2022 ~ MAY. 2023</p>
            <p className=" text-2xl md:text-[32px] md:leading-[38.4px] font-semibold text-white mt-[4px] md:mt-[10px] mb-6 md:mb-0">Diversification / Segmentation</p>
            <p>
              <br className="hidden md:block" />
              Dive deep to think more about feedback and benefits that can <br className="hidden md:block" />
              bring to early adopters, replicate the successful model and <br className="hidden md:block" />
              develop exciting products.
            </p>
            <br />
            <ul className=" list-disc pl-6">
              <li>Launch InVariant - An PFP & Pass NFT</li>
              <li>Release Hybrid Finance Concept</li>
              <li>Release Second Real Estate Fractionalization NFT</li>
            </ul>
          </div>
          <div className=" hidden md:block w-1/2 h-full"></div>
        </div>
        <img className="mt-[44px] md:mt-0 h-[300px] md:h-[599px] md:absolute top-[1488px] left-[-129px] z-0 object-cover  " src="/bg/mindmap_03.png" draggable="false" alt="" />
        <div className=" relative w-full md:pb-[218px] flex z-10 ">
          <div className=" hidden md:block w-1/2 h-full"></div>
          <div className=" ml-8 md:h-[162px] w-[478px] text-base font-normal text-white mr-[55px] md:mr-0">
            <p className=" md:font-semibold md:text-invar-grey ">MAY. 2023</p>
            <p className=" text-2xl md:text-[32px] md:leading-[38.4px] font-semibold text-white mt-[4px] md:mt-[10px] mb-6 md:mb-0">Integration</p>
            <p>
              <br className="hidden md:block" />
              InVaria 2222 is the foundation also the digital world of InVar. <br className="hidden md:block" />
              Building solid infrastructure and value backstop to construct a <br className="hidden md:block" />
              hybrid finance ecosystem is a reasonable, indispensable move.
            </p>
            <br />
            <ul className="list-disc pl-6">
              <li>Launch InVariant - An PFP & Pass NFT</li>
              <li>Release Hybrid Finance Concept</li>
              <li>Release Second Real Estate Fractionalization NFT</li>
            </ul>
          </div>
          <span className=" absolute bottom-[60px] " id='faq'></span>
        </div>
        <div className="relative text-white ">
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

