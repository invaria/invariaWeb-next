import { ButtonMailto } from '../components/icons/Link';
import Image from 'next/image'
import Link from 'next/link'
import { ScrollToTop, Footer } from '../components';

const Privacy = () => {
  
  const titleList = [
    {
      id: '1',
      title: '1. Scope of Privacy Protection Policy'
    },
    {
      id: '2',
      title: '2. Collection of Information'
    },
    {
      id: '3',
      title: '3. Use of Information'
    },
    {
      id: '4',
      title: '4. Protection of Data'
    },
    {
      id: '5',
      title: '5. External Links of the Website'
    },
    {
      id: '6',
      title: '6. Sharing of Information'
    },
    {
      id: '7',
      title: '7. Analytics'
    },
    {
      id: '8',
      title: '8. Amendments to the Privacy Protection Policy'
    },
    {
      id: '9',
      title: '9. Contacting Us'
    },
  ]

  return (
    <div>
      <ScrollToTop />
      <div className="h-20 bg-invar-dark grid place-content-center text-[#030F2B]">
        <Link href="/">
          <Image className='cursor-pointer' width={95} height={34} src='/logo_white.svg' />
        </Link>
      </div>
      <div className="bg-gradient-to-b from-[#44334C] to-[#1E1722] py-8 px-6 xl:px-60 grid grid-cols-8 gap-12">
        <div className="container text-white col-span-8 md:col-span-5">
          <p className="text-xl xl:text-2xl font-semibold">Privacy Policy Statement</p>
          <br />
          <p>Last Updated: June 20th, 2022</p>
          <br/>
          <p>
            You are very welcome to use this website. In order to allow you to use the services and
            information of this website with peace of mind, we hereby explain to you the privacy
            protection policy of this website to protect your rights and interests, please read the following:
          </p>
          <br />
          <p className="text-xl font-semibold" id="1">1. Scope of Privacy Protection Policy</p>
          <p>
            The privacy protection policy includes how this website handles personally
            identifiable information collected when you use the services of the trading platform.
            The privacy protection policy does not apply to related external pages outside this website,
            nor does it apply to persons not commissioned or involved in the management of this website.
          </p>
          <br />
          <p className="text-xl font-semibold" id="2">
            2.  Collection of Information
          </p>
          <p>
            A. Information You Provide to Us
            <br></br>
            We collect information you provide directly to us.
            For example, we collect information directly from you when you create an account,
            subscribe to receive communications from us, communication with us via third-party platforms,
            request customer or business support, or otherwise communicate with us.
            The types of information about you that we collect include email address, username, password,
            and any other information you choose to provide. Additionally, if you make a purchase,
            we work with a third-party payment processor who may collect additional identifiers and
            payment information to complete the transaction.
          </p>
          <br/>
          <p>
            B. Information We Collect Automatically
            <br></br>
            We automatically collect certain information about your interactions with us or our Services, including:
          </p>
          <p className="pl-6 -indent-4">
            1. Transactional Information: When you make a purchase, we collect information about the transaction,
            such as product details, purchase price, and the date and location of the transaction.
          </p>
          <p className="pl-6 -indent-4">
            2. Device and Usage Information: We collect information about how you access our Services,
            including data about the device and network you use, such as your hardware model,
            operating system version, mobile network, IP address, unique device identifiers,
            browser type, and app version. We also collect information about your activity on our Services,
            such as access times, pages viewed, links clicked, and the page you visited before navigating to our Services.
          </p>
          <p className="pl-6 -indent-4">
            3. Information Collected by Cookies and Similar Tracking Technologies:
            We (and those who perform work for us) use tracking technologies,
            such as cookies and web beacons, to collect information about your interactions with the Services.
            Cookies are small data files stored on your hard drive or in device memory that
            help us improve our Services and your experience, see which areas and features of our Services are popular,
            and count visits. Web beacons (also known as “pixel tags” or “clear GIFs”) are electronic images that
            we use on our Services and in our emails to help deliver cookies, count visits,
            and understand usage and campaign effectiveness. For more information about cookies and how to disable them,
            see the Your Choices section below.
          </p>
          <br/>
          <p>
            C.  Information We Collect from Other Sources
            <br />
            We may obtain information about you from other sources.
            For example, we may collect information you provide to us on our social media pages.
            Under these circumstances, we will have access to this information from the platform
            in accordance with the platforms’ terms of use and privacy policy.
            We may also collect information about you through other websites that provide identity verification services.
          </p>
          <br/>
          <p>
            D.  Information We Derive
            <br />
            We may derive information or draw inferences about you based on the information we collect.
            For example, we may make inferences about your approximate location based on your IP address or infer that
            you are looking to purchase certain products based on your browsing behavior and past purchases.
          </p>
          <br />
          <p className="text-xl font-semibold" id="3">
            3.  Use of Information
          </p>
          <p>
            We may use the information we collect to create an account for you on our websites, process a transaction, to communicate with you, to learn more about our users, and for marketing purposes. We also use the information we collect to:
            </p>
          <br/>
          <p>
            A.  Provide, maintain, improve, and develop our Services, including to debug and repair errors in our Services;
            </p>
          <br/>
          <p>
            B.  Personalize your experience with us;
            </p>
          <br/>
          <p>
            C.  Send you technical notices, security alerts, support messages and other transactional or relationship messages;
            </p>
          <br/>
          <p>
            D.  Communicate with you about our Services and events and provide news and information that we think will interest you (see the Your Choices section below for information about how to opt out of these communications at any time);
            </p>
          <br/>
          <p>
            E.  Monitor and analyze trends, usage, and activities in connection with our Services;
            </p>
          <br/>
          <p>
            F.  Detect, investigate, and help prevent security incidents and other malicious, deceptive, fraudulent, or illegal activity and help protect the rights and property of InVar and others;
            </p>
          <br/>
          <p>
            G.  Comply with our legal and financial obligations;
            </p>
          <br/>
          <p>
            H.  Create de-identified, anonymized or aggregated information;
            </p>
          <br/>
          <p>
            I.  Carry out any other purpose described to you at the time the information was collected.
          </p>
          <br />
          <p className="text-xl font-semibold" id="4">
            4.  Protection of Data
          </p>
          <p>
            The host of this website is equipped with various information security equipment and necessary security protection measures, such as firewalls and anti-virus systems. To protect the website and your personal data, strict protection measures have been adopted. Only authorized personnel can access your personal data and relevant processing personnel has signed a confidentiality agreement. Anyone who violated the obligation of confidentiality will be subject to relevant legal sanctions.
          </p>
          <p>
          If it is necessary to entrust other units to provide services due to business needs, this website will also strictly require them to comply with confidentiality obligations and take necessary inspection procedures to determine that they will indeed comply.
          </p>
          <br />
          <p className="text-xl font-semibold" id="5">
            5.  External Links of the Website
          </p>
          <p>
            The pages on this website provide links to other websites. You can also click on the links provided on this website to enter other websites. However, the linked site’s privacy protection policy is not applicable. You must refer to the privacy protection policy of the linked site and bear the risks of the site at your own discretion.
          </p>
          <br />
          <p className="text-xl font-semibold" id="6">
            6.  Sharing of Information
          </p>
          <p>
            We may share personal information in the following circumstances or as otherwise described in this policy:
            </p>
          <br/>
          <p>
            A.  We share personal information with vendors that access personal information to perform work for us, such as companies that assist us with web hosting, payment processing, identity verification, fraud prevention, marketing, and technical support.
            </p>
          <br/>
          <p>
            B.  We may disclose personal information if we believe that disclosure is in accordance with, or required by, any applicable law or legal process, including lawful requests by public authorities to meet national security or law enforcement requirements and during other legal proceedings.
            </p>
          <br/>
          <p>
            C.  We may share personal information if we believe that your actions are inconsistent with our user agreements or policies, if we believe that you have violated the law, or if we believe it is necessary to protect the rights, property, and safety of InVar, our users, the public, or others.
            </p>
          <br/>
          <p>
            D.  We share personal information with our lawyers and other professional advisors where necessary to obtain advice or otherwise protect and manage our business interests.
            </p>
          <br/>
          <p>
            E.  We may share personal information in connection with, or during negotiations concerning, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company.
            </p>
          <br/>
          <p>
            F.  We share personal information with your consent or at your direction.
            </p>
          <br/>
          <p>
            We may also share aggregated or de-identified information that cannot reasonably be used to identify you.
          </p>
          <br />
          <p className="text-xl font-semibold" id="7">
            7.  Analytics
          </p>
          <p>
            We engage others to provide analytics services on our websites. These entities may use cookies, web beacons, device identifiers, and other technologies to collect information about your use of our Services and other websites, including your IP address, web browser, mobile network information, pages viewed, time spent on pages, links clicked, and conversion information. This information may be used by InVar to, among other things, analyze and track data, determine the popularity of certain content, and better understand your online activity.
          </p>
          <br />
          <p className="text-xl font-semibold" id="8">
            8.  Amendments to the Privacy Protection Policy
          </p>
          <p>
            This website’s privacy protection policy will be amended at any time as needed.
          </p>
          <br />
          <p className="text-xl font-semibold" id="9">
            9.  Contacting Us
          </p>
          <p>
            {`If you have any questions about this privacy policy, please contact us with `}
            <ButtonMailto />
            .
          </p>
        </div>
        <div className="md:col-span-3 hidden md:block fixed top-[117px] right-6 xl:right-40">
          <div className="bg-invar-dark px-6 pt-6 pb-3 rounded text-invar-light-grey">
            {titleList.map((item, index) => (
              <div key={index} className="pb-3" id={item.id}>
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

export default Privacy;