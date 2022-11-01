import '../styles/globals.css'
import React, { createContext, useState } from 'react';
import reportWebVitals from '../src/reportWebVitals';
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { appWithTranslation } from 'next-i18next';
import {WalletProvider} from "../context/wallet-context"

//export const desiredChainId = ChainId.Mainnet
export const desiredChainId = ChainId.Goerli

// export const AppContext = createContext();

function MyApp({ Component, pageProps }) {
  return (
      <ThirdwebProvider desiredChainId={desiredChainId}>
        <WalletProvider>
        <Component {...pageProps} />
        </WalletProvider>
      </ThirdwebProvider> 
  )
}

reportWebVitals();

export default appWithTranslation(MyApp)

