import { IsNotEmpty, IsString } from 'class-validator';

export class TokenVerifyDto {
  @IsString()
  @IsNotEmpty()
  token!: string;

  @IsString()
  @IsNotEmpty()
  refrashToken!: string;
}