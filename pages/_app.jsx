

import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { appWithTranslation } from "next-i18next";
import { MusicProvider } from "../context/music-context";
import { AppContextProvider } from "../context/app-context";
import { ModalsProvider } from "../context/Modals-context";
import {
  injectedWallet,
  metaMaskWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { okxWallet } from "../components/OkxWallet";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const { asPath } = useRouter();
  const getActiveChain = () => {
    if (asPath === "/sftdemo" || process.env.PRODUCTION === "false") return [goerli, mainnet];
    else return [mainnet];
  };
  const { chains, provider } = configureChains(
    [
      // ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [goerli] : [mainnet]),
      ...getActiveChain(),
    ],
    [alchemyProvider({ apiKey:process.env.PRODUCTION==="true"? "cDk0rvslgdb3cdwTV-RfQXns6BdKXYks":"SJZDVSj2V0UuBpLKySEWJh6RrB2fUR2j" }), publicProvider()]
  );

  // const { connectors } = getDefaultWallets({
  //   appName: "My RainbowKit App",
  //   chains,
  // });
  const connectors = connectorsForWallets([
    {
      groupName: "Recommended",
      wallets: [
        // injectedWallet({ chains }),
        metaMaskWallet({ chains }),
        walletConnectWallet({ chains }),
        okxWallet({ chains }),
      ],
    },
  ]);

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider modalSize="compact" chains={chains}>
        <MusicProvider>
          <AppContextProvider>
            <ModalsProvider>
              <Component {...pageProps} />
            </ModalsProvider>
          </AppContextProvider>
        </MusicProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
export default appWithTranslation(MyApp);
