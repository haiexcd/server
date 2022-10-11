/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './modules/login/login.module';
import { NewsModule } from './modules/news/news.module';
import { RegisterModule } from './modules/register/register.module';
import { UsersModule } from './modules/users/users.module';


@Module({
  imports: [
    LoginModule,
    UsersModule,
    RegisterModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
