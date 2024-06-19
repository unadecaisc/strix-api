import { Module } from '@nestjs/common';
import { FirebaseService } from './fireabase.service';
import { PrismaService } from './prisma.service';

@Module({
  controllers: [],
  providers: [FirebaseService, PrismaService],
  exports: [FirebaseService, PrismaService],
})
export class CommonModule {}
