import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from './dto';

// Decorators to tell Nest that this is a controller
@Controller('auth')
// AuthController Class
export class AuthController {
    // Constructor with auth service as a dependency
    constructor(private authService: AuthService) {
        // example of using the auth service
        // this.authService.test();
    }

    // signup function
    // We use body decorator to tell Nest that we want to use the body of the request
    // We use the DTO interface to tell Nest what the body should look like
    @Post("signup")
    signup(@Body() dto: AuthDto) {
        // console.log({
        //     dto,
        // });
        return this.authService.signup(dto);
    }

    // signin function
    @Post("signin")
    signin() {
        return this.authService.signin();
    }

}