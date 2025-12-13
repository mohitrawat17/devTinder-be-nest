import {
    IsString,
    IsEmail,
    IsOptional,
    MinLength,
    MaxLength,
    IsInt,
    Min,
    IsEnum,
    IsArray,
    ArrayNotEmpty,
} from 'class-validator';
import { Gender } from 'src/auth/auth.enums';

export class UpdateUserDto {

    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsInt()
    @Min(18)
    age?: number;

    @IsOptional()
    @IsEnum(Gender)
    gender?: Gender;

    @IsOptional()
    @IsString()
    photo?: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    skills?: string[];
}
