import { ButtonMailto } from 'components/icons/Link'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'
import { useIntl } from 'react-intl'

const Privacy = () => {
  const intl = useIntl()
  const titleList = [
    {
      id: '1',
      title: 'privacy_1_title',
    },
    {
      id: '2',
      title: 'privacy_2_title',
    },
    {
      id: '3',
      title: 'privacy_3_title',
    },
    {
      id: '4',
      title: 'privacy_4_title',
    },
    {
      id: '5',
      title: 'privacy_5_title',
    },
    {
      id: '6',
      title: 'privacy_6_title',
    },
    {
      id: '7',
      title: 'privacy_7_title',
    },
    {
      id: '8',
      title: 'privacy_8_title',
    },
    {
      id: '9',
      title: 'privacy_9_title',
    },
  ]

  return (
    <div>
      <Navbar />
      <div className="bg-gradient-to-b from-[#44334C] to-[#1E1722] pt-16 pb-24 px-6 xl:px-40 grid grid-cols-8 gap-12">
        <div className="container text-white col-span-8 md:col-span-5">
          <h1 className="text-[32px] leading-[120%] font-semibold mb-3">
            {intl.formatMessage({ id: 'privacy_title' })}
          </h1>
          <p>{intl.formatMessage({ id: 'privacy_updatetime' })}</p>
          <div className="mt-6">
            <p>{intl.formatMessage({ id: 'privacy_intro' })}</p>
          </div>
          <div className="relative mt-12">
            <div id="1" className="absolute -top-20 md:-top-24" />
            <h2 className="text-xl font-semibold mb-3">
              {intl.formatMessage({ id: 'privacy_1_title' })}
            </h2>
            <p>{intl.formatMessage({ id: 'privacy_1_desc' })}</p>
          </div>
          <div className="relative mt-12">
            <div id="2" className="absolute -top-20 md:-top-24" />
            <h2 className="text-xl font-semibold mb-3">
              {intl.formatMessage({ id: 'privacy_2_title' })}
            </h2>
            <p>
              <span>{intl.formatMessage({ id: 'privacy_2A_title' })}</span>
              <br></br>
              {intl.formatMessage({ id: 'privacy_2A_desc' })}
            </p>
            <p>
              <span>{intl.formatMessage({ id: 'privacy_2B_title' })}</span>

              <br></br>
              {intl.formatMessage({ id: 'privacy_2B_desc' })}
            </p>
            <br />
            <p className="pl-6 -indent-4">
              {intl.formatMessage({ id: 'privacy_2B1_desc' })}
            </p>
            <p className="pl-6 -indent-4">
              {intl.formatMessage({ id: 'privacy_2B2_desc' })}
            </p>
            <p className="pl-6 -indent-4">
              {intl.formatMessage({ id: 'privacy_2B3_desc' })}
            </p>
            <br />
            <p>
              <span>{intl.formatMessage({ id: 'privacy_2C_title' })}</span>

              <br />
              {intl.formatMessage({ id: 'privacy_2C_desc' })}
            </p>
            <br />
            <p>
              <span>{intl.formatMessage({ id: 'privacy_2D_title' })}</span>

              <br />
              {intl.formatMessage({ id: 'privacy_2D_desc' })}
            </p>
          </div>
          <div className="relative mt-12">
            <div id="3" className="absolute -top-20 md:-top-24" />
            <h2 className="text-xl font-semibold mb-3">
              {intl.formatMessage({ id: 'privacy_3_title' })}
            </h2>
            <p>{intl.formatMessage({ id: 'privacy_3_desc' })}</p>
            <br />
            <p>{intl.formatMessage({ id: 'privacy_3A_desc' })}</p>
            <br />
            <p> {intl.formatMessage({ id: 'privacy_3B_desc' })}</p>
            <br />
            <p>{intl.formatMessage({ id: 'privacy_3C_desc' })}</p>
            <br />
            <p>{intl.formatMessage({ id: 'privacy_3D_desc' })}</p>
            <br />
            <p>{intl.formatMessage({ id: 'privacy_3E_desc' })}</p>
            <br />
            <p>{intl.formatMessage({ id: 'privacy_3F_desc' })}</p>
            <br />
            <p> {intl.formatMessage({ id: 'privacy_3G_desc' })}</p>
            <br />
            <p>{intl.formatMessage({ id: 'privacy_3H_desc' })}</p>
            <br />
            <p>{intl.formatMessage({ id: 'privacy_3I_desc' })}</p>
          </div>
          <div className="relative mt-12">
            <div id="4" className="absolute -top-20 md:-top-24" />
            <h2 className="text-xl font-semibold mb-3">
              {intl.formatMessage({ id: 'privacy_4_title' })}
            </h2>
            <p>{intl.formatMessage({ id: 'privacy_4_1_desc' })}</p>
            <p>{intl.formatMessage({ id: 'privacy_4_2_desc' })}</p>
          </div>
          <div className="relative mt-12">
            <div id="5" className="absolute -top-20 md:-top-24" />
            <h2 className="text-xl font-semibold mb-3">
              {intl.formatMessage({ id: 'privacy_5_title' })}
            </h2>
            <p>{intl.formatMessage({ id: 'privacy_5_desc' })}</p>
          </div>
          <div className="relative mt-12">
            <div id="6" className="absolute -top-20 md:-top-24" />
            <h2 className="text-xl font-semibold mb-3">
              {intl.formatMessage({ id: 'privacy_6_title' })}
            </h2>
            <p>{intl.formatMessage({ id: 'privacy_6_1_desc' })}</p>
            <br />
            <p>{intl.formatMessage({ id: 'privacy_6A_desc' })}</p>
            <br />
            <p>{intl.formatMessage({ id: 'privacy_6B_desc' })}</p>
            <br />
            <p>{intl.formatMessage({ id: 'privacy_6C_desc' })}</p>
            <br />
            <p>{intl.formatMessage({ id: 'privacy_6D_desc' })}</p>
            <br />
            <p>{intl.formatMessage({ id: 'privacy_6E_desc' })}</p>
            <br />
            <p>{intl.formatMessage({ id: 'privacy_6F_desc' })}</p>
            <br />
            <p>{intl.formatMessage({ id: 'privacy_6_2_desc' })}</p>
          </div>
          <div className="relative mt-12">
            <div id="7" className="absolute -top-20 md:-top-24" />
            <h2 className="text-xl font-semibold mb-3">
              {intl.formatMessage({ id: 'privacy_7_title' })}
            </h2>
            <p>{intl.formatMessage({ id: 'privacy_7_desc' })}</p>
          </div>
          <div className="relative mt-12">
            <div id="8" className="absolute -top-20 md:-top-24" />
            <h2 className="text-xl font-semibold mb-3">
              {intl.formatMessage({ id: 'privacy_8_title' })}
            </h2>
            <p>{intl.formatMessage({ id: 'privacy_8_desc' })}</p>
          </div>
          <div className="relative mt-12">
            <div id="9" className="absolute -top-20 md:-top-24" />
            <h2 className="text-xl font-semibold mb-3">
              {intl.formatMessage({ id: 'privacy_9_title' })}
            </h2>
            <p>
              {intl.formatMessage({ id: 'privacy_9_desc' })}
              <ButtonMailto />.
            </p>
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

export default Privacy
