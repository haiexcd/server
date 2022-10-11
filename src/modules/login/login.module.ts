import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Register, RegisterSchema } from 'src/Entities/register.entity';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  controllers: [LoginController],
  imports: [
    MongooseModule.forRoot(
      '',
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
