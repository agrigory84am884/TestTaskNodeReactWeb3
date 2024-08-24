import {isNotEmpty, IsNotEmpty } from 'class-validator';

export class AddUserAddressDto {
  @IsNotEmpty()
  address!: string;
}
