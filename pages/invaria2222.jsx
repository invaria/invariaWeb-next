import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Countdown from "react-countdown";
import { Twitter, Discord } from "../components/icons/Link";
import { ScrollToTop, QA, Footer, Navbar } from "../components";
import { tutorialsList, faqList } from "../src/constants";
import Image from "next/image";
import { disableScroll } from "../src/utils/disableScroll";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Link as ScrollLink } from "react-scroll";

import explore from "../assets/images/explore.png";
import exploreTW from "../assets/images/explore_tw.png";
import toTop from "../assets/images/to-top.png";
import styles from "../styles/Home.module.css";

import CollapseMenu from "../components/CollapseMenu";
import { useRouter } from "next/router";
import Link from "next/link";

export const endtimestamp = 1664582400000;

const typewriterTW =
  "資產碎片化 NFT 如何運用、與資產價值連結變成後續的問題，部落正在研擬解決方案…財務工程師多雷米拉提出將 Amwaj20 資產統一由專業領袖管理，並將產出的價值分配給 NFT 持有者；而持有者可以通過協議質押 NFT 獲取對應的價值。";
const typewriterEN =
  "How to utilize the NFT, which is a fractionalization of the property, and the correlated values attribute to it have become follow-up concerns. The tribe is working on a solution... Dyoremira, a financial engineer, proposed to unify the management of Amwaj20 to professional leaders for creating stable returns, and distribute the consecutive values to NFT holders; holders are allowed to stake NFT through the protocol to obtain the corresponding values.";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "index",
        "common",
        "storyline",
        "propertyInfo",
        "sale",
        "dashboard",
      ])),
    },
  };
}

const scrollToTopHandler = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};

