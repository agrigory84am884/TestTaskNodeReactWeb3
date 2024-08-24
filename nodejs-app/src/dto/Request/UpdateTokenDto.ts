import { IsNotEmpty, IsString } from 'class-validator';

export class TokenVerifyDto {

  @IsString()
  @IsNotEmpty()
  refrashToken!: string;
}