import "../styles/globals.css";
import reportWebVitals from "../src/reportWebVitals";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { appWithTranslation } from "next-i18next";

//export const desiredChainId = ChainId.Mainnet
//export const desiredChainId = ChainId.Goerli;

// export const AppContext = createContext();

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

reportWebVitals();

export default appWithTranslation(MyApp);
