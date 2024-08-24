import config from "../config/config";
import { ILoginResponse } from "./api-contracts/ILoginResponse";

export const authFetch = async (url: string, options: RequestInit): Promise<any> => {
    const token = localStorage.getItem('authToken');

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    }; 

    const authOption = {
        ...options,
        headers
    };

    try {
        const response = await fetch(url, authOption);

        if (response.status === 401) {
            try{
                const loginData = await handelRefreshToken();
                localStorage.setItem('authToken', loginData.token);
                localStorage.setItem('refreshToken', loginData.refreshToken);
                window.location.reload();
            }catch(error){
                window.location.href = '/login'
                throw new Error('Unauthorized - Token may be invalid or expired');
            }
            
        } else {
            return response;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export const handelRefreshToken = async (): Promise<ILoginResponse> => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await fetch(config.baseUrl + '/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({refreshToken}),
      });
    
      if (!response.ok) {
        throw new Error("Unautorized");
      }
    
      return (await response.json()).token;
}