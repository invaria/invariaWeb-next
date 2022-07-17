import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { useAddress, useNetwork } from '@thirdweb-dev/react'
import { SiweMessage } from 'siwe'
import { createUser } from "../src/utils/storeFirebase";


const Form = () => {
  let domain, provider, signer
  const address = useAddress();
  const network = useNetwork();
  const [inputs, setInputs] = useState({ ["address"]: address });
  const [isAdult, setIsAdult] = useState(true);
  const [emailChange, setEmailChange] = useState(false)

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
      'Sign in with Ethereum.'
    );
    const nonce = { ["nonce"]: await signer.signMessage(message) }
    // if (nonce) {
    // setInputs(async (values) => ({ ...values, ["nonce"]: address }))
    // }
    console.log(nonce);
  }
  useEffect(() => {
    if (!address) return
    if (inputs.address !== address) {
      setInputs((values) => ({ ...values, ["address"]: address }))
    }
    domain = window.location.host;
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner()
  }, [address, network]);

  const handleSubmit = async (event) => {
    event.preventDefault()
    await signInWithEthereum()
    await createUser(address, inputs)
    console.log("submitted!")
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }))
    if (name == "selectDate") {
      handleBirthDate(value)
    }
  }
  useEffect(() => {
    if (inputs.inputEmail == undefined) return
    setEmailChange(true)
  }, [inputs.inputEmail])

  const handleBirthDate = (birth) => {
    let today = new Date();
    let birthDate = new Date(birth);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age < 21) { setIsAdult(false) } else { setIsAdult(true) }
  }

  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  let btnSubmit
  if ((inputs.selectDate !== undefined) && (isAdult == true)
    && (validateEmail(inputs.inputEmail)) && (address)) {
    btnSubmit = <input
      type="submit" value="Next"
      className="btn inline-block bg-invar-dark hover:bg-invar-main-purple rounded text-white px-8 normal-case text-base font-semibold cursor-pointer border-none"
    />
  } else {
    btnSubmit = <input
      type="submit" value="Next"
      className="btn btn-disabled inline-block bg-invar-disabled hover:bg-invar-main-purple rounded text-white px-8 normal-case text-base font-semibold"
    />
  }

  return (
    <form name="kycForm" className=" flex-grow pb-[117px]" onSubmit={handleSubmit}>
      <label className="w-full mb-6 block">
        <p className="block text-invar-light-grey text-sm leading-4 font-normal mb-3">
          Country/Region
        </p>
        <div className="relative">
          <select name="selectCountryRegion" onChange={handleChange} value={inputs.selectCountryRegion || ""}
            required className="appearance-none block bg-invar-main-purple w-full h-12 rounded 
            focus:border border-white focus:outline-none text-white font-normal px-[15px]">
            <option value="">Select</option>
            <option value="TW">Taiwan</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
          </div>
        </div>
      </label>
      <label className="w-full mb-6 block">
        <p className="block text-invar-light-grey text-sm leading-4 font-normal mb-3">
          Full Legal Name (the same on your ID/Passport)
        </p>
        <input
          name="inputName" type="text" onChange={handleChange} value={inputs.inputName || ""}
          required className="block bg-invar-main-purple w-full h-12 rounded focus:border border-white text-white font-normal px-[15px]"
        />
      </label>
      <label className="w-full mb-6 block">
        <p className="block text-invar-light-grey text-sm leading-4 font-normal mb-3">
          Government-Issued ID Type
        </p>
        <div className="relative">
          <select name="selectIDtype" onChange={handleChange} value={inputs.selectIDtype || ""}
            required className="appearance-none block bg-invar-main-purple w-full h-12 rounded 
            focus:border border-white focus:outline-none text-white font-normal px-[15px]">
            <option value="">Select</option>
            <option value="id">ID</option>
            <option value="passport">Passport</option>
            <option value="drivingLicense">Driving license</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
          </div>
        </div>
      </label>
      <label className="w-full mb-6 block">
        <p className=" text-invar-light-grey text-sm leading-4 font-normal mb-3">
          ID Number
        </p>
        <input
          name="inputIDnumber" type="text" onChange={handleChange} value={inputs.inputIDnumber || ""}
          required className="block bg-invar-main-purple w-full h-12 rounded focus:border border-white text-white font-normal px-[15px]"
        />
      </label>
      <label className="w-full mb-6 block">
        <p className="block text-invar-light-grey text-sm leading-4 font-normal mb-3">
          Date of Birth
        </p>
        <div className="relative">
          <input
            name="selectDate" type="date" onChange={handleChange} value={inputs.selectDate || ""}
            required className="block bg-invar-main-purple w-full h-12 rounded focus:border border-white outline-none text-white font-normal px-[15px] appearance-none"
          />
          <div className=" pointer-events-none absolute inset-y-0 right-[15px] flex items-center  text-white">
            <img className=" w-6 h-6 " src="/icons/ic_calendar.png" alt="" />
          </div>
        </div>
        {!isAdult &&
          <p className="mt-2 text-pink-600 text-sm">
            You are under the age of 21</p>
        }
      </label>
      <label className="w-full mb-6 block">
        <p className="block text-invar-light-grey text-sm leading-4 font-normal mb-3">
          Email
        </p>
        <input
          name="inputEmail" type="email" onChange={handleChange} value={inputs.inputEmail || ""}
          required className="peer block bg-invar-main-purple w-full h-12 rounded focus:border border-white focus:outline-none
          text-white font-normal px-4 focus:px-[15px]"
        />
        {emailChange && <p className="mt-2 hidden peer-invalid:flex text-pink-600 text-sm">
          Please provide a valid email address
        </p>}
      </label>

      <label className="w-full mb-6 block">
        <p className="text-invar-light-grey text-sm leading-4 font-normal mb-3">
          Full Residential Address
        </p>
        <input
          name="inputAddress" type="text" onChange={handleChange} value={inputs.inputAddress || ""}
          required className="block bg-invar-main-purple w-full h-12 rounded focus:border border-white focus:outline-none text-white font-normal px-4 focus:px-[15px]"
        />
      </label>
      {btnSubmit}
    </form>

  )
}

export default Form
