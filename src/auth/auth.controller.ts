import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

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
    @Post("signup")
    // We use body decorator to tell Nest that we want to use the body of the request
    signup(@Body dto: any) {
        console.log({
            dto,
        });
        return this.authService.signup();
    }

    // signin function
    @Post("signin")
    signin() {
        return this.authService.signin();
    }

}