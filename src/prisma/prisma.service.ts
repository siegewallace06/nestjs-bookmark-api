import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

// annotate to tell Nest so it will able to use the dependency injection system
// Extend the base Prisma client to add your own custom logic
@Injectable()
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService) {
        // Super will call the constructor of the base class
        super({
            datasources: {
                db: {
                    // url: process.env.DATABASE_URL,
                    url: config.get('DATABASE_URL'),
                }
            }
        });
        // test print the database url
        // console.log(config.get('DATABASE_URL'));
    }
}
