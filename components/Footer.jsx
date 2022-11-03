import React from "react";
import styles from "../styles/footer.module.css";
import Image from "next/image";
import Link from "next/link";

import youtube from "../assets/images/icons/youtube.png";
import dots from "../assets/images/icons/dots.png";
import twitter from "../assets/images/icons/twitter.png";
import discord from "../assets/images/icons/discord.png";
import email from "../assets/images/icons/email.png";
import { useTranslation } from "next-i18next";
import { Link as ScrollLink } from "react-scroll";

const Footer = ({ c }) => {
  const { t } = useTranslation("common");
  return (
    <footer id="footer" className={`${styles.footer} relative z-20`}>
      <div className={styles.footerContent}>
        <div className={styles.footerLeft}>
          <div className={styles.winnerBtn}>
            <a href="#footer">
              <img
                onClick={() => window["logBadgeClick"]()}
                id="badge-button"
                style={{ width: "186px", height: "32px" }}
                src="https://static.alchemyapi.io/images/marketing/alchemy-wagbi-badge-dark.png"
                alt="Alchemy Supercharged"
              />
            </a>
          </div>
          <ul>
            <a
              href="https://github.com/InVarFinance/invaria2222"
              rel="noopener noreferrer"
              target="_blank"
            >
              <li>Github </li>
            </a>
            <li>Docs</li>
            <a
              href="https://github.com/HashEx/public_audits/blob/master/InVaria2222/InVaria2222.pdf"
              rel="noopener noreferrer"
              target="_blank"
            >
              <li>Audit </li>
            </a>
            {/* <ScrollLink
                    activeClass="active"
                    offset={-100}
                    smooth
                    spy
                    to="faq"
                  > */}
            <Link href="invaria2222#faqoutside">
              <li>FAQ & Tutorials</li>
            </Link>
            {/* </ScrollLink> */}
            <Link href="/privacy">
              <li>{t("privacy_policy")}</li>
            </Link>
            <Link href="terms">
              <li>{t("terms_conditions")}</li>
            </Link>
          </ul>
        </div>
        <div className={styles.footerRight}>
          <div className={styles.footerIconCont}>
            <a
              href="https://www.youtube.com/channel/UCE6nLXvFjITq0IAsXipnkqQ"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={styles.footerIcon}>
                <Image src={youtube} />
              </div>
            </a>
            <a
              href="https://medium.com/@invar.finance"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={styles.footerIcon}>
                <Image src={dots} />
              </div>
            </a>
            <a
              href="https://twitter.com/InVarFinance"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={styles.footerIcon}>
                <Image src={twitter} />
              </div>
            </a>
            <a
              href="https://discord.gg/BrzPWYut4p"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={styles.footerIcon}>
                <Image src={discord} />
              </div>
            </a>

            <a
              href="mailto:info@invar.finance"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className={styles.lastIcon}>
                <Image src={email} />
              </div>
            </a>
          </div>
          <p>
            © 2022 InVaria 2222 | Supported by{" "}
            <span className={styles.pivoterra}>
              <a
                href="https://pivoterra.notion.site/"
                rel="noopener noreferrer"
                target="_blank"
              >
                PivoTerra
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
