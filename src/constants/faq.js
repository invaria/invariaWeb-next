import { OpenLink, ButtonMailto } from 'components/icons/Link'
import Link from 'next/link'

const faqList = (intl, currentLang) => [
  {
    question: intl.formatMessage({ id: 'faq_1_title' }),
    answer: <p>{intl.formatMessage({ id: 'faq_1_desc' })}</p>,
  },
  {
    question: intl.formatMessage({ id: 'faq_2_title' }),
    answer: <p>{intl.formatMessage({ id: 'faq_2_desc' })}</p>,
  },
  {
    question: intl.formatMessage({ id: 'faq_3_title' }),
    answer: (
      <div>
        {intl.formatMessage(
          {
            id: 'faq_3_desc',
          },
          {
            p1: (str) => (
              <p className="text-invar-grey inline font-semibold">{str}</p>
            ),
            p2: (str) => (
              <div>
                <br />
                <p>
                  {currentLang === 'en' ? '*Check ' : '查看'}
                  <span className="text-invar-purple font-semibold hover:underline">
                    <Link href={`/${currentLang}/terms`}>
                      {intl.formatMessage({ id: 'terms_title' })}
                    </Link>
                  </span>{' '}
                  {str}
                </p>
              </div>
            ),
          }
        )}
      </div>
    ),
  },
  {
    question: intl.formatMessage({ id: 'faq_4_title' }),
    answer: <p>{intl.formatMessage({ id: 'faq_4_desc' })}</p>,
  },
  {
    question: intl.formatMessage({ id: 'faq_5_title' }),
    answer: (
      <p>
        {intl.formatMessage(
          {
            id: 'faq_5_desc',
          },
          {
            p1: (str) => (
              <span className="text-invar-grey font-semibold">{str}</span>
            ),
            twitter: () => (
              <span>
                <OpenLink link="https://twitter.com/InVarFinance">
                  Twitter
                </OpenLink>
              </span>
            ),
            discord: () => (
              <span>
                <OpenLink link="https://discord.gg/BrzPWYut4p">
                  Discord
                </OpenLink>
              </span>
            ),
          }
        )}
      </p>
    ),
  },
  {
    question: intl.formatMessage({ id: 'faq_6_title' }),
    answer: (
      <p>
        {intl.formatMessage(
          { id: 'faq_6_desc' },
          {
            p1: (str) => (
              <span className="text-invar-grey font-semibold">
                {' '}
                {str}
                <OpenLink link="https://coinmarketcap.com/currencies/usd-coin/">
                  {' '}
                  USDC{' '}
                </OpenLink>{' '}
                (ERC-20)
              </span>
            ),
            p2: (str) => <span>{str}</span>,
            p3: (str) => (
              <span>
                <OpenLink link="https://ethereum.org/en/developers/docs/gas/">
                  {str}
                </OpenLink>
              </span>
            ),
          }
        )}
      </p>
    ),
  },
  {
    question: intl.formatMessage({ id: 'faq_7_title' }),
    answer: (
      <p>
        {intl.formatMessage(
          { id: 'faq_7_desc' },
          {
            p1: (str) => (
              <span className="text-invar-grey font-semibold">{str}</span>
            ),
          }
        )}
      </p>
    ),
  },
  {
    question: intl.formatMessage({ id: 'faq_8_title' }),
    answer: (
      <p>
        {intl.formatMessage(
          { id: 'faq_8_desc' },
          {
            p1: (str) => (
              <span className="text-invar-grey font-semibold"> {str}</span>
            ),
          }
        )}
      </p>
    ),
  },
  {
    question: intl.formatMessage({ id: 'faq_9_title' }),
    answer: <p>{intl.formatMessage({ id: 'faq_9_desc' })}</p>,
  },
  {
    question: intl.formatMessage({ id: 'faq_10_title' }),
    answer: (
      <p>
        {intl.formatMessage(
          { id: 'faq_10_desc' },
          {
            p1: (str) => (
              <span className="text-invar-grey font-semibold">{str}</span>
            ),
          }
        )}
      </p>
    ),
  },
  {
    question: intl.formatMessage({ id: 'faq_11_title' }),
    answer: (
      <p>
        {intl.formatMessage(
          { id: 'faq_11_desc' },
          {
            p1: (str) => (
              <span className="text-invar-grey font-semibold">{str}</span>
            ),
            p2: (str) => (
              <span className=" text-invar-grey font-semibold">{str}</span>
            ),
            br: () => <br></br>,
          }
        )}
      </p>
    ),
  },
  {
    question: intl.formatMessage({ id: 'faq_12_title' }),
    answer: (
      <ul>
        {intl.formatMessage(
          { id: 'faq_12_desc' },
          {
            p1: (str) => <li>{str}</li>,
            p2: (str) => <li>{str}</li>,
            br: () => <br></br>,
            address1: (str) => (
              <span className="text-invar-grey font-semibold truncate ">
                {str}
              </span>
            ),
            address2: (str) => (
              <span className="text-invar-grey font-semibold truncate ">
                {str}
              </span>
            ),
            address3: (str) => (
              <span className="text-invar-grey font-semibold truncate ">
                {str}
              </span>
            ),
          }
        )}
      </ul>
    ),
  },
  {
    question: intl.formatMessage({ id: 'faq_13_title' }),
    answer: (
      <p>
        {intl.formatMessage(
          { id: 'faq_13_desc' },
          {
            twitter: () => (
              <span>
                <OpenLink link="https://twitter.com/InVarFinance">
                  Twitter
                </OpenLink>
              </span>
            ),
            discord: () => (
              <span>
                <OpenLink link="https://discord.gg/BrzPWYut4p">
                  Discord
                </OpenLink>
              </span>
            ),
            mailto: () => <ButtonMailto />,
          }
        )}
      </p>
    ),
  },
]

export default faqList
