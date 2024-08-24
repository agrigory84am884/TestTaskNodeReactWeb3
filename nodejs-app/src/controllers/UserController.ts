import { Controller, Get, Post, Param, Body, Res, Put, UseBefore, Req } from 'routing-controllers';
import { CreateUserDto } from '../dto/Request/CreateUserDto';
import { UserResponseDto } from '../dto/Response/UserResponseDto';
import { Response } from 'express';
import { UserService } from '../services/UserService';
import { AddressService } from '../services/AddressService';

@Controller('/api/users')
export class UserController {
  private userService = new UserService();
  private addressService = new AddressService();

  @Get('/')
  async getAll(@Res() res: Response): Promise <any> {
    const users = await this.userService.getUsers();
    return res.json(users);
  }

  @Get('/:id')
  async getOne(@Param('id') id: number, @Res() res: Response): Promise<Response<UserResponseDto>> {
    const user = await this.userService.getUserById(id);
    return res.json(user);
  }

  @Post('/')
  async create(@Body() userDto: CreateUserDto, @Res() res: Response): Promise<Response<UserResponseDto>> {
    const newUser = await this.userService.createUser(userDto);
    return res.status(201).json(newUser);
  }
}
