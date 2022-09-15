import '../styles/globals.css'
import React, { createContext, useState } from 'react'
import reportWebVitals from '../src/reportWebVitals'
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react'
import AppIntlProvider, {
  defaultLang,
} from 'components/appCommon/AppIntlProvider'

export const desiredChainId = ChainId.Mainnet
// export const desiredChainId = ChainId.Rinkeby

// export const AppContext = createContext();

function MyApp({ Component, pageProps }) {
  const { lang = defaultLang } = pageProps

  return (
    <AppIntlProvider lang={lang}>
      <ThirdwebProvider desiredChainId={desiredChainId}>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </AppIntlProvider>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

export default MyApp
