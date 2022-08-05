import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useAddress, useNetwork } from '@thirdweb-dev/react'
import { SiweMessage } from 'siwe'
import { getUserData } from "../src/utils/storeFirebase";

let pervState = []

const FormInfo = () => {
  let domain, provider, signer
  const address = useAddress();
  const network = useNetwork();
  const [signed, setSigned] = useState(false)
  const [data, setData] = useState()
  

  function createSiweMessage(address, statement) {
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: '1',
      chainId: '1'
    });
    return message.prepareMessage();
  }
  async function signInWithEthereum() {
    const message = createSiweMessage(
      address,
      'Sign to view personal infomation.'
    );
    const nonce = { ["nonce"]: await signer.signMessage(message) }
    console.log(nonce);
  }

  async function handleSign() {
    try {
      console.log("sign");
      await signInWithEthereum()
      // setData(await getUserData(address))
      const newData = await getUserData(address)
      setData(newData)
      setSigned(true)
    } catch (error) {
      console.log(error)
      setSigned(false)
    }
  }
  
  useEffect(() => {
    if (data==undefined) return
    console.log("data",data, signed)
  }, [data])


  useEffect(() => {
    console.log("formInfo")
    if (!address) return
    // if (address == pervState[0]) return
    // pervState[0] = address
    setSigned(false)
    domain = window.location.host;
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner()
  }, [address]);


  return (
    <>
      {!signed &&
        <div className=" w-full p-16 mb-64 rounded flex flex-col justify-center items-center bg-invar-main-purple text-white font-semibold">
          <p className=" text-xl ">
            Sign to view submmited data
          </p>
          <button className="btn bg-invar-dark mt-8 rounded text-white px-8 normal-case text-base font-semibold cursor-pointer border-none"
            onClick={() => { handleSign() }}>
            Sign
          </button>
        </div>
      }
      {signed &&
        <form name="kycForm" className=" flex-grow pb-[117px]" >
          <label className="w-full mb-6 block">
            <p className="block text-invar-light-grey text-sm leading-4 font-normal mb-3">
              Country/Region
            </p>
            <div className="relative">
              <div className="block bg-invar-main-purple w-full h-12 rounded 
             text-white font-normal text-base px-4 py-3">
                {data.selectCountryRegion}
              </div>
            </div>
          </label>
          <label className="w-full mb-6 block">
            <p className="block text-invar-light-grey text-sm leading-4 font-normal mb-3">
              Full Legal Name (the same on your ID/Passport)
            </p>
            <div className="relative">
              <div className="block bg-invar-main-purple w-full h-12 rounded 
             text-white font-normal text-base px-4 py-3">
                {data.inputName}
              </div>
            </div>
          </label>
          <label className="w-full mb-6 block">
            <p className="block text-invar-light-grey text-sm leading-4 font-normal mb-3">
              Government-Issued ID Type
            </p>
            <div className="relative">
              <div className="block bg-invar-main-purple w-full h-12 rounded 
             text-white font-normal text-base px-4 py-3">
                {data.selectIDtype}
              </div>
            </div>
          </label>
          <label className="w-full mb-6 block">
            <p className=" text-invar-light-grey text-sm leading-4 font-normal mb-3">
              ID Number (Letters and numbers only)
            </p>
            <div className="relative">
              <div className="block bg-invar-main-purple w-full h-12 rounded 
             text-white font-normal text-base px-4 py-3">
                {data.inputIDnumber}
              </div>
            </div>
          </label>
          <label className="w-full mb-6 block">
            <p className="block text-invar-light-grey text-sm leading-4 font-normal mb-3">
              Date of Birth (You must be at least 21 years old)
            </p>
            <div className="relative">
              <div className="block bg-invar-main-purple w-full h-12 rounded 
             text-white font-normal text-base px-4 py-3">
                {data.selectDate}
              </div>
            </div>
          </label>
          <label className="w-full mb-6 block">
            <p className="block text-invar-light-grey text-sm leading-4 font-normal mb-3">
              Email
            </p>
            <div className="relative">
              <div className="block bg-invar-main-purple w-full h-12 rounded 
             text-white font-normal text-base px-4 py-3">
                {data.inputEmail}
              </div>
            </div>
          </label>

          <label className="w-full mb-6 block">
            <p className="text-invar-light-grey text-sm leading-4 font-normal mb-3">
              Full Residential Address
            </p>
            <div className="relative">
              <div className="block bg-invar-main-purple w-full h-12 rounded 
             text-white font-normal text-base px-4 py-3">
                {data.inputAddress}
              </div>
            </div>
          </label>
          {/* <input
      type="submit" value="Next"
      className="btn btn-disabled inline-block bg-invar-disabled hover:bg-invar-main-purple rounded text-white px-8 normal-case text-base font-semibold"
    /> */}
        </form>
      }
    </>
  )
}

export default FormInfo
