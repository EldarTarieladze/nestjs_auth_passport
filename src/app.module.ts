import { RegistrationModule } from './registration/registration.module';
import { ProtectedModule } from './protected/protected.module';
import { AuthModule } from 'auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationController } from './registration/registration.controller';

@Module({
  imports: [
    RegistrationModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_STRING),
    ProtectedModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
