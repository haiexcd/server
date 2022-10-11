import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Register, RegisterSchema } from 'src/Entities/register.entity';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  controllers: [LoginController],
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://haiexcd:hai012490@cluster0.73hunog.mongodb.net/?retryWrites=true&w=majority',
      [],
    ),
    MongooseModule.forFeature([
      {
        name: Register.name,
        schema: RegisterSchema,
      },
    ]),
  ],
  providers: [LoginService],
})
export class LoginModule {}