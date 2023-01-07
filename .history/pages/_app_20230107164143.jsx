import "../styles/globals.css";
import reportWebVitals from "../src/reportWebVitals";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { appWithTranslation } from "next-i18next";
import { MusicProvider } from "../context/music-context"

//export const desiredChainId = ChainId.Mainnet
export const desiredChainId = ChainId.Goerli;

// export const AppContext = createContext();

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <MusicProvider>
        <Component {...pageProps} />
      </MusicProvider>
    </ThirdwebProvider>
  );
}

reportWebVitals();

export default appWithTranslation(MyApp);
