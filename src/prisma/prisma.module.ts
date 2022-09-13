import { Global,Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Add Global decorator to make PrismaService available to all modules
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
