import { Controller, Post } from "@nestjs/common";
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
    signup() {
        return this.authService.signup();
    }

    // signin function
    @Post("signin")
    signin() {
        return this.authService.signin();
    }

}