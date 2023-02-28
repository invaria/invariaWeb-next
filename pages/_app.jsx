import "../styles/globals.css";
//mport reportWebVitals from "../src/reportWebVitals";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { appWithTranslation } from "next-i18next";
import { MusicProvider } from "../context/music-context";
import { ModalsProvider } from "../context/Modals-context";
import { AppContextProvider } from "../context/app-context";

//export const desiredChainId = ChainId.Mainnet

export const desiredChainId =
  process.env.PRODUCTION === "true" ? ChainId.Mainnet : ChainId.Goerli;

console.log("desiredChainId", desiredChainId);

// export const AppContext = createContext();

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <MusicProvider>
        <AppContextProvider>
          <ModalsProvider>
            <Component {...pageProps} />
          </ModalsProvider>
        </AppContextProvider>
      </MusicProvider>
    </ThirdwebProvider>
  );
}

// reportWebVitals();

export default appWithTranslation(MyApp);
