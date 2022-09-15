import { IntlProvider } from 'react-intl'
import tab1 from 'lang/tab1.json'
import tab2 from 'lang/tab2.json'
import tab3 from 'lang/tab3.json'
import tab4 from 'lang/tab4.json'
import tab5 from 'lang/tab5.json'

export type SupportLocales = 'en' | 'zh-TW'

interface Props {
  children?: React.ReactNode
  lang: SupportLocales
}

export const defaultLang = 'zh-TW'

const convertLocales = (locale: SupportLocales) => {
  const allTabs = { ...tab1, ...tab2, ...tab3, ...tab4, ...tab5 }
  return Object.entries(allTabs).reduce((acc, [key, value]) => {
    if (locale === 'en') {
      if (key) {
        acc[key] = value.EN
      }
    }
    if (locale === 'zh-TW') {
      if (key) {
        acc[key] = value.TW ?? value['繁中']
      }
    }
    return acc
  }, {} as any)
}

function AppIntlProvider({ children, lang }: Props) {
  const messages: Record<string, any> = convertLocales(lang)

  return (
    <IntlProvider locale={lang} defaultLocale={lang} messages={messages}>
      {children}
    </IntlProvider>
  )
}

export default AppIntlProvider
