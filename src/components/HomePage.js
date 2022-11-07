import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import Footer from "./Footer";
import { Link } from 'react-router-dom'
import { FaAd, FaMoneyCheck } from 'react-icons/fa'
 
import {
  OfficeBuildingIcon,
  ArrowRightIcon,
  ChipIcon, 
  SupportIcon
} from '@heroicons/react/solid'
import { PhoneIcon, ArrowSmRightIcon } from '@heroicons/react/outline';

import bgImg from '../assets/banner.png'
import supportImg from '../assets/support.jpeg'

import Navigation from './Navigation';

// ABIs
import RealEstate from '../abis/RealEstate.json';
import Escrow from '../abis/Escrow.json';

// Config
import config from '.././config.json';
import Home from './Home';

function HomePage() {
  const [provider, setProvider] = useState(null)
  const [escrow, setEscrow] = useState(null)

  const [account, setAccount] = useState(null)

  const [homes, setHomes] = useState([])
  const [home, setHome] = useState({})
  const [toggle, setToggle] = useState(false);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
    const network = await provider.getNetwork()

    // config[network.chainId].escrow.address
    
   const realEstate = new ethers.Contract(config[network.chainId].realEstate.address, RealEstate, provider)
   const totalSupply = await realEstate.totalSupply()
   const homes = []

   for (var i = 1; i <= totalSupply; i++) {
    const uri = await realEstate.tokenURI(i)
    const response = await fetch(uri)
    const metadata = await response.json()
    homes.push(metadata)
  }

  setHomes(homes)
   
   const escrow = new ethers.Contract(config[network.chainId].escrow.address, Escrow, provider)
   setEscrow(escrow)

    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0])
      setAccount(account);
    })

  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  const togglePop = (home) => {
    setHome(home)
    toggle ? setToggle(false) : setToggle(true);
  }

  return (
    <div>
        <Navigation account={account} setAccount={setAccount} />
        
        <div className='w-full h-screen p-20 bg-zinc-200 flex flex-col justify-between'>
        <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
            <div className='flex flex-col justify-center md:items-start w-full px-2 py-8'>
                <h1 className='py-3 text-4xl md:text-6xl font-bold'>Properties <strong className="font-extrabold text-green-700 sm:block">Management</strong></h1>
                <p className='max-w-lg sm:leading-relaxed sm:text-xl'>Want to relocate?</p>
                <p className='max-w-lg sm:leading-relaxed sm:text-xl'>We help you relocate.</p>
                <div className="flex flex-wrap gap-4 mt-8 text-center">
                    <a className="block w-full px-12 py-3 text-sm font-medium text-white rounded shadow bg-green-700 sm:w-auto active:bg-green-700 hover:bg-transparent hover:text-green-700 focus:outline-none focus:ring" href="/properties">
                    Get Started
                    </a>

                    <a data-role="smoothscroll" className="block w-full px-12 py-3 text-sm font-medium bg-white rounded shadow text-green-700 sm:w-auto hover:bg-transparent active:text-green-700 focus:outline-none focus:ring" href="#about">
                    Learn More
                    </a>
                </div>

            </div>
            
            <div>
                <img className='w-full' src={bgImg} alt="/" />
            </div>
            <div className='absolute flex flex-col py-8 md:min-w-[760px] bottom-[5%]
            mx-1 md:left-1/2 transform md:-translate-x-1/2 bg-white
            border border-slate-300 rounded-xl text-center shadow-xl'>
                <p>Our Services</p>
                <div className='flex justify-between flex-col px-8 md:flex-row'>
                    <div className='flex px-4 py-2 text-slate-500'><OfficeBuildingIcon className='h-6 text-green-700' />Property Listing</div>
                    <div className='flex px-4 py-2 text-slate-500'><FaMoneyCheck className='h-6 text-green-700' />Buying</div>
                    <div className='flex px-4 py-2 text-slate-500'><FaAd className='h-6 text-green-700' />Selling</div>
                    <div className='flex px-4 py-2 text-slate-500'><FaAd className='h-6 text-green-700' />Lease</div>
                </div>
            </div>

           
        </div>
    </div>
  


      <div id="about" className='w-full my-32'>
        <div className='max-w-[1240px] mx-auto'>

            <div className='text-center'>
                <h2 className='text-5xl font-bold'>Trusted Properties Finding Platform</h2>
                <p className=' text-xl py-6 text-gray-500'>
                    We understand the fear and numerous challenges in getting a property.<br/> 
                    And as such we are giving you a platform with trusted property holders.<br/>
                    Have in mind that all processes on the platform run on the blockchain <br/>
                    and as such it is transparent to all end users.
                </p>
            </div>

            <div className='grid md:grid-cols-3 gap-1 px-2 text-center'>

            <div className="flex flex-col justify-between p-8 transition-shadow bg-white rounded-sm shadow-xl group hover:shadow-lg">
                <div>
                    <h5 className="text-5xl font-bold text-green-700">100%</h5>
                    <div className="pt-2 mt-4 border-t-2 border-indigo-100">
                    <p className="text-sm font-medium tracking-widest text-gray-500 uppercase">Guaranteed Success</p>
                    </div>
                </div>

                <div className="inline-flex items-center mt-16 text-green-700">
                    <p className="text-lg font-medium">How we do it</p>

                    <ArrowRightIcon className='w-6 h-6 ml-3 transition-transform transform group-hover:translate-x-3' />
                </div>
            </div>

            
            <div className="flex flex-col justify-between p-8 transition-shadow bg-white rounded-sm shadow-xl group hover:shadow-lg">
                <div>
                    <h5 className="text-5xl font-bold text-green-700">24/7</h5>
                    <div className="pt-2 mt-4 border-t-2 border-indigo-100">
                    <p className="text-sm font-medium tracking-widest text-gray-500 uppercase">Everytime Delivery</p>
                    </div>
                </div>

                <div className="inline-flex items-center mt-16 text-green-700">
                    <p className="text-lg font-medium">How we do it</p>

                    <ArrowRightIcon className='w-6 h-6 ml-3 transition-transform transform group-hover:translate-x-3' />
                </div>
            </div>

            <div className="flex flex-col justify-between p-8 transition-shadow bg-white rounded-sm shadow-xl group hover:shadow-lg">
                <div>
                    <h5 className="text-5xl font-bold text-green-700">100K</h5>
                    <div className="pt-2 mt-4 border-t-2 border-indigo-100">
                    <p className="text-sm font-medium tracking-widest text-gray-500 uppercase">Successful Transaction</p>
                    </div>
                </div>

                <div className="inline-flex items-center mt-16 text-green-700">
                    <p className="text-lg font-medium">How we do it</p>

                    <ArrowRightIcon className='w-6 h-6 ml-3 transition-transform transform group-hover:translate-x-3' />
                </div>
            </div>


            </div>

        </div>
    </div>



      <div className='w-full mt-24'>

        <div className='w-full h-[700px] bg-gray-900/90 absolute'>
            <img className='w-full h-full object-cover mix-blend-overlay' src={supportImg} alt="/" />
        </div>

        <div className='max-w-[1240px] mx-auto text-white relative'>
            <div className='px-4 py-12'>
              <h2 className='text-3xl pt-8 text-slate-300 uppercase text-center'>Support</h2>
              <h3 className='text-5xl font-bold py-6 text-center'>Got Questions?</h3>
              <p className='py-4 text-3xl text-slate-300 text-center'>
                We have a reliable team available to assist you in all your questions and help you go about your 
                activities on the platform. Remember we are here to serve you to get the best of deals available on
                this platform.
            </p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 relative gap-x-8 gap-y-16 px-4 pt-12 sm:pt-20 text-black'>

            <div className="relative hover:shadow-lg block bg-white p-8 overflow-hidden border border-gray-100 rounded-lg">
                    <span
                        className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                    ></span>

                    <div className="justify-between sm:flex">
                        <div>
                        <h5 className="text-2xl font-bold text-gray-900">
                            Sales
                        </h5>
                        <p className="mt-1 text-xs font-medium text-gray-600">By John Doe</p>
                        </div>

                        <div className="flex-shrink-0 hidden ml-3 sm:block">
                        <PhoneIcon className='w-16 h-16 p-4 object-cover bg-green-600 shadow-2xl text-white rounded-lg' />
                        </div>
                    </div>

                    <div className="mt-4 sm:pr-8">
                        <p className="text-sm text-gray-500">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum
                        provident a, ipsa maiores deleniti consectetur nobis et eaque.
                        </p>
                    </div>

                    <dl className="flex mt-6">
                        <div className="flex flex-col-reverse">
                        <Link to="/faq">
                        <dt className="text-sm font-medium flex text-green-600">Continue <ArrowSmRightIcon className='w-5 ml-2' /></dt>
                            </Link>
                        <dd className="text-xs text-gray-500">Continue onFAQ's</dd>
                        </div>

                    </dl>
                    </div>

                    <div className="relative hover:shadow-lg block bg-white p-8 overflow-hidden border border-gray-100 rounded-lg">
                    <span
                        className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                    ></span>

                    <div className="justify-between sm:flex">
                        <div>
                        <h5 className="text-2xl font-bold text-gray-900">
                        Technical Support
                        </h5>
                        <p className="mt-1 text-xs font-medium text-gray-600">By John Doe</p>
                        </div>

                        <div className="flex-shrink-0 hidden ml-3 sm:block">
                        <SupportIcon className='w-16 h-16 p-4 object-cover bg-green-600 shadow-2xl text-white rounded-lg' />
                        </div>
                    </div>

                    <div className="mt-4 sm:pr-8">
                        <p className="text-sm text-gray-500">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum
                        provident a, ipsa maiores deleniti consectetur nobis et eaque.
                        </p>
                    </div>

                    <dl className="flex mt-6">
                        <div className="flex flex-col-reverse">
                        <Link to="/faq">
                        <dt className="text-sm font-medium flex text-green-600">Continue <ArrowSmRightIcon className='w-5 ml-2' /></dt>
                            </Link>
                        <dd className="text-xs text-gray-500">Continue onFAQ's</dd>
                        </div>

                    </dl>
                    </div>

                    <div className="relative hover:shadow-lg block bg-white p-8 overflow-hidden border border-gray-100 rounded-lg">
                    <span
                        className="absolute inset-x-0 bottom-0 h-2  bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"
                    ></span>

                    <div className="justify-between sm:flex">
                        <div>
                        <h5 className="text-2xl font-bold text-gray-900">
                            Media Inquiries
                        </h5>
                        <p className="mt-1 text-xs font-medium text-gray-600">By John Doe</p>
                        </div>

                        <div className="flex-shrink-0 hidden ml-3 sm:block">
                        <ChipIcon className='w-16 h-16 p-4 object-cover bg-green-600 shadow-2xl text-white rounded-lg' />
                        </div>
                    </div>

                    <div className="mt-4 sm:pr-8">
                        <p className="text-sm text-gray-500">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit illum
                        provident a, ipsa maiores deleniti consectetur nobis et eaque.
                        </p>
                    </div>

                    <dl className="flex mt-6">
                        <div className="flex flex-col-reverse">
                        <Link to="/faq">
                        <dt className="text-sm font-medium flex text-green-600">Continue <ArrowSmRightIcon className='w-5 ml-2' /></dt>
                            </Link>
                        <dd className="text-xs text-gray-500">Continue onFAQ's</dd>
                        </div>

                    </dl>
                    </div>

                    
            </div>    

        </div>

        <div className='w-full text-white my-24'>
            <div className='w-full h-[750px] bg-slate-900 absolute mix-blend-overlay'></div>

            <div className='max-w-[1240px] mx-auto py-12'>

                <div className='text-center py-8 text-slate-300'>
                <h2 className='text-3xl uppercase'>Recents</h2>
                <h3 className='text-5xl font-bold text-white py-8'>The right price for your budget.</h3>
                <p className='text-3xl'>
                    Be the first person to have a look at these amazing properties
                    and make a bid for it. You may be the new owner.
                </p>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3'>
                {homes.map((home, index) => (

                     <div className="block overflow-hidden mx-4 my-4 rounded-2xl" key={index} onClick={() => togglePop(home)}>
                     <img className="object-cover w-full h-56" src={home.image} alt="" />
     
                      <div className="p-4 bg-gray-900">
                             <dl>
                             <div>
                                 <dt className="sr-only">
                                 Price
                                 </dt>
     
                                 <dd className="text-sm text-gray-100">
                                 {home.attributes[0].value} ETH
                                 </dd>
                             </div>
     
                             <div>
                                 <dt className="sr-only">
                                 Address
                                 </dt>
     
                                 <dd className="font-medium">
                                 Ashongman
                                 </dd>
                             </div>
                             </dl>
     
                             <dl className="flex items-center mt-6 space-x-8 text-xs">
                             <div className="sm:inline-flex sm:items-center sm:shrink-0">
                                 <svg
                                 className="w-4 h-4 text-green-500"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                 >
                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                                 </svg>
     
                                 <div className="sm:ml-3 mt-1.5 sm:mt-0">
                                 <dt className="text-gray-100">
                                     Parking
                                 </dt>
     
                                 <dd className="font-medium">
                                 2 spaces
                                 </dd>
                                 </div>
                             </div>
     
                             <div className="sm:inline-flex sm:items-center sm:shrink-0">
                                 <svg
                                 className="w-4 h-4 text-green-500"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                 >
                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                 </svg>
     
                                 <div className="sm:ml-3 mt-1.5 sm:mt-0">
                                 <dt className="text-gray-100">
                                     Bathroom
                                 </dt>
     
                                 <dd className="font-medium">
                                 2 rooms
                                 </dd>
                                 </div>
                             </div>
     
                             <div className="sm:inline-flex sm:items-center sm:shrink-0">
                                 <svg
                                 className="w-4 h-4 text-green-500"
                                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                 >
                                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                 </svg>
     
                                 <div className="sm:ml-3 mt-1.5 sm:mt-0">
                                 <dt className="text-gray-100">
                                     Bedroom
                                 </dt>
     
                                 <dd className="font-medium">
                                 2 rooms
                                 </dd>
                                 </div>
                             </div>
                             </dl>
                         </div>
                     </div>
                   
                   ))}
                
                </div>
                

                {toggle && (
                    <Home home={home} provider={provider} account={account} escrow={escrow} togglePop={togglePop} />
                )}

            </div>
        </div>
        
    </div>
      <Footer />
{/* 
     <Navigation account={account} setAccount={setAccount} />

     <Search />

      <div className='cards__section'>

        <h3>Homes For You</h3>
        <hr />

        <div className='cards'>
          {homes.map((home, index) => (
             <div className='card' key={index} onClick={() => togglePop(home)}>
             <div className='card__image'>
               <img src={home.image} alt="Home" />
             </div>
               <div className='card__info'>
                 <h4>{home.attributes[0].value} ETH</h4>
                 <p>
                   <strong>{home.attributes[2].value} </strong> bds |
                   <strong>{home.attributes[3].value} </strong> ba |
                   <strong>{home.attributes[4].value} </strong> sqft |
                 </p>
                 <p>{home.address}</p>
               </div>
             
           </div>
          ))}
        </div>

      </div>

      {toggle && (
        <Home home={home} provider={provider} account={account} escrow={escrow} togglePop={togglePop} />
      )} */}

    </div>
  );
}

export default HomePage;
