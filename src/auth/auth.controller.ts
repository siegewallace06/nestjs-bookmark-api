import { Controller } from "@nestjs/common";
import { AuthService } from "./auth.service";

// Decorators to tell Nest that this is a controller
@Controller()
// AuthController Class
export class AuthController {
    // Constructor with auth service as a dependency
    constructor(private authService: AuthService) {
        // example of using the auth service
        // this.authService.test();
    }

    }