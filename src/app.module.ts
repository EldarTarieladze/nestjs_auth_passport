import { ProtectedModule } from './protected/protected.module';
import { AuthModule } from 'auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ProtectedModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
