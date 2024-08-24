import React, { useState, useEffect } from 'react';
import { ethers, BrowserProvider } from 'ethers';
import config from '../config/config';
import { fetchUsers } from '../services/api';
import { IUserListWithAddressesResponse } from '../services/api-contracts/IUserListWithAddressesResponse';

const INFURA_PROJECT_ID = config.infuraId;

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface TransferEtherProps {
  userAddress?: string;
}

const provider = new ethers.InfuraProvider('sepolia', INFURA_PROJECT_ID);

const TransferEther: React.FC<TransferEtherProps> = ({ userAddress }) => {
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<IUserListWithAddressesResponse[]>([]);

  const loadUsers = async () => {
    try {
      const usersList = await fetchUsers();
      setUserData(usersList);
    } catch (error) {
      setError('Error loading users');
      console.error(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const sendEther = async () => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
      }

      const newProvider = new BrowserProvider(window.ethereum);
      const signer = await newProvider.getSigner();

      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount),
      });

      setTransactionHash(tx.hash);
    } catch (err) {
      console.error(err);
      setError('Error sending Ether');
    } finally {
    }
  };

  return (
    <div>
      <h3>Send Ether</h3>
      <select
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      >
        <option value="">Select a recipient</option>
        {userData.map((item) => (
          <option key={item.user.id} value={item.address}>
            {item.user.firstName} {item.user.lastName}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendEther} disabled={loading || !userAddress}>
        Send
      </button>
      {transactionHash && (
        <p>
          Transaction successful! Hash:{' '}
          <a
            href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {transactionHash}
          </a>
        </p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default TransferEther;
