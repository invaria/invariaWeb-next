import React from 'react'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { getCurrentLanguage } from 'src/utils/language'

const Terms = () => {
  const router = useRouter()
  const currentLang = getCurrentLanguage(router)
  const intl = useIntl()
  const titleList = [
    {
      id: '1',
      title: 'terms_1_title',
    },
    {
      id: '2',
      title: 'terms_2_title',
    },
    {
      id: '3',
      title: 'terms_3_title',
    },
    {
      id: '4',
      title: 'terms_4_title',
    },
    {
      id: '5',
      title: 'terms_5_title',
    },
    {
      id: '6',
      title: 'terms_6_title',
    },
    {
      id: '7',
      title: 'terms_7_title',
    },
    {
      id: '8',
      title: 'terms_8_title',
    },
    {
      id: '9',
      title: 'terms_9_title',
    },
    {
      id: '10',
      title: 'terms_10_title',
    },
    {
      id: '11',
      title: 'terms_11_title',
    },
  ]

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-b from-[#44334C] to-[#1E1722] pt-16 pb-24 px-6 xl:px-40 grid grid-cols-8 gap-12">
        <div className="container text-white col-span-8 md:col-span-5">
          <h1 className="text-[32px] leading-[120%] font-semibold mb-3">
            {intl.formatMessage({ id: 'terms_title' })}
          </h1>
          <p>{intl.formatMessage({ id: 'terms_updatetime' })}</p>
          <div className="mt-6">
            <p>
              {intl.formatMessage(
                { id: 'terms_intro' },
                {
                  p1: (str) => <p>{str}</p>,
                  p2: (str) => <p>{str}</p>,
                  br: () => <br></br>,
                }
              )}
            </p>
          </div>
          <div className="relative mt-12">
            <div id="1" className="absolute -top-20 md:-top-24" />
            <h2 className="text-xl font-semibold mb-3">
              {intl.formatMessage({ id: 'terms_1_title' })}
            </h2>
            <p>
              {intl.formatMessage(
                { id: 'terms_1_desc' },
                {
                  p1: (str) => <p>{str}</p>,
                  p2: (str) => <p>{str}</p>,
                  p3: (str) => <p>{str}</p>,
                  p31: (str) => <p className="pl-6 -indent-4">{str}</p>,
                  p32: (str) => <p className="pl-6 -indent-4">{str}</p>,
                  p33: (str) => <p className="pl-6 -indent-4">{str}</p>,
                  p4: (str) => <p>{str}</p>,
                  p5: (str) => <p>{str}</p>,
                  br: () => <br></br>,
                }
              )}
            </p>
          </div>
          <div className="relative mt-12">
            <div id="2" className="absolute -top-20 md:-top-24" />
            <h2 className="text-xl font-semibold mb-3">
              {intl.formatMessage({ id: 'terms_2_title' })}
            </h2>
            <p>{intl.formatMessage({ id: 'terms_2_desc' })}</p>
          </div>
          <div className="relative mt-12">
            <div id="3" className="absolute -top-20 md:-top-24" />
            <h2 className="text-xl font-semibold mb-3">
              {intl.formatMessage({ id: 'terms_3_title' })}
            </h2>
            <p>
              {intl.formatMessage(
                { id: 'terms_3_desc' },
                {
                  p1: (str) => <p>{str}</p>,
                  p2: (str) => <p>{str}</p>,
                  br: () => <br></br>,
                }
              )}
            </p>
          </div>
          <div className="relative mt-12">
            <div id="4" className="absolute -top-20 md:-top-24" />
            <h2 className="text-xl font-semibold mb-3">
              {intl.formatMessage({ id: 'terms_4_title' })}
            </h2>
            <p>{intl.formatMessage({ id: 'terms_4A_desc' })}</p>
            <br />
            <p>{intl.formatMessage({ id: 'terms_4B_desc' })}</p>

            <br />
            <p>{intl.formatMessage({ id: 'terms_4C_desc' })}</p>

            <br />
            <p>{intl.formatMessage({ id: 'terms_4D_desc' })}</p>

            <br />
            <p className="pl-6 -indent-4">
              {intl.formatMessage({ id: 'terms_4D1_desc' })}
            </p>
            <p className="pl-6 -indent-4">
              {intl.formatMessage({ id: 'terms_4D2_desc' })}
            </p>
            <p className="pl-6 -indent-4">
              {intl.formatMessage({ id: 'terms_4D3_desc' })}
            </p>
            <p className="pl-6 -indent-4">
              {intl.formatMessage({ id: 'terms_4D4_desc' })}
            </p>
            <br />
            <p>{intl.formatMessage({ id: 'terms_4E_desc' })}</p>
            <br />
            <p className="pl-6 -indent-4">
              {intl.formatMessage({ id: 'terms_4E1_desc' })}
            </p>
            <p className="pl-6 -indent-4">
              {intl.formatMessage({ id: 'terms_4E2_desc' })}
            </p>
            <p className="pl-6 -indent-4">
              {intl.formatMessage({ id: 'terms_4E3_desc' })}
            </p>
            <p className="pl-6 -indent-4">
              {intl.formatMessage({ id: 'terms_4E4_desc' })}
            </p>
            <p className="pl-6 -indent-4">
              {intl.formatMessage({ id: 'terms_4E5_desc' })}
            </p>
            <p className="pl-6 -indent-4">
              {intl.formatMessage({ id: 'terms_4E6_desc' })}
            </p>
            <p className="pl-6 -indent-4">
              {intl.formatMessage({ id: 'terms_4E7_desc' })}
            </p>
            <br />
            <p>{intl.formatMessage({ id: 'terms_4F_desc' })}</p>
          </div>
          <div className="relative mt-12">
            <div id="5" className="absolute -top-20 md:-top-24" />
            <h2 className="text-xl font-semibold mb-3">
              {intl.formatMessage({ id: 'terms_5_title' })}
            </h2>
            <p>
              <p>{intl.formatMessage({ id: 'terms_5A_desc' })}</p>
              <br />
              <p>{intl.formatMessage({ id: 'terms_5B_desc' })}</p>
            </p>
          </div>
          <div className="relative mt-12">
            <div id="6" className="absolute -top-20 md:-top-24" />
            <h2 className="text-xl  font-semibold mb-3">
              {intl.formatMessage({ id: 'terms_6_title' })}
            </h2>
            <p>{intl.formatMessage({ id: 'terms_6A_desc' })}</p>

            <br />
            <p>{intl.formatMessage({ id: 'terms_6B_desc' })}</p>

            <br />
            <p>{intl.formatMessage({ id: 'terms_6C_desc' })}</p>
          </div>
          <div className="relative mt-12">
            <div id="7" className="absolute -top-20 md:-top-24" />
            <h2 className="text-xl  font-semibold mb-3">
              {intl.formatMessage({ id: 'terms_7_title' })}
            </h2>
            <p>{intl.formatMessage({ id: 'terms_7_desc' })}</p>
            <br />
            <p>{intl.formatMessage({ id: 'terms_7A_desc' })}</p>

            <br />
            <p>{intl.formatMessage({ id: 'terms_7B_desc' })}</p>

            <br />
            <p>{intl.formatMessage({ id: 'terms_7C_desc' })}</p>

            <br />
            <p>{intl.formatMessage({ id: 'terms_7D_desc' })}</p>

            <br />
            <p>{intl.formatMessage({ id: 'terms_7E_desc' })}</p>
          </div>
          <div className="relative mt-12">
            <div id="8" className="absolute -top-20 md:-top-24" />
            <h2 className="text-xl font-semibold mb-3">
              {intl.formatMessage({ id: 'terms_8_title' })}
            </h2>
            <p>{intl.formatMessage({ id: 'terms_8_desc' })}</p>
          </div>
          <div className="relative mt-12">
            <div id="9" className="absolute -top-20 md:-top-24" />
            <h2 className="text-xl font-semibold mb-3">
              {intl.formatMessage({ id: 'terms_9_title' })}
            </h2>
            <p>{intl.formatMessage({ id: 'terms_9_desc' })}</p>
          </div>
          <div className="relative mt-12">
            <div id="10" className="absolute -top-20 md:-top-24" />
            <h2 className="text-xl font-semibold mb-3">
              {intl.formatMessage({ id: 'terms_10_title' })}
            </h2>
            <p>{intl.formatMessage({ id: 'terms_10_desc' })}</p>
          </div>
          <div className="relative mt-12">
            <div id="11" className="absolute -top-20 md:-top-24" />
            <h2 className="text-xl font-semibold mb-3">
              {intl.formatMessage({ id: 'terms_11_title' })}
            </h2>
            <p>{intl.formatMessage({ id: 'terms_11_1_desc' })}</p>
            <br />
            <p>{intl.formatMessage({ id: 'terms_11_2_desc' })}</p>
          </div>
        </div>
        <div className="md:col-span-3 hidden md:block right-6 xl:right-40">
          <div className="sticky top-36 bg-invar-dark px-6 pt-6 pb-3 rounded text-invar-light-grey">
            {titleList.map((item, index) => (
              <div key={index} className="pb-3" id={item.id}>
                <a href={`#${item.id}`}>
                  {intl.formatMessage({ id: item.title })}
                </a>
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
