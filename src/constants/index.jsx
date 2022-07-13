import { OpenLink, ButtonMailto } from '../../components/icons/Link';
import Link from 'next/link'
export const faqList = [
  {
    question: 'Why InVaria 2222 is unique?',
    answer: (
      <p>
        InVaria 2222 is mission-oriented world for tokenization,
        not just intented to be a real estate or RWAs offering project,
        but expected to present as a leading example for connecting real and digital economics,
        the Hybrid Finance. InVaria 2222 NFTs enable holder to acquire values of economic activities
        or investments through staking and yield-generating strategy.
      </p>
    ),
  },
  {
    question: 'How does InVaria 2222 work?',
    answer: (
      <p>
        InVaria 2222 utilizes blockchain technology (smart contract ERC-1155, -721 & Staking) to
        release the potential of real-world-assets (RWAs), and bring new use cases of tokenization to more users.
        Within InVaria, the utilities and benefits originated from NFTs are organized under proof of equity interest,
        which ensure NFT staking more reliable and sustainable
      </p>
    ),
  },
  {
    question: 'Who can mint InVaria 2222 NFT?',
    answer: (
      <div>
        <p className="text-invar-grey inline font-semibold">User who pass identity verification is eligible to mint InVaria 2222 NFT. </p>
        Even though we defend the virtue of decentralization, to scale crypto adoption,
        there are still some guidelines we should follow.
        <div>
          <br />
          <p>*Check <span className="text-invar-purple font-semibold hover:underline"><Link href="/terms" >Terms & Conditions</Link></span> for more policy.</p>
        </div>
      </div>
    ),
  },
  {
    question: 'What is the supply table of InVaria 2222 NFT?',
    answer: (
      <p>
        For experimental NFT (the MVP), we decided to use the progressive-launch method,
        100 NFTs for the first whitelist & public mint stage, and arrange another stage for the rest,
        total supply is determined by the overall consideration of RWA value and strategy.
        For example, if the valuation of property is $10m, then the cap of supply for $10k worth of NFT will be 1000.
      </p>
    ),
  },
  {
    question: 'What is the schedule of NFT mint?',
    answer: (
      <p>
        In phase 1, the first NFT will have <span className="text-invar-grey font-semibold">3 mint stages, pre-mint, whitelist and public mint</span>.
        The official timeline of each stage will announce in our social media
        (<span>
          <OpenLink link="https://twitter.com/InVarFinance">
            Twitter
          </OpenLink>
        </span>
        {`, `}
        <span>
          <OpenLink link="https://discord.gg/BrzPWYut4p">
            Discord
          </OpenLink></span>).
      </p>
    ),
  },
  {
    question: 'How much will it cost to mint InVaria 2222 NFT?',
    answer: (
      <p>
        Costs incurred from minting NFT(s) can conclude to two kinds, minting cost and gas (network) fee.
        In general, <span className="text-invar-grey font-semibold"> NFT minting cost is priced at 10,000
        <OpenLink link="https://coinmarketcap.com/currencies/usd-coin/"> USDC </OpenLink> (ERC-20)
        </span>
        <span>, and the </span>
        <span>
          <OpenLink link="https://ethereum.org/en/developers/docs/gas/">
            gas fee is calculated by the network status of Ethereum
          </OpenLink>
        </span>
        . The additional cost may incur if an unexpected event or false execution happens.
      </p>
    ),
  },
  {
    question: 'Is there a maximum mint limit per wallet during the mint stage?',
    answer: (
      <p>
        <span className="text-invar-grey font-semibold">No limit. First come, first served. </span>
        Due to InVaria 2222 being in the exploration period, no single human knows
        what will happen when this new type of NFT comes out. So, we free the restriction in the current phase.
      </p>
    ),
  },
  {
    question: 'What can I have after mint?',
    answer: (
      <p>
        Once you successfully minted first InVaria 2222 NFT,
        you will certainly have ownership of the NFT and the right of stake-to-earn.
        In addition,<span className="text-invar-grey font-semibold"> you will have exclusive pass-type NFT free mint (limited privilege for phase 1 participants)</span>.
      </p>
    ),
  },
  {
    question: 'Can I trade or transfer my InVaria 2222 NFT?',
    answer: (
      <p>
        Yes, everyone can trade InVaria 2222 NFT in the open marketplace,
        no matter sale or purchase. Also, the NFT owner can transfer your NFT if you desired to do so.
      </p>
    ),
  },
  {
    question: 'What is NFT staking and others I need to know?',
    answer: (
      <p>
        <span className="text-invar-grey font-semibold">InVaria 2222 NFT is an interest-bearing (when staking), redemption-secured NFT
        with one-year lock-up period.</span> NFT owners can stake their NFT in the project website
        and accrue interest from time to time, besides, NFT is enable to burn after
        the lock-up period and return your initial mint cost.
      </p>
    ),
  },
  {
    question: 'The future plans about the funds and development?',
    answer: (
      <p>
        <span className="text-invar-grey font-semibold">About fund management,</span> 80% of funds go directly to FlowBay Financial Holdings,
        a financial group with property management unit and fund management team;
        20% of funds will transfer to staking smart contract.
        <br /> <br /> 
        <span className=" text-invar-grey font-semibold">About project development,</span>
        tokenization of RWAs is only our first step, most of the funds will
        be utilized to generate more profits through property management and development,
        small amount will be used in hybrid finance development.
      </p>
    ),
  },
  {
    question: 'Smart contracts and addresses you may want to know?',
    answer: (
      <ul className="list-disc pl-6">
        <li>InVaria 2222 smart contracts:</li>
        NFT (ERC-1155) <br />
        Staking
        <li>InVaria 2222 operating account:</li>
        <p className="text-invar-purple font-semibold truncate ">0xAcB683ba69202c5ae6a3B9b9b191075295b1c41C</p> 
        <br />
      </ul>
    ),
  },
  {
    question: 'How can I get in touch with the team?',
    answer: (
      <p>
        {`You can join our official channels (`}
        <span>
          <OpenLink link="https://twitter.com/InVarFinance">
            Twitter
          </OpenLink>
        </span>
        {`, `}
        <span>
          <OpenLink link="https://discord.gg/BrzPWYut4p">
            Discord
          </OpenLink>
        </span>
        {`) to follow the latest news or you can email `}
        <ButtonMailto />
        {` to talk partnerships.`}
      </p>
    ),
  },
];

