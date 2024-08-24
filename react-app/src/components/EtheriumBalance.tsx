import React, { useState, useEffect } from 'react';
import { ethers, BrowserProvider } from 'ethers';
import config from '../config/config';
import { getWalletAddress, saveUserAddress } from '../services/api';
import TransferEther from './TransferEther';

const INFURA_PROJECT_ID = config.infuraId;
declare global {
    interface Window {
      ethereum?: any;
    }
  }
  
const provider = new ethers.InfuraProvider('sepolia', INFURA_PROJECT_ID);

interface EthereumBalanceProps {
  address?: string;
}

const EthereumBalance: React.FC<EthereumBalanceProps> = ({ address }) => {
  const [balance, setBalance] = useState<string>('0');
  const [userAddress, setUserAddress ] = useState<string | null>(address || null)

  const getUserAddess = async () => {
    const address = await getWalletAddress();
    setUserAddress(address.address);
  }

  useEffect(() => {
    getUserAddess().then().catch((error)=>{
        //throw new Error(error);
    });
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      if (userAddress) {
        try {
          const balanceBigNumber = await provider.getBalance(userAddress);
          const balanceInEther = ethers.formatEther(balanceBigNumber);
          setBalance(balanceInEther);
        } catch (err) {
          console.error(err);
        } finally {
        }
      }
    };

    fetchBalance();
  }, [userAddress]);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const newProvider = new BrowserProvider(window.ethereum);
        const signer = await newProvider.getSigner();
        const address = await signer.getAddress();
        await saveUserAddress({address});
        setUserAddress(address);
        console.log('Connected address:', address);
      } else {
        alert('Please install MetaMask!');
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div>
      <h2>Ethereum Balance</h2>
      <p>Address: {userAddress || 'Not connected'}</p>
      <p>Balance: {balance} ETH</p>
      {!userAddress && <button onClick={connectWallet}>Connect Wallet</button>}
      {userAddress && <TransferEther userAddress={userAddress} />}
    </div>
  );
};

export default EthereumBalance;
