
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

// Decorator comes from @nestjs/common
@Module({
    // Import AuthController
    controllers: [AuthController],
    // Import AuthService
    providers: [AuthService],
})

// AuthModule Class
export class AuthModule {}