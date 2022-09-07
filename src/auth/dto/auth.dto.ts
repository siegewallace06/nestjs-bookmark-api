// Import isEmail from 'class-validator' to validate email
import { IsEmail, IsNotEmpty,IsString } from 'class-validator';

// Class for DTO
export class AuthDto {
    // Email is required and must be an email and cannot be empty
    @IsEmail()
    @IsNotEmpty()
    email: string;

    // Password is required and must be a string and cannot be empty
    @IsString()
    @IsNotEmpty()
    password: string;
}