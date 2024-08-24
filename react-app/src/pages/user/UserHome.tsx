import React from 'react';
import { Link } from 'react-router-dom';
import './main.css'; // Adjust this path based on your actual file structure
import EthereumBalance from '../../components/EtheriumBalance';

const UserHome: React.FC = () => {

    

  return (
    <div className="home-container">
      <div className="content">
        <h1>User Home</h1>
        <EthereumBalance address={''} />
      </div>
    </div>
  );
};

export default UserHome;
