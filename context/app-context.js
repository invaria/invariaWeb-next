import { createContext, useState } from "react";

const AppContext = createContext({
passNftSoldOut: false,
setPassNftSoldOut: () => {},
tokensAlreadyMinted:0,
setTokensAlreadyMinted:()=>{}
});
const { Provider } = AppContext;

const AppContextProvider = ({ children }) => {
    const [passNftSoldOut, setPassNftSoldOut] = useState(false);
    const [tokensAlreadyMinted, setTokensAlreadyMinted] = useState(0);

  const obj = {
    passNftSoldOut,
    setPassNftSoldOut: (val) => setPassNftSoldOut(val),
    tokensAlreadyMinted,
    setTokensAlreadyMinted: (val) => setTokensAlreadyMinted(val),
  };

  return <Provider value={obj}>{children}</Provider>;
};

export { AppContext, AppContextProvider };
