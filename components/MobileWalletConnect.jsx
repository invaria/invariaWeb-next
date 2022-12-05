import { useMetamask, useWalletConnect } from "@thirdweb-dev/react";
import { useTranslation } from "next-i18next";

const MobileWalletConnect = ({ setToggleWallet }) => {
    const connectWithMetamask = useMetamask();
    const connectWithWalletConnect = useWalletConnect();
    const { t } = useTranslation("common");

    return (<>

        <div className=" fixed top-[60px] z-40 w-full h-screen py-[34px] px-[16px] flex flex-col justify-start items-start md:hidden text-white bg-gradient-to-b from-primary to-[#1E1722]">
            <div
                className="flex justify-start items-center mb-[32px] cursor-pointer"
                onClick={() => setToggleWallet(false)}
            >
                <img
                    className="w-[24px] h-[24px]"
                    src="/icons/ic_back.svg"
                    alt=""
                />
                <h3 className="text-base font-semibold text-white ml-[15px]">
                    Back
                </h3>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-[22px]">
                {t("connect_wallet")}
            </h3>
            <button
                className="btn btn-primary relative w-full h-[56px] rounded flex justify-center items-center border-none normal-case"
                onClick={connectWithMetamask}
            >
                <img
                    className="absolute top-[13px] left-4 h-[30px] w-[30px]"
                    src="/icons/ic_metamask.png"
                    alt=""
                />
                <p className=" font-semibold text-accent">MetaMask</p>
            </button>
            <button
                className="btn btn-primary mt-3 relative w-full h-[56px] rounded flex justify-center items-center border-none normal-case"
                onClick={connectWithWalletConnect}
            >
                <img
                    className="absolute top-[13px] left-4 h-[30px] w-[30px]"
                    src="/icons/ic_walletconnect.png"
                    alt=""
                />
                <p className=" font-semibold text-accent">WalletConnect</p>
            </button>
        </div>
    </>)
}
export default MobileWalletConnect;