function App() {
  const [headerBackground, setHeaderBackground] = useState(false);
  const { t } = useTranslation("index");
  const [origin, setorigin] = useState();
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setorigin(window.location.origin);
      window.addEventListener("scroll", () =>
        setHeaderBackground(window.pageYOffset > 20)
      );
    }
  }, []);

  useEffect(() => {
    const node = document.getElementById("typeWriter");
    if (!node) return;
    let timer;
    let text;
    let i = 0;
    node.textContent = "";
    if (router.locale === "tw") text = typewriterTW;
    else text = typewriterEN;
    function typeWriter() {
      if (i < text.length) {
        node.innerHTML += text.charAt(i);
        i++;
        timer = setTimeout(typeWriter, 20);
      }
    }
    typeWriter();
    return () => {
      clearTimeout(timer);
    };
  }, [router.locale]);
  return (
    <div className=" min-w-full max-w-full relative overscroll-none overflow-hidden h-full scrollbar-hide">
      <ScrollToTop />
      <Navbar headerBackground={headerBackground} />
      <div className="w-full flex flex-col justify-center items-center h-0 ">
        <label
          htmlFor="my-modal-1"
          onClick={() => disableScroll()}
          className="btn modal-button w-[183px] md:w-min btnShadow bg-white 
            opacity-80 hover:bg-white hover:opacity-100 px-6  text-sm text-info rounded absolute 
            top-[188px] md:top-[408px] md:left-[245px] z-[21] normal-case border-none md:hidden"
        >
          Storyline
        </label>
        <ScrollLink
          activeClass="active"
          offset={-100}
          smooth
          spy
          to="mindmap"
          className="btn w-[183px] md:w-max btnShadow bg-white 
          opacity-80 hover:bg-white hover:opacity-100 px-6 py-3 mt-4 md:mt-0 text-sm text-info rounded 
          absolute top-[236px] md:top-[232px] md:right-1/2 normal-case border-none z-20 md:hidden"
        >
          <p>Mindmap</p>
        </ScrollLink>

        <ScrollLink
          activeClass="active"
          offset={-100}
          smooth
          spy
          to="faq"
          className="btn w-[183px] md:w-max btnShadow bg-white 
          opacity-80 hover:bg-white hover:opacity-100 px-6 py-3 mt-4 md:mt-0 text-sm text-info 
          rounded absolute top-[300px] md:top-[280px] md:right-1/4 normal-case border-none z-20 md:hidden"
        >
          <p>FAQ & Tutorials</p>
        </ScrollLink>
        <label
          htmlFor="property-modal"
          onClick={() => disableScroll()}
          className=" md:hidden btn modal-button w-[183px] md:w-max btnShadow bg-white 
          opacity-80 hover:bg-white hover:opacity-100 px-6 py-3 mt-4 md:mt-0 text-sm text-info 
          rounded absolute top-[364px] md:top-[280px] md:right-1/4 normal-case border-none z-20 "
        >
          Property Infos
        </label>
        {Date.now() >= 1665936000000 && (
          <label
            htmlFor="premint-modal"
            onClick={() => disableScroll()}
            className="btn modal-button w-[183px] md:w-max btnShadow bg-invar-success 
          opacity-80 hover:bg-invar-success hover:opacity-100 px-6 py-3 mt-4 md:mt-0 text-sm text-info 
          rounded absolute top-[428px] md:top-[449px] md:hidden  md:left-[450px] normal-case border-none z-20 "
          >
            Public Sale
          </label>
        )}
        {/* <label htmlFor="applywhite-modal" className=" z-20 absolute top-[512px] md:top-[375px] md:left-[738px] w-[183px] h-[48px] md:w-max btnShadow btn bg-invar-success opacity-80 hover:bg-invar-success hover:opacity-100
            rounded normal-case border-none text-base font-semibold px-[21px] flex flex-col text-[#31135E]">
          <div className=" text-xs ">
            Whitelist Application
          </div>
          <Countdown date={endtimestamp} daysInHours={true} />
        </label> */}
      </div>
      <div className=" w-full min-w-full max-w-full relative bg-gradient-radial from-[#55465D] to-black ">
        {/* <img className=' z-0 h-screen min-h-screen w-full object-cover overflow-hidden' draggable="false" src='/bg/bg.png' alt="bg" /> */}
        <img
          className=" cloud1 absolute top-56 md:top-[161px] -left-16 md:left-0 right-0 w-[500px] md:w-[600px] object-contain z-10 "
          draggable="false"
          src="/cloud1.png"
          alt="cloud1"
        />
        <img
          className=" cloud2 absolute top-[430px] -right-20 md:right-0 w-[600px] md:w-[600px] object-contain z-10 "
          draggable="false"
          src="/cloud2.png"
          alt="cloud2"
        />
        <div className=" relative z-0 h-screen min-h-screen w-full object-cover overflow-hidden">
          <Image
            layout="fill"
            objectFit="cover"
            draggable="false"
            src="/bg/bg.png"
          />
        </div>
        <img
          className=" w-[23%] hidden absolute bottom-0 left-14 z-20 md:block overflow-hidden animate-fade-in-left"
          draggable="false"
          src="/bg/bg_1.png"
          alt="bg"
        />
        <label
          htmlFor="property-modal"
          onClick={() => disableScroll()}
          className=" hidden z-30 pr-8 w-48 h-32 hover:cursor-pointer absolute top-[57%] right-[53%] md:flex justify-end items-start"
        >
          <div className=" hidden md:flex justify-center items-center">
            <span className="animate-ping absolute inline-flex h-[14px] w-[14px] rounded-full bg-invar-error opacity-75"></span>
            <span className="relative inline-flex rounded-full h-[10px] w-[10px] bg-invar-error"></span>
          </div>
        </label>
        {Date.now() >= 1665936000000 && (
          <div className="absolute top-[57%] right-[53%] hidden md:flex">
            <label
              htmlFor="premint-modal"
              onClick={() => disableScroll()}
              className="btn modal-button w-[183px] md:w-max btnShadow bg-invar-success 
          opacity-80 hover:bg-invar-success hover:opacity-100 px-6 py-3 mt-4 md:mt-0 text-sm text-info 
          rounded  normal-case border-none z-20 relative left-40 top-12"
            >
              Public Sale
            </label>
          </div>
        )}
        <div className="mt-[88px]  hidden absolute top-0 left-[24px] md:flex flex-row items-start justify-start h-[592px] w-[300px] text-white indent-0.5 font-normal text-sm z-10 animate-fade-in-down">
          <div className="flex flex-col items-center justify-center mr-3 ">
            <span className="flex h-3 w-3 justify-center items-center">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <div className="h-[540px] w-[1px] border-l bg-white -mt-1 z-0"></div>
          </div>
          {t("storyline_popup_story5")}
        </div>

        <div className=" hidden absolute bottom-0 left-0 right-0 z-10 md:flex justify-center items-center">
          <div
            className=" flex justify-start items-start text-start w-[826px] h-[153px] m-6 p-6 px-[87px] bg-invar-main-purple 
            bg-opacity-60 text-white text-sm font-normal leading-[19.6px] rounded-lg border-4 border-invar-light-purple 
            border-opacity-60 animate-fade-in-up"
          >
            <div className="text-start flex justify-start" id="typeWriter">
              {/* <Typewriter
                  options={{
                    delay: 10,
                  }}
                  onInit={(typewriter) => {
                    typewriter.pauseFor(1000).typeString(t("homepage_dialog_woman5")).start();
                  }}
                /> */}
            </div>
          </div>
        </div>

        <div className="m-6 flex justify-between absolute bottom-[0px] right-0 z-20">
          <Twitter />
          <Discord />
        </div>
      </div>
      <div className={styles.firstHalfbg}>
        <section className={`${styles.introSection} ${styles.sidesSpacing}`}>
          <div className={styles.exploreContWrapper}>
            <div className={styles.exploreLeft}>
              <h3 className={styles.h3}>{t("homepage_intro_title")}</h3>
              <p className={styles.p}>
                {t("homepage_intro_desc1")}
                <br />
                <br />
                {t("homepage_intro_desc2")}
              </p>
            </div>
            <div className={styles.exploreRight}>
              <div>
                <Image src={router.locale === "tw" ? exploreTW : explore} />
              </div>
            </div>
          </div>
        </section>
        <span id="mindmapoutside" className="relative bottom-28"></span>
        <section
          id="mindmap"
          className={`${styles.mindmapSection} ${styles.sidesSpacing}`}
        >
          <h3 className={styles.h3}>{t("homepage_mindmap_title")}</h3>
          <p className={styles.p}>{t("homepage_mindmap_desc")}</p>
        </section>

        <section id="storyline" className={styles.phase1}>
          <div className={`${styles.phase1Content} ${styles.sidesSpacing}`}>
            <div className={styles.phase1Left}></div>

            <div className={styles.phase1Right}>
              <h5 className={styles.h5}>{t("homepage_mindmap_phaseone")}</h5>
              <h3 className={styles.h3}>
                {t("homepage_mindmap_phaseone_title")}
              </h3>
              <p className={styles.p}>{t("homepage_mindmap_phaseone_desc")}</p>
              <ul className={styles.ul}>
                <li>{t("homepage_mindmap_phaseone_point1")}</li>
                <li>{t("homepage_mindmap_phaseone_point2")}</li>
                <li>{t("homepage_mindmap_phaseone_point3")}</li>
                <li>{t("homepage_mindmap_phaseone_point4")}</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
      <div className={styles.secondHalfbg}>
        <section className={styles.phase2}>
          <div className={`${styles.phase2Content} ${styles.sidesSpacing}`}>
            <div className={styles.phase2Left}>
              <h5 className={styles.h5}>{t("homepage_mindmap_phasetwo")}</h5>
              <h3 className={styles.h3}>
                {t("homepage_mindmap_phasetwo_title")}
              </h3>
              <p className={styles.p}>{t("homepage_mindmap_phasetwo_desc")}</p>
              <ul className={styles.ul}>
                <li>{t("homepage_mindmap_phasetwo_point1")}</li>
                <li>{t("homepage_mindmap_phasetwo_point2")}</li>
                <li>{t("homepage_mindmap_phasetwo_point3")}</li>
              </ul>
            </div>
            <div className={styles.phase2Right}></div>
          </div>
        </section>

        <section className={styles.phase3}>
          <div className={`${styles.phase1Content} ${styles.sidesSpacing}`}>
            <div className={styles.phase3Left}></div>
            <div className={`${styles.phase1Right} ${styles.phase3Right}`}>
              <h5 className={styles.h5}>{t("homepage_mindmap_phasethree")}</h5>
              <h3 className={styles.h3}>
                {t("homepage_mindmap_phasethree_title")}
              </h3>
              <p className={styles.p}>
                {t("homepage_mindmap_phasethree_desc")}
              </p>
              <ul className={styles.ul}>
                <li>{t("homepage_mindmap_phasethree_point1")}</li>
              </ul>
            </div>
          </div>
        </section>
        <span id="faqoutside" className="relative bottom-28"></span>
        <section
          id="faq"
          className={`${styles.faqSection} ${styles.sidesSpacing}`}
        >
          <h3 className={`${styles.h3} text-center`}>FAQ</h3>

          <CollapseMenu
            heading={t("faq_1_title")}
            para={<p className={styles.p}>{t("faq_1_desc")}</p>}
          />
          <CollapseMenu
            heading={t("faq_2_title")}
            para={<p className={styles.p}>{t("faq_2_desc")}</p>}
          />
          <CollapseMenu
            heading={t("faq_3_title")}
            para={
              <>
                <p className={styles.p}>
                  <span className="purpleGrey">{t("faq_3_desc_1")}</span>
                  {t("faq_3_desc_2")}
                </p>
                <br />
                <Link href="/terms">
                  <p className={`${styles.p} m-0`}>
                    {t("faq_3_desc_3")}
                    <span className="purple">{t("faq_3_desc_4")}</span>
                    {t("faq_3_desc_5")}
                  </p>
                </Link>
              </>
            }
          />
          <CollapseMenu
            heading={t("faq_4_title")}
            para={<p className={styles.p}>{t("faq_4_desc")}</p>}
          />
          <CollapseMenu
            heading={t("faq_5_title")}
            para={
              <p className={styles.p}>
                {t("faq_5_desc_1")}
                <span className="purpleGrey">{t("faq_5_desc_2")}</span>
                {t("faq_5_desc_3")} (
                <a
                  className="linksColor"
                  href="https://twitter.com/InVarFinance"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
                ,
                <a
                  className="linksColor"
                  href="https://discord.com/invite/BrzPWYut4p"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Discord
                </a>
                ){t("faq_5_desc_4")}.
              </p>
            }
          />

          <CollapseMenu
            heading={t("faq_6_title")}
            para={
              <p className={styles.p}>
                {t("faq_6_desc_1")}
                <span className="purpleGrey">{t("faq_6_desc_2")}</span>
                <span className="linksColor text-semibold">
                  <a
                    className="linksColor"
                    href="https://coinmarketcap.com/currencies/usd-coin/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("faq_6_desc_3")}
                  </a>
                </span>
                <span className="purpleGrey">{t("faq_6_desc_4")}</span>
                {t("faq_6_desc_5")}
                <a
                  className="linksColor"
                  href="https://ethereum.org/en/developers/docs/gas/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("faq_6_desc_6")}
                </a>
                {t("faq_6_desc_7")}
              </p>
            }
          />
          <CollapseMenu
            heading={t("faq_7_title")}
            para={
              <p className={styles.p}>
                <span className="purpleGrey">{t("faq_7_desc_1")}</span>
                {t("faq_7_desc_2")}
              </p>
            }
          />
          <CollapseMenu
            heading={t("faq_8_title")}
            para={
              <p className={styles.p}>
                {t("faq_8_desc_1")}
                <span className="purpleGrey">{t("faq_8_desc_2")}</span>
              </p>
            }
          />
          <CollapseMenu
            heading={t("faq_9_title")}
            para={<p className={styles.p}>{t("faq_9_desc")}</p>}
          />
          <CollapseMenu
            heading={t("faq_10_title")}
            para={
              <p className={styles.p}>
                <span className="purpleGrey">{t("faq_10_desc_1")}</span>
                {t("faq_10_desc_2")}
              </p>
            }
          />
          <CollapseMenu
            heading={t("faq_11_title")}
            para={
              <>
                <p className={styles.p}>
                  <span className="purpleGrey">{t("faq_11_desc_1")}</span>
                  {t("faq_11_desc_2")}
                </p>
                <br />
                <p className={`${styles.p} m-0`}>
                  <span className="purpleGrey">{t("faq_11_desc_3")}</span>
                  {t("faq_11_desc_4")}
                </p>
              </>
            }
          />
          <CollapseMenu
            heading={t("faq_12_title")}
            para={
              <>
                <ul
                  style={{ marginTop: "12px", marginLeft: "20px" }}
                  className={styles.ul}
                >
                  <li>
                    {t("faq_12_desc_1")}
                    <br />{" "}
                    <p className={`${styles.p} m-0`}>
                      {t("faq_12_desc_2")}
                      <span className=" text-invar-grey font-semibold break-all">
                        {t("faq_12_desc_3")}
                      </span>{" "}
                    </p>{" "}
                    <p className={`${styles.p} m-0`}>
                      {t("faq_12_desc_4")}
                      <span className=" text-invar-grey font-semibold break-all">
                        {t("faq_12_desc_5")}
                      </span>
                    </p>
                  </li>
                  <li>
                    {t("faq_12_desc_6")}
                    <br />{" "}
                    <p className={`${styles.p} m-0`}>
                      <span className=" text-invar-grey font-semibold break-all">
                        {t("faq_12_desc_7")}
                      </span>{" "}
                    </p>
                  </li>
                </ul>
              </>
            }
          />
          <CollapseMenu
            heading={t("faq_13_title")}
            para={
              <p className={styles.p}>
                {t("faq_13_desc_1")} (
                <a
                  className="linksColor"
                  href="https://twitter.com/InVarFinance"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </a>
                ,
                <a
                  className="linksColor"
                  href="https://discord.com/invite/BrzPWYut4p"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  Discord
                </a>
                ) {t("faq_13_desc_2")}{" "}
                <a
                  href="mailto:info@invar.finance"
                  className="linksColor"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  info@invar.finance
                </a>
                {t("faq_13_desc_3")}
              </p>
            }
          />
        </section>
        <section className={`${styles.tutorialSection} ${styles.sidesSpacing}`}>
          <h3 className={`${styles.h3} text-center`}>Tutorials</h3>
          <CollapseMenu
            heading={t("tutorials_1_title")}
            para={
              <>
                <p className={styles.p}>{t("tutorials_1_desc_1")}</p>
                <br />
                <p className={`m-0 ${styles.p}`}>
                  {t("tutorials_1_desc_2")}
                  <span className="text-invar-error font-semibold">
                    {t("tutorials_1_desc_3")}
                  </span>
                </p>
              </>
            }
          />
          <CollapseMenu
            heading={t("tutorials_2_title")}
            para={<p className={styles.p}>{t("tutorials_2_desc_1")}</p>}
          />
          <CollapseMenu
            heading={t("tutorials_3_title")}
            para={<p className={styles.p}>{t("tutorials_3_desc_1")}</p>}
          />
          <CollapseMenu
            heading={t("tutorials_4_title")}
            para={<p className={styles.p}>{t("tutorials_4_desc_1")}</p>}
          />
          <CollapseMenu
            heading={t("tutorials_5_title")}
            para={<p className={styles.p}>{t("tutorials_5_desc_1")}</p>}
          />
        </section>

        <section className={`${styles.partnersSection} ${styles.sidesSpacing}`}>
          <h3 className={`${styles.h3} text-center`}>Partners</h3>
          <div className={styles.partnerSectionWrapper}>
            <a
              href="https://www.circle.com/en/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`${styles.logoCont}`}>
                <div className={styles.logo1}></div>
              </div>
            </a>
            <a
              href="https://www.catchonlabs.xyz/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`${styles.logoCont}`}>
                <div className={styles.logo2}></div>
              </div>
            </a>
            <a
              href="https://flowbay.co/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`${styles.logoCont}`}>
                <div className={styles.logo3}></div>
              </div>
            </a>
            <a
              href="https://headdao.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`${styles.logoCont}`}>
                <div className={styles.logo4}></div>
              </div>
            </a>
            <a
              href="https://hashex.org/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`${styles.logoCont}`}>
                <div className={styles.logo5}></div>
              </div>
            </a>
            <a
              href="https://cerestoken.io/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`${styles.logoCont}`}>
                <div className={styles.logo6}></div>
              </div>
            </a>
            <a
              href="https://www.kryptogo.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`${styles.logoCont}`}>
                <div className={styles.logo7}></div>
              </div>
            </a>
            <a
              href="https://twitter.com/routerprotocol"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={`${styles.logoCont}`}>
                <div className={styles.logo8}></div>
              </div>
            </a>
          </div>
        </section>
        <Footer />
      </div>
      <div
        id="scroll-top"
        className={styles.toTop}
        onClick={scrollToTopHandler}
      >
        <Image src={toTop} />
      </div>
    </div>
  );
}

export default App;
