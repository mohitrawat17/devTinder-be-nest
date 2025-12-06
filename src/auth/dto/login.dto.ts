import {IsEmail, IsString, MinLength } from "class-validator";


export class LoginDto {

  @IsEmail()
  emailId: string;

  @IsString()
  @MinLength(6)
  password: string;
}