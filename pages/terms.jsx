import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '../components/Footer'
const Terms = () => {

  const titleList = [
    {
      id: '1',
      title: '1. Ownership'
    },
    {
      id: '2',
      title: '2. Your Obligations'
    },
    {
      id: '3',
      title: '3. Fees and Payment'
    },
    {
      id: '4',
      title: '4. Disclaimers'
    },
    {
      id: '5',
      title: '5. Limitation of Liability'
    },
    {
      id: '6',
      title: '6. KYC & AML Regulations'
    },
    {
      id: '7',
      title: '7. Risk Assumption'
    },
    {
      id: '8',
      title: '8. Indemnification'
    },
    {
      id: '9',
      title: '9. Changes to the Terms and Conditions'
    },
    {
      id: '10',
      title: '10. Children'
    },
    {
      id: '11',
      title: '11. Dispute Resolution, Arbitration'
    },
  ]

  return (
    <div className='bg-gradient-to-b from-[#44334C] to-[#1E1722] '>
      <div className="h-20 bg-invar-dark grid place-content-center text-[#030F2B]">
        <Link href="invaria2222">
          <Image className='cursor-pointer' width={95} height={34} src='/logo_white.svg' />
        </Link>
      </div>
      <div className="py-16 px-6 xl:px-56 grid grid-cols-8 gap-12">
        <div className="container text-white col-span-8 md:col-span-5 text-base font-normal">
          <p className="text-[32px] leading-[38.4px] font-semibold">{`Terms & Conditions`}</p>
          <p className="pt-3 pb-6 ">Last Updated: June 20th, 2022</p>
          <p>
            InVaria 2222 is a collection of digital artworks (NFTs) running on the Ethereum network.
            This website is only an interface allowing participants to purchase digital collectibles.
            Users are entirely responsible for the safety and
            management of their own private Ethereum wallets and
            validating all transactions and contracts generated by this website before approval.
            Furthermore, as the InVaria 2222 smart contract runs on the Ethereum network,
            there is no ability to undo, reverse, or restore any transactions.
          </p>
          <br />
          <p>
            This website and its connected services are provided “as is” and “as available” without warranty of any kind.
            By using this website you are accepting sole responsibility for any and
            all transactions involving InVaria 2222 digital collectibles.
          </p>
          <p className="text-xl font-semibold mt-[46px] mb-3" id="1">1. Ownership</p>
          <p>
            A. You Own the NFT. Each InVaria 2222 is an NFT on the Ethereum blockchain.
            When you purchase an NFT, you own the underlying InVaria 2222 NFT, the Art, completely.
            Ownership of the NFT is mediated entirely by the Smart Contract and the Ethereum Network:
            at no point may we seize, freeze, or otherwise modify the ownership of any InVaria 2222 NFT.
          </p>
          <br />
          <p>
            B. Personal Use. Subject to your continued compliance with these Terms,
            InVar grants you a worldwide, copy, and display the purchased Art,
            along with any extensions that you choose to create or use, solely for the following purposes:
            (i) for your own personal, non-commercial use;
            (ii) as part of a marketplace that permits the purchase and sale of your InVaria 2222 NFT,
            provided that the marketplace cryptographically verifies each InVaria 2222 NFT owner’s rights to
            display the Art for their InVaria 2222 NFT to ensure that only the actual owner can display the Art;
            or (iii) as part of a third party website or application that permits the inclusion, involvement,
            or participation of your InVaria 2222 NFT,
            provided that the website/application cryptographically verifies each InVaria 2222 NFT owner’s rights to
            display the Art for their InVaria 2222 NFT to ensure that only the actual owner can display the Art,
            and provided that the Art is no longer visible once the owner of the InVaria 2222 NFT leaves the website/application.
          </p>
          <br />
          <p>
            C. InVaria 2222 is an encrypted digital asset that recognizes artworks (`&quot;`artwork(s)`&quot;`) created by
            InVar`&apos;`s artists (`&quot;`artist(s)`&quot;`) or partners. Upon your purchase of a InVaria 2222 on this website,
            you will be granted rights to commercial use as provided in the terms of commercial use on this website.
            Except as expressly permitted in these terms, you may download the content on this website only for your personal,
            non-commercial fair use. You understand and accept that you are prohibited from any of the following activities:
          </p>
          <p className="pl-6 -indent-4">
            1. To trademark or apply to trademark the artwork, or otherwise acquire intellectual property rights therein.
          </p>
          <p className="pl-6 -indent-4">
            2. Use the artwork or InVaria 2222 in connection with images of hatred, violence, other inappropriate behavior,
            or illegal activities.
          </p>
          <p className="pl-6 -indent-4">
            3. Upon InVar marketing and promoting the service,
            the names and designs of the goods and services related to the service (the `&quot;`service marks`&quot;`)
            are protected by the trademark act and fair trade act of applicable jurisdictions according
            to their registered status or registered use. You may not use the service marks in any way
            without the prior written consent of InVar.
          </p>
          <br />
          <p>
            D. Feedback. You may choose to submit comments, bug reports, ideas or other feedback about the Site,
            including without limitation about how to improve the Site (collectively, “Feedback”).
            By submitting any Feedback, you agree that we are free to use such Feedback in any way
            we choose without additional compensation to you and you hereby grant us a perpetual, irrevocable,
            nonexclusive, worldwide license to incorporate and use the Feedback for any purpose.
          </p>
          <br />
          <p>
            E. Unless otherwise provided in these terms, the software, interface, programs, and contents on this website,
            including but not limited to news, columns, writings, text, pictures, images, music, dance, scripts, signatures,
            names, stage names, song titles, files, information, data, program structure, interface arrangement,
            interface design, etc., are owned by InVar or other rights holders in accordance with the laws.
            The aforementioned intellectual property rights include but are not limited to trademarks, patents,
            copyrights, trade secrets and proprietary technology, etc., and may not be used, modified, reproduced,
            publicly broadcast, altered, distributed, rented, distributed, publicly transmitted, publicly published,
            restored, decompiled or reverse-compiled by anyone without prior consent.
            It is your obligation to respect the intellectual property rights,
            and you shall be liable for any breach thereof and all damages incurred by InVar or the other rights holders of
            the intellectual property rights.
          </p>
          <p className="text-xl font-semibold mt-[46px] mb-3" id="2">
            2. Your Obligations
          </p>
          <p>
            You are solely responsible for your own conduct while accessing or using the Site,
            and for any consequences thereof. You agree to use the Site only for purposes that are legal,
            proper and in accordance with these Terms and any applicable laws or regulations.
            By way of example, and not as a limitation, you may not, and may not allow any third party to:
            (i) send, upload, distribute or disseminate any unlawful, defamatory, harassing, abusive, fraudulent,
            hateful, violent, obscene, or otherwise objectionable content; (ii) distribute viruses, worms, defects,
            Trojan horses, corrupted files, hoaxes, or any other items of a destructive or deceptive nature;
            (iii) impersonate another person; (iv) upload, post, transmit or otherwise make available through
            the Site any content that infringes the intellectual property or proprietary rights of any party or otherwise violates
            the legal rights of others; (v) engage in, promote, or encourage illegal activity (including, without limitation,
            money laundering); (vi) interfere with other users`&apos;` use of the Site;
            (vii) use the Site for any unauthorized commercial purpose;
            (viii) modify, adapt, translate, or reverse engineer any portion of the Site;
            (ix) remove any copyright, trademark or other proprietary rights notices contained in or on the Site or any part of it;
            (x) use any technology to collect information about the Site’s for any unauthorized purpose;
            (xi) access or use the Site for the purpose of creating a product or service
            that is competitive with any of our products or services.
            If you engage in any of the activities prohibited by this Section, we may, at our sole and absolute discretion,
            without notice to you, and without limiting any of our other rights or remedies at law or in equity,
            immediately suspend or terminate your user account.
          </p>
          <p className="text-xl font-semibold mt-[46px] mb-3" id="3">
            3. Fees and Payment
          </p>
          <p>
            A. If you elect to purchase a InVaria 2222 NFT through the Site,
            any financial transactions that you engage in will be conducted solely through the Ethereum network.
            We will have no insight into or control over these payments or transactions,
            nor do we have the ability to reverse any transactions.
            We will have no liability to you or to any third party for any claims or damages that
            may arise as a result of any transactions that you engage or any other transactions that
            you conduct via the Ethereum network.
          </p>
          <br />
          <p>
            B. Ethereum requires the payment of a transaction fee (a “Gas Fee”) for every transaction that
            occurs on the Ethereum network. The Gas Fee funds the network of computers that
            run the decentralized Ethereum network. This means that you will need to pay a Gas Fee for each transaction.
          </p>
          <p className="text-xl font-semibold mt-[46px] mb-3" id="4">
            4. Disclaimers
          </p>
          <p>
            A.  The Platform, InVar, InVaria 2222 NFT, Finished Items and Special NFTs (if any) are provided on an “as is” and “as available” basis, without warranties of any kind, either express or implied, including, without limitation, implied warranties of merchantability, fitness for a particular purpose, non-infringement, the availability or quality of any InVaria 2222 NFT or Finished Item or Special NFT, or that access to or use of the Platform will be uninterrupted or error free.
          </p>
          <br />
          <p>
            B.  The InVar are provided for informational purposes only and are not intended to be a substitute for any type of professional advice, including without limitation legal or financial advice.
          </p>
          <br />
          <p>
            C.  InVar has no special relationship with or fiduciary duty to You and InVar does not in any manner have an ongoing duty to alert You to all potential risks of using or accessing the Platform or in relation to InVaria 2222 NFT(s) or Finished Item or any Transaction(s).
          </p>
          <br />
          <p>
            D.  Under no circumstances will InVar be liable to You in any way for:
          </p>
          <p className="pl-6 -indent-4">
            1. Any errors, mistakes, omissions, or inaccuracies relating to InVar, InVaria 2222 NFT(s),
            Finished Item, Special NFT, the Platform or any loss or damage of any kind incurred in connection
            with use of or exposure to any InVar posted, emailed, accessed, transmitted,
            or otherwise made available via the Platform, or use or access of the Platform,
            InVaria 2222 NFT(s), Finished Item or Special NFT;
          </p>
          <p className="pl-6 -indent-4">
            2. loss or damaged caused by another user’s violation of this Agreement,
            including any unauthorized access to or use of our servers or other Platform features;
          </p>
          <p className="pl-6 -indent-4">
            3. any restitution or compensation for loss of profits, revenues, or data;
          </p>
          <p className="pl-6 -indent-4">
            4. the acts or omissions of any third parties, nor for any damage that You may suffer
            as a result of Your transactions or any other interaction with any third parties,
            including third-party providers that provide Wallet services or that store the InVaria 2222 NFT(s) or Finished Item(s).
          </p>
          <br />
          <p>
            E.  You expressly understand and agree to the following provisions.
          </p>

          <p className="pl-6 -indent-4">
            1. The service may be interrupted or malfunctioned, or may cause inconvenience, loss of data, errors, tampering, or other financial losses to you. You are advised to implement precaution measures when using the service.
          </p>
          <p className="pl-6 -indent-4">
            2. InVar shall not be liable for any damages arising out of your use of or inability to use the service, except in cases of InVar’s intentional infringement or gross negligence.
          </p>
          <p className="pl-6 -indent-4">
            3. You may not claim to InVar that any data, goods, services, or other information purchased/obtained through the website does not meet the requirements, expectations, or have defects.
          </p>
          <p className="pl-6 -indent-4">
            4. Due to the nature of the internet transmission, we cannot guarantee the accuracy and timeliness of all transactions conducted through the website, nor do we guarantee that the service will be available, uninterrupted, safe and secure at all times.
          </p>
          <p className="pl-6 -indent-4">
            5. No information nor advice you obtained from or through the website, whether obtained in writing or orally, shall constitute a warranty by InVar.
          </p>
          <p className="pl-6 -indent-4">
            6. You shall be responsible for any damages and losses arising from any breach of these terms and InVar shall not be liable for any damages or compensation for losses.
          </p>
          <p className="pl-6 -indent-4">
            7. You shall be liable for all damages (including but not limited to, the litigation costs and attorneys`&apos;` fees) incurred by InVar or the website from your illegal use of this website or service or breach of these terms.
          </p>
          <br />
          <p>
            F.  Some jurisdictions do not allow the exclusion of certain warranties and limitations of liability provided
            in this Agreement. If You are in such a jurisdiction, some of the above limitations and disclaimers may not apply to You.
            To the extent we may not, as a matter of applicable law, disclaim any implied warranty or limit our liabilities,
            the scope and duration of such warranty and the extent of our liability will be the minimum permitted by applicable law.
          </p>
          <p className="text-xl font-semibold mt-[46px] mb-3" id="5">
            5. Limitation of Liability
          </p>
          <p>
            A. You understand and agree that in no case shall InVar, our directors, officers, employees, affiliates, agents,
            contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct,
            indirect, incidental, punitive, special, or consequential damages of any kind, including,
            without limitation lost profits,lost revenue, lost savings, loss of data, replacement costs,
            or any similar damages, whether based in contract, tort (including negligence),
            strict liability or otherwise, arising from your use of any of the service or any products procured using the service,
            or for any other claim related in any way to your use of the service or any product,
            including, but not limited to, any errors or omissions in any content,
            or any loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted,
            transmitted, or otherwise made available via the service, even if advised of their possibility.
          </p>
          <br />
          <p>
            B. You acknowledge and agree that we have made the site available to you and entered into these terms
            in reliance upon the warranty disclaimers and limitations of liability set forth herein.
            We would not be able to provide the site to you without these limitations.
          </p>
          <p className="text-xl  font-semibold mt-[46px] mb-3" id="6">
            6. KYC & AML Regulations
          </p>
          <p>
            A. If, at any time, InVar determine that InVar must or should comply with applicable law, regulations,
            or guidance for money services businesses operating in the Kingdom of Bahrain or any other jurisdiction,
            InVar may be required to file details of account activity to the Financial Crimes Enforcement Network (“FinCEN”),
            anti-money laundering (AML) and Counter Financing of Terrorism (CFT) recommendations and programs of
            the Financial Action Task Force (FATF) and United Nations from time to time.
            InVar may also be required to provide information as required by law of the Kingdom of Bahrain
            and other jurisdictions including, but not limited to, reporting suspicious transactions to FinCEN,
            and maintaining records regarding transactions of $3,000 or more (the “Recordkeeping Requirements”).
          </p>
          <br />
          <p>
            B. InVar maintain a KYC (Know Your Customer) policy to comply with the Recordkeeping Requirements.
            InVar aim to reasonably identify each prospective purchaser of InVaria 2222 NFT
            by cross-checking user data against governmental watch lists, including, but not limited to,
            the Specifically Designated Nationals and Sanction List maintained by OFAC or others,
            as well as third-party identity verification and authentication services.
          </p>
          <br />
          <p>
            C. If your proposed purchase is flagged through our internal controls,
            InVar may require additional proof of identification from you,
            and InVar have the right to not permit any purchases until additional
            and verifiable proof of identity to our satisfaction is received
            and you have been approved as a prospective purchaser. By agreeing to this Terms & Conditions,
            you acknowledge and agree that InVar maintain verification levels that require user participation
            and verification to obtain, with leveled permissions based on user-supplied information,
            our ability to verify it, and our internal policies. You accept that
            you may not be able to achieve your desired level of verification,
            and InVar reserve the right, at our sole discretion, to determine the appropriate
            verification level for any user, as well as the right to downgrade users without notice.
            InVar may, from time to time, implement policies restricting verification levels by nationality,
            country of residence, or any other factor.
          </p>
          <p className="text-xl  font-semibold mt-[46px] mb-3" id="7">
            7. Risk Assumption
          </p>

          <p>
            You accept and acknowledge each of the following:
          </p>
          <br />
          <p>
            A. To the extent that you sell your InVaria 2222 NFT,
            please be aware that the prices of NFTs are extremely volatile and fluctuations in the prices of other NFTs
            and impact the price of your InVaria 2222 NFT both positively and negatively.
            Given the volatility, NFTs such as InVaria 2222 NFT should not be considered an investment.
            You assume all risks in that connection.
          </p>
          <br />
          <p>
            B. Ownership of a InVaria 2222 NFT confers ownership of digital artwork only. Accordingly, no information on this Site (or any other documents mentioned therein) is or may be considered to be advice or an invitation to enter into an agreement for any investment purpose. Further, nothing on this Site qualifies or is intended to be an offering of securities in any jurisdiction nor does it constitute an offer or an invitation to purchase shares, securities or other financial products. Due to the artistic nature of the project, InVar has not been registered with or approved by any regulator in any jurisdiction. It remains your sole responsibility to assure that the purchase of the InVaria 2222 NFT and the associated art is in compliance with laws and regulations in your jurisdiction.
          </p>
          <br />
          <p>
            C. You assume all risks associated with using an Internet-based currency, including, but not limited to,
            the risk of hardware, software and Internet connections, the risk of malicious software introduction,
            and the risk that third parties may obtain unauthorized access to information stored within your wallet.
          </p>
          <br />
          <p>
            D. NFTs, cryptocurrencies and blockchain technology are relatively new and the regulatory landscape is unsettled.
            New regulations could negatively impact such technologies impacting the value for your InVaria 2222 NFT.
            You understand and accept all risk in that regard.
          </p>
          <br />
          <p>
            E. You assume all responsibility for any adverse effects of disruptions or other issues
            impacting Ethereum or the Ethereum platform.
          </p>
          <p className="text-xl font-semibold mt-[46px] mb-3" id="8">
            8. Indemnification
          </p>
          <p>
            You agree to hold harmless and indemnify InVar and its subsidiaries, affiliates, officers, agents, employees, advertisers, licensors, suppliers or partners from and against any claim, liability, loss, damage (actual and consequential) of any kind or nature, suit, judgment, litigation cost, and reasonable attorneys`&apos;` fees arising out of or in any way related to (i) your breach of these Terms, (ii) your misuse of the Site, or (iii) your violation of applicable laws, rules or regulations in connection with your access to or use of the Site.
          </p>
          <p className="text-xl font-semibold mt-[46px] mb-3" id="9">
            9. Changes to the Terms and Conditions
          </p>
          <p>
            We may make changes to the Terms at our discretion. Please check these Terms periodically for changes.
            Any changes to the Terms will apply on the date that they are made, and your continued
            access to or use after the Terms have been updated will constitute your binding acceptance of the updates.
            If you do not agree to any revised Terms, you may not access or use the Site.
          </p>
          <p className="text-xl font-semibold mt-[46px] mb-3" id="10">
            10. Children
          </p>
          <p>
            Our Site is not intended for children.
            You must be at least 21 years old to access this Site or purchase a InVaria 2222 NFT.
            If you are under 21 years old you are not permitted to use this Site for any reason.
            By accessing the Site, you represent and warrant that you are at least 21 years of age.
          </p>
          <p className="text-xl font-semibold mt-[46px] mb-3" id="11">
            11. Dispute Resolution, Arbitration
          </p>
          <p>
            All disputes arising out of or in connection with these Terms,
            including without limitation your access or use of the Site,
            or to any products sold or distributed through the Site,
            will be referred to and finally resolved by arbitration under the rules of the American Arbitration Association.
            The case will be adjudicated by a single arbitrator and will be administered
            by the American Arbitration Association in accordance with its applicable rules.
            Each party will cover its own fees and costs associated with the arbitration proceedings.
            The place of arbitration will be New York, New York.
            The award of the arbitrator will be final and binding,
            and any judgment on the award rendered by the arbitrator may be entered in any court of competent jurisdiction.
            Notwithstanding the foregoing, we may seek and obtain injunctive relief in any jurisdiction
            in any court of competent jurisdiction.
          </p>
          <br />
          <p>
            With respect to any dispute arising out of or related to these terms,
            including without limitation disputes related to the site or any products sold or distributed through the site,
            or the smart contracts:
            (i) you hereby expressly give up your right to have a trial by jury;
            and (ii) you hereby expressly give up your right to participate as a member of a class of claimants in any lawsuit,
            including but not limited to class action lawsuits involving any such dispute.
          </p>
        </div>
        <div className="md:col-span-3 hidden md:block fixed top-[149px] right-6 xl:right-52">
          <div className=" bg-invar-dark px-6 pt-6 pb-3 rounded text-invar-light-grey">
            {titleList.map((item, index) => (
              <div key={index} className="pb-3 hover:underline" id={item.id}>
                <a href={`#${item.id}`}>{item.title}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Terms
