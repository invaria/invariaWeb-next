import { createContext, useState } from "react";

const ModalContext = createContext({
  propertyModal: false,
  setPropertyModal: () => {},
  passNFTModal: false,
  setPassNFTModal: () => {},
  premintModal: false,
  setPremintModal: () => {},
});
const { Provider } = ModalContext;

const ModalsProvider = ({ children }) => {
  const [propertyModal, setPropertyModal] = useState(false);
  const [passNFTModal, setPassNFTModal] = useState(false);
  const [premintModal, setPremintModal] = useState(false);

  const obj = {
    propertyModal,
    setPropertyModal: (val) => setPropertyModal(val),
    passNFTModal,
    setPassNFTModal: (val) => setPassNFTModal(val),
    premintModal,
    setPremintModal: (val) => setPremintModal(val),
  };

  return <Provider value={obj}>{children}</Provider>;
};

export { ModalContext, ModalsProvider };
