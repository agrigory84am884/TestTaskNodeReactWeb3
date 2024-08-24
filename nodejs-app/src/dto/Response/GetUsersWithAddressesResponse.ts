export class UserWithAddresses {
    id!:number;
    firstName!: string;
    lastName!: string;
    email!: string;
    constructor(id: number, firstName: string, lastName: string, email: string){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email
    }
}
export class GetUsersWithAddressesResponse {
    user!: UserWithAddresses;
    address!: string;
    constructor(user: UserWithAddresses, address: string){
        this.user = user;
        this.address = address;
    }
}