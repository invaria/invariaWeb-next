import { useAddress, useNetwork } from "@thirdweb-dev/react";
import { createContext, useState, useEffect } from "react";
import { CheckWalletStatus } from "../src/utils/web3utils";
import { getUser } from "../src/utils/storeFirebase";

const WalletContext = createContext({
  ethBalance: "",
  usdcBalance: "",
  coinPrice: "",
  verify:false,
});
const { Provider } = WalletContext;

const WalletProvider = ({ children }) => {
  // const [address, aetAddress] = useState("");
  const [prevWalletState, setPrevWalletState] = useState([]);
  const [ethBalance, setEthBalance] = useState("");
  const [usdcBalance, setUsdcBalance] = useState("");
  const [coinPrice, setCoinPrice] = useState("");
  const [verify, setVerify] = useState('Unverified');

  const address = useAddress();
  const network = useNetwork();

  useEffect(() => {
    console.log("useefectran");
    if (typeof window !== "undefined") {
      if (!network[0].data.chain) return;
      else if (
        prevWalletState[0] == network[0].data.chain.name &&
        prevWalletState[1] == address
      )
        return;
      else {
        setPrevWalletState([network[0].data.chain.name, address]);
        CheckWalletStatus(address)
          .then((res) => {
            console.log("coinprice", res);
            setEthBalance(res.ethBalance);
            setUsdcBalance(res.usdcBalance);
            setCoinPrice(res.coinPrice);
          })
          .catch((e) => console.log(e));
        getUser(address)
          .then((res) => setVerify(res))
          .catch((e) => console.log(e));
      }
    }
  }, [network, address]);

  const obj = {
    verify,
    address,
    ethBalance,
    usdcBalance,
    coinPrice,
  };

  return <Provider value={obj}>{children}</Provider>;
};

export { WalletContext, WalletProvider };