export const tutorialsList = [
  
  {
    question: 'What do I need to get started?',
    answer: ( 
    <p>
       First and foremost, you need to learn how to use 
      Metamask (or other digital wallets), it allows users to access 
      InVaria 2222 service through a browser extension or mobile app. 
      <br/> <br/>
      Second, you will need some cryptocurrencies, USDC and ETH in 
      Ethereum Mainnet, either buy it within Metamask or transfer from 
      your crypto-exchange account. By using and interacting with 
      applications, you will need enough ETH to pay gas fee (transaction 
      fee). In common case, prepare 0.05 ETH is sufficient to mint NFT. 
      <span className="  text-invar-error font-semibold"> *More NFT you 
      mint, may cost more gas fee.</span>
    </p>),
  },
  {
    question: 'What wallets does InVaria 2222 support?',
    answer: 'Metamask is our recommendation. Currently, InVaria website supports Metamask and WalletConnect. In order to use our service please connect the wallet that contains InVaria 2222 NFTs.',
  },
  {
    question: 'Why do I need to pay for the gas fee?',
    answer: 'A gas fee is the charge that users pay to transact on the blockchain. Gas is used to compensate miners for the computing energy and resources expended to validate transactions and to include them in the blockchain. Gas prices fluctuate, depending on the complexity of a transaction and traffic on the network. Naturally, a transaction requiring more computational power will demand higher fees. Also, transacting during peak periods with plenty of traffic on the network will attract heftier fees.',
  },
  {
    question: 'What is NFT staking?',
    answer: 'NFT staking refers to locking up non-fungible tokens on a platform or protocol in exchange for staking rewards and other benefits. Staking NFTs allows holders to earn an income from their collection while maintaining ownership.',
  },
  {
    question: 'Why do I have to verify my identity (KYC) ?',
    answer: 'In order to conduct certain activities on our website, InVaria 2222 maintains a KYC (Know Your Customer) policy to comply with the applicable law, regulations, or guidance to crypto-service provider, we will have no liability or responsibility for your compliance with laws or regulations governing the transfer and use of NFTs.',
  },
];
