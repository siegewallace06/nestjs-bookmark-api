import { Injectable } from "@nestjs/common";
import {User, Bookmark} from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

// For Auth Service it will be annotated with @Injectable() decorator
// means that it's going to be able to use the dependency injection
// system that Nest provides
@Injectable()
// AuthService Class
export class AuthService {
    // everytime it's instantiated, call the prisma service
    constructor(private prisma: PrismaService) {}
    // Test function
    test() {
        console.log("Testing Auth Service");
    }

    // Signup function
    signup() {
        return {
            msg: "You have signed up successfully",
        }
    }

    // signin function
    signin() {
        return {
            msg: "You have signed in successfully",
        }
    }

}