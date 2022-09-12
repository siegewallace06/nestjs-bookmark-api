import { Injectable } from "@nestjs/common";
import { User, Bookmark } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
// import argon2 
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ForbiddenException } from "@nestjs/common/exceptions";

// For Auth Service it will be annotated with @Injectable() decorator
// means that it's going to be able to use the dependency injection
// system that Nest provides
@Injectable()
// AuthService Class
export class AuthService {
    // everytime it's instantiated, call the prisma service
    constructor(private prisma: PrismaService) { }
    // Test function
    test() {
        console.log("Testing Auth Service");
    }

    // Signup function
    async signup(dto: AuthDto) {
        // generate the password hash
        const hash = await argon.hash(dto.password);
        try {
            // save the user to the database
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash,
                },
                // select so the hash is not returned
                // select: {
                //     id: true,
                //     email: true,
                //     createdAt: true,
                // }
            });

            // temp solution to delete the hash
            delete user.hash;

            // return the user
            return user;
        }
        catch (err) {
            // if the error is a PrismaClientKnownRequestError
            if (err instanceof PrismaClientKnownRequestError) {
                // if email is already taken
                if (err.code === "P2002") {
                    // return error message
                    throw new ForbiddenException(
                        "Email is already taken"
                    )
                }
            }
            // if there is an unknown error
            else {
                throw err;
            }
        }

    }

    // signin function
    signin() {
        return {
            msg: "You have signed in successfully",
        }
    }

}