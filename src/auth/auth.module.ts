
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

// Decorator comes from @nestjs/common
@Module({
    // import JWT Module
    imports: [JwtModule.register({})],
    // Import AuthController
    controllers: [AuthController],
    // Import AuthService
    providers: [AuthService],
})

// AuthModule Class
export class AuthModule {}