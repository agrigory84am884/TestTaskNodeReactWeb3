import config from '../config/config'
import { IGetAddressResponse } from './api-contracts/IGetAddressResponse';
import { ILoginRequest } from './api-contracts/ILoginRequest';
import { ILoginResponse } from './api-contracts/ILoginResponse';
import { IRegisterRequest } from './api-contracts/IRegisterRequest';
import { ISaveUserAddressRequest } from './api-contracts/ISaveUserAddressRequest';
import { IUserListWithAddressesResponse } from './api-contracts/IUserListWithAddressesResponse';
import { authFetch } from './authFetch';


  export const registerUser = async (data: IRegisterRequest) => {
    const response = await fetch(config.baseUrl + '/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
  
    return await response.json();
  };

  export const loginUser = async (data: ILoginRequest): Promise<ILoginResponse> => {
    const response = await fetch(config.baseUrl + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
  
    return (await response.json()).token;
  };

  export const getWalletAddress = async (): Promise<IGetAddressResponse> => {

    const response = await authFetch(config.baseUrl + '/address', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
  
    return (await response.json());
  }

  export const saveUserAddress = async (address: ISaveUserAddressRequest): Promise<any> => {
    const response = await authFetch(config.baseUrl + '/address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(address),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    return await response.json();
  }

  export const fetchUsers = async (): Promise<IUserListWithAddressesResponse[]> => {
    const response = await authFetch(config.baseUrl + '/address/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }
  
    return (await response.json());
  }