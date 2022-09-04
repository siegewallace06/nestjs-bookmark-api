import { Injectable } from "@nestjs/common";

// For Auth Service it will be annotated with @Injectable() decorator
// means that it's going to be able to use the dependency injection
// system that Nest provides
@Injectable()
// AuthService Class
export class AuthService {}