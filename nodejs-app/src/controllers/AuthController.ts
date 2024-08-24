import { Controller, Get, Post, Param, Body, Res, Put } from 'routing-controllers';
import { CreateUserDto } from '../dto/Request/CreateUserDto';
import { UserResponseDto } from '../dto/Response/UserResponseDto';
import { Response } from 'express';
import { UserService } from '../services/UserService';
import { AppError } from '../errors/AppError';
import { LoginUserDto } from '../dto/Request/LoginUserDto';
import { TokenVerifyDto } from '../dto/Request/TokenVerifyDto';
import { LoginResponseDto } from '../dto/Response/LoginResponseDto';

@Controller('/api')
export class AuthController {
  private userService = new UserService();

  @Post('/register')
  async create(@Body() userDto: CreateUserDto, @Res() res: Response): Promise<Response<UserResponseDto>> {
    try {
        const newUser = await this.userService.createUser(userDto);
        return res.status(201).json(newUser);
      } catch (error) {
        if (error instanceof AppError) {
          return res.status(error.statusCode).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Unknown Error' });
      }
  }

  @Post('/login')
  async login(@Body() loginDto: LoginUserDto, @Res() res: Response): Promise<Response<LoginResponseDto>> {
    try{
        const token = await this.userService.login(loginDto);
        return res.status(201).json({token});
    }catch(error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ message: error.message });
          }
          return res.status(500).json({ message: 'Unknown Error' });
    }
  }

  @Post('/token-verify')
  async tokenVerify(@Body() verifyDto: TokenVerifyDto, @Get() res: Response): Promise<Response<any>> {
    try{
        const token = await this.userService.verifyToken(verifyDto.token);
        return res.status(201).json({token});
    }catch(error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ message: error.message });
          }
          return res.status(500).json({ message: 'Unknown Error' });
    }
  }

  @Post('/update-token')
  async updateToken(@Body() verifyDto: TokenVerifyDto, @Get() res: Response): Promise<Response<any>> {
    try{
        const token = await this.userService.verifyToken(verifyDto.token);
        return res.status(201).json({token});
    }catch(error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ message: error.message });
          }
          return res.status(500).json({ message: 'Unknown Error' });
    }
  }
}
