import { Controller, Get, Res, Req, Post, Body } from 'routing-controllers';
import { Response } from 'express';
import { AuthGuard } from '../middlewares/AuthGuard';
import { AddressService } from '../services/AddressService';
import { RequestCustom } from '../types/RequestCustom';
import { GetUserAddressDto } from '../dto/Response/GetUserAddressDto';
import { AppError } from '../errors/AppError';
import { AddUserAddressDto } from '../dto/Request/AddUserAddressDto';
import { GetUsersWithAddressesResponse } from '../dto/Response/GetUsersWithAddressesResponse';

@Controller('/api/address')
export class AddressController {
  private addressService = new AddressService();

  
  @Get('/')
  @AuthGuard()
  async getUserAddress(@Req() req: RequestCustom, @Res() res: Response): Promise<Response<GetUserAddressDto>> {
    try {
        const address = await this.addressService.getUserAddress(req.user.userId);

        return res.json( address ); 
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ message: error.message });
          }
          return res.status(500).json({ message: 'Unknown Error' });
    }
  }

  @Get('/users')
  @AuthGuard()
  async getUserWuthAddress(@Req() req: RequestCustom, @Res() res: Response): Promise<Response<GetUsersWithAddressesResponse[]>> {
    try {
        const users = await this.addressService.getUsersWithAddress(req.user.userId);

        return res.json( users ); 
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ message: error.message });
          }
          return res.status(500).json({ message: 'Unknown Error' });
    }
  }

  @Post('/')
  @AuthGuard()
  async addUserAddress(
        @Body() addressData: AddUserAddressDto, 
        @Req() req: RequestCustom,  
        @Res() res: Response
    ): Promise<Response<any>> {
    try {
        const address = this.addressService.addUserAddress(addressData, req.user.userId);
        return res.json({ address }); 
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ message: error.message });
          }
          return res.status(500).json({ message: 'Unknown Error' });
    }
  }
}
