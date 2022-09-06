import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
// Extend the base Prisma client to add your own custom logic
export class PrismaService extends PrismaClient {
    constructor() {
        // Super will call the constructor of the base class
        super({
            datasources: {
                db: {
                    url: process.env.DATABASE_URL,
                }
            }
        });
    }
}
