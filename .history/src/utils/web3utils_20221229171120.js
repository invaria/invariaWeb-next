import axios from "axios";
import { ethers } from "ethers";
import erc20ABI from "./erc20ABI.json";
import { desiredChainId } from "../../pages/_app.jsx";
//remember to change: 1.desiredChainId 2.usdcAddress 3.nftAddress

let lastTime;
let price={
  "ethereum": {
      "usd": 0
  },
  "usd-coin": {
      "usd": 0
  }
};
export const fetchPrice = async (coin) => {
if(lastTime&&new Date().getTime()-lastTime<2000){
  return price;
}
  try {
    const fetchIt = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin}%2Cusd-coin&vs_currencies=usd`,
      {}
    );
    price = fetchIt.data;
    lastTime=new Date().getTime()
  } catch (error) {
    console.log("fetch coin price error", error);
  }
  return price;
};
export const USDCToWEIConverter=async(usdcAmount)=>{
    const prices=await fetchPrice("ethereum");
    if(prices.ethereum.usd==0)throw new Error("price error in format conversion")
    const ethToUSD=prices?.ethereum.usd;
    const usdcToUSD=prices['usd-coin'].usd;
    const usdcToUSDPrice=(+usdcAmount)*usdcToUSD;
    const valInEth=usdcToUSDPrice/ethToUSD;
    const parsed=utils.parseEther(valInEth.toString());
    return parsed.toString()
}
export const nftAddress = process.env.NEXT_PUBLIC_NFT_ADDRESS;
export const stakeAddress = process.env.NEXT_PUBLIC_STAKE_ADDRESS;
export const usdcAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS;
//testUSDC 0x38eFbd7A5A03d8AC9886140Ad5b393e39c85049d  //lfg 0x002fF2aD81F0Fa36387eC6F4565B9667516C5342
//USDC(eth) 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
const tokenSymbol = "USDC";
const tokenDecimals = 6;
const tokenImage =
  "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png";

export const addTokenFunction = async () => {
  try {
    const wasAdded = await ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: usdcAddress,
          symbol: tokenSymbol,
          decimals: tokenDecimals,
          image: tokenImage,
        },
      },
    });
    if (wasAdded) {
      console.log("Thanks for your interest!");
    } else {
      console.log("Token has not been added");
    }
  } catch (error) {
    console.log(error);
  }
};

///// checkIfWalletIsConnected /////
// const desiredChainId = "0x1";  //mainnetChainId = "0x1"; goerliChainId = "0x4";
/* essensial params, hooks:
  import { useNetwork, useAddress } from "@thirdweb-dev/react";
  let pervState = []
  //const ..... =()=>{ .....
      const [ethBalance, setEthBalance] = useState()
      const [usdcBalance, setUsdcBalance] = useState()
      const address = useAddress();
      const network = useNetwork();
      const [getCoinPrice, setgetCoinPrice] = useState()
      useEffect(() => {
        if (typeof window !== "undefined") {
          // 當scroll時，不知為何network == undefined
          if (network[0].data.chain == undefined) {
            return
          } else {
            if (pervState[0] == network[0].data.chain.name && pervState[1] == address) return
          }
          pervState[0] = network[0].data.chain.name
          pervState[1] = address
          console.log(network[0].data.chain.name, pervState)
          checkIfWalletIsConnected(address, setEthBalance, setUsdcBalance, setgetCoinPrice) 
        }
      }, [address, network])
*/
export const checkIfWalletIsConnected = async (address, setEthBalance, setUsdcBalance, setgetCoinPrice) => {
  const { ethereum } = window;
  //console.log("address",address);
  const provider = new ethers.providers.Web3Provider(ethereum);
  //console.log(provider);
  const signer = provider.getSigner()
  if (!ethereum) {
    console.log("Make sure you have metamask!");
    return;
  }
  let chainId = await ethereum.request({ method: 'eth_chainId' });
   console.log("Connected to chain " + chainId);
  setEthBalance((+ethers.utils.formatEther(await signer.getBalance())).toFixed(3))
  setgetCoinPrice(await fetchPrice("ethereum"))
  if (chainId.slice(2, 3) !== desiredChainId.toString()) {
    console.log("You are not connected to the desiredChainId:" + desiredChainId.toString() + "==" + chainId.slice(2, 3));
    return
  } else {
    const usdcContract = new ethers.Contract(usdcAddress, erc20ABI, signer);
    const decimals = await usdcContract.decimals();
    setUsdcBalance((+(ethers.utils.formatUnits(await usdcContract.balanceOf(address), decimals))).toFixed(3))  //.toNumber()  //.toFixed(1)
  }
}

export const CheckWalletStatus = async (address) => {
  const { ethereum } = window;
  window.ethereum.enable();
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  if (!ethereum) {
    console.log("Make sure you have metamask!");
    return;
  }
  let returnObj = {
    ethBalance: 0,
    usdcBalance: 0,
    coinPrice: 0,
  };

  let chainId = await ethereum.request({ method: "eth_chainId" });
  // console.log("Connected to chain " + chainId);

  returnObj.ethBalance = (+ethers.utils.formatEther(
    await signer.getBalance()
  )).toFixed(3);
  returnObj.coinPrice = await fetchPrice("ethereum");

  if (chainId.slice(2, 3) !== desiredChainId.toString()) {
    console.log(
      "You are not connected to the desiredChainId:" +
        desiredChainId.toString() +
        "==" +
        chainId.slice(2, 3)
    );
  } else {
    const usdcContract = new ethers.Contract(usdcAddress, erc20ABI, signer);
    const decimals = await usdcContract.decimals();
    returnObj.usdcBalance=(
      (+ethers.utils.formatUnits(
        await usdcContract.balanceOf(address),
        decimals
      )).toFixed(3)
    ); //.toNumber()  //.toFixed(1)
  }
  return returnObj;
};