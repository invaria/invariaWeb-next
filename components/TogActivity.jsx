import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import inVariaJSON from "../src/utils/InVaria.json";
import { nftAddress, RPC_URL } from "../src/utils/web3utils";
import { MinusIcon, PlusIcon } from "@heroicons/react/outline";
import { ItemActivity } from "../components";
import { useTranslation } from "next-i18next";
import { useAccount, useNetwork, useSigner } from "wagmi";

const TogActivity = ({ setAllActivityData, start, end }) => {
  const [collapse, setCollapse] = useState(true);

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data: signer } = useSigner();
  const provider=signer?.provider;

  const [transactions, setTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);

  async function getActivity() {
    if (!address||!provider) return;
    let etherScan, openSea;
    if (chain.name == "Goerli") {
      etherScan = "https://goerli.etherscan.io/tx/";
      openSea = `https://testnets.opensea.io/assets/goerli/${process.env.NEXT_PUBLIC_NFT_ADDRESS}/1`;
    } else if (chain.name == "Ethereum Mainnet") {
      etherScan = "https://etherscan.io/tx/";
      openSea = `https://opensea.io/assets/ethereum/${process.env.NEXT_PUBLIC_NFT_ADDRESS}/1`;
    }
    const nftContract = new ethers.Contract(nftAddress, inVariaJSON, signer);
    const filter = nftContract.filters.TransferSingle(
      null,
      "0x0000000000000000000000000000000000000000",
      address,
      null,
      null
    );
    const rpcProvider = new ethers.providers.JsonRpcProvider(RPC_URL);
    const rpcNftContract = new ethers.Contract( nftAddress, inVariaJSON, rpcProvider);

    const query = await rpcNftContract.queryFilter(filter);

    let arr = [];
    await Promise.all(
      query?.map(async (i) => {
        const block = await provider.getBlock(i.blockHash);
        const blockTime = new Date(block?.timestamp * 1000);
        if (i.args.id.toNumber() == 1) {
          const item = {
            date: blockTime.toString(),
            dd: blockTime,
            year: blockTime.getFullYear(),
            month: blockTime.getMonth() + 1,
            day: blockTime.getDate(),
            from: i.args.from,
            to: i.args.to,
            operator: i.args.operator,
            id: i.args.id.toNumber(),
            value: i.args.value.toNumber(),
            txid: `${i.transactionHash}`,
            etherScanUrl: `${etherScan}${i.transactionHash}`,
            openSeaUrl: `${openSea}`,
          };
          arr.push(item);
          return item;
        }
      })
    );

    arr = arr.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    if (arr.length > 0) setAllActivityData((d) => [...d, "activity"]);
    setAllTransactions(arr);
  }

  useEffect(() => {
    setTransactions([]);
    setAllTransactions([]);
    setAllActivityData((prev) => {
      let index = prev.indexOf("activity");
      if (index > -1) {
        prev.splice(index, 1);
      }
      return prev;
    });
    if (address&&provider) {
      console.log("test unstake mounted");
      getActivity();
    }
    console.log("network name", chain?.name);
  }, [address, chain?.name,provider]);

  useEffect(() => {
    if (address && allTransactions.length > 0) {
      let tx = [...allTransactions];
      if (start && end) {
        tx = tx.filter(
          (t) =>
            new Date(t.date).getTime() > start &&
            new Date(t.date).getTime() < end
        );
      }

      setTransactions(tx);
    }
  }, [start, end, allTransactions]);

  const { t } = useTranslation("dashboard");
  return (
    <div className=" max-w-full z-10 ">
      {address && transactions.length > 0 ? (
        <div
          className={
            "mt-3 bg-invar-main-purple px-4 sm:px-6 rounded text-white " +
            (collapse ? "" : "")
          }
        >
          <div
            className="py-6 flex justify-between z-30 cursor-pointer"
            onClick={() => setCollapse(!collapse)}
          >
            <p className=" text-xl font-semibold">{t("minting_history")}</p>
            <div>
              {!collapse ? (
                <MinusIcon className="w-6 ml-6" />
              ) : (
                <PlusIcon className="w-6 ml-6" />
              )}
            </div>
          </div>
          {!collapse && (
            <div className="z-50 font-normal animate-fade-in-down">
              {transactions &&
                transactions.map((i, index) => (
                  <ItemActivity key={index} i={i} />
                ))}
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          {/* <div>
            <Image width={162} height={200} src='/icons/ic_light.png' alt="" />
            <p className=" text-lg font-normal text-center text-invar-light-grey">{t("dashbaord_activity_presale_nodata")}</p>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default TogActivity;
