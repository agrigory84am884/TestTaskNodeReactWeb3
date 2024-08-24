import { AppDataSource } from './../config/AppDataSource'; 
import { User } from './../entity/User';
import { CreateUserDto } from '../dto/Request/CreateUserDto';
import { UserResponseDto } from '../dto/Response/UserResponseDto';
import bcrypt from 'bcryptjs';
import { MoreThan, QueryFailedError } from 'typeorm';
import { AppError } from '../errors/AppError';
import jwt from 'jsonwebtoken';
import { LoginUserDto } from '../dto/Request/LoginUserDto';
import { config } from '../config/config';
import { LoginResponseDto } from '../dto/Response/LoginResponseDto';

export class UserService {
  private users: UserResponseDto[] = [];
  private userRepository = AppDataSource.getRepository(User);

  async getUsers(): Promise <any> {
      
      return this.userRepository.find();
  }

  async getUserById(id: number): Promise<UserResponseDto | undefined> {
    return this.users.find(user => user.id === id);
  }

  async createUser(userDto: CreateUserDto): Promise<UserResponseDto> {

    if(userDto.confirmPassword !== userDto.password){
      throw new Error('Passwords are not equal!');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userDto.password, salt);

    try{
      const user = this.userRepository.create({
        ...userDto,
        password: hashedPassword
      });
      const savedUser = await this.userRepository.save(user);
  
      const newUser: UserResponseDto = {
          id: this.users.length + 1,
          name: userDto.firstName,
          email: userDto.email,
          password: ''
      };

      return newUser;
    }catch(error: QueryFailedError | any){
      if (error.code === 'ER_DUP_ENTRY') {
        throw new AppError('Duplicate error. Email might already be in use.', 400);
      }

      throw new AppError('Error creating user.', 500);
    }
  }

  async login(data: LoginUserDto): Promise<LoginResponseDto> {
    try {
      const user = await this.userRepository.findOneBy({ email: data.email });

      if (!user) {
        throw new AppError('Invalid email or password', 400);
      }
  
      const isMatch = await bcrypt.compare(data.password, user.password);
  
      if (!isMatch) {
        throw new AppError('Invalid email or password', 400);
      }
      
      const secretKey = config.JWT_SECRET as string;
      const expiredIn = config.JWT_EXPIRE;
      
      const token = jwt.sign({ 
        userId: user.id, 
        firstName: user.firstName, 
        lastName: user.lastName,
        email: user.email 
      }, secretKey, { expiresIn: expiredIn });

      const refreshToken = crypto.randomUUID();

      const currentDate = new Date().toLocaleDateString();
      await this.userRepository.update(user.id, {token: refreshToken, tokenCreatedAt: currentDate});

      return new LoginResponseDto(token, refreshToken);
    } catch (error) {
      console.log("error: ", error)
      throw new AppError('Unknown error', 500);
    }
  }

  async verifyToken(token: string): Promise<string | jwt.JwtPayload> {
    const secretKey = config.JWT_SECRET as string;

    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      throw new AppError('Invalid token', 400);
    }
  }

  async updateToken(userRefreshToken: string): Promise<LoginResponseDto> {

    try {

      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);

      const user = await this.userRepository.findOne({
        where: {
          token: userRefreshToken,
          tokenCreatedAt: MoreThan(oneDayAgo)
        }
      });

      if (!user) {
        throw new AppError('Invalid email or password', 400);
      }

      const secretKey = config.JWT_SECRET as string;
      const expiredIn = config.JWT_EXPIRE;
      
      const token = jwt.sign({ 
        userId: user.id, 
        firstName: user.firstName, 
        lastName: user.lastName,
        email: user.email 
      }, secretKey, { expiresIn: expiredIn });

      const refreshToken = crypto.randomUUID();
      const currentDate = new Date().toLocaleDateString();
      
      await this.userRepository.update(user.id, {token: refreshToken, tokenCreatedAt: currentDate});

      return new LoginResponseDto(token, refreshToken);
    } catch (error) {
      console.log("error: ", error)
      throw new AppError('Unknown error', 500);
    }
  }
}
