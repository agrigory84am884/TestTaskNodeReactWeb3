export interface UserWithAddresses {
    id:number;
    firstName: string;
    lastName: string;
    email: string;

}
export interface IUserListWithAddressesResponse {
    user: UserWithAddresses;
    address: string;

}