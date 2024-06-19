import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FireabaseService } from './fireabase/fireabase.service';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, FireabaseService],
})
export class AppModule {}
