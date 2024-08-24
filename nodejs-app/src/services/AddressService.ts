import { userInfo } from "os";
import { AppDataSource } from "../config/AppDataSource";
import { AddUserAddressDto } from "../dto/Request/AddUserAddressDto";
import { GetUserAddressDto } from "../dto/Response/GetUserAddressDto";
import { AppError } from "../errors/AppError";
import { UserAddress } from './../entity/UserAddress';
import { User } from "../entity/User";
import { GetUsersWithAddressesResponse } from "../dto/Response/GetUsersWithAddressesResponse";
import { notEqual } from "assert";

export class AddressService {
    private addressRepository = AppDataSource.getRepository(UserAddress);

    async getUserAddress (userId: number): Promise<GetUserAddressDto> {
        const addressData = await this.addressRepository.findOneBy({userId});
        
        if(!addressData)
        {
            throw new AppError('User dont have an address', 404);
        }

        return new GetUserAddressDto(addressData.address);
    }

    async getUsersWithAddress (userId: number): Promise<GetUsersWithAddressesResponse[]> {
        const addresses = await this.addressRepository
        .createQueryBuilder('address')
        .leftJoinAndSelect('address.user', 'user')
        .select([
          'address.address',
          'user.id',
          'user.firstName',
          'user.lastName',
          'user.email'
        ])
        .where('user.id <> :userId', { userId })
        .getMany();
        
        if(!addresses)
        {
            throw new AppError('No user with address was found!', 404);
        }

        return addresses as GetUsersWithAddressesResponse[];
    }

    async addUserAddress(addressData: AddUserAddressDto, userId: number): Promise<UserAddress> {
        try{
            const newUserAddress = this.addressRepository.create({
                address: addressData.address,
                userId: userId
              });
          
            return await this.addressRepository.save(newUserAddress);
        }catch(error: AppError | unknown){
            throw new AppError('Somethnig is wrong', 400);
        }
    }
}