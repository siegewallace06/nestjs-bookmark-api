import { Injectable } from "@nestjs/common";
import { User, Bookmark } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
// import argon2 
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ForbiddenException } from "@nestjs/common/exceptions";
import { JwtService } from "@nestjs/jwt/dist";
import { ConfigService } from "@nestjs/config";

// For Auth Service it will be annotated with @Injectable() decorator
// means that it's going to be able to use the dependency injection
// system that Nest provides
@Injectable()
// AuthService Class
export class AuthService {
    // everytime it's instantiated, call the prisma service
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService) { }
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
    async signin(dto: AuthDto) {

        // Find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        });

        // throw an error if the user is not found
        if (!user) {
            throw new ForbiddenException("Invalid User Credentials");
        }

        // compare the password with the hash
        const valid = await argon.verify(user.hash, dto.password);

        // throw an error if the password is incorrect
        if (!valid) {
            throw new ForbiddenException("Invalid Password");
        }

        // temp solution to delete the hash
        // delete user.hash;

        // return the signed token
        return this.signToken(user.id, user.email);
    }

    // Function to generate signin token
    async signToken(userID: number, email: string): Promise<{access_token: string}> {
        // Payload to be signed
        const payload = {
            sub: userID,
            email,
        }
        const secret = this.config.get("JWT_SECRET");
        const token = await this.jwt.signAsync(payload, {
            // Token expires in 15 minutes
            expiresIn: "15m",
            // secret key, stored in .env file
            secret: secret,
        });

        return {
            access_token: token,
        };
    }

}