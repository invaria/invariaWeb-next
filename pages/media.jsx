import React, { useEffect, useState } from "react";
import styles from "../styles/media.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MediaRow from "../components/MediaRow";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ScrollToTop } from "../components";

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "storyline",
        "propertyInfo",
        "sale",
        "dashboard",
      ])),
    },
  };
}

const Media = () => {
  const [headerBackground, setHeaderBackground] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setHeaderBackground(window.pageYOffset > 20)
      );
    }
  }, []);
  return (
    <div className={styles.mediaPage}>
      <div className={styles.navWrapper}>
        <Navbar headerBackground={headerBackground} />
      </div>
      <div className={styles.pageWrapper}>
        <section className={styles.mediaSection}>
          <h4>News</h4>
          <MediaRow
            about="Foresight News"
            detail="InVaria 2222 是一个基于 RWA 的代币化世界，其目标是在现实世界和数字经济之间建立联系"
            img={"/v2imgs/foresight.png"}
            redirectLink="https://foresightnews.pro/wiki/project/20163"
          />
          <MediaRow
            about="ThePrimedia"
            detail="RWA 现实资产代币化、碎片化基础设施与平台 InVaria2222"
            img={"/v2imgs/premedia.png"}
            redirectLink="https://www.theprimedia.com/html/bq/news1073.html"
          />
          <MediaRow
            about="ThePrimedia"
            detail="InVaria2222 实物资产（RWA）碎片化世界引领多元金融发展"
            img={"/v2imgs/premedia.png"}
            redirectLink="https://www.theprimedia.com/html/mb/news1555.html"
          />
          <MediaRow
            about="Bitcoin"
            detail="InVar Finance Builds InVaria2222 as the Team Looks to Provide Hybrid Finance Services"
            img={"/v2imgs/bitcoin.png"}
            redirectLink="https://news.bitcoin.com/invar-finance-builds-invaria2222-as-the-team-looks-to-provide-hybrid-finance-services/"
          />
        </section>
        <ScrollToTop />

        <Footer />
      </div>
    </div>
  );
};

export default Media;